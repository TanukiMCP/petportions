import { ThemeProvider } from "@/context/ThemeContext";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { Footer } from "@/components/layout/Footer";
import React from "react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-tertiary dark:bg-gray-900 flex flex-col">
      <ThemeProvider>
        <div className="relative w-full flex-1">
          <PublicHeader />
          {children}
        </div>
        <Footer />
      </ThemeProvider>
    </div>
  );
}

