/**
 * File: app/frontend/lib/integrations/field-analysis-engine.ts
 * Purpose: AI-powered field analysis engine for intelligent field mapping with confidence scoring
 * Why: Core engine that analyzes external PM tool fields and generates smart mapping recommendations
 * Relevant Files: types.ts, PM33_INTELLIGENT_FIELD_MAPPING_SYSTEM.md, jira-provider.ts
 */

import {
  FieldAnalysisResult,
  SourceField,
  MappingRecommendation,
  MappingConfidence,
  FieldType,
  DataQuality,
  ConfidenceAnalysis,
  PopulationRate,
  FieldHierarchy,
  MappingRecommendationType,
  ConfidenceThreshold,
  AlternativeMapping,
  MappingExample,
  IntegrationProvider
} from './types';

// PM33 Target Field Schema - What we want to map TO
export const PM33_TARGET_FIELDS = {
  // Core work item fields
  'id': { type: FieldType.TEXT, required: true, description: 'Unique identifier' },
  'title': { type: FieldType.TEXT, required: true, description: 'Work item title/summary' },
  'description': { type: FieldType.TEXT, required: false, description: 'Detailed description' },
  'type': { type: FieldType.SELECT, required: true, description: 'Work item type (story, task, bug, epic)' },
  'status': { type: FieldType.STATUS, required: true, description: 'Current status' },
  'priority': { type: FieldType.PRIORITY, required: false, description: 'Priority level' },
  'assignee': { type: FieldType.USER, required: false, description: 'Assigned person' },
  'reporter': { type: FieldType.USER, required: false, description: 'Person who reported/created' },
  
  // Strategic fields
  'storyPointEstimate': { type: FieldType.STORY_POINTS, required: false, description: 'Story points or effort estimate' },
  'businessValue': { type: FieldType.NUMBER, required: false, description: 'Business value score' },
  'strategicAlignment': { type: FieldType.NUMBER, required: false, description: 'Strategic alignment score' },
  'confidence': { type: FieldType.NUMBER, required: false, description: 'AI confidence score' },
  
  // Hierarchy fields
  'parentKey': { type: FieldType.EPIC_LINK, required: false, description: 'Parent epic or issue key' },
  'epicKey': { type: FieldType.EPIC_LINK, required: false, description: 'Epic link' },
  'sprint': { type: FieldType.SPRINT, required: false, description: 'Sprint assignment' },
  
  // Time fields
  'createdDate': { type: FieldType.DATE, required: true, description: 'Creation date' },
  'updatedDate': { type: FieldType.DATE, required: true, description: 'Last updated date' },
  'dueDate': { type: FieldType.DATE, required: false, description: 'Due date' },
  'startDate': { type: FieldType.DATE, required: false, description: 'Start date' },
  
  // Additional metadata
  'labels': { type: FieldType.LABELS, required: false, description: 'Labels or tags' },
  'components': { type: FieldType.COMPONENTS, required: false, description: 'Components affected' },
  'fixVersion': { type: FieldType.SELECT, required: false, description: 'Target release version' },
  'environment': { type: FieldType.SELECT, required: false, description: 'Environment (dev, staging, prod)' }
} as const;

/**
 * Core Field Analysis Engine
 * Analyzes external fields and generates intelligent mapping recommendations
 */
export class FieldAnalysisEngine {
  private semanticCache = new Map<string, number>();
  private historicalMappings = new Map<string, { confidence: number; success: number }>();

  /**
   * Analyze field structure and generate mapping recommendations
   */
  async analyzeFieldStructure(
    provider: IntegrationProvider,
    sourceFields: SourceField[],
    integrationId: string
  ): Promise<FieldAnalysisResult> {
    const startTime = Date.now();
    
    console.log(`🔍 Starting field analysis for ${provider} (${sourceFields.length} fields)`);

    // Generate mapping recommendations
    const recommendedMappings: MappingRecommendation[] = [];
    
    for (const sourceField of sourceFields) {
      const recommendation = await this.generateFieldMapping(sourceField, provider);
      if (recommendation) {
        recommendedMappings.push(recommendation);
      }
    }

    // Calculate confidence metrics
    const confidenceMetrics = this.calculateConfidenceMetrics(recommendedMappings);
    
    // Analyze population rates
    const populationRates = this.analyzePopulationRates(sourceFields);
    
    // Build hierarchical structure
    const hierarchicalStructure = this.buildFieldHierarchy(sourceFields, recommendedMappings);

    const processingTime = Date.now() - startTime;
    
    console.log(`✅ Field analysis complete: ${recommendedMappings.length} mappings generated in ${processingTime}ms`);

    return {
      integrationId,
      provider,
      discoveredFields: sourceFields,
      recommendedMappings,
      confidenceMetrics,
      populationRates,
      hierarchicalStructure,
      analysisTimestamp: new Date(),
      processingTime,
      warnings: this.generateWarnings(sourceFields, recommendedMappings),
      errors: []
    };
  }

