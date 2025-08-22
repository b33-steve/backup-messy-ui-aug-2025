# app/backend/models/strategic_models.py
# Core data models for PM33 Strategic Intelligence workflow
# WHY: Provides structured foundation for strategic analysis pipeline with deep company context integration
# RELEVANT FILES: strategic_intelligence_service.py, FrameworkSelector.tsx, AnalysisResults.tsx

from typing import Dict, List, Optional, Union, Any, Literal
from datetime import datetime
from pydantic import BaseModel, Field, validator
from enum import Enum
import uuid

class StrategicFramework(str, Enum):
    """Strategic analysis frameworks supported by PM33"""
    ICE = "ice"  # Impact, Confidence, Ease
    RICE = "rice"  # Reach, Impact, Confidence, Effort  
    PORTER = "porter_five_forces"  # Porter's Five Forces
    BLUE_OCEAN = "blue_ocean"  # Blue Ocean Strategy
    SWOT = "swot"  # Strengths, Weaknesses, Opportunities, Threats
    OKR_ALIGNMENT = "okr_alignment"  # Objectives and Key Results alignment

class PMTool(str, Enum):
    """PM tools supported for work item generation"""
    JIRA = "jira"
    LINEAR = "linear"  
    MONDAY = "monday"
    ASANA = "asana"
    NOTION = "notion"

class ConfidenceLevel(str, Enum):
    """AI confidence levels for strategic recommendations"""
    VERY_HIGH = "very_high"  # 90-100% - High conviction recommendations
    HIGH = "high"           # 75-89% - Strong recommendations with minor unknowns
    MEDIUM = "medium"       # 60-74% - Good recommendations with some uncertainty
    LOW = "low"            # 40-59% - Exploratory recommendations, need validation
    VERY_LOW = "very_low"   # <40% - High uncertainty, require human judgment

class CompanyContext(BaseModel):
    """Company-specific context for strategic intelligence"""
    company_id: str = Field(..., description="Unique company identifier")
    company_name: str = Field(..., description="Company name")
    industry: str = Field(..., description="Primary industry sector")
    company_size: str = Field(..., description="Employee count range")
    stage: str = Field(..., description="Company stage (startup, scale-up, enterprise)")
    
    # Strategic context
    mission: Optional[str] = Field(None, description="Company mission statement")
    vision: Optional[str] = Field(None, description="Company vision")
    core_values: List[str] = Field(default_factory=list, description="Company core values")
    strategic_objectives: List[str] = Field(default_factory=list, description="Current strategic objectives")
    
    # Market context
    target_market: Optional[str] = Field(None, description="Primary target market")
    competitive_landscape: List[str] = Field(default_factory=list, description="Key competitors")
    market_position: Optional[str] = Field(None, description="Market position description")
    
    # Resource context
    engineering_team_size: Optional[int] = Field(None, description="Number of engineers")
    product_team_size: Optional[int] = Field(None, description="Number of product managers")
    monthly_burn_rate: Optional[float] = Field(None, description="Monthly burn rate in USD")
    runway_months: Optional[int] = Field(None, description="Financial runway in months")
    
    # Technology context
    tech_stack: List[str] = Field(default_factory=list, description="Primary technology stack")
    product_type: Optional[str] = Field(None, description="B2B/B2C/B2B2C product type")
    deployment_model: Optional[str] = Field(None, description="SaaS/On-premise/Hybrid")
    
    # Historical context (for learning)
    past_strategic_decisions: List[Dict[str, Any]] = Field(default_factory=list, description="Previous strategic decisions and outcomes")
    performance_metrics: Dict[str, float] = Field(default_factory=dict, description="Key performance metrics")
    
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class StrategicQuestion(BaseModel):
    """Strategic question with rich context for AI analysis"""
    question_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str = Field(..., description="User who asked the question")
    company_context: CompanyContext = Field(..., description="Company context")
    
    # Question content
    question_text: str = Field(..., min_length=10, description="Strategic question text")
    question_category: str = Field(..., description="Question category (prioritization, resource_allocation, competitive_response, etc.)")
    urgency: Literal["low", "medium", "high", "critical"] = Field(default="medium", description="Question urgency")
    
    # Context enrichment
    relevant_data: Dict[str, Any] = Field(default_factory=dict, description="Relevant data points (metrics, reports, etc.)")
    stakeholders: List[str] = Field(default_factory=list, description="Stakeholders affected by this decision")
    constraints: List[str] = Field(default_factory=list, description="Known constraints or limitations")
    success_criteria: List[str] = Field(default_factory=list, description="How success will be measured")
    
    # AI suggestions (populated by service)
    suggested_frameworks: List[StrategicFramework] = Field(default_factory=list, description="AI-suggested frameworks")
    suggested_context: List[str] = Field(default_factory=list, description="AI-suggested additional context to gather")
    
    created_at: datetime = Field(default_factory=datetime.utcnow)

    @validator('question_text')
    def validate_question_quality(cls, v):
        """Validate question has strategic depth"""
        strategic_keywords = ['should', 'prioritize', 'invest', 'resource', 'market', 'competitive', 'strategic', 'impact']
        if not any(keyword in v.lower() for keyword in strategic_keywords):
            raise ValueError("Question should contain strategic keywords for better AI analysis")
        return v

