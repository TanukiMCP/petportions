"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon, ArrowRight } from "lucide-react";

interface FeatureCardSimpleProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

export function FeatureCardSimple({ icon: Icon, title, description, href }: FeatureCardSimpleProps) {
  return (
    <Link href={href} className="block h-full group">
      <Card className="h-full border-2 border-gray-900 dark:border-gray-300 hover:border-primary dark:hover:border-primary hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 group-hover:scale-[1.02]">
        <CardContent className="p-8 flex flex-col items-center text-center">
          {/* Large Icon Circle */}
          <div className="flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 dark:bg-primary/20 mb-6 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors duration-300">
            <Icon className="h-12 w-12 text-primary dark:text-primary group-hover:scale-110 transition-transform duration-300" />
          </div>
          
          {/* Title */}
          <h3 className="text-h5 mb-3 group-hover:text-primary transition-colors duration-300">{title}</h3>
          
          {/* Description */}
          <p className="text-body-md text-secondary dark:text-secondary leading-relaxed mb-6">
            {description}
          </p>
          
          {/* CTA Button */}
          <Button 
            variant="outline" 
            className="mt-auto border-2 border-primary/40 text-primary hover:bg-primary hover:text-white group-hover:border-primary transition-all duration-300"
          >
            Try It Now
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}

