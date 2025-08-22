import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { DesignSystemProvider } from "../../components/app/DesignSystemProvider";
import SimplifiedNavigation from "../../components/shared/SimplifiedNavigation";

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
    <div
      className={`${inter.variable} antialiased app-context`}
      style={{
        fontFamily: 'var(--font-inter)',
        color: 'var(--app-text-secondary)',
        backgroundColor: 'var(--app-bg-secondary)',
        minHeight: '100vh'
      }}
    >
      <DesignSystemProvider context="app">
        {children}
      </DesignSystemProvider>
    </div>
  );
}