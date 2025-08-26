/**
 * File: app/(app)/test-simple/page.tsx  
 * Purpose: Simple test page to isolate loading issues
 * Why: Test if basic shadcn/ui components work without complex imports
 * RELEVANT FILES: components/ui/card.tsx, components/ui/button.tsx
 */

'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function TestSimplePage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Simple Test Page</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              This is a simple test page to verify shadcn/ui components work correctly.
            </p>
            <div className="flex gap-4">
              <Button variant="default">
                Primary Button
              </Button>
              <Button variant="outline">
                Secondary Button
              </Button>
              <Badge variant="default">
                Test Badge
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}