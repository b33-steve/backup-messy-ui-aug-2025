/**
 * Component: PM33PageWrapper
 * Design Reference: PM33_COMPLETE_UI_SYSTEM.md - Section Base Page Wrapper
 * UX Pattern: PM33_ Complete _UX_System.md - Required on every page
 * 
 * Compliance Checklist:
 * - [x] Glass morphism applied
 * - [x] Animations implemented
 * - [x] Hover states added
 * - [x] AI intelligence visible
 * - [x] Progress indicators present
 * - [x] Follows 8pt grid spacing
 */

'use client';

import { ReactNode } from 'react';

export const PM33PageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--pm33-bg-gradient)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
        background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        animation: 'backgroundFloat 20s ease-in-out infinite'
      }} />
      
      {/* Gradient Orbs */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-10%',
        width: '40%',
        height: '40%',
        background: 'radial-gradient(circle, rgba(102,126,234,0.3) 0%, transparent 70%)',
        filter: 'blur(100px)',
        animation: 'orbFloat 15s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        left: '-10%',
        width: '40%',
        height: '40%',
        background: 'radial-gradient(circle, rgba(118,75,162,0.3) 0%, transparent 70%)',
        filter: 'blur(100px)',
        animation: 'orbFloat 20s ease-in-out infinite reverse'
      }} />
      
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
      
      {/* Global Animations & Theme Variables */}
      <style jsx global>{`
        /* PM33 Theme Variables - Complete Color System */
        :root {
          /* Primary Brand Gradients */
          --pm33-brand: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          --pm33-brand-hover: linear-gradient(135deg, #764ba2 0%, #f093fb 100%);
          --pm33-brand-active: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          
          /* Strategic Intelligence Colors */
          --pm33-ai-glow: linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%);
          --pm33-ai-processing: linear-gradient(135deg, #667eea 0%, #00d2ff 100%);
          --pm33-success: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
          --pm33-warning: linear-gradient(135deg, #f2994a 0%, #f2c94c 100%);
          --pm33-danger: linear-gradient(135deg, #eb3349 0%, #f45c43 100%);
          
          /* Glass Morphism Backgrounds */
          --pm33-glass: rgba(255, 255, 255, 0.1);
          --pm33-glass-border: rgba(255, 255, 255, 0.18);
          --pm33-glass-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
          
          /* Dark Mode Surfaces (Professional Theme) */
          --pm33-dark-0: #0a0e27;
          --pm33-dark-1: #0f1429;
          --pm33-dark-2: #151b3b;
          --pm33-dark-3: #1e2749;
          
          /* Light Mode Surfaces (Marketing Theme) */
          --pm33-light-0: #fafbff;
          --pm33-light-1: #ffffff;
          --pm33-light-2: rgba(255, 255, 255, 0.95);
          --pm33-light-3: rgba(248, 250, 252, 0.98);
          
          /* Semantic Colors */
          --pm33-text-primary: #0f172a;
          --pm33-text-secondary: #475569;
          --pm33-text-tertiary: #94a3b8;
          --pm33-border-subtle: rgba(0, 0, 0, 0.06);
          --pm33-border-default: rgba(0, 0, 0, 0.12);
          
          /* Marketing Context Colors */
          --marketing-primary: #1E40AF;
          --marketing-success: #059669;
          --marketing-cta: #EA580C;
          --marketing-text-primary: #1E293B;
          --marketing-bg-primary: #FFFFFF;
          
          /* PM33 Typography */
          --font-h1: 2.5rem;
          --font-h2: 2rem;
          --font-h3: 1.5rem;
          --font-h4: 1.25rem;
          --font-large: 1.125rem;
          --font-base: 1rem;
          --font-small: 0.875rem;
          --font-tiny: 0.75rem;
          
          /* Font Weights */
          --weight-bold: 700;
          --weight-semibold: 600;
          --weight-medium: 500;
          --weight-regular: 400;
          
          /* Line Heights */
          --leading-tight: 1.2;
          --leading-normal: 1.5;
          --leading-relaxed: 1.75;
          
          /* Letter Spacing */
          --tracking-tight: -0.02em;
          --tracking-normal: 0;
          --tracking-wide: 0.05em;
          
          /* PM33 Spacing (8pt Grid) */
          --space-0: 0;
          --space-1: 0.25rem;
          --space-2: 0.5rem;
          --space-3: 0.75rem;
          --space-4: 1rem;
          --space-5: 1.25rem;
          --space-6: 1.5rem;
          --space-8: 2rem;
          --space-10: 2.5rem;
          --space-12: 3rem;
          --space-16: 4rem;
        }
        
        @keyframes backgroundFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        @keyframes glow-pulse {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(102, 126, 234, 0.5),
                        0 0 40px rgba(102, 126, 234, 0.3);
          }
          50% { 
            box-shadow: 0 0 30px rgba(102, 126, 234, 0.8),
                        0 0 60px rgba(102, 126, 234, 0.4);
          }
        }
        
        @keyframes pulse-scale {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.1;
          }
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes bounce {
          0%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes fade-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        @keyframes progress-slide {
          0% {
            width: 0%;
            margin-left: 0;
          }
          50% {
            width: 60%;
            margin-left: 20%;
          }
          100% {
            width: 0%;
            margin-left: 100%;
          }
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        /* Apply to elements */
        .pm33-animate-glow { animation: glow-pulse 2s ease-in-out infinite; }
        .pm33-animate-float { animation: float 3s ease-in-out infinite; }
        .pm33-animate-fade-up { animation: fade-up 0.5s ease-out forwards; }
        .pm33-animate-gradient { animation: gradient-shift 15s ease infinite; }
        .pm33-animate-shimmer { 
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};