"use client";

import React from "react";
import { FormWrapper } from "@/components/ui/form-wrapper";
import { Label } from "@/components/ui/label";
import { FoodSearchAsync } from "@/components/food/food-search-async";
import type { PetFood } from "@/lib/types/food";
import type { FeedingCalculatorInput } from "@/lib/types/calculator";

interface Step4Props {
  data: Partial<FeedingCalculatorInput>;
  selectedFood: PetFood | null;
  onFoodSelect: (food: PetFood | null) => void;
}

export function Step4FoodSelection({ data, selectedFood, onFoodSelect }: Step4Props) {
  return (
    <FormWrapper
      title="Food Selection (Optional)"
      description="Select your pet's food for portion recommendations, or skip to see calorie-only results"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Select Pet Food</Label>
          <FoodSearchAsync
            selectedFood={selectedFood}
            onSelect={onFoodSelect}
            species={data.species}
            placeholder="Search for pet food..."
          />
        </div>

        <p className="text-xs text-muted-foreground">
          You can skip this step and calculate calories only. Food selection helps provide precise portion recommendations.
        </p>
      </div>
    </FormWrapper>
  );
}

