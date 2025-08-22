/**
 * File: app/frontend/lib/integrations/types.ts
 * Purpose: Core TypeScript types and interfaces for PM33 Intelligent Field Mapping System
 * Why: Defines the foundational data structures for AI-powered field discovery and mapping
 * Relevant Files: PM33_INTELLIGENT_FIELD_MAPPING_SYSTEM.md, field-analysis-engine.ts, jira-provider.ts
 */

// ===============================
// Core Field Analysis Types
// ===============================

export interface SourceField {
  id: string;
  name: string;
  displayName?: string;
  type: FieldType;
  description?: string;
  required: boolean;
  customField: boolean;
  schema?: FieldSchema;
  samples: any[];
  populationRate: number; // 0.0 - 1.0
  metadata: Record<string, any>;
}

export interface FieldSchema {
  dataType: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'date' | 'reference';
  format?: string;
  allowedValues?: any[];
  constraints?: FieldConstraints;
  nullable: boolean;
}

export interface FieldConstraints {
  minLength?: number;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
  pattern?: string;
  references?: string; // For reference fields
}

export enum FieldType {
  TEXT = 'text',
  NUMBER = 'number',
  DATE = 'date',
  SELECT = 'select',
  MULTI_SELECT = 'multi_select',
  USER = 'user',
  PRIORITY = 'priority',
  STATUS = 'status',
  EPIC_LINK = 'epic_link',
  SPRINT = 'sprint',
  STORY_POINTS = 'story_points',
  COMPONENTS = 'components',
  LABELS = 'labels',
  CUSTOM = 'custom',
  UNKNOWN = 'unknown'
}

// ===============================
// Field Mapping & Confidence 
// ===============================

export interface MappingRecommendation {
  id: string;
  sourceField: SourceField;
  targetField: string;
  confidence: MappingConfidence;
  reasoning: string;
  alternatives: AlternativeMapping[];
  warnings: string[];
  examples: MappingExample[];
  createdAt: Date;
}

export interface MappingConfidence {
  overall: number; // 0.0 - 1.0
  factors: {
    nameMatch: number;        // Exact/semantic name similarity
    typeMatch: number;        // Data type compatibility  
    populationRate: number;   // How well field is populated
    contextMatch: number;     // Business context similarity
    historicalSuccess: number; // Previous mapping success rate
  };
  recommendation: MappingRecommendationType;
  threshold: ConfidenceThreshold;
}

export enum MappingRecommendationType {
  AUTO_MAP = 'auto_map',           // 95-100% confidence
  SUGGEST = 'suggest',             // 85-94% confidence  
  MANUAL_REVIEW = 'manual_review', // 70-84% confidence
  LOW_CONFIDENCE = 'low_confidence', // 50-69% confidence
  NO_MATCH = 'no_match'            // <50% confidence
}

export enum ConfidenceThreshold {
  AUTO_MAP = 0.95,
  HIGH_CONFIDENCE = 0.85,
  MEDIUM_CONFIDENCE = 0.70,
  LOW_CONFIDENCE = 0.50
}

export interface AlternativeMapping {
  targetField: string;
  confidence: number;
  reasoning: string;
}

export interface MappingExample {
  sourceValue: any;
  targetValue: any;
  transformation?: string;
}

// ===============================
// Field Analysis Results
// ===============================

export interface FieldAnalysisResult {
  integrationId: string;
  provider: IntegrationProvider;
  discoveredFields: SourceField[];
  recommendedMappings: MappingRecommendation[];
  confidenceMetrics: ConfidenceAnalysis;
  populationRates: PopulationRate[];
  hierarchicalStructure: FieldHierarchy;
  analysisTimestamp: Date;
  processingTime: number; // milliseconds
  warnings: string[];
  errors: string[];
}

export interface ConfidenceAnalysis {
  totalFields: number;
  autoMappable: number;
  highConfidence: number;
  mediumConfidence: number;
  lowConfidence: number;
  noMatch: number;
  averageConfidence: number;
  distributionByType: Record<FieldType, number>;
}

export interface PopulationRate {
  fieldId: string;
  fieldName: string;
  populationRate: number;
  totalItems: number;
  populatedItems: number;
  quality: DataQuality;
}

export enum DataQuality {
  EXCELLENT = 'excellent',    // >90% populated
  GOOD = 'good',             // 70-90% populated  
  FAIR = 'fair',             // 40-70% populated
  POOR = 'poor',             // 10-40% populated
  UNUSABLE = 'unusable'      // <10% populated
}

export interface FieldHierarchy {
  parent?: string;
  children: string[];
  level: number;
  relationships: FieldRelationship[];
}

