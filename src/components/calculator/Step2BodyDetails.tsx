"use client";

import React from "react";
import { FormWrapper } from "@/components/ui/form-wrapper";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { FeedingCalculatorInput } from "@/lib/types/calculator";

interface Step2Props {
  data: Partial<FeedingCalculatorInput>;
  updateData: (updates: Partial<FeedingCalculatorInput>) => void;
}

export function Step2BodyDetails({ data, updateData }: Step2Props) {
  return (
    <FormWrapper
      title="Body Details"
      description="Tell us about your pet's weight and life stage"
    >
      <div className="space-y-6">
        {/* Target Weight */}
        <div className="space-y-2">
          <Label htmlFor="target-weight">Target Weight</Label>
          <div className="flex gap-2">
            <Input
              id="target-weight"
              type="number"
              step="0.1"
              min="0"
              placeholder="Enter weight"
              value={data.targetWeight || ""}
              onChange={(e) =>
                updateData({
                  targetWeight: parseFloat(e.target.value) || undefined,
                })
              }
              className="flex-1"
            />
            <Select
              value={data.weightUnit}
              onValueChange={(value) =>
                updateData({ weightUnit: value as 'kg' | 'lb' })
              }
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kg">kg</SelectItem>
                <SelectItem value="lb">lb</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Life Stage */}
        <div className="space-y-2">
          <Label htmlFor="life-stage">Life Stage</Label>
          <Select
            value={data.lifeStage}
            onValueChange={(value) =>
              updateData({
                lifeStage: value as 'puppy' | 'adult' | 'senior' | 'kitten',
              })
            }
          >
            <SelectTrigger id="life-stage">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {data.species === 'dog' ? (
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
        </div>

        {/* Reproductive Status */}
        <div className="space-y-3">
          <Label>Reproductive Status</Label>
          <RadioGroup
            value={data.reproductiveStatus}
            onValueChange={(value) =>
              updateData({
                reproductiveStatus: value as 'intact' | 'neutered',
              })
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="intact" id="status-intact" />
              <Label htmlFor="status-intact" className="cursor-pointer">
                Intact
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="neutered" id="status-neutered" />
              <Label htmlFor="status-neutered" className="cursor-pointer">
                Neutered
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </FormWrapper>
  );
}


