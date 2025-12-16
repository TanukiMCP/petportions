"use client";

import React from "react";
import { FormWrapper } from "@/components/ui/form-wrapper";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Dog, Cat } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Species } from "@/lib/types/calculator";

interface Step1Props {
  species: Species;
  updateData: (updates: { species: Species }) => void;
  goToNext: () => void;
}

export function Step1Species({ species, updateData, goToNext }: Step1Props) {
  const handleSpeciesChange = (value: string) => {
    updateData({ species: value as Species });
    // Auto-advance after selection
    setTimeout(() => {
      goToNext();
    }, 500);
  };

  return (
    <FormWrapper
      title="What type of pet?"
      description="Select your pet's species to analyze food"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card
          className={cn(
            "cursor-pointer transition-all hover:shadow-lg",
            species === 'dog' && "ring-2 ring-primary"
          )}
          onClick={() => handleSpeciesChange('dog')}
        >
          <CardContent className="p-6 flex flex-col items-center gap-4">
            <div className={cn(
              "p-4 rounded-full",
              species === 'dog' ? "bg-primary/10" : "bg-gray-100 dark:bg-gray-800"
            )}>
              <Dog className={cn(
                "h-12 w-12",
                species === 'dog' ? "text-primary" : "text-gray-400"
              )} />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold">Dog</h3>
              <p className="text-sm text-muted-foreground">Canine companion</p>
            </div>
          </CardContent>
        </Card>

        <Card
          className={cn(
            "cursor-pointer transition-all hover:shadow-lg",
            species === 'cat' && "ring-2 ring-primary"
          )}
          onClick={() => handleSpeciesChange('cat')}
        >
          <CardContent className="p-6 flex flex-col items-center gap-4">
            <div className={cn(
              "p-4 rounded-full",
              species === 'cat' ? "bg-primary/10" : "bg-gray-100 dark:bg-gray-800"
            )}>
              <Cat className={cn(
                "h-12 w-12",
                species === 'cat' ? "text-primary" : "text-gray-400"
              )} />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold">Cat</h3>
              <p className="text-sm text-muted-foreground">Feline friend</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </FormWrapper>
  );
}



