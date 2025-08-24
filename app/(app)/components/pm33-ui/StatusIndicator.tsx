/**
 * File: app/(app)/components/pm33-ui/StatusIndicator.tsx
 * Description: System status and health indicator components
 * Purpose: Consistent status display for AI backends, integrations, and system health
 * 
 * RELEVANT FILES: lib/utils.ts, styles/globals.css, strategic-intelligence/page.tsx, AIProcessingIndicator.tsx
 */

"use client"

import React from 'react'
import { cn } from '@/lib/utils'
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Wifi,
  WifiOff,
  Activity,
  Clock
} from 'lucide-react'

export type StatusType = 'healthy' | 'warning' | 'error' | 'offline'

interface StatusIndicatorProps {
  status: StatusType
  label?: string
  message?: string
  showIcon?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'badge' | 'card' | 'inline'
  className?: string
  lastUpdated?: Date
}

const statusConfig = {
  healthy: {
    icon: CheckCircle,
    label: 'Healthy',
    bgClass: 'bg-green-50/80 backdrop-blur-sm',
    borderClass: 'border-green-200',
    textClass: 'text-green-700',
    iconClass: 'text-green-500',
  },
  warning: {
    icon: AlertTriangle,
    label: 'Warning',
    bgClass: 'bg-yellow-50/80 backdrop-blur-sm',
    borderClass: 'border-yellow-200',
    textClass: 'text-yellow-700',
    iconClass: 'text-yellow-500',
  },
  error: {
    icon: XCircle,
    label: 'Error',
    bgClass: 'bg-red-50/80 backdrop-blur-sm',
    borderClass: 'border-red-200',
    textClass: 'text-red-700',
    iconClass: 'text-red-500',
  },
  offline: {
    icon: WifiOff,
    label: 'Offline',
    bgClass: 'bg-gray-50/80 backdrop-blur-sm',
    borderClass: 'border-gray-200',
    textClass: 'text-muted-foreground',
    iconClass: 'text-muted-foreground',
  },
}

/**
 * StatusIndicator Component
 * 
 * Displays system status with consistent visual indicators
 * and optional additional context
 */
export function StatusIndicator({
  status,
  label,
  message,
  showIcon = true,
  size = 'md',
  variant = 'badge',
  className,
  lastUpdated
}: StatusIndicatorProps) {
  const config = statusConfig[status]
  const Icon = config.icon
  
  const sizeClasses = {
    sm: showIcon ? 'text-xs gap-1 px-2 py-1' : 'text-xs px-2 py-1',
    md: showIcon ? 'text-sm gap-2 px-3 py-1' : 'text-sm px-3 py-1',
    lg: showIcon ? 'text-base gap-2 px-4 py-2' : 'text-base px-4 py-2',
  }
  
  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16,
  }

  if (variant === 'badge') {
    return (
      <span
        className={cn(
          'inline-flex items-center font-medium rounded-full border',
          config.bgClass,
          config.borderClass,
          config.textClass,
          sizeClasses[size],
          className
        )}
      >
        {showIcon && <Icon size={iconSizes[size]} className="flex-shrink-0" />}
        {label || config.label}
      </span>
    )
  }

  if (variant === 'card') {
    return (
      <div className={cn(
        'p-4 rounded-lg border',
        config.bgClass,
        config.borderClass,
        className
      )}>
        <div className="flex items-start gap-3">
          {showIcon && (
            <Icon size={20} className={cn('flex-shrink-0 mt-0.5', config.iconClass)} />
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className={cn('font-medium', config.textClass)}>
                {label || config.label}
              </h4>
              {lastUpdated && (
                <span className="text-xs text-muted-foreground">
                  {formatLastUpdated(lastUpdated)}
                </span>
              )}
            </div>
            {message && (
              <p className="text-sm text-muted-foreground mt-1">
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }

  // inline variant
  return (
    <span className={cn(
      'inline-flex items-center gap-1',
      config.textClass,
      className
    )}>
      {showIcon && <Icon size={iconSizes[size]} className="flex-shrink-0" />}
      {label || config.label}
    </span>
  )
}

/**
 * AI Backend Status Component
 */
interface AIBackendStatusProps {
  engines: Array<{
    name: string
    status: StatusType
    responseTime?: number
    lastCheck?: Date
  }>
  className?: string
}

export function AIBackendStatus({ engines, className }: AIBackendStatusProps) {
  const overallStatus = engines.some(e => e.status === 'error') ? 'error' :
                       engines.some(e => e.status === 'warning') ? 'warning' :
                       engines.every(e => e.status === 'healthy') ? 'healthy' : 'offline'

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground">
          AI Engine Status
        </h3>
        <StatusIndicator 
          status={overallStatus} 
          size="sm" 
          label={`${engines.filter(e => e.status === 'healthy').length}/${engines.length} Online`}
        />
      </div>
      
      <div className="space-y-2">
        {engines.map((engine, index) => (
          <div key={index} className="flex items-center justify-between p-2 bg-gray-50/80 backdrop-blur-sm rounded">
            <div className="flex items-center gap-2">
              <StatusIndicator 
                status={engine.status} 
                variant="inline" 
                size="sm"
                showIcon={false}
              />
              <span className="text-sm text-foreground">
                {engine.name}
              </span>
            </div>
            
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              {engine.responseTime && (
                <span>{engine.responseTime}ms</span>
              )}
              {engine.lastCheck && (
                <span>{formatLastUpdated(engine.lastCheck)}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * System Health Dashboard
 */
interface SystemHealthProps {
  services: Array<{
    name: string
    status: StatusType
    uptime?: string
    issues?: string[]
  }>
  className?: string
}

export function SystemHealth({ services, className }: SystemHealthProps) {
  const healthyCount = services.filter(s => s.status === 'healthy').length
  const totalCount = services.length
  const healthPercentage = Math.round((healthyCount / totalCount) * 100)

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          System Health
        </h3>
        <div className="flex items-center gap-2">
          <Activity size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {healthPercentage}% Operational
          </span>
        </div>
      </div>

      <div className="grid gap-3">
        {services.map((service, index) => (
          <StatusIndicator
            key={index}
            status={service.status}
            label={service.name}
            message={
              service.status === 'healthy' 
                ? `Uptime: ${service.uptime || 'Unknown'}`
                : service.issues?.join(', ')
            }
            variant="card"
            size="sm"
            lastUpdated={new Date()}
          />
        ))}
      </div>
    </div>
  )
}

/**
 * Connection Status for real-time features
 */
interface ConnectionStatusProps {
  isConnected: boolean
  lastSync?: Date
  className?: string
}

export function ConnectionStatus({ isConnected, lastSync, className }: ConnectionStatusProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {isConnected ? (
        <Wifi size={14} className="text-green-500" />
      ) : (
        <WifiOff size={14} className="text-red-500" />
      )}
      <span className="text-xs text-muted-foreground">
        {isConnected ? 'Connected' : 'Disconnected'}
        {lastSync && ` • Last sync ${formatLastUpdated(lastSync)}`}
      </span>
    </div>
  )
}

/**
 * Utility function to format last updated time
 */
function formatLastUpdated(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)

  if (seconds < 60) return `${seconds}s ago`
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  return date.toLocaleDateString()
}