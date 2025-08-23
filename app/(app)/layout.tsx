import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import CoreAppNavigation from "../../components/app/CoreAppNavigation";
import { DesignSystemProvider } from "../../components/app/DesignSystemProvider";

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
    <DesignSystemProvider context="app">
      <div className={`${inter.variable} antialiased min-h-screen bg-background`}>
        <CoreAppNavigation />
        <main>
          {children}
        </main>
      </div>
    </DesignSystemProvider>
  );
}