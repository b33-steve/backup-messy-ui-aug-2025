/**
 * File: /app/frontend/app/api/strategic/analyze/route.ts
 * Purpose: Next.js API route that connects frontend to Python backend for strategic analysis
 * Why: Bridge between professional Next.js UI and powerful Python AI backend
 * Relevant Files: pm33_multi_engine_demo.py, app/(app)/intelligence/page.tsx
 */

import { NextRequest, NextResponse } from 'next/server';

// Configuration for the Python backend (Flask on 8002)
const PYTHON_BACKEND_URL = process.env.PYTHON_BACKEND_URL || 'http://127.0.0.1:8002';
const API_TIMEOUT = 30000; // 30 seconds for AI processing

interface StrategicAnalysisRequest {
  message: string;
  analysisType?: 'strategic' | 'competitive' | 'market' | 'risk';
  context?: string;
}

interface FlaskAnalysisResponse {
  response: string;
  workflow: {
    id: string;
    name: string;
    strategic_objective: string;
    framework_used: string;
    context_factors: string[];
    tasks: Array<{
      id: string;
      title: string;
      description: string;
      assignee: string;
      priority: string;
      due_date: string;
      estimated_hours: number;
      strategic_rationale: string;
    }>;
    success_metrics: string[];
    risk_factors: string[];
  };
  meta: {
    engine: string;
    model: string;
    response_time: number;
    timestamp: string;
    service: string;
    context_chars: number;
  };
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
    
    // Prepare the request for Flask backend (using correct format)
    const pythonRequest = {
      message: body.message.trim()
    };

    console.log(`🔄 Forwarding to Flask backend: ${PYTHON_BACKEND_URL}/api/ai-teams/strategic-intelligence`);
    
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
          error: 'Flask backend service temporarily unavailable',
          details: `Backend responded with ${pythonResponse.status}`,
          fallback_advice: 'Please try again in a moment or contact support if the issue persists.'
        },
        { status: 502 }
      );
    }

    const analysisResult: FlaskAnalysisResponse = await pythonResponse.json();
    
    console.log(`✅ Strategic analysis completed`);
    console.log(`🤖 AI Engine: ${analysisResult.meta.engine}`);
    console.log(`⏱️ Response Time: ${analysisResult.meta.response_time}s`);
    console.log(`📊 Framework: ${analysisResult.workflow.framework_used}`);

    // Flask response already in the correct format, just add api_route
    const enhancedResponse = {
      ...analysisResult,
      meta: {
        ...analysisResult.meta,
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
            error: 'Strategic analysis Flask backend is currently offline',
            advice: 'The AI analysis service is starting up. Please wait a moment and try again.',
            technical: 'Flask backend connection failed'
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