export interface FieldRelationship {
  type: 'parent_child' | 'reference' | 'dependency' | 'calculated';
  sourceField: string;
  targetField: string;
  strength: number; // 0.0 - 1.0
}

// ===============================
// Integration Provider Types
// ===============================

export enum IntegrationProvider {
  JIRA = 'jira',
  LINEAR = 'linear', 
  MONDAY = 'monday',
  ASANA = 'asana'
}

export interface IntegrationConfig {
  id: string;
  provider: IntegrationProvider;
  name: string;
  authentication: AuthenticationConfig;
  settings: IntegrationSettings;
  createdAt: Date;
  lastSync?: Date;
  status: IntegrationStatus;
}

export interface AuthenticationConfig {
  method: AuthenticationMethod;
  credentials: AuthCredentials;
  oauth?: OAuthConfig;
  apiKey?: APIKeyConfig;
  validated: boolean;
  expiresAt?: Date;
}

export enum AuthenticationMethod {
  OAUTH2 = 'oauth2',
  API_KEY = 'api_key',
  BASIC_AUTH = 'basic_auth'
}

export interface AuthCredentials {
  [key: string]: string;
}

export interface OAuthConfig {
  clientId: string;
  scopes: string[];
  redirectUri: string;
  state: string;
  codeChallenge?: string; // PKCE
  tokenEndpoint: string;
  refreshToken?: string;
  accessToken?: string;
}

export interface APIKeyConfig {
  keyType: 'personal_access_token' | 'service_account' | 'app_password';
  keyField: string; // 'token', 'password', etc.
  userField?: string; // for basic auth
  headers?: Record<string, string>;
}

export interface IntegrationSettings {
  baseUrl: string;
  projectKeys?: string[];
  workspaceId?: string;
  syncFrequency: SyncFrequency;
  fieldMappings: FieldMapping[];
  filters: SyncFilter[];
  mdmRules: MDMRule[];
}

export enum SyncFrequency {
  REAL_TIME = 'real_time',
  HOURLY = 'hourly',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MANUAL = 'manual'
}

export interface FieldMapping {
  id: string;
  sourceField: string;
  targetField: string;
  confidence: number;
  mappingType: MappingRecommendationType;
  transformation?: FieldTransformation;
  validated: boolean;
  createdAt: Date;
  lastUpdated: Date;
}

export interface FieldTransformation {
  type: TransformationType;
  parameters: Record<string, any>;
  validation?: ValidationRule;
}

export enum TransformationType {
  DIRECT = 'direct',
  LOOKUP = 'lookup', 
  CALCULATED = 'calculated',
  CONDITIONAL = 'conditional',
  SPLIT = 'split',
  COMBINE = 'combine',
  FORMAT = 'format'
}

export interface ValidationRule {
  required?: boolean;
  type?: string;
  format?: string;
  allowedValues?: any[];
  customValidator?: string;
}

export interface SyncFilter {
  field: string;
  operator: FilterOperator;
  value: any;
  enabled: boolean;
}

export enum FilterOperator {
  EQUALS = 'equals',
  NOT_EQUALS = 'not_equals',
  CONTAINS = 'contains',
  STARTS_WITH = 'starts_with',
  GREATER_THAN = 'greater_than',
  LESS_THAN = 'less_than',
  IN = 'in',
  NOT_IN = 'not_in',
  IS_NULL = 'is_null',
  IS_NOT_NULL = 'is_not_null'
}

// ===============================
// MDM (Master Data Management)
// ===============================

export interface MDMRule {
  id: string;
  name: string;
  field: string;
  rule: MDMRuleType;
  priority: number; // 1-10, higher wins conflicts
  conditions: MDMCondition[];
  actions: MDMAction[];
  enabled: boolean;
}

export enum MDMRuleType {
  PM33_SOURCE_OF_TRUTH = 'pm33_source_of_truth',
  EXTERNAL_SOURCE_OF_TRUTH = 'external_source_of_truth',
  LATEST_WINS = 'latest_wins',
  HIGHEST_CONFIDENCE = 'highest_confidence',
  MANUAL_REVIEW = 'manual_review'
}

export interface MDMCondition {
  field: string;
  operator: FilterOperator;
  value: any;
}

export interface MDMAction {
  type: MDMActionType;
  parameters: Record<string, any>;
}

export enum MDMActionType {
  UPDATE_FIELD = 'update_field',
  CREATE_CONFLICT_RECORD = 'create_conflict_record',
  NOTIFY_USER = 'notify_user',
  LOG_WARNING = 'log_warning',
  SKIP_SYNC = 'skip_sync'
}

// ===============================
// Sync Operations & Status
// ===============================

