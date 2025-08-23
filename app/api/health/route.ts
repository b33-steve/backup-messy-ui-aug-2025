/**
 * File: /app/frontend/app/api/health/route.ts
 * Purpose: Health check API route to verify backend connectivity
 * Why: Ensure Python backend is running and responsive before frontend tries to use it
 * Relevant Files: pm33_multi_engine_demo.py
 */

import { NextResponse } from 'next/server';

const PYTHON_BACKEND_URL = process.env.PYTHON_BACKEND_URL || 'http://127.0.0.1:8000';

export async function GET() {
  console.log('🏥 Health check API called');
  
  try {
    // Check Python backend health
    const backendResponse = await fetch(`${PYTHON_BACKEND_URL}/health`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      // Short timeout for health checks
      signal: AbortSignal.timeout(5000)
    });

    if (backendResponse.ok) {
      const backendHealth = await backendResponse.json();
      
      return NextResponse.json({
        status: 'healthy',
        frontend: {
          status: 'operational',
          timestamp: new Date().toISOString(),
          version: 'Next.js 15.4.6'
        },
        backend: {
          status: 'operational',
          url: PYTHON_BACKEND_URL,
          ...backendHealth
        },
        connection: 'established'
      });
    } else {
      return NextResponse.json({
        status: 'degraded',
        frontend: {
          status: 'operational',
          timestamp: new Date().toISOString()
        },
        backend: {
          status: 'unreachable',
          url: PYTHON_BACKEND_URL,
          error: `HTTP ${backendResponse.status}`
        },
        connection: 'failed'
      }, { status: 503 });
    }

  } catch (error) {
    console.error('❌ Backend health check failed:', error);
    
    return NextResponse.json({
      status: 'unhealthy',
      frontend: {
        status: 'operational',
        timestamp: new Date().toISOString()
      },
      backend: {
        status: 'offline',
        url: PYTHON_BACKEND_URL,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      connection: 'failed',
      advice: 'Start the Python backend with: python pm33_multi_engine_demo.py'
    }, { status: 503 });
  }
}