/**
 * Component: AppLayout
 * Design Reference: docs/shared/PM33_COMPLETE_UI_SYSTEM.md - Section Layout
 * UX Pattern: docs/shared/PM33_COMPLETE_UX_SYSTEM.md - Section Layout Patterns
 * 
 * Compliance Checklist:
 * - [x] Glass morphism applied
 * - [x] PM33 navigation and page wrapper
 * - [x] Theme provider integrated
 * - [x] Follows 8pt grid spacing
 */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
// Core app styles now consolidated in global CSS
import { PM33Navigation } from "../../components/PM33Navigation";
import { PM33PageWrapper } from "../../components/PM33PageWrapper";
import { DesignSystemProvider } from "../../components/app/DesignSystemProvider";
import { PM33ThemeProvider, PM33ThemeToggle } from "../../components/shared/PM33ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PM33 Strategic Intelligence Platform",
  description: "PMO-level strategic intelligence at your fingertips. Supercharge your product management workflow with AI-powered insights.",
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${inter.variable} antialiased`}>
      {children}
    </div>
  );
}