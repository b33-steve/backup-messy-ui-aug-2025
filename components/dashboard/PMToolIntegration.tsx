/**
 * Component: PMToolIntegration
 * Purpose: Complete PM Tool Integration Dashboard with real-time status monitoring
 * Context: Core PMO functionality for managing workflows across multiple PM tools
 * Design Reference: Professional B2B SaaS integration dashboard
 */

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Settings,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock,
  ExternalLink,
  Plus,
  Activity,
  Database,
  Zap
} from 'lucide-react';
import { PMTool } from '@/lib/stores/dashboardStore';
import { usePMToolStatus } from '@/hooks/useDashboardData';

// ===============================
// Individual Tool Card Component
// ===============================

interface PMToolCardProps {
  tool: PMTool;
  onConnect: (toolName: string) => void;
  onSync: (toolName: string) => void;
  onDisconnect: (toolName: string) => void;
}

const PMToolCard: React.FC<PMToolCardProps> = ({ tool, onConnect, onSync, onDisconnect }) => {
  const [showDetails, setShowDetails] = useState(false);

  const getStatusColor = (status: string, health: string) => {
    if (health === 'error') return 'bg-red-500';
    if (health === 'syncing') return 'bg-blue-500';
    if (status === 'connected' && health === 'healthy') return 'bg-green-500';
    if (status === 'setup') return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  const getStatusText = (status: string, health: string) => {
    if (health === 'syncing') return 'Syncing';
    if (health === 'error') return 'Error';
    if (status === 'connected') return 'Connected';
    if (status === 'setup') return 'Setup Required';
    return 'Disconnected';
  };

  const getStatusIcon = (status: string, health: string) => {
    if (health === 'syncing') return <RefreshCw className="w-4 h-4 animate-spin" />;
    if (health === 'error') return <AlertCircle className="w-4 h-4" />;
    if (status === 'connected') return <CheckCircle className="w-4 h-4" />;
    if (status === 'setup') return <Settings className="w-4 h-4" />;
    return <Clock className="w-4 h-4" />;
  };

  return (
    <motion.div
      className="border rounded-lg p-4 bg-white hover:shadow-md transition-all duration-200"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${getStatusColor(tool.status, tool.health)}`}></div>
          <h3 className="font-semibold text-lg">{tool.name}</h3>
          <Badge variant={tool.status === 'connected' ? 'default' : 'secondary'}>
            {getStatusText(tool.status, tool.health)}
          </Badge>
        </div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-gray-500 hover:text-gray-700"
        >
          {getStatusIcon(tool.status, tool.health)}
        </button>
      </div>

      {/* Task Count & Last Sync */}
      <div className="flex items-center justify-between mb-3 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4" />
          <span>{tool.taskCount} tasks</span>
        </div>
        {tool.lastSync && (
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            <span>Synced {tool.lastSync}</span>
          </div>
        )}
      </div>

      {/* Sync Progress Bar */}
      {tool.health === 'syncing' && typeof tool.syncProgress === 'number' && (
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span>Syncing...</span>
            <span>{tool.syncProgress}%</span>
          </div>
          <Progress value={tool.syncProgress} className="h-2" />
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2">
        {tool.status === 'connected' ? (
          <>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onSync(tool.name)}
              disabled={tool.health === 'syncing'}
              className="flex-1"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Sync
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowDetails(!showDetails)}
              className="px-3"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </>
        ) : tool.status === 'setup' ? (
          <Button
            size="sm"
            onClick={() => onConnect(tool.name)}
            className="flex-1"
            style={{ background: 'var(--pm33-primary)', color: 'white' }}
          >
            <Plus className="w-4 h-4 mr-1" />
            Connect {tool.name}
          </Button>
        ) : (
          <Button
            size="sm"
            variant="outline"
            onClick={() => onConnect(tool.name)}
            className="flex-1"
          >
            <Zap className="w-4 h-4 mr-1" />
            Reconnect
          </Button>
        )}
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t space-y-2"
          >
            {/* Connection Details */}
            {tool.connectionData && (
              <div className="space-y-1 text-sm">
                <div className="font-medium">Connection Details:</div>
                {tool.connectionData.workspace && (
                  <div>Workspace: {tool.connectionData.workspace}</div>
                )}
                {tool.connectionData.project && (
                  <div>Project: {tool.connectionData.project}</div>
                )}
                {tool.connectionData.apiEndpoint && (
                  <div className="flex items-center gap-2">
                    Endpoint: 
                    <a 
                      href={tool.connectionData.apiEndpoint} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      {tool.connectionData.apiEndpoint}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Capabilities */}
            <div className="space-y-1">
              <div className="font-medium text-sm">Capabilities:</div>
              <div className="flex flex-wrap gap-1">
                {tool.capabilities.map(capability => (
                  <Badge key={capability} variant="outline" className="text-xs">
                    {capability}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Integration Date */}
            {tool.integrationDate && (
              <div className="text-sm text-gray-500">
                Connected: {tool.integrationDate.toLocaleDateString()}
              </div>
            )}

            {/* Disconnect Button */}
            {tool.status === 'connected' && (
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onDisconnect(tool.name)}
                className="w-full"
              >
                Disconnect {tool.name}
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ===============================
// Integration Summary Component
// ===============================

interface IntegrationSummaryProps {
  tools: PMTool[];
  totalTasks: number;
}

const IntegrationSummary: React.FC<IntegrationSummaryProps> = ({ tools, totalTasks }) => {
  const connected = tools.filter(t => t.status === 'connected').length;
  const healthy = tools.filter(t => t.health === 'healthy').length;
  const syncing = tools.filter(t => t.health === 'syncing').length;
  const errors = tools.filter(t => t.health === 'error').length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="text-center p-3 bg-green-50 rounded-lg">
        <div className="text-2xl font-bold text-green-600">{connected}</div>
        <div className="text-sm text-green-700">Connected</div>
      </div>
      <div className="text-center p-3 bg-blue-50 rounded-lg">
        <div className="text-2xl font-bold text-blue-600">{totalTasks}</div>
        <div className="text-sm text-blue-700">Total Tasks</div>
      </div>
      <div className="text-center p-3 bg-gray-50 rounded-lg">
        <div className="text-2xl font-bold text-gray-600">{healthy}</div>
        <div className="text-sm text-gray-700">Healthy</div>
      </div>
      <div className="text-center p-3 bg-orange-50 rounded-lg">
        <div className="text-2xl font-bold text-orange-600">{syncing + errors}</div>
        <div className="text-sm text-orange-700">Need Attention</div>
      </div>
    </div>
  );
};

// ===============================
// Main PM Tool Integration Dashboard
// ===============================

interface PMToolIntegrationDashboardProps {
  tools: PMTool[];
  totalTasks: number;
  onConnect: (toolName: string) => void;
  onSync: (toolName: string) => void;
  onDisconnect: (toolName: string) => void;
  onSyncAll: () => void;
}

export const PMToolIntegrationDashboard: React.FC<PMToolIntegrationDashboardProps> = ({
  tools,
  totalTasks,
  onConnect,
  onSync,
  onDisconnect,
  onSyncAll
}) => {
  const [filter, setFilter] = useState<'all' | 'connected' | 'needs-attention'>('all');

  const filteredTools = tools.filter(tool => {
    if (filter === 'connected') return tool.status === 'connected';
    if (filter === 'needs-attention') return tool.health === 'error' || tool.status === 'setup';
    return true;
  });

  const hasConnectedTools = tools.some(t => t.status === 'connected');
  const hasSync = tools.some(t => t.health === 'syncing');

  return (
    <div className="space-y-6">
      {/* Integration Summary */}
      <IntegrationSummary tools={tools} totalTasks={totalTasks} />

      {/* Filter & Actions */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All ({tools.length})
          </Button>
          <Button
            variant={filter === 'connected' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('connected')}
          >
            Connected ({tools.filter(t => t.status === 'connected').length})
          </Button>
          <Button
            variant={filter === 'needs-attention' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('needs-attention')}
          >
            Needs Attention ({tools.filter(t => t.health === 'error' || t.status === 'setup').length})
          </Button>
        </div>

        {hasConnectedTools && (
          <Button
            size="sm"
            onClick={onSyncAll}
            disabled={hasSync}
            style={{ background: 'var(--pm33-primary)', color: 'white' }}
          >
            <RefreshCw className={`w-4 h-4 mr-1 ${hasSync ? 'animate-spin' : ''}`} />
            Sync All
          </Button>
        )}
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence>
          {filteredTools.map(tool => (
            <PMToolCard
              key={tool.id}
              tool={tool}
              onConnect={onConnect}
              onSync={onSync}
              onDisconnect={onDisconnect}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredTools.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Database className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <div className="text-lg font-medium mb-2">No tools match your filter</div>
          <div className="text-sm">Try adjusting your filter to see more integrations</div>
        </div>
      )}

      {/* Integration Health Status */}
      <Alert>
        <Activity className="h-4 w-4" />
        <AlertDescription>
          PM Tool Integration Dashboard ready. {tools.filter(t => t.status === 'connected').length} of {tools.length} tools connected.
          {tools.some(t => t.health === 'error') && ' Some tools need attention.'}
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default PMToolIntegrationDashboard;