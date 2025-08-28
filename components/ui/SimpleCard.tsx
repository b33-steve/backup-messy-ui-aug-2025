/**
 * Simple PM33 Card Component - Minimal & Reliable
 * Supports light/dark/gray themes with basic glass morphism
 */

'use client'

import React from 'react'

interface SimpleCardProps {
  children: React.ReactNode
  variant?: 'glass' | 'solid'
  className?: string
  testId?: string
}

export function SimpleCard({ 
  children, 
  variant = 'glass', 
  className = '', 
  testId 
}: SimpleCardProps) {
  const baseStyles = "rounded-xl p-6 transition-all duration-300"
  
  const variantStyles = {
    glass: "bg-white/80 backdrop-blur-sm border border-gray-200/30 shadow-lg hover:bg-white/90 hover:shadow-xl hover:scale-105 hover:-translate-y-1 pm33-glass-card",
    solid: "bg-white border border-gray-200 shadow-md hover:shadow-lg hover:scale-102"
  }
  
  return (
    <div 
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      data-testid={testId}
    >
      {children}
    </div>
  )
}

export function SimpleMetricCard({ 
  label, 
  value, 
  change,
  testId 
}: { 
  label: string
  value: string
  change?: string
  testId?: string 
}) {
  return (
    <SimpleCard variant="glass" testId={testId}>
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      <div className="text-2xl font-bold text-gray-900 mb-2">{value}</div>
      {change && (
        <div className="text-sm text-green-600 font-medium">{change}</div>
      )}
    </SimpleCard>
  )
}