/**
 * Component: SettingsPage
 * Design Reference: APP_THEME_GUIDE.md - Core app design system
 * UX Pattern: PM33_COMPLETE_UX_SYSTEM.md - Settings interface patterns
 * Relevant Files: components/ui/card.tsx, components/ui/button.tsx, components/ui/tabs.tsx, components/integrations/IntegrationOAuthButton.tsx
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, User, Shield, Bell, Zap } from 'lucide-react';
// Temporarily commenting out OAuth imports to isolate issue
// import IntegrationOAuthButton from '../../../components/integrations/IntegrationOAuthButton';
// import { IntegrationProvider, IntegrationConfig, IntegrationStatus } from '../../../lib/integrations/types';
// import { oauthService } from '../../../lib/integrations/oauth-service';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('integrations');
  // const [connectedIntegrations, setConnectedIntegrations] = useState<IntegrationConfig[]>([]);
  const [isConnecting, setIsConnecting] = useState<string | null>(null);

  // Handle initial tab state from URL on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const tab = urlParams.get('tab');
      console.log('URL tab parameter:', tab);
      if (tab === 'integrations') {
        console.log('Setting active tab to integrations');
        setActiveTab('integrations');
      }
    }
  }, []);

  // Debug logging
  useEffect(() => {
    console.log('Active tab changed to:', activeTab);
  }, [activeTab]);

  // Placeholder integration configurations
  const integrationConfigs = [
    {
      name: 'Jira',
      description: 'Connect your Atlassian Jira workspace for automated task creation and project management.'
    },
    {
      name: 'Linear',
      description: 'Integrate with Linear for streamlined issue tracking and sprint planning.'
    },
    {
      name: 'Monday.com',
      description: 'Connect Monday.com for visual project management and team collaboration.'
    },
    {
      name: 'Asana',
      description: 'Integrate with Asana for task management and team productivity.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <Settings className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <div className="space-y-1">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                  Settings
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  Manage your account preferences and integrations
                </p>
              </div>
            </div>
          </div>

          {/* Settings Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="account" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Account
              </TabsTrigger>
              <TabsTrigger value="integrations" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Integrations
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Security
              </TabsTrigger>
            </TabsList>

            {/* Account Tab */}
            <TabsContent value="account" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Account Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-600 dark:text-slate-400">
                    Manage your profile, preferences, and personal information.
                  </p>
                  <Button variant="outline">Edit Profile</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Integrations Tab */}
            <TabsContent value="integrations" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    PM Tool Integrations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-slate-600 dark:text-slate-400">
                    Connect your PM tools to enable automated task creation from strategic analysis.
                  </p>
                  
                  {/* Placeholder Integration Buttons */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {integrationConfigs.map((config, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">{config.name}</h4>
                            <p className="text-sm text-slate-600 mt-1">{config.description}</p>
                          </div>
                          <Button 
                            variant="outline" 
                            onClick={() => alert(`OAuth flow would initiate for ${config.name}`)}
                          >
                            Connect {config.name}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-600 dark:text-slate-400">
                    Configure alerts and updates for strategic analysis and task creation.
                  </p>
                  <Button variant="outline">Configure Notifications</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-600 dark:text-slate-400">
                    Manage your password, two-factor authentication, and security preferences.
                  </p>
                  <Button variant="outline">Manage Security</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;