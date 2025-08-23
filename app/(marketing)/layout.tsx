// Marketing route group layout - simplified for build compatibility
// WHY: Route groups should not render complete HTML documents
// RELEVANT FILES: app/layout.tsx (main layout), app/(marketing)/page.tsx

import type { Metadata } from "next";

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
    <div className="marketing-context">
      {children}
    </div>
  );
}