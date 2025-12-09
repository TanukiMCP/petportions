"use client";

import React from "react";
import { FormWrapper } from "@/components/ui/form-wrapper";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { FeedingCalculatorInput } from "@/lib/types/calculator";

interface Step3Props {
  data: Partial<FeedingCalculatorInput>;
  updateData: (updates: Partial<FeedingCalculatorInput>) => void;
}

export function Step3Lifestyle({ data, updateData }: Step3Props) {
  return (
    <FormWrapper
      title="Lifestyle & Feeding"
      description="How active is your pet and how often do you feed them?"
    >
      <div className="space-y-6">
        {/* Activity Level */}
        <div className="space-y-2">
          <Label htmlFor="activity-level">Activity Level</Label>
          <Select
            value={data.activityLevel}
            onValueChange={(value) =>
              updateData({
                activityLevel: value as
                  | 'sedentary'
                  | 'moderate'
                  | 'active'
                  | 'very-active',
              })
            }
          >
            <SelectTrigger id="activity-level">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sedentary">
                <div>
                  <div className="font-medium">Sedentary</div>
                  <div className="text-xs text-primary dark:text-primary/60">Mostly resting, minimal exercise</div>
                </div>
              </SelectItem>
              <SelectItem value="moderate">
                <div>
                  <div className="font-medium">Moderate</div>
                  <div className="text-xs text-primary dark:text-primary/60">Daily walks, regular play</div>
                </div>
              </SelectItem>
              <SelectItem value="active">
                <div>
                  <div className="font-medium">Active</div>
                  <div className="text-xs text-muted-foreground">Running, hiking, high energy</div>
                </div>
              </SelectItem>
              {data.species === 'dog' && (
                <SelectItem value="very-active">
                  <div>
                    <div className="font-medium">Very Active</div>
                    <div className="text-xs text-muted-foreground">Working dogs, athletes</div>
                  </div>
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Feeding Frequency */}
        <div className="space-y-3">
          <Label>Feeding Frequency</Label>
          <RadioGroup
            value={data.feedingFrequency}
            onValueChange={(value) =>
              updateData({
                feedingFrequency: value as 'SID' | 'BID' | 'TID',
              })
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="SID" id="freq-sid" />
              <Label htmlFor="freq-sid" className="cursor-pointer">
                Once daily (SID)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="BID" id="freq-bid" />
              <Label htmlFor="freq-bid" className="cursor-pointer">
                Twice daily (BID)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="TID" id="freq-tid" />
              <Label htmlFor="freq-tid" className="cursor-pointer">
                Three times daily (TID)
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </FormWrapper>
  );
}

