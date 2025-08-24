// Strategic Intelligence Types
export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  framework?: string | null
  confidence?: number
  tasks?: string[]
  metrics?: Record<string, string | number>
}

export interface CompanyContext {
  industry: string
  stage: string
  teamSize: string
  runway: string
  constraint: string
}

export interface Framework {
  id: string
  name: string
  description: string
}

export interface SuggestedQuestion {
  category: string
  icon: string
  questions: string[]
}

export interface AnalysisRequest {
  question: string
  context: CompanyContext | null
  framework: string | null
}

export interface AnalysisResponse {
  analysis: string
  framework: string
  confidence: number
  tasks: string[]
  metrics: Record<string, string | number>
}

export interface RecentAnalysis {
  title: string
  framework: string
  time: string
  confidence: number
}