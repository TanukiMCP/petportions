"use client";

import React from "react";
import { FormWrapper } from "@/components/ui/form-wrapper";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Dog, Cat } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step1Props {
  species: 'dog' | 'cat';
  updateData: (updates: { species: 'dog' | 'cat' }) => void;
  goToNext: () => void;
}

export function Step1PetType({ species, updateData, goToNext }: Step1Props) {
  const handleSpeciesChange = (value: string) => {
    updateData({ species: value as 'dog' | 'cat' });
    // Auto-advance after selection
    setTimeout(() => {
      goToNext();
    }, 500);
  };

  return (
    <FormWrapper
      title="What type of pet?"
      description="Select your pet's species to get started"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card
          className={cn(
            "cursor-pointer transition-all hover:shadow-lg border-2",
            species === 'dog' 
              ? "ring-2 ring-primary border-primary/40 dark:border-primary/40 bg-tertiary dark:bg-tertiary/30" 
              : "border-primary/20 dark:border-primary/20 hover:border-primary/30 dark:hover:border-primary/30 bg-white dark:bg-gray-800"
          )}
          onClick={() => handleSpeciesChange('dog')}
        >
          <CardContent className="p-6 flex flex-col items-center gap-4">
            <div className={cn(
              "p-4 rounded-full border-2",
              species === 'dog' 
                ? "bg-tertiary dark:bg-tertiary/30 border-primary/40 dark:border-primary/40" 
                : "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            )}>
              <Dog className={cn(
                "h-12 w-12",
                species === 'dog' ? "text-primary dark:text-primary" : "text-muted-foreground"
              )} />
            </div>
            <div className="text-center">
              <h3 className={cn(
                "text-lg font-semibold",
                species === 'dog' ? "text-primary dark:text-primary" : "text-foreground"
              )}>Dog</h3>
              <p className={cn(
                "text-sm",
                species === 'dog' ? "text-primary dark:text-primary" : "text-muted-foreground"
              )}>Canine companion</p>
            </div>
          </CardContent>
        </Card>

        <Card
          className={cn(
            "cursor-pointer transition-all hover:shadow-lg border-2",
            species === 'cat' 
              ? "ring-2 ring-primary border-primary/40 dark:border-primary/40 bg-tertiary dark:bg-tertiary/30" 
              : "border-primary/20 dark:border-primary/20 hover:border-primary/30 dark:hover:border-primary/30 bg-white dark:bg-gray-800"
          )}
          onClick={() => handleSpeciesChange('cat')}
        >
          <CardContent className="p-6 flex flex-col items-center gap-4">
            <div className={cn(
              "p-4 rounded-full border-2",
              species === 'cat' 
                ? "bg-tertiary dark:bg-tertiary/30 border-primary/40 dark:border-primary/40" 
                : "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            )}>
              <Cat className={cn(
                "h-12 w-12",
                species === 'cat' ? "text-primary dark:text-primary" : "text-muted-foreground"
              )} />
            </div>
            <div className="text-center">
              <h3 className={cn(
                "text-lg font-semibold",
                species === 'cat' ? "text-primary dark:text-primary" : "text-foreground"
              )}>Cat</h3>
              <p className={cn(
                "text-sm",
                species === 'cat' ? "text-primary dark:text-primary" : "text-muted-foreground"
              )}>Feline friend</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </FormWrapper>
  );
}

