/**
 * File: /app/frontend/app/api/strategic/analyze/route.ts
 * Purpose: Next.js API route that connects frontend to Python backend for strategic analysis
 * Why: Bridge between professional Next.js UI and powerful Python AI backend
 * Relevant Files: pm33_multi_engine_demo.py, app/(app)/intelligence/page.tsx
 */

import { NextRequest, NextResponse } from 'next/server';

// Configuration for the Python backend (FastAPI on 8002)
const PYTHON_BACKEND_URL = process.env.PYTHON_BACKEND_URL || 'http://127.0.0.1:8002';
const API_TIMEOUT = 30000; // 30 seconds for AI processing

interface StrategicAnalysisRequest {
  message: string;
  analysisType?: 'strategic' | 'competitive' | 'market' | 'risk';
  context?: string;
}

interface StrategicAnalysisResponse {
  query: string;
  framework: string;
  analysis: {
    strategic_recommendation: string;
    framework_applied: string;
    confidence_score: number;
    ai_engine_used: string;
    strategic_insights: string[];
  };
  confidence_score: number;
  processing_time_ms: number;
  timestamp: string;
}

export async function POST(request: NextRequest) {
  console.log('🎯 Strategic Analysis API Route Called');
  
  try {
    // Parse the request body
    const body: StrategicAnalysisRequest = await request.json();
    
    // Validate required fields
    if (!body.message || body.message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Strategic question is required' },
        { status: 400 }
      );
    }

    console.log(`📥 Strategic Question: "${body.message}"`);
    console.log(`🔬 Analysis Type: ${body.analysisType || 'strategic'}`);
    
    // Prepare the request for FastAPI backend (using your tested format)
    const pythonRequest = {
      query: body.message.trim(),
      context: {
        company: "PM33",
        stage: "beta",
        team_size: "3",
        budget: "$15000",
        ...(body.context && typeof body.context === 'object' ? body.context : {})
      }
    };

    console.log(`🔄 Forwarding to FastAPI backend: ${PYTHON_BACKEND_URL}/api/ai-teams/strategic-intelligence`);
    
    // Call the Python backend with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);
    
    const pythonResponse = await fetch(`${PYTHON_BACKEND_URL}/api/ai-teams/strategic-intelligence`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(pythonRequest),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!pythonResponse.ok) {
      const errorText = await pythonResponse.text();
      console.error(`❌ Python backend error: ${pythonResponse.status} - ${errorText}`);
      
      return NextResponse.json(
        { 
          error: 'Strategic analysis service temporarily unavailable',
          details: `Backend responded with ${pythonResponse.status}`,
          fallback_advice: 'Please try again in a moment or contact support if the issue persists.'
        },
        { status: 502 }
      );
    }

    const analysisResult: StrategicAnalysisResponse = await pythonResponse.json();
    
    console.log(`✅ Strategic analysis completed`);
    console.log(`🤖 AI Engine: ${analysisResult.analysis.ai_engine_used}`);
    console.log(`⏱️ Response Time: ${analysisResult.processing_time_ms}ms`);
    console.log(`📊 Framework: ${analysisResult.analysis.framework_applied}`);

    // Transform response to match frontend expectations
    const enhancedResponse = {
      response: analysisResult.analysis.strategic_recommendation,
      workflow: {
        id: `workflow_${Date.now()}`,
        name: `Strategic Analysis: ${analysisResult.framework}`,
        strategic_objective: analysisResult.query,
        framework_used: analysisResult.analysis.framework_applied,
        context_factors: analysisResult.analysis.strategic_insights,
        tasks: [
          {
            id: 't001',
            title: 'Implement strategic recommendation',
            description: analysisResult.analysis.strategic_recommendation.substring(0, 100) + '...',
            assignee: 'Product Manager',
            priority: 'high' as const,
            due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            estimated_hours: 8,
            strategic_rationale: `Based on ${analysisResult.analysis.framework_applied} framework analysis`
          }
        ],
        success_metrics: ['Strategic recommendation implemented', 'Framework goals achieved'],
        risk_factors: ['Implementation complexity', 'Resource constraints']
      },
      meta: {
        engine: analysisResult.analysis.ai_engine_used,
        response_time: analysisResult.processing_time_ms / 1000,
        timestamp: analysisResult.timestamp,
        confidence_score: analysisResult.confidence_score,
        api_route: '/api/strategic/analyze'
      }
    };

    return NextResponse.json(enhancedResponse);

  } catch (error) {
    console.error('❌ Strategic Analysis API Error:', error);
    
    // Handle different error types
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return NextResponse.json(
          { 
            error: 'Strategic analysis request timed out',
            advice: 'Complex strategic questions may take longer. Please try a more specific question or try again.'
          },
          { status: 408 }
        );
      }
      
      if (error.message.includes('ECONNREFUSED') || error.message.includes('fetch')) {
        return NextResponse.json(
          { 
            error: 'Strategic analysis backend is currently offline',
            advice: 'The AI analysis service is starting up. Please wait a moment and try again.',
            technical: 'Python backend connection failed'
          },
          { status: 503 }
        );
      }
    }

    return NextResponse.json(
      { 
        error: 'Unexpected error during strategic analysis',
        advice: 'Please try again or contact support if the issue persists.'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Health check endpoint
  return NextResponse.json({
    status: 'Strategic Analysis API Ready',
    endpoint: '/api/strategic/analyze',
    methods: ['POST'],
    backend_url: PYTHON_BACKEND_URL,
    timestamp: new Date().toISOString()
  });
}