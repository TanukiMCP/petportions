"use client";

import React from "react";
import { FormWrapper } from "@/components/ui/form-wrapper";
import { Label } from "@/components/ui/label";
import { FoodSearchAsync } from "@/components/food/food-search-async";
import type { PetFood } from "@/lib/types/food";

interface Step2Props {
  currentFood: PetFood | null;
  newFood: PetFood | null;
  onFoodSelect: (food: PetFood | null) => void;
}

export function Step2NewFood({ currentFood, newFood, onFoodSelect }: Step2Props) {
  return (
    <FormWrapper
      title="New Food"
      description="Select the food you want to transition your pet to"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>New Food</Label>
          <FoodSearchAsync
            selectedFood={newFood}
            onSelect={onFoodSelect}
            species={newFood?.species || currentFood?.species || 'dog'}
            placeholder="Search for new pet food..."
          />
        </div>

        {currentFood && newFood && currentFood.id === newFood.id && (
          <div className="p-3 border border-primary/30 bg-tertiary dark:bg-primary/10 rounded-lg">
            <p className="text-xs text-primary dark:text-primary">
              ⚠️ You've selected the same food as current. Please select a different food for the transition.
            </p>
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          Select the new food you want to transition your pet to. Make sure it's appropriate for your pet's species and life stage.
        </p>
      </div>
    </FormWrapper>
  );
}