class FrameworkAnalysis(BaseModel):
    """Analysis results for a specific framework"""
    framework: StrategicFramework = Field(..., description="Framework used for analysis")
    
    # Framework-specific analysis
    analysis_data: Dict[str, Any] = Field(..., description="Framework-specific analysis results")
    
    # Universal analysis components
    key_insights: List[str] = Field(..., description="Key insights from this framework")
    recommendations: List[str] = Field(..., description="Specific recommendations")
    risks: List[str] = Field(default_factory=list, description="Identified risks")
    opportunities: List[str] = Field(default_factory=list, description="Identified opportunities")
    
    # Confidence and reasoning
    confidence_score: float = Field(..., ge=0.0, le=1.0, description="AI confidence in this analysis")
    confidence_level: ConfidenceLevel = Field(..., description="Categorical confidence level")
    reasoning_chain: List[str] = Field(..., description="Step-by-step reasoning process")
    
    # Quantitative scoring (framework-specific)
    framework_score: Optional[float] = Field(None, description="Numerical score from framework")
    score_components: Dict[str, float] = Field(default_factory=dict, description="Score breakdown by component")
    
    # Supporting evidence
    data_sources: List[str] = Field(default_factory=list, description="Data sources used in analysis")
    assumptions: List[str] = Field(default_factory=list, description="Key assumptions made")
    
    created_at: datetime = Field(default_factory=datetime.utcnow)

class StrategicAnalysisResult(BaseModel):
    """Complete strategic analysis result with multi-framework insights"""
    analysis_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    question: StrategicQuestion = Field(..., description="Original strategic question")
    
    # Multi-framework analysis
    framework_analyses: List[FrameworkAnalysis] = Field(..., description="Analysis from each framework")
    primary_framework: StrategicFramework = Field(..., description="Primary framework for final recommendation")
    
    # Synthesized results
    executive_summary: str = Field(..., description="Executive summary of analysis")
    final_recommendation: str = Field(..., description="Final strategic recommendation")
    action_plan: List[str] = Field(..., description="Specific action steps")
    
    # Impact assessment
    expected_impact: str = Field(..., description="Expected business impact")
    success_probability: float = Field(..., ge=0.0, le=1.0, description="Probability of success")
    impact_timeline: str = Field(..., description="Expected timeline for impact")
    resource_requirements: Dict[str, Any] = Field(default_factory=dict, description="Required resources")
    
    # Overall confidence
    overall_confidence: ConfidenceLevel = Field(..., description="Overall confidence in recommendation")
    confidence_factors: Dict[str, str] = Field(..., description="Factors affecting confidence")
    
    # Strategic context
    strategic_alignment: float = Field(..., ge=0.0, le=1.0, description="Alignment with company strategy")
    competitive_advantage: str = Field(..., description="How this creates competitive advantage")
    market_opportunity: str = Field(..., description="Market opportunity assessment")
    
    # Implementation guidance
    quick_wins: List[str] = Field(default_factory=list, description="Immediate quick wins")
    long_term_initiatives: List[str] = Field(default_factory=list, description="Long-term initiatives")
    success_metrics: List[str] = Field(..., description="Metrics to track success")
    review_checkpoints: List[str] = Field(..., description="When to review progress")
    
    # PM tool integration ready
    work_items_generated: bool = Field(default=False, description="Whether work items were generated")
    pm_tool_integration: Optional[Dict[str, Any]] = Field(None, description="PM tool integration details")
    
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    def get_confidence_score(self) -> float:
        """Get numerical confidence score from categorical level"""
        confidence_mapping = {
            ConfidenceLevel.VERY_HIGH: 0.95,
            ConfidenceLevel.HIGH: 0.82,
            ConfidenceLevel.MEDIUM: 0.67,
            ConfidenceLevel.LOW: 0.50,
            ConfidenceLevel.VERY_LOW: 0.30
        }
        return confidence_mapping.get(self.overall_confidence, 0.50)

