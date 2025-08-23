'use client';

import React from 'react';

export default function SimpleSettingsPage() {
  const handleConnectJira = () => {
    alert('Demo Mode: Jira OAuth Setup Required\n\nTo enable Jira integration, you need to:\n\n1. Go to https://developer.atlassian.com/console/myapps/\n2. Create a new OAuth 2.0 (3LO) app\n3. Add redirect URI: http://localhost:3000/api/integrations/oauth/callback/jira\n4. Copy Client ID and Client Secret\n5. Update .env.local with real credentials\n\nFor now, we\'ll simulate a successful connection for demo purposes.\n\nClick OK to continue with demo connection.');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">PM Tool Integrations</h2>
          <p className="text-gray-600 mb-6">
            Connect your PM tools to enable automated task creation from strategic analysis.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-semibold">Jira</h4>
                <p className="text-sm text-gray-600">Connect your Atlassian Jira workspace</p>
              </div>
              <button 
                onClick={handleConnectJira}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Connect Jira
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-semibold">Linear</h4>
                <p className="text-sm text-gray-600">Integrate with Linear for issue tracking</p>
              </div>
              <button 
                onClick={() => alert('Demo Mode: Linear OAuth Setup Required')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Connect Linear
              </button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-semibold">Monday.com</h4>
                <p className="text-sm text-gray-600">Connect with Monday.com for project management</p>
              </div>
              <button 
                onClick={() => alert('Demo Mode: Monday.com OAuth Setup Required')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Connect Monday.com
              </button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-semibold">Asana</h4>
                <p className="text-sm text-gray-600">Integrate with Asana for task management</p>
              </div>
              <button 
                onClick={() => alert('Demo Mode: Asana OAuth Setup Required')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Connect Asana
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}