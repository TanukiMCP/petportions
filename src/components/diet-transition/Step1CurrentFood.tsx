"use client";

import React from "react";
import { FormWrapper } from "@/components/ui/form-wrapper";
import { Label } from "@/components/ui/label";
import { FoodSearchAsync } from "@/components/food/food-search-async";
import type { PetFood } from "@/lib/types/food";

interface Step1Props {
  currentFood: PetFood | null;
  onFoodSelect: (food: PetFood | null) => void;
}

export function Step1CurrentFood({ currentFood, onFoodSelect }: Step1Props) {
  return (
    <FormWrapper
      title="Current Food"
      description="Select the food your pet is currently eating"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Current Food</Label>
          <FoodSearchAsync
            selectedFood={currentFood}
            onSelect={onFoodSelect}
            species={currentFood?.species || 'dog'}
            placeholder="Search for current pet food..."
          />
        </div>

        <p className="text-xs text-muted-foreground">
          Select the food your pet is currently eating. This will be gradually replaced with the new food.
        </p>
      </div>
    </FormWrapper>
  );
}


