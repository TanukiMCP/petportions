"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import { PawPrint, Calculator, ClipboardCheck, Users, LogIn } from "lucide-react";
import { usePathname } from "next/navigation";

export function PublicHeader() {
  const pathname = usePathname();

  const navItems = [
    { href: "/calculator", label: "Calculator", icon: Calculator },
    { href: "/food-grader", label: "Food Grader", icon: ClipboardCheck },
    { href: "/pets", label: "My Pets", icon: Users },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/30 dark:border-primary/30 bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-gray-900/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-tertiary dark:bg-primary/10/50 border-2 border-primary/30 dark:border-primary/30">
              <PawPrint className="h-6 w-6 text-primary dark:text-primary/60" />
            </div>
            <span className="text-xl font-bold text-primary dark:text-primary">
              PetPortions
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`gap-2 ${
                      isActive
                        ? "bg-primary hover:bg-primary/90 text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-tertiary dark:hover:bg-primary/10"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <ThemeToggleButton />
            <Link href="/signin">
              <Button
                variant="outline"
                className="gap-2 border-primary/30 dark:border-primary/30 text-primary/80 dark:text-secondary hover:bg-tertiary dark:hover:bg-primary/10"
              >
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">Sign In</span>
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="gap-2 bg-primary hover:bg-primary/90 text-white">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}