export enum IntegrationStatus {
  CONNECTING = 'connecting',
  DISCOVERING = 'discovering',
  MAPPING = 'mapping',
  READY = 'ready',
  SYNCING = 'syncing', 
  ERROR = 'error',
  PAUSED = 'paused'
}

export interface SyncOperation {
  id: string;
  integrationId: string;
  type: SyncOperationType;
  status: SyncStatus;
  progress: SyncProgress;
  startedAt: Date;
  completedAt?: Date;
  itemsTotal: number;
  itemsProcessed: number;
  itemsSucceeded: number;
  itemsFailed: number;
  errors: SyncError[];
  metadata: Record<string, any>;
}

export enum SyncOperationType {
  FULL_SYNC = 'full_sync',
  INCREMENTAL_SYNC = 'incremental_sync', 
  FIELD_DISCOVERY = 'field_discovery',
  MAPPING_VALIDATION = 'mapping_validation',
  CONFLICT_RESOLUTION = 'conflict_resolution'
}

export enum SyncStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  PAUSED = 'paused'
}

export interface SyncProgress {
  phase: SyncPhase;
  phaseProgress: number;      // 0.0 - 1.0 within current phase
  overallProgress: number;    // 0.0 - 1.0 total progress
  timeRemaining?: number;     // seconds
  throughput: number;         // items/second
  lastActivity: Date;
  currentItem?: string;
}

export enum SyncPhase {
  AUTHENTICATION = 'authentication',
  DISCOVERY = 'discovery',
  MAPPING = 'mapping',
  VALIDATION = 'validation',
  SYNC = 'sync',
  COMPLETE = 'complete'
}

export interface SyncError {
  id: string;
  type: SyncErrorType;
  message: string;
  details?: Record<string, any>;
  itemId?: string;
  field?: string;
  timestamp: Date;
  retryable: boolean;
  retryCount: number;
}

export enum SyncErrorType {
  AUTHENTICATION_FAILED = 'authentication_failed',
  RATE_LIMIT_EXCEEDED = 'rate_limit_exceeded',
  FIELD_MAPPING_ERROR = 'field_mapping_error',
  DATA_VALIDATION_ERROR = 'data_validation_error',
  API_ERROR = 'api_error',
  NETWORK_ERROR = 'network_error',
  UNKNOWN_ERROR = 'unknown_error'
}

// ===============================
// Rate Limiting & Tiering
// ===============================

export interface RateLimitConfig {
  tier: SubscriptionTier;
  limits: TierLimits;
  currentUsage: UsageMetrics;
  resetTime: Date;
}

export enum SubscriptionTier {
  FREE = 'free',
  PROFESSIONAL = 'professional', 
  ENTERPRISE = 'enterprise'
}

export interface TierLimits {
  itemsPerSync: number;
  syncsPerDay: number;
  apiCallsPerHour: number;
  concurrentSyncs: number;
  storageGB: number;
  retentionDays: number;
}

export interface UsageMetrics {
  itemsSyncedToday: number;
  syncsToday: number;
  apiCallsThisHour: number;
  currentConcurrentSyncs: number;
  storageUsedGB: number;
}

// ===============================
// Analytics & Insights
// ===============================

export interface IntegrationAnalytics {
  integrationId: string;
  timeRange: TimeRange;
  syncMetrics: SyncMetrics;
  fieldMetrics: FieldMetrics;
  errorMetrics: ErrorMetrics;
  performanceMetrics: PerformanceMetrics;
}

export interface TimeRange {
  start: Date;
  end: Date;
  granularity: 'hour' | 'day' | 'week' | 'month';
}

export interface SyncMetrics {
  totalSyncs: number;
  successfulSyncs: number;
  failedSyncs: number;
  averageSyncTime: number;
  totalItemsSynced: number;
  syncFrequency: number; // syncs per day
}

export interface FieldMetrics {
  totalFieldsMapped: number;
  highConfidenceMappings: number;
  manualMappings: number;
  mappingAccuracy: number;
  popularFields: PopularField[];
}

export interface PopularField {
  fieldName: string;
  usageCount: number;
  averageConfidence: number;
  successRate: number;
}

export interface ErrorMetrics {
  totalErrors: number;
  errorsByType: Record<SyncErrorType, number>;
  errorRate: number;
  avgRetryCount: number;
  topErrors: TopError[];
}

export interface TopError {
  message: string;
  count: number;
  lastOccurrence: Date;
}

export interface PerformanceMetrics {
  avgDiscoveryTime: number;
  avgMappingTime: number;
  avgSyncThroughput: number; // items/second
  apiResponseTime: number;
  uptime: number; // percentage
}