class WorkItemTemplate(BaseModel):
    """Template for generating PM tool work items"""
    item_type: str = Field(..., description="Type of work item (epic, story, task, bug)")
    title_template: str = Field(..., description="Template for work item title")
    description_template: str = Field(..., description="Template for work item description")
    
    # Strategic context preservation
    strategic_context: str = Field(..., description="Strategic context to include")
    success_criteria: List[str] = Field(..., description="Success criteria for this work item")
    
    # PM tool specific fields
    priority: str = Field(..., description="Work item priority")
    estimated_effort: Optional[str] = Field(None, description="Estimated effort (story points, hours, etc.)")
    labels: List[str] = Field(default_factory=list, description="Labels/tags for work item")
    assignee_suggestions: List[str] = Field(default_factory=list, description="Suggested assignees")
    
    # Dependencies and relationships
    depends_on: List[str] = Field(default_factory=list, description="Dependencies on other work items")
    blocks: List[str] = Field(default_factory=list, description="Work items this blocks")
    
    # Timeline
    target_sprint: Optional[str] = Field(None, description="Target sprint for completion")
    estimated_completion: Optional[datetime] = Field(None, description="Estimated completion date")

class GeneratedWorkItem(BaseModel):
    """Generated work item ready for PM tool integration"""
    work_item_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    analysis_id: str = Field(..., description="Source strategic analysis ID")
    
    # PM tool details
    pm_tool: PMTool = Field(..., description="Target PM tool")
    external_id: Optional[str] = Field(None, description="ID in external PM tool after creation")
    
    # Work item content
    title: str = Field(..., description="Work item title")
    description: str = Field(..., description="Detailed description with strategic context")
    item_type: str = Field(..., description="Type (epic, story, task, etc.)")
    
    # Strategic linkage
    strategic_rationale: str = Field(..., description="Strategic reasoning for this work item")
    strategic_alignment_score: float = Field(..., ge=0.0, le=1.0, description="Alignment with strategic analysis")
    success_metrics: List[str] = Field(..., description="Success metrics for this work item")
    
    # PM tool fields
    priority: str = Field(..., description="Priority level")
    status: str = Field(default="backlog", description="Current status")
    estimated_effort: Optional[str] = Field(None, description="Effort estimation")
    labels: List[str] = Field(default_factory=list, description="Labels/tags")
    assignee: Optional[str] = Field(None, description="Assigned person")
    
    # Relationships
    parent_item: Optional[str] = Field(None, description="Parent work item ID")
    child_items: List[str] = Field(default_factory=list, description="Child work item IDs")
    dependencies: List[str] = Field(default_factory=list, description="Dependency work item IDs")
    
    # Timeline and tracking
    target_sprint: Optional[str] = Field(None, description="Target sprint")
    created_in_pm_tool: bool = Field(default=False, description="Whether created in PM tool")
    sync_status: str = Field(default="pending", description="Sync status with PM tool")
    last_synced: Optional[datetime] = Field(None, description="Last sync timestamp")
    
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ProgressTracking(BaseModel):
    """Progress tracking for strategic analysis implementation"""
    tracking_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    analysis_id: str = Field(..., description="Source strategic analysis ID")
    
    # Implementation status
    implementation_status: str = Field(default="not_started", description="Overall implementation status")
    completion_percentage: float = Field(default=0.0, ge=0.0, le=100.0, description="Completion percentage")
    
    # Work item progress
    total_work_items: int = Field(default=0, description="Total work items generated")
    completed_work_items: int = Field(default=0, description="Completed work items")
    in_progress_work_items: int = Field(default=0, description="Work items in progress")
    blocked_work_items: int = Field(default=0, description="Blocked work items")
    
    # Outcome measurement
    success_metrics_achieved: Dict[str, float] = Field(default_factory=dict, description="Achievement level for success metrics")
    business_impact_realized: Dict[str, Any] = Field(default_factory=dict, description="Realized business impact")
    
    # Timeline tracking
    started_at: Optional[datetime] = Field(None, description="Implementation start date")
    target_completion: Optional[datetime] = Field(None, description="Target completion date")
    actual_completion: Optional[datetime] = Field(None, description="Actual completion date")
    
    # Learning and feedback
    lessons_learned: List[str] = Field(default_factory=list, description="Lessons learned during implementation")
    feedback_from_stakeholders: List[Dict[str, str]] = Field(default_factory=list, description="Stakeholder feedback")
    
    # Strategic validation
    recommendation_accuracy: Optional[float] = Field(None, ge=0.0, le=1.0, description="How accurate was the recommendation")
    strategic_alignment_maintained: bool = Field(default=True, description="Whether strategic alignment was maintained")
    
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class FrameworkConfiguration(BaseModel):
    """Configuration for strategic frameworks"""
    framework: StrategicFramework = Field(..., description="Framework type")
    
    # Framework-specific parameters
    parameters: Dict[str, Any] = Field(default_factory=dict, description="Framework-specific parameters")
    
    # ICE Framework configuration
    ice_weights: Optional[Dict[str, float]] = Field(None, description="Weights for Impact, Confidence, Ease")
    
    # RICE Framework configuration  
    rice_weights: Optional[Dict[str, float]] = Field(None, description="Weights for Reach, Impact, Confidence, Effort")
    rice_scoring_scale: Optional[Dict[str, int]] = Field(None, description="Scoring scale (1-5, 1-10, etc.)")
    
    # Porter's Five Forces configuration
    porter_industry_context: Optional[Dict[str, str]] = Field(None, description="Industry-specific context")
    
    # Blue Ocean configuration
    blue_ocean_value_factors: Optional[List[str]] = Field(None, description="Value factors to analyze")
    
    # Company-specific customizations
    company_specific_factors: Dict[str, Any] = Field(default_factory=dict, description="Company-specific customizations")
    
    created_at: datetime = Field(default_factory=datetime.utcnow)

