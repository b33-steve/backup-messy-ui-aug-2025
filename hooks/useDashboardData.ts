/**
 * File: hooks/useDashboardData.ts
 * Purpose: Centralized state management for dashboard data with PM tool integration
 * Context: Replaces scattered useState calls with professional data architecture
 * Future: Will connect to Supabase/Firebase for persistent data
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  DashboardData, 
  PMTool, 
  DashboardMetrics, 
  StrategicScenario,
  IntelligenceOperations,
  dashboardData as initialData,
  refreshDashboardData,
  getToolHealthSummary,
  getTotalTaskCount
} from '@/lib/stores/dashboardStore';

// ===============================
// Hook Interfaces
// ===============================

export interface UseDashboardDataReturn {
  // Data state
  data: DashboardData;
  loading: boolean;
  error: string | null;
  lastRefresh: Date;
  
  // Core actions
  refresh: () => Promise<void>;
  
  // Metrics management
  updateMetric: (key: keyof DashboardMetrics, value: any) => void;
  updateMetrics: (updates: Partial<DashboardMetrics>) => void;
  
  // PM Tools management
  updatePMToolStatus: (toolName: string, updates: Partial<PMTool>) => void;
  connectTool: (toolName: string, connectionData: any) => Promise<void>;
  disconnectTool: (toolName: string) => void;
  syncTool: (toolName: string) => Promise<void>;
  
  // Scenarios management
  addScenario: (scenario: Omit<StrategicScenario, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateScenario: (id: string, updates: Partial<StrategicScenario>) => void;
  deleteScenario: (id: string) => void;
  
  // Intelligence operations
  updateIntelligenceOps: (updates: Partial<IntelligenceOperations>) => void;
  
  // Computed values
  toolHealthSummary: ReturnType<typeof getToolHealthSummary>;
  totalTaskCount: number;
  connectedToolsCount: number;
}

export interface PMToolConnectionData {
  workspace?: string;
  project?: string;
  apiEndpoint?: string;
  accessToken?: string;
  refreshToken?: string;
}

// ===============================
// Main Hook
// ===============================

export function useDashboardData(): UseDashboardDataReturn {
  // Core state
  const [data, setData] = useState<DashboardData>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-refresh on mount
  useEffect(() => {
    const initialRefresh = async () => {
      try {
        const refreshedData = await refreshDashboardData();
        setData(refreshedData);
      } catch (err) {
        console.error('Failed to refresh dashboard data:', err);
        setError('Failed to load dashboard data');
      }
    };
    
    initialRefresh();
  }, []);

  // ===============================
  // Core Actions
  // ===============================

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const refreshedData = await refreshDashboardData();
      setData(refreshedData);
    } catch (err) {
      console.error('Failed to refresh dashboard data:', err);
      setError('Failed to refresh data');
    } finally {
      setLoading(false);
    }
  }, []);

  // ===============================
  // Metrics Management
  // ===============================

  const updateMetric = useCallback((key: keyof DashboardMetrics, value: any) => {
    setData(prev => ({
      ...prev,
      metrics: {
        ...prev.metrics,
        [key]: value
      },
      lastRefresh: new Date()
    }));
  }, []);

  const updateMetrics = useCallback((updates: Partial<DashboardMetrics>) => {
    setData(prev => ({
      ...prev,
      metrics: {
        ...prev.metrics,
        ...updates
      },
      lastRefresh: new Date()
    }));
  }, []);

  // ===============================
  // PM Tools Management
  // ===============================

  const updatePMToolStatus = useCallback((toolName: string, updates: Partial<PMTool>) => {
    setData(prev => ({
      ...prev,
      pmTools: prev.pmTools.map(tool => 
        tool.name.toLowerCase() === toolName.toLowerCase() 
          ? { ...tool, ...updates }
          : tool
      ),
      lastRefresh: new Date()
    }));
  }, []);

  const connectTool = useCallback(async (toolName: string, connectionData: PMToolConnectionData) => {
    setLoading(true);
    
    try {
      // Update tool status to connecting
      updatePMToolStatus(toolName, { 
        status: 'syncing', 
        health: 'syncing',
        syncProgress: 0 
      });

      // Call backend API to connect tool
      const response = await fetch('/api/pm-tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'connect',
          toolName,
          connectionData
        })
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Connection failed');
      }
      
      // Update tool with backend response
      const backendTool = result.tool;
      updatePMToolStatus(toolName, {
        status: backendTool.status,
        health: backendTool.health,
        connectionData: backendTool.connectionData,
        lastSync: backendTool.lastSync ? new Date(backendTool.lastSync).toLocaleString() : 'Just now',
        taskCount: backendTool.taskCount || 0,
        syncProgress: undefined,
        integrationDate: new Date()
      });

    } catch (err) {
      console.error(`Failed to connect ${toolName}:`, err);
      updatePMToolStatus(toolName, { 
        status: 'error',
        health: 'error',
        syncProgress: undefined
      });
      setError(`Failed to connect to ${toolName}: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [updatePMToolStatus]);

  const disconnectTool = useCallback(async (toolName: string) => {
    try {
      // Call backend API to disconnect tool
      const response = await fetch('/api/pm-tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'disconnect',
          toolName
        })
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Disconnect failed');
      }

      // Update tool with backend response
      const backendTool = result.tool;
      updatePMToolStatus(toolName, {
        status: backendTool.status,
        health: backendTool.health,
        taskCount: backendTool.taskCount,
        lastSync: backendTool.lastSync,
        syncProgress: undefined,
        connectionData: backendTool.connectionData
      });

    } catch (err) {
      console.error(`Failed to disconnect ${toolName}:`, err);
      setError(`Failed to disconnect ${toolName}: ${err.message}`);
    }
  }, [updatePMToolStatus]);

  const syncTool = useCallback(async (toolName: string) => {
    const tool = data.pmTools.find(t => t.name.toLowerCase() === toolName.toLowerCase());
    if (!tool || tool.status !== 'connected') {
      setError(`Cannot sync ${toolName} - tool not connected`);
      return;
    }

    // Start sync animation
    updatePMToolStatus(toolName, {
      health: 'syncing',
      syncProgress: 0
    });

    try {
      // Show sync progress animation
      for (let progress = 0; progress <= 80; progress += 20) {
        updatePMToolStatus(toolName, { syncProgress: progress });
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // Call backend API to sync tool
      const response = await fetch('/api/pm-tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'sync',
          toolName
        })
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Sync failed');
      }

      // Complete sync with backend data
      const backendTool = result.tool;
      updatePMToolStatus(toolName, {
        health: backendTool.health,
        lastSync: backendTool.lastSync ? new Date(backendTool.lastSync).toLocaleString() : 'Just now',
        taskCount: backendTool.taskCount,
        syncProgress: undefined
      });

    } catch (err) {
      console.error(`Failed to sync ${toolName}:`, err);
      updatePMToolStatus(toolName, {
        health: 'error',
        syncProgress: undefined
      });
      setError(`Failed to sync ${toolName}: ${err.message}`);
    }
  }, [data.pmTools, updatePMToolStatus]);

  // ===============================
  // Scenarios Management
  // ===============================

  const addScenario = useCallback((scenario: Omit<StrategicScenario, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newScenario: StrategicScenario = {
      ...scenario,
      id: `scenario-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setData(prev => ({
      ...prev,
      scenarios: [...prev.scenarios, newScenario],
      lastRefresh: new Date()
    }));
  }, []);

  const updateScenario = useCallback((id: string, updates: Partial<StrategicScenario>) => {
    setData(prev => ({
      ...prev,
      scenarios: prev.scenarios.map(scenario =>
        scenario.id === id
          ? { ...scenario, ...updates, updatedAt: new Date() }
          : scenario
      ),
      lastRefresh: new Date()
    }));
  }, []);

  const deleteScenario = useCallback((id: string) => {
    setData(prev => ({
      ...prev,
      scenarios: prev.scenarios.filter(scenario => scenario.id !== id),
      lastRefresh: new Date()
    }));
  }, []);

  // ===============================
  // Intelligence Operations
  // ===============================

  const updateIntelligenceOps = useCallback((updates: Partial<IntelligenceOperations>) => {
    setData(prev => ({
      ...prev,
      intelligenceOps: {
        ...prev.intelligenceOps,
        ...updates,
        lastUpdated: new Date()
      },
      lastRefresh: new Date()
    }));
  }, []);

  // ===============================
  // Computed Values
  // ===============================

  const toolHealthSummary = getToolHealthSummary();
  const totalTaskCount = getTotalTaskCount();
  const connectedToolsCount = data.pmTools.filter(tool => tool.status === 'connected').length;

  return {
    // Data state
    data,
    loading,
    error,
    lastRefresh: data.lastRefresh,
    
    // Core actions
    refresh,
    
    // Metrics management
    updateMetric,
    updateMetrics,
    
    // PM Tools management
    updatePMToolStatus,
    connectTool,
    disconnectTool,
    syncTool,
    
    // Scenarios management
    addScenario,
    updateScenario,
    deleteScenario,
    
    // Intelligence operations
    updateIntelligenceOps,
    
    // Computed values
    toolHealthSummary,
    totalTaskCount,
    connectedToolsCount
  };
}

// ===============================
// Utility Hooks
// ===============================

export function usePMToolStatus(toolName: string) {
  const { data, updatePMToolStatus, connectTool, disconnectTool, syncTool } = useDashboardData();
  
  const tool = data.pmTools.find(t => t.name.toLowerCase() === toolName.toLowerCase());
  
  return {
    tool,
    isConnected: tool?.status === 'connected',
    isHealthy: tool?.health === 'healthy',
    isSyncing: tool?.health === 'syncing',
    needsSetup: tool?.status === 'setup',
    hasError: tool?.health === 'error',
    updateStatus: (updates: Partial<PMTool>) => updatePMToolStatus(toolName, updates),
    connect: (connectionData: PMToolConnectionData) => connectTool(toolName, connectionData),
    disconnect: () => disconnectTool(toolName),
    sync: () => syncTool(toolName)
  };
}