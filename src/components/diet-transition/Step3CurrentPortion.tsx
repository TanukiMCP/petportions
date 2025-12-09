"use client";

import React from "react";
import { FormWrapper } from "@/components/ui/form-wrapper";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Step3Props {
  currentPortion: string;
  updateData: (updates: { currentPortion: string }) => void;
}

export function Step3CurrentPortion({ currentPortion, updateData }: Step3Props) {
  return (
    <FormWrapper
      title="Current Portion"
      description="How much food does your pet currently eat per meal?"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="current-portion">Current Portion (cups per meal)</Label>
          <Input
            id="current-portion"
            type="number"
            step="0.125"
            min="0"
            value={currentPortion}
            onChange={(e) => updateData({ currentPortion: e.target.value })}
            placeholder="e.g., 1.5"
            className="text-lg"
          />
        </div>

        <div className="p-4 border rounded-lg bg-muted/50">
          <p className="text-sm text-muted-foreground">
            Enter the amount of current food your pet eats per meal. This helps calculate the exact transition amounts.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            💡 Tip: You can use decimals (e.g., 1.5 cups, 0.75 cups)
          </p>
        </div>
      </div>
    </FormWrapper>
  );
}


