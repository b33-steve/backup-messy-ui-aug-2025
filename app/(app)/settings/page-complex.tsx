'use client';

import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import IntegrationOAuthButton from '../../../components/integrations/IntegrationOAuthButton';
import { IntegrationProvider, IntegrationConfig, IntegrationStatus } from '../../../lib/integrations/types';
import { oauthService } from '../../../lib/integrations/oauth-service';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('integrations');
  const [connectedIntegrations, setConnectedIntegrations] = useState<IntegrationConfig[]>([]);
  const [isConnecting, setIsConnecting] = useState<string | null>(null);

  // Load connected integrations on component mount
  useEffect(() => {
    const loadConnectedIntegrations = async () => {
      try {
        // Load real connected integrations from OAuth service
        const integrations = await oauthService.getIntegrations();
        setConnectedIntegrations(integrations);
      } catch (error) {
        console.error('Failed to load connected integrations:', error);
      }
    };

    loadConnectedIntegrations();
  }, []);

  // Handle OAuth connection flow
  const handleOAuthConnect = async (provider: IntegrationProvider) => {
    try {
      setIsConnecting(provider);
      await oauthService.initiateOAuth(provider);
    } catch (error) {
      console.error('OAuth initiation failed:', error);
      alert(`Failed to connect to ${provider}. Please try again.`);
    } finally {
      setIsConnecting(null);
    }
  };

  // Integration configurations
  const integrationConfigs = [
    {
      provider: IntegrationProvider.JIRA,
      displayName: 'Jira',
      description: 'Connect your Atlassian Jira workspace',
      features: ['Automated task creation', 'Sprint planning sync', 'Progress tracking']
    },
    {
      provider: IntegrationProvider.LINEAR,
      displayName: 'Linear',
      description: 'Integrate with Linear for issue tracking',
      features: ['Issue management', 'Project roadmaps', 'Team collaboration']
    },
    {
      provider: IntegrationProvider.MONDAY,
      displayName: 'Monday.com',
      description: 'Connect with Monday.com for project management',
      features: ['Board management', 'Timeline tracking', 'Resource planning']
    },
    {
      provider: IntegrationProvider.ASANA,
      displayName: 'Asana',
      description: 'Integrate with Asana for task management',
      features: ['Task coordination', 'Team assignments', 'Progress reports']
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Configure your PM33 account and integrations
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          {/* Account Tab */}
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences and profile information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-sm text-muted-foreground">user@company.com</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Organization</label>
                    <p className="text-sm text-muted-foreground">Your Company</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>PM Tool Integrations</CardTitle>
                  <CardDescription>
                    Connect your PM tools to enable automated task creation and synchronization from strategic analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {integrationConfigs.map((config) => (
                      <IntegrationOAuthButton
                        key={config.provider}
                        provider={config.provider}
                        name={config.displayName}
                        description={config.description}
                        onConnect={() => handleOAuthConnect(config.provider)}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {connectedIntegrations.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Connected Integrations</CardTitle>
                    <CardDescription>
                      Manage your active PM tool connections
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {connectedIntegrations.map((integration) => (
                        <div 
                          key={integration.id || integration.provider}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div>
                            <h4 className="font-medium">{integration.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              Last sync: {integration.createdAt?.toLocaleString() || 'Never'}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 bg-green-500 rounded-full" />
                            <span className="text-sm text-green-600">Connected</span>
                            <Button variant="outline" size="sm">
                              Manage
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure how you receive updates from PM33
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Notification preferences coming soon...
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle>Billing & Subscription</CardTitle>
                <CardDescription>
                  Manage your PM33 subscription and billing details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Billing management coming soon...
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsPage;