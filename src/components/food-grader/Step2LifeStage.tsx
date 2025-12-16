"use client";

import React from "react";
import { FormWrapper } from "@/components/ui/form-wrapper";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Species, LifeStage } from "@/lib/types/calculator";

interface Step2Props {
  species: Species;
  lifeStage: LifeStage;
  updateData: (updates: { lifeStage: LifeStage }) => void;
}

export function Step2LifeStage({ species, lifeStage, updateData }: Step2Props) {
  return (
    <FormWrapper
      title="Life Stage"
      description="Select your pet's life stage for accurate analysis"
    >
      <div className="space-y-2">
        <Label htmlFor="life-stage">Life Stage</Label>
        <Select
          value={lifeStage}
          onValueChange={(value) =>
            updateData({ lifeStage: value as LifeStage })
          }
        >
          <SelectTrigger id="life-stage">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {species === 'dog' ? (
              <>
                <SelectItem value="puppy">Puppy</SelectItem>
                <SelectItem value="adult">Adult</SelectItem>
                <SelectItem value="senior">Senior</SelectItem>
              </>
            ) : (
              <>
                <SelectItem value="kitten">Kitten</SelectItem>
                <SelectItem value="adult">Adult</SelectItem>
                <SelectItem value="senior">Senior</SelectItem>
              </>
            )}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground mt-2">
          The life stage helps determine appropriate nutritional requirements for the analysis.
        </p>
      </div>
    </FormWrapper>
  );
}



