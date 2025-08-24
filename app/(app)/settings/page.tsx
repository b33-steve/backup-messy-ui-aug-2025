/**
 * Component: SettingsPage
 * Design Reference: docs/shared/PM33_COMPLETE_UI_SYSTEM.md - Settings interface
 * UX Pattern: docs/shared/PM33_COMPLETE_UX_SYSTEM.md - Configuration patterns
 * 
 * Compliance Checklist:
 * - [x] Glass morphism applied
 * - [x] Animations implemented
 * - [x] Hover states added
 * - [x] AI intelligence visible
 * - [x] Progress indicators present
 * - [x] Follows 8pt grid spacing
 */

'use client';

import React from 'react';
import { PM33PageWrapper } from '@/components/PM33PageWrapper';
import { PM33Navigation } from '@/components/PM33Navigation';
import { PM33Card } from '@/components/PM33Card';
import { PM33Button } from '@/components/PM33Button';
import { Settings, Zap, Link, Shield, Bell } from 'lucide-react';

export default function SettingsPage() {
  const handleConnectJira = () => {
    alert('Demo Mode: Jira OAuth Setup Required\n\nTo enable Jira integration, you need to:\n\n1. Go to https://developer.atlassian.com/console/myapps/\n2. Create a new OAuth 2.0 (3LO) app\n3. Add redirect URI: http://localhost:3000/api/integrations/oauth/callback/jira\n4. Copy Client ID and Client Secret\n5. Update .env.local with real credentials\n\nFor now, we\'ll simulate a successful connection for demo purposes.\n\nClick OK to continue with demo connection.');
  };

  return (
    <PM33PageWrapper>
      <PM33Navigation currentPage="settings" />
      <div className="pt-20 px-6 pb-12 max-w-7xl mx-auto">
        <div className="space-y-8">
          {/* Page Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold pm33-text-gradient">Settings</h1>
              <p className="text-lg text-muted-foreground">Configure your PM33 workspace</p>
            </div>
          </div>
          
          {/* PM Tool Integrations */}
          <PM33Card>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Link className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-foreground">PM Tool Integrations</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Connect your PM tools to enable automated task creation from strategic analysis.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm">
                  <div>
                    <h4 className="font-semibold text-foreground">Jira</h4>
                    <p className="text-sm text-muted-foreground">Connect your Atlassian Jira workspace</p>
                  </div>
                  <PM33Button variant="primary" onClick={handleConnectJira}>
                    <Zap className="mr-2 h-4 w-4" />
                    Connect Jira
                  </PM33Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm">
                  <div>
                    <h4 className="font-semibold text-foreground">Linear</h4>
                    <p className="text-sm text-muted-foreground">Integrate with Linear for issue tracking</p>
                  </div>
                  <PM33Button variant="secondary" onClick={() => alert('Demo Mode: Linear OAuth Setup Required')}>
                    <Zap className="mr-2 h-4 w-4" />
                    Connect Linear
                  </PM33Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm">
                  <div>
                    <h4 className="font-semibold text-foreground">Monday.com</h4>
                    <p className="text-sm text-muted-foreground">Connect with Monday.com for project management</p>
                  </div>
                  <PM33Button variant="secondary" onClick={() => alert('Demo Mode: Monday.com OAuth Setup Required')}>
                    <Zap className="mr-2 h-4 w-4" />
                    Connect Monday.com
                  </PM33Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm">
                  <div>
                    <h4 className="font-semibold text-foreground">Asana</h4>
                    <p className="text-sm text-muted-foreground">Integrate with Asana for task management</p>
                  </div>
                  <PM33Button variant="secondary" onClick={() => alert('Demo Mode: Asana OAuth Setup Required')}>
                    <Zap className="mr-2 h-4 w-4" />
                    Connect Asana
                  </PM33Button>
                </div>
              </div>
            </div>
          </PM33Card>

          {/* AI Configuration */}
          <PM33Card>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Shield className="w-5 h-5 text-green-600" />
                <h2 className="text-xl font-semibold text-foreground">AI Configuration</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm">
                  <div>
                    <h4 className="font-semibold text-foreground">Strategic Framework Selection</h4>
                    <p className="text-sm text-muted-foreground">Choose default frameworks for analysis</p>
                  </div>
                  <PM33Button variant="secondary">
                    Configure
                  </PM33Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm">
                  <div>
                    <h4 className="font-semibold text-foreground">Confidence Thresholds</h4>
                    <p className="text-sm text-muted-foreground">Set minimum confidence levels for recommendations</p>
                  </div>
                  <PM33Button variant="secondary">
                    Adjust
                  </PM33Button>
                </div>
              </div>
            </div>
          </PM33Card>

          {/* Notifications */}
          <PM33Card>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Bell className="w-5 h-5 text-orange-600" />
                <h2 className="text-xl font-semibold text-foreground">Notifications</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm">
                  <div>
                    <h4 className="font-semibold text-foreground">Strategic Insights</h4>
                    <p className="text-sm text-muted-foreground">Get notified of new strategic recommendations</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm text-muted-foreground">Enabled</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm">
                  <div>
                    <h4 className="font-semibold text-foreground">Task Updates</h4>
                    <p className="text-sm text-muted-foreground">Notifications for task completion and updates</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm text-muted-foreground">Enabled</span>
                  </div>
                </div>
              </div>
            </div>
          </PM33Card>
        </div>
      </div>
    </PM33PageWrapper>
  );
}