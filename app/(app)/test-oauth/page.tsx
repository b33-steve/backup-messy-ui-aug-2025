'use client';

import React from 'react';

export default function TestOAuthPage() {
  const handleConnectJira = () => {
    const setupMessage = `🔧 PM33 OAuth Setup Instructions for Jira

To connect your real Jira workspace:

1. Go to: https://developer.atlassian.com/console/myapps/
2. Click "Create" → "OAuth 2.0 (3LO)"
3. Add this redirect URI exactly:
   http://localhost:3000/api/integrations/oauth/callback/jira
4. Copy your Client ID and Client Secret
5. Update your .env.local file:
   NEXT_PUBLIC_ATLASSIAN_CLIENT_ID=your_real_client_id
   ATLASSIAN_CLIENT_SECRET=your_real_client_secret

📝 Currently in DEMO MODE
Click OK to simulate a successful connection for testing.

In production, this would redirect you to Atlassian's OAuth page.`;

    if (confirm(setupMessage)) {
      // Simulate successful connection
      alert(`✅ Demo Connection Successful!

Jira workspace "Demo Company" connected!
Integration Status: Active
Sync Status: Ready

In a real implementation:
• This would store OAuth tokens securely
• Background sync would start immediately  
• You'd see this in your Connected Integrations

Refresh the page to see the connected state!`);
      
      // Store demo connection in localStorage
      localStorage.setItem('pm33_demo_jira_connected', 'true');
      localStorage.setItem('pm33_demo_jira_workspace', 'Demo Company');
      localStorage.setItem('pm33_demo_jira_connected_at', new Date().toISOString());
      
      // Refresh page to show connected state
      window.location.reload();
    }
  };

  const handleDisconnectJira = () => {
    if (confirm('Disconnect from Jira workspace "Demo Company"?')) {
      localStorage.removeItem('pm33_demo_jira_connected');
      localStorage.removeItem('pm33_demo_jira_workspace');  
      localStorage.removeItem('pm33_demo_jira_connected_at');
      alert('✅ Jira disconnected successfully!');
      window.location.reload();
    }
  };

  // Check if already connected (demo mode)
  const isConnected = typeof window !== 'undefined' && localStorage.getItem('pm33_demo_jira_connected') === 'true';
  const workspaceName = typeof window !== 'undefined' ? localStorage.getItem('pm33_demo_jira_workspace') : null;
  const connectedAt = typeof window !== 'undefined' ? localStorage.getItem('pm33_demo_jira_connected_at') : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            PM33 OAuth Test Page
          </h1>
          <p className="text-gray-600">
            Test the Connect Jira button functionality
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              {/* Jira Logo Placeholder */}
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">J</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Atlassian Jira
                </h3>
                <p className="text-gray-600">
                  {isConnected 
                    ? `Connected to: ${workspaceName}` 
                    : 'Connect your Jira workspace for task automation'
                  }
                </p>
              </div>
            </div>

            {/* Status Indicator */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <span className={`text-sm font-medium ${isConnected ? 'text-green-600' : 'text-gray-500'}`}>
                {isConnected ? 'Connected' : 'Not Connected'}
              </span>
            </div>
          </div>

          {/* Connection Details (if connected) */}
          {isConnected && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center mb-2">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-2">
                  <span className="text-white text-xs">✓</span>
                </div>
                <h4 className="font-medium text-green-800">Active Integration</h4>
              </div>
              <div className="text-sm text-green-700 space-y-1">
                <p><strong>Workspace:</strong> {workspaceName}</p>
                <p><strong>Connected:</strong> {connectedAt ? new Date(connectedAt).toLocaleString() : 'Just now'}</p>
                <p><strong>Status:</strong> Ready for task automation</p>
                <p><strong>Features:</strong> Create tasks, sync sprints, track progress</p>
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="text-center">
            {isConnected ? (
              <button
                onClick={handleDisconnectJira}
                className="px-8 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Disconnect Jira
              </button>
            ) : (
              <button
                onClick={handleConnectJira}
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Connect Jira
              </button>
            )}
          </div>

          {/* Info Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center text-sm text-gray-500">
              <p className="mb-2">
                <span className="inline-block w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                Currently in Demo Mode
              </p>
              <p>
                This demonstrates the OAuth flow. In production, clicking "Connect" would redirect to Atlassian's OAuth page.
              </p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-800 mb-2">How to Test:</h4>
          <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
            <li>Click "Connect Jira" to see OAuth setup instructions</li>
            <li>Click "OK" to simulate a successful connection</li>
            <li>Page will refresh showing the connected state</li>
            <li>Click "Disconnect" to test the disconnect flow</li>
          </ol>
        </div>
      </div>
    </div>
  );
}