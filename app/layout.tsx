import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PM33 - PMO Transformation Platform",
  description: "Transform individual Product Managers into fully functional PMOs through agentic AI teams. $100K MRR by EOY 2025.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
