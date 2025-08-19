import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MantineWrapper from "../components/shared/MantineProvider";

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
  description: "Don't replace your PM tools - make them 10x smarter. PM33 is the AI brain that supercharges your existing PM stack without migration headaches.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MantineWrapper>
          {children}
        </MantineWrapper>
      </body>
    </html>
  );
}
