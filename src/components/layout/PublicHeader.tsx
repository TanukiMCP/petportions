"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import { PawPrint, Calculator, ClipboardCheck, BookOpen, Heart, LogIn, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useState } from "react";

export function PublicHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/calculator", label: "Calculator", icon: Calculator },
    { href: "/food-grader", label: "Food Grader", icon: ClipboardCheck },
    { href: "/about", label: "About", icon: Heart },
    { href: "/resources", label: "Resources", icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/30 dark:border-primary/30 bg-background/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 dark:supports-[backdrop-filter]:bg-gray-900/80">
      <div className="container mx-auto max-w-7xl px-4">
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

          {/* Desktop Navigation */}
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

          {/* Right side actions (Desktop) */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggleButton />
            <Link href="/login">
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

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggleButton />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader className="text-left mb-6">
                  <SheetTitle className="flex items-center gap-2 text-primary">
                    <PawPrint className="h-6 w-6" />
                    PetPortions
                  </SheetTitle>
                </SheetHeader>
                
                <div className="flex flex-col gap-6">
                  <nav className="flex flex-col gap-2">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;
                      return (
                        <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                          <Button
                            variant={isActive ? "default" : "ghost"}
                            className={`w-full justify-start gap-3 h-12 text-base ${
                              isActive
                                ? "bg-primary hover:bg-primary/90 text-white"
                                : "text-gray-700 dark:text-gray-300 hover:bg-tertiary dark:hover:bg-primary/10"
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                            {item.label}
                          </Button>
                        </Link>
                      );
                    })}
                  </nav>

                  <div className="flex flex-col gap-3 pt-6 border-t border-gray-200 dark:border-gray-800">
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <Button
                        variant="outline"
                        className="w-full justify-start gap-3 h-12 border-primary/30 dark:border-primary/30 text-primary/80 dark:text-secondary"
                      >
                        <LogIn className="h-5 w-5" />
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/signup" onClick={() => setIsOpen(false)}>
                      <Button className="w-full justify-start gap-3 h-12 bg-primary hover:bg-primary/90 text-white">
                        <PawPrint className="h-5 w-5" />
                        Sign Up Free
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}