# Framework-specific analysis models

class ICEAnalysis(BaseModel):
    """ICE Framework specific analysis"""
    impact_score: float = Field(..., ge=0.0, le=10.0, description="Impact score (0-10)")
    confidence_score: float = Field(..., ge=0.0, le=10.0, description="Confidence score (0-10)")  
    ease_score: float = Field(..., ge=0.0, le=10.0, description="Ease score (0-10)")
    
    ice_score: float = Field(..., description="Calculated ICE score (Impact * Confidence * Ease)")
    
    impact_reasoning: str = Field(..., description="Reasoning for impact score")
    confidence_reasoning: str = Field(..., description="Reasoning for confidence score")
    ease_reasoning: str = Field(..., description="Reasoning for ease score")
    
    comparative_analysis: Optional[List[Dict[str, Any]]] = Field(None, description="Comparison with alternatives")

class RICEAnalysis(BaseModel):
    """RICE Framework specific analysis"""
    reach_score: float = Field(..., ge=0.0, description="Reach score (number of people affected)")
    impact_score: float = Field(..., ge=0.0, le=3.0, description="Impact score (0.25, 0.5, 1, 2, 3)")
    confidence_score: float = Field(..., ge=0.0, le=100.0, description="Confidence percentage (0-100)")
    effort_score: float = Field(..., ge=0.0, description="Effort score (person-months)")
    
    rice_score: float = Field(..., description="Calculated RICE score (Reach * Impact * Confidence / Effort)")
    
    reach_reasoning: str = Field(..., description="Reasoning for reach estimation")
    impact_reasoning: str = Field(..., description="Reasoning for impact score")
    confidence_reasoning: str = Field(..., description="Reasoning for confidence score")
    effort_reasoning: str = Field(..., description="Reasoning for effort estimation")
    
    sensitivity_analysis: Optional[Dict[str, float]] = Field(None, description="Sensitivity to parameter changes")

