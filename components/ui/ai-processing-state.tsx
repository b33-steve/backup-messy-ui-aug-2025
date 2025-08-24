/**
 * Component: AIProcessingState
 * Design Reference: docs/app/APP_THEME_GUIDE.md - AI processing indicators
 * UX Pattern: PM33_COMPLETE_UX_SYSTEM.md - Never use basic spinners
 * 
 * Compliance Checklist:
 * - [x] AI intelligence visible
 * - [x] Progress indicators present  
 * - [x] Animations implemented
 * - [x] Premium visual effects
 * - [x] Team-specific branding
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Activity, Database, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AIProcessingStateProps {
  team?: 'Strategic Intelligence' | 'Workflow Execution' | 'Data Intelligence' | 'Communication';
  status?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const TEAM_CONFIGS = {
  'Strategic Intelligence': {
    icon: Brain,
    color: '#667eea',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  'Workflow Execution': {
    icon: Activity,
    color: '#00d2ff',
    gradient: 'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)',
  },
  'Data Intelligence': {
    icon: Database,
    color: '#11998e',
    gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
  },
  'Communication': {
    icon: Users,
    color: '#f2994a',
    gradient: 'linear-gradient(135deg, #f2994a 0%, #f2c94c 100%)',
  },
};

const AIProcessingState: React.FC<AIProcessingStateProps> = ({
  team = 'Strategic Intelligence',
  status = 'Processing...',
  className = '',
  size = 'md',
}) => {
  const config = TEAM_CONFIGS[team];
  const Icon = config.icon;

  const sizeStyles = {
    sm: 'h-4 w-4 text-xs',
    md: 'h-6 w-6 text-sm',
    lg: 'h-8 w-8 text-base',
  };

  return (
    <div className={cn('pm33-ai-processing flex items-center gap-3', className)}>
      {/* Animated AI Glow */}
      <div className="relative">
        <motion.div
          className="pm33-animate-glow absolute inset-0 rounded-full opacity-30"
          style={{ background: config.gradient }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        <motion.div
          className={cn('relative z-10 rounded-full p-2', sizeStyles[size])}
          style={{
            background: config.gradient,
            color: 'white',
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <Icon className={sizeStyles[size]} />
        </motion.div>
      </div>

      {/* Status Text */}
      <div className="flex-1">
        <motion.p
          className={cn('font-medium', sizeStyles[size])}
          style={{ color: config.color }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {team} AI Team
        </motion.p>
        <motion.p
          className={cn('opacity-80', sizeStyles[size])}
          style={{ color: 'var(--pm33-textSecondary)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {status}
        </motion.p>
      </div>

      {/* Processing Dots */}
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: config.color }}
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Specific AI Team Components
export const StrategicIntelligenceProcessing: React.FC<Omit<AIProcessingStateProps, 'team'>> = (props) => (
  <AIProcessingState {...props} team="Strategic Intelligence" />
);

export const WorkflowExecutionProcessing: React.FC<Omit<AIProcessingStateProps, 'team'>> = (props) => (
  <AIProcessingState {...props} team="Workflow Execution" />
);

export const DataIntelligenceProcessing: React.FC<Omit<AIProcessingStateProps, 'team'>> = (props) => (
  <AIProcessingState {...props} team="Data Intelligence" />
);

export const CommunicationProcessing: React.FC<Omit<AIProcessingStateProps, 'team'>> = (props) => (
  <AIProcessingState {...props} team="Communication" />
);

export default AIProcessingState;