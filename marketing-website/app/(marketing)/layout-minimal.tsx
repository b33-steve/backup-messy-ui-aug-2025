import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import MantineWrapper from "../../components/shared/MantineProvider";
import { Container } from '@mantine/core';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PM33 - AI Product Management Tool",
  description: "Don't replace your PM tools - make them 10x smarter. PM33 is the AI brain that supercharges your existing PM stack without migration headaches.",
};

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div 
      className={`${inter.variable} antialiased marketing-context`}
      style={{
        fontFamily: 'var(--font-inter)',
        color: 'var(--marketing-text-primary)',
        backgroundColor: 'var(--marketing-bg-primary)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <MantineWrapper>
        <main style={{ flex: 1 }}>
          {children}
        </main>
      </MantineWrapper>
    </div>
  );
}