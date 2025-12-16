"use client";

import { useSidebar } from "@/context/SidebarContext";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import { Footer } from "@/components/layout/Footer";
import { PetProvider } from "@/context/PetContext";
import { CalculationHistoryProvider } from "@/context/CalculationHistoryContext";
import AuthGuard from "@/components/auth/AuthGuard";
import React from "react";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const pathname = usePathname();

  const isCalculatorRoute = pathname === "/calculator" || pathname?.startsWith("/calculator/");

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  const content = (
    <div className="min-h-screen xl:flex bg-tertiary flex flex-col">
      {/* Sidebar and Backdrop */}
      <AppSidebar />
      <Backdrop />
      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin} flex flex-col`}
      >
        {/* Page Content */}
        <div className="p-4 md:p-6 lg:p-8 flex-1">
          <div className="max-w-7xl mx-auto">
            <CalculationHistoryProvider>
              <PetProvider>{children}</PetProvider>
            </CalculationHistoryProvider>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );

  if (isCalculatorRoute) {
    return content;
  }

  return <AuthGuard>{content}</AuthGuard>;
}

