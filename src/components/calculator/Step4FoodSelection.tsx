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
      title="Select Your Pet's Food"
      description="Search and select the food you're feeding to get exact portion recommendations"
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
      </div>
    </FormWrapper>
  );
}

