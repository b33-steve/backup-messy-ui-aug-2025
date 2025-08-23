import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MantineWrapper from "../components/shared/MantineProvider";
import PostHogProvider from "../components/PostHogProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PM33 - AI Product Management Tool", 
  description: "PM33: PMO Transformation Platform - Transform from reactive Product Manager into strategic PMO leader with AI-powered strategic intelligence teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <PostHogProvider>
          <MantineWrapper>
            {children}
          </MantineWrapper>
        </PostHogProvider>
      </body>
    </html>
  );
}