  /**
   * Generate intelligent field mapping recommendation for a single field
   */
  private async generateFieldMapping(
    sourceField: SourceField,
    provider: IntegrationProvider
  ): Promise<MappingRecommendation | null> {
    
    // Find best target field matches
    const targetMatches = this.findTargetFieldMatches(sourceField);
    
    if (targetMatches.length === 0) {
      return null; // No suitable matches found
    }

    const bestMatch = targetMatches[0];
    const confidence = this.calculateMappingConfidence(sourceField, bestMatch.targetField, provider);
    
    // Generate examples of the mapping
    const examples = this.generateMappingExamples(sourceField, bestMatch.targetField);
    
    // Find alternative mappings
    const alternatives = targetMatches.slice(1, 4).map(match => ({
      targetField: match.targetField,
      confidence: match.confidence,
      reasoning: match.reasoning
    } as AlternativeMapping));

    return {
      id: `${sourceField.id}_to_${bestMatch.targetField}`,
      sourceField,
      targetField: bestMatch.targetField,
      confidence,
      reasoning: bestMatch.reasoning,
      alternatives,
      warnings: this.generateFieldWarnings(sourceField, confidence),
      examples,
      createdAt: new Date()
    };
  }

  /**
   * Find potential target field matches for a source field
   */
  private findTargetFieldMatches(sourceField: SourceField): Array<{
    targetField: string;
    confidence: number;
    reasoning: string;
  }> {
    const matches: Array<{ targetField: string; confidence: number; reasoning: string }> = [];
    
    for (const [targetField, targetSchema] of Object.entries(PM33_TARGET_FIELDS)) {
      const matchScore = this.calculateFieldMatchScore(sourceField, targetField, targetSchema);
      
      if (matchScore.overall > 0.3) { // Only consider matches above 30%
        matches.push({
          targetField,
          confidence: matchScore.overall,
          reasoning: matchScore.reasoning
        });
      }
    }

    return matches.sort((a, b) => b.confidence - a.confidence);
  }

  /**
   * Calculate semantic and structural match score between source and target fields
   */
  private calculateFieldMatchScore(
    sourceField: SourceField,
    targetField: string,
    targetSchema: any
  ): { overall: number; reasoning: string } {
    
    // 1. Name-based semantic matching
    const nameScore = this.calculateSemanticSimilarity(sourceField.name, targetField);
    const displayNameScore = sourceField.displayName 
      ? this.calculateSemanticSimilarity(sourceField.displayName, targetField)
      : 0;
    const bestNameScore = Math.max(nameScore, displayNameScore);

    // 2. Type compatibility
    const typeScore = this.calculateTypeCompatibility(sourceField.type, targetSchema.type);

    // 3. Context matching (based on field patterns)
    const contextScore = this.calculateContextMatch(sourceField, targetField);

    // 4. Data quality factor
    const qualityScore = Math.min(sourceField.populationRate * 1.2, 1.0); // Boost well-populated fields

    // Weighted average
    const overall = (bestNameScore * 0.4) + (typeScore * 0.3) + (contextScore * 0.2) + (qualityScore * 0.1);
    
    let reasoning = `Name match: ${Math.round(bestNameScore * 100)}%, Type match: ${Math.round(typeScore * 100)}%`;
    if (contextScore > 0.5) reasoning += `, Strong context match`;
    if (sourceField.populationRate > 0.8) reasoning += `, Well populated (${Math.round(sourceField.populationRate * 100)}%)`;
    if (sourceField.populationRate < 0.3) reasoning += `, Low population (${Math.round(sourceField.populationRate * 100)}%)`;

    return { overall, reasoning };
  }

  /**
   * Calculate semantic similarity between two field names
   */
  private calculateSemanticSimilarity(sourceName: string, targetName: string): number {
    const cacheKey = `${sourceName}_${targetName}`;
    if (this.semanticCache.has(cacheKey)) {
      return this.semanticCache.get(cacheKey)!;
    }

    let similarity = 0;
    
    // Normalize names for comparison
    const normalizedSource = this.normalizeFieldName(sourceName);
    const normalizedTarget = this.normalizeFieldName(targetName);

    // Exact match
    if (normalizedSource === normalizedTarget) {
      similarity = 1.0;
    }
    // Contains match
    else if (normalizedSource.includes(normalizedTarget) || normalizedTarget.includes(normalizedSource)) {
      similarity = 0.8;
    }
    // Semantic equivalents
    else {
      similarity = this.calculateSemanticEquivalence(normalizedSource, normalizedTarget);
    }

    this.semanticCache.set(cacheKey, similarity);
    return similarity;
  }

  /**
   * Normalize field names for comparison
   */
  private normalizeFieldName(name: string): string {
    return name.toLowerCase()
      .replace(/[_\-\s]+/g, '')  // Remove separators
      .replace(/customfield\d+/g, '') // Remove Jira custom field prefixes
      .replace(/field/g, '')     // Remove generic "field" suffix
      .trim();
  }

  /**
   * Calculate semantic equivalence using known mapping patterns
   */
  private calculateSemanticEquivalence(source: string, target: string): number {
    
    // Story points equivalents
    if (target === 'storypointestimate') {
      if (['storypoints', 'points', 'estimate', 'sp', 'effort', 'size'].some(term => source.includes(term))) {
        return 0.9;
      }
    }

    // Epic link equivalents  
    if (target === 'epickey' || target === 'parentkey') {
      if (['epic', 'parent', 'link', 'belongs'].some(term => source.includes(term))) {
        return 0.85;
      }
    }

    // Priority equivalents
    if (target === 'priority') {
      if (['priority', 'importance', 'urgency', 'severity'].some(term => source.includes(term))) {
        return 0.9;
      }
    }

    // Status equivalents
    if (target === 'status') {
      if (['status', 'state', 'progress', 'phase'].some(term => source.includes(term))) {
        return 0.85;
      }
    }

    // User field equivalents
    if (['assignee', 'reporter'].includes(target)) {
      if (['user', 'person', 'assignee', 'assigned', 'reporter', 'creator', 'owner'].some(term => source.includes(term))) {
        return 0.8;
      }
    }

    // Date field equivalents
    if (['createddate', 'updateddate', 'duedate', 'startdate'].includes(target)) {
      if (['date', 'time', 'created', 'updated', 'due', 'start', 'end'].some(term => source.includes(term))) {
        return 0.7;
      }
    }

    return 0;
  }

  /**
   * Calculate type compatibility between source and target field types
   */
  private calculateTypeCompatibility(sourceType: FieldType, targetType: FieldType): number {
    if (sourceType === targetType) return 1.0;

    // Compatible type pairs
    const compatibilityMap: Record<string, number> = {
      [`${FieldType.TEXT}_${FieldType.SELECT}`]: 0.7,
      [`${FieldType.SELECT}_${FieldType.TEXT}`]: 0.7,
      [`${FieldType.NUMBER}_${FieldType.STORY_POINTS}`]: 0.9,
      [`${FieldType.STORY_POINTS}_${FieldType.NUMBER}`]: 0.9,
      [`${FieldType.USER}_${FieldType.TEXT}`]: 0.6,
      [`${FieldType.DATE}_${FieldType.TEXT}`]: 0.5,
      [`${FieldType.MULTI_SELECT}_${FieldType.LABELS}`]: 0.8,
      [`${FieldType.LABELS}_${FieldType.MULTI_SELECT}`]: 0.8,
    };

    const key = `${sourceType}_${targetType}`;
    return compatibilityMap[key] || 0.2; // Low compatibility for unknown pairs
  }

  /**
   * Calculate context-based matching
   */
  private calculateContextMatch(sourceField: SourceField, targetField: string): number {
    let contextScore = 0;

    // Business logic context matching
    if (targetField === 'storyPointEstimate' && sourceField.type === FieldType.NUMBER) {
      // Check if values look like story points (fibonacci-ish)
      const fibonacciLike = sourceField.samples.every(val => 
        val === null || [1, 2, 3, 5, 8, 13, 21].includes(val)
      );
      if (fibonacciLike) contextScore += 0.3;
    }

    if (targetField === 'priority' && sourceField.type === FieldType.SELECT) {
      // Check if values look like priorities
      const priorityLike = sourceField.samples.some(val => 
        val && ['high', 'medium', 'low', 'critical', 'major', 'minor'].includes(val.toString().toLowerCase())
      );
      if (priorityLike) contextScore += 0.3;
    }

    return Math.min(contextScore, 1.0);
  }

  /**
   * Calculate comprehensive mapping confidence
   */
  private calculateMappingConfidence(
    sourceField: SourceField,
    targetField: string,
    provider: IntegrationProvider
  ): MappingConfidence {
    
    const targetSchema = PM33_TARGET_FIELDS[targetField as keyof typeof PM33_TARGET_FIELDS];
    const matchScore = this.calculateFieldMatchScore(sourceField, targetField, targetSchema);
    
    const factors = {
      nameMatch: this.calculateSemanticSimilarity(sourceField.name, targetField),
      typeMatch: this.calculateTypeCompatibility(sourceField.type, targetSchema.type),
      populationRate: sourceField.populationRate,
      contextMatch: this.calculateContextMatch(sourceField, targetField),
      historicalSuccess: this.getHistoricalSuccess(sourceField, targetField, provider)
    };

    const overall = matchScore.overall;

    // Determine recommendation type based on confidence
    let recommendation: MappingRecommendationType;
    let threshold: ConfidenceThreshold;

    if (overall >= ConfidenceThreshold.AUTO_MAP) {
      recommendation = MappingRecommendationType.AUTO_MAP;
      threshold = ConfidenceThreshold.AUTO_MAP;
    } else if (overall >= ConfidenceThreshold.HIGH_CONFIDENCE) {
      recommendation = MappingRecommendationType.SUGGEST;
      threshold = ConfidenceThreshold.HIGH_CONFIDENCE;
    } else if (overall >= ConfidenceThreshold.MEDIUM_CONFIDENCE) {
      recommendation = MappingRecommendationType.MANUAL_REVIEW;
      threshold = ConfidenceThreshold.MEDIUM_CONFIDENCE;
    } else if (overall >= ConfidenceThreshold.LOW_CONFIDENCE) {
      recommendation = MappingRecommendationType.LOW_CONFIDENCE;
      threshold = ConfidenceThreshold.LOW_CONFIDENCE;
    } else {
      recommendation = MappingRecommendationType.NO_MATCH;
      threshold = ConfidenceThreshold.LOW_CONFIDENCE;
    }

    return {
      overall,
      factors,
      recommendation,
      threshold
    };
  }

  /**
   * Get historical success rate for similar mappings
   */
  private getHistoricalSuccess(
    sourceField: SourceField,
    targetField: string,
    provider: IntegrationProvider
  ): number {
    const key = `${provider}_${sourceField.name}_${targetField}`;
    const historical = this.historicalMappings.get(key);
    return historical ? historical.success : 0.5; // Default to neutral
  }

  /**
   * Generate mapping examples showing value transformations
   */
  private generateMappingExamples(sourceField: SourceField, targetField: string): MappingExample[] {
    const examples: MappingExample[] = [];
    
    // Take first few samples to create examples
    const samples = sourceField.samples.slice(0, 3).filter(sample => sample !== null);
    
    for (const sample of samples) {
      examples.push({
        sourceValue: sample,
        targetValue: this.transformValue(sample, sourceField.type, targetField),
        transformation: this.getTransformationDescription(sourceField.type, targetField)
      });
    }

    return examples;
  }

  /**
   * Transform a value from source format to target format
   */
  private transformValue(value: any, sourceType: FieldType, targetField: string): any {
    if (value === null || value === undefined) return null;

    // Story points transformation
    if (targetField === 'storyPointEstimate' && typeof value === 'number') {
      return value; // Direct mapping for numbers
    }

    // User field transformation
    if (['assignee', 'reporter'].includes(targetField)) {
      if (typeof value === 'object' && value.displayName) {
        return value.displayName; // Extract display name from user object
      }
      return value.toString();
    }

    // Default: return as-is
    return value;
  }

  /**
   * Get transformation description
   */
  private getTransformationDescription(sourceType: FieldType, targetField: string): string | undefined {
    if (targetField === 'storyPointEstimate' && sourceType === FieldType.NUMBER) {
      return 'Direct numeric mapping';
    }
    
    if (['assignee', 'reporter'].includes(targetField) && sourceType === FieldType.USER) {
      return 'Extract user display name';
    }

    return undefined;
  }

  /**
   * Calculate overall confidence metrics for the analysis
   */
  private calculateConfidenceMetrics(mappings: MappingRecommendation[]): ConfidenceAnalysis {
    const totalFields = mappings.length;
    
    const autoMappable = mappings.filter(m => m.confidence.recommendation === MappingRecommendationType.AUTO_MAP).length;
    const highConfidence = mappings.filter(m => m.confidence.recommendation === MappingRecommendationType.SUGGEST).length;
    const mediumConfidence = mappings.filter(m => m.confidence.recommendation === MappingRecommendationType.MANUAL_REVIEW).length;
    const lowConfidence = mappings.filter(m => m.confidence.recommendation === MappingRecommendationType.LOW_CONFIDENCE).length;
    const noMatch = mappings.filter(m => m.confidence.recommendation === MappingRecommendationType.NO_MATCH).length;
    
    const averageConfidence = totalFields > 0 
      ? mappings.reduce((sum, m) => sum + m.confidence.overall, 0) / totalFields
      : 0;

    // Distribution by field type
    const distributionByType: Record<FieldType, number> = {} as Record<FieldType, number>;
    for (const mapping of mappings) {
      const type = mapping.sourceField.type;
      distributionByType[type] = (distributionByType[type] || 0) + 1;
    }

    return {
      totalFields,
      autoMappable,
      highConfidence,
      mediumConfidence,
      lowConfidence,
      noMatch,
      averageConfidence,
      distributionByType
    };
  }

  /**
   * Analyze field population rates and data quality
   */
  private analyzePopulationRates(sourceFields: SourceField[]): PopulationRate[] {
    return sourceFields.map(field => {
      let quality: DataQuality;
      
      if (field.populationRate > 0.9) quality = DataQuality.EXCELLENT;
      else if (field.populationRate > 0.7) quality = DataQuality.GOOD;
      else if (field.populationRate > 0.4) quality = DataQuality.FAIR;
      else if (field.populationRate > 0.1) quality = DataQuality.POOR;
      else quality = DataQuality.UNUSABLE;

      return {
        fieldId: field.id,
        fieldName: field.name,
        populationRate: field.populationRate,
        totalItems: field.samples.length,
        populatedItems: Math.round(field.samples.length * field.populationRate),
        quality
      };
    });
  }

  /**
   * Build hierarchical field structure
   */
  private buildFieldHierarchy(
    sourceFields: SourceField[],
    mappings: MappingRecommendation[]
  ): FieldHierarchy {
    
    // For now, return a basic structure
    // This can be enhanced to detect actual field relationships
    return {
      children: mappings.map(m => m.targetField),
      level: 1,
      relationships: []
    };
  }

  /**
   * Generate warnings for the overall analysis
   */
  private generateWarnings(sourceFields: SourceField[], mappings: MappingRecommendation[]): string[] {
    const warnings: string[] = [];

    // Check for low mapping coverage
    const mappingCoverage = mappings.length / sourceFields.length;
    if (mappingCoverage < 0.5) {
      warnings.push(`Low mapping coverage: Only ${Math.round(mappingCoverage * 100)}% of fields could be mapped`);
    }

    // Check for poor data quality fields
    const poorQualityFields = sourceFields.filter(f => f.populationRate < 0.3);
    if (poorQualityFields.length > 0) {
      warnings.push(`${poorQualityFields.length} fields have poor data quality (<30% populated)`);
    }

    // Check for missing critical fields
    const criticalFields = ['title', 'type', 'status'];
    const mappedTargets = new Set(mappings.map(m => m.targetField));
    const missingCritical = criticalFields.filter(field => !mappedTargets.has(field));
    
    if (missingCritical.length > 0) {
      warnings.push(`Missing critical field mappings: ${missingCritical.join(', ')}`);
    }

    return warnings;
  }

  /**
   * Generate field-specific warnings
   */
  private generateFieldWarnings(sourceField: SourceField, confidence: MappingConfidence): string[] {
    const warnings: string[] = [];

    if (sourceField.populationRate < 0.3) {
      warnings.push(`Low population rate (${Math.round(sourceField.populationRate * 100)}%) - verify field usage`);
    }

    if (confidence.overall < 0.7 && sourceField.required) {
      warnings.push('Required field with low mapping confidence - may need manual review');
    }

    if (sourceField.customField && confidence.factors.nameMatch < 0.5) {
      warnings.push('Custom field with unclear naming - verify field purpose');
    }

    return warnings;
  }
}

// Export singleton instance
export const fieldAnalysisEngine = new FieldAnalysisEngine();