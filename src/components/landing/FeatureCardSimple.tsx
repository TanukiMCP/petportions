"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardSimpleProps {
  icon: LucideIcon;
  title: string;
  description: string;
  illustrationUrl: string;
}

export function FeatureCardSimple({ icon: Icon, title, description, illustrationUrl }: FeatureCardSimpleProps) {
  return (
    <Card className="h-full border-2 border-gray-900 dark:border-gray-300 hover:border-primary dark:hover:border-primary transition-all duration-200 bg-white dark:bg-gray-800">
      <CardContent className="p-8 flex flex-col items-center text-center">
        <div className="relative w-32 h-32 mb-6">
          <Image
            src={illustrationUrl}
            alt={title}
            width={128}
            height={128}
            className="object-contain"
          />
        </div>
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 mb-4">
          <Icon className="h-6 w-6 text-primary dark:text-primary" />
        </div>
        <h3 className="text-h5 mb-3">{title}</h3>
        <p className="text-body-md text-secondary dark:text-secondary leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

