"use client";

import React from "react";
import { FormWrapper } from "@/components/ui/form-wrapper";
import { Label } from "@/components/ui/label";
import { FoodSearchAsync } from "@/components/food/food-search-async";
import type { PetFood } from "@/lib/types/food";
import type { Species } from "@/lib/types/calculator";

interface Step3Props {
  species: Species;
  selectedFood: PetFood | null;
  onFoodSelect: (food: PetFood | null) => void;
}

export function Step3FoodSelection({ species, selectedFood, onFoodSelect }: Step3Props) {
  return (
    <FormWrapper
      title="Select Food to Analyze"
      description="Search and select the pet food you want to analyze"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Select Pet Food</Label>
          <FoodSearchAsync
            selectedFood={selectedFood}
            onSelect={onFoodSelect}
            species={species}
            placeholder="Search for pet food to analyze..."
          />
        </div>

        <p className="text-xs text-muted-foreground">
          Select a food to analyze its quality based on AAFCO guidelines and nutritional standards.
        </p>
      </div>
    </FormWrapper>
  );
}