class PorterAnalysis(BaseModel):
    """Porter's Five Forces specific analysis"""
    competitive_rivalry: Dict[str, Any] = Field(..., description="Competitive rivalry analysis")
    supplier_power: Dict[str, Any] = Field(..., description="Bargaining power of suppliers")
    buyer_power: Dict[str, Any] = Field(..., description="Bargaining power of buyers")
    threat_substitutes: Dict[str, Any] = Field(..., description="Threat of substitute products")
    threat_new_entrants: Dict[str, Any] = Field(..., description="Threat of new entrants")
    
    overall_industry_attractiveness: str = Field(..., description="Overall industry attractiveness assessment")
    strategic_position: str = Field(..., description="Company's strategic position")
    competitive_advantages: List[str] = Field(..., description="Identified competitive advantages")
    strategic_gaps: List[str] = Field(..., description="Strategic gaps to address")

class BlueOceanAnalysis(BaseModel):
    """Blue Ocean Strategy specific analysis"""
    value_curve_analysis: Dict[str, float] = Field(..., description="Current value curve vs competitors")
    eliminate_factors: List[str] = Field(..., description="Factors to eliminate")
    reduce_factors: List[str] = Field(..., description="Factors to reduce")
    raise_factors: List[str] = Field(..., description="Factors to raise")
    create_factors: List[str] = Field(..., description="New factors to create")
    
    blue_ocean_opportunity: str = Field(..., description="Identified blue ocean opportunity")
    value_innovation_potential: float = Field(..., ge=0.0, le=10.0, description="Value innovation potential (0-10)")
    market_space_assessment: str = Field(..., description="Uncontested market space assessment")
    
    strategic_canvas: Dict[str, Any] = Field(..., description="Strategic canvas data for visualization")

# API Response Models

class StrategicQuestionSuggestion(BaseModel):
    """AI-generated question suggestions"""
    suggested_question: str = Field(..., description="Suggested question text")
    category: str = Field(..., description="Question category")
    reasoning: str = Field(..., description="Why this question is relevant")
    confidence: float = Field(..., ge=0.0, le=1.0, description="AI confidence in suggestion")
    relevant_frameworks: List[StrategicFramework] = Field(..., description="Recommended frameworks")

class FrameworkRecommendation(BaseModel):
    """Framework recommendation from AI"""
    framework: StrategicFramework = Field(..., description="Recommended framework")
    relevance_score: float = Field(..., ge=0.0, le=1.0, description="Relevance to the question")
    reasoning: str = Field(..., description="Why this framework is recommended")
    expected_insights: List[str] = Field(..., description="Expected insights from this framework")
    data_requirements: List[str] = Field(default_factory=list, description="Required data for analysis")

class AnalysisProgress(BaseModel):
    """Real-time analysis progress"""
    stage: str = Field(..., description="Current analysis stage")
    progress_percentage: float = Field(..., ge=0.0, le=100.0, description="Progress percentage")
    current_activity: str = Field(..., description="What AI is currently doing")
    estimated_completion: datetime = Field(..., description="Estimated completion time")
    intermediate_insights: List[str] = Field(default_factory=list, description="Insights discovered so far")