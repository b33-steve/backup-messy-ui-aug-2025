/**
 * File: components/integrations/IntegrationOAuthButton.tsx
 * Purpose: User-facing OAuth integration button with PM33 glass morphism design
 * Why: Enables end-users to authenticate with their PM tools through simple OAuth flows
 * Relevant Files: lib/integrations/types.ts, app/(app)/settings/page.tsx, PM33_COMPLETE_UI_SYSTEM.md
 */

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Key, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  ExternalLink,
  Shield,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { IntegrationProvider, IntegrationStatus } from '@/lib/integrations/types';

interface IntegrationOAuthButtonProps {
  provider: IntegrationProvider;
  name: string;
  description: string;
  icon?: React.ReactNode;
  status?: IntegrationStatus;
  connectedWorkspace?: string;
  onConnect: (provider: IntegrationProvider) => Promise<void>;
  onDisconnect?: (provider: IntegrationProvider) => Promise<void>;
  className?: string;
}

const IntegrationOAuthButton: React.FC<IntegrationOAuthButtonProps> = ({
  provider,
  name,
  description,
  icon,
  status = IntegrationStatus.READY,
  connectedWorkspace,
  onConnect,
  onDisconnect,
  className
}) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async () => {
    if (status === IntegrationStatus.ERROR || !connectedWorkspace) {
      try {
        setIsConnecting(true);
        setError(null);
        await onConnect(provider);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Connection failed');
      } finally {
        setIsConnecting(false);
      }
    } else if (status === IntegrationStatus.READY && onDisconnect) {
      try {
        setIsConnecting(true);
        await onDisconnect(provider);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Disconnection failed');
      } finally {
        setIsConnecting(false);
      }
    }
  };

  const isConnected = status === IntegrationStatus.READY && connectedWorkspace;
  const isError = status === IntegrationStatus.ERROR || error;
  const isLoading = isConnecting || status === IntegrationStatus.CONNECTING;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("group", className)}
    >
      <Card className="pm33-glass-card border-0 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {/* Integration Info */}
            <div className="flex items-center space-x-4">
              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
                  isConnected 
                    ? "bg-gradient-to-r from-green-500 to-emerald-600" 
                    : isError
                    ? "bg-gradient-to-r from-red-500 to-orange-600"
                    : "bg-gradient-to-r from-blue-500 to-purple-600"
                )}
              >
                {icon || <Key className="w-6 h-6 text-white" />}
              </motion.div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-foreground">{name}</h3>
                  
                  {/* Status Badge */}
                  <AnimatePresence>
                    {isConnected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Badge 
                          variant="secondary" 
                          className="bg-green-100 text-green-800 border-green-200"
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Connected
                        </Badge>
                      </motion.div>
                    )}
                    
                    {isError && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Badge 
                          variant="destructive" 
                          className="bg-red-100 text-red-800 border-red-200"
                        >
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Error
                        </Badge>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <p className="text-sm text-muted-foreground mt-1">
                  {isConnected && connectedWorkspace 
                    ? `Connected to ${connectedWorkspace}` 
                    : description
                  }
                </p>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-sm text-red-600 mt-2"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex items-center space-x-2">
              {isConnected && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center text-green-600 mr-2"
                >
                  <Shield className="w-4 h-4 mr-1" />
                  <span className="text-xs font-medium">Secure</span>
                </motion.div>
              )}

              <Button
                onClick={handleConnect}
                disabled={isLoading}
                variant={isConnected ? "outline" : "default"}
                size="sm"
                className={cn(
                  "min-w-[100px] transition-all duration-300",
                  isConnected 
                    ? "border-red-200 text-red-700 hover:bg-red-50" 
                    : "pm33-btn-primary"
                )}
              >
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center"
                    >
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Connecting...
                    </motion.div>
                  ) : isConnected ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center"
                    >
                      Disconnect
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Connect
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </div>
          </div>

          {/* AI Enhancement Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 pt-4 border-t border-white/10"
          >
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center">
                <Zap className="w-3 h-3 mr-1 text-blue-500" />
                <span>AI-Enhanced Integration</span>
              </div>
              {isConnected && (
                <span className="text-green-600 font-medium">
                  Strategic sync active
                </span>
              )}
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default IntegrationOAuthButton;