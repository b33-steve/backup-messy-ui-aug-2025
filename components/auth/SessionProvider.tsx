/**
 * File: components/auth/SessionProvider.tsx
 * Purpose: NextAuth.js session provider wrapper for authentication state
 * Why: Provide authentication context throughout the PM33 application
 * Relevant Files: app/layout.tsx, lib/auth.ts
 */

'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

interface SessionProviderProps {
  children: React.ReactNode;
  session?: Session | null;
}

export default function SessionProvider({ children, session }: SessionProviderProps) {
  return (
    <NextAuthSessionProvider session={session}>
      {children}
    </NextAuthSessionProvider>
  );
}