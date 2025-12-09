"use client";

import React from "react";
import { FormWrapper } from "@/components/ui/form-wrapper";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Step4Props {
  duration: string;
  updateData: (updates: { duration: string }) => void;
}

export function Step4Duration({ duration, updateData }: Step4Props) {
  const durationOptions = [
    { value: "7", label: "7 days", description: "1 week - Standard transition" },
    { value: "10", label: "10 days", description: "Moderate pace" },
    { value: "14", label: "14 days", description: "2 weeks - Gradual transition" },
  ];

  return (
    <FormWrapper
      title="Transition Duration"
      description="How long should the transition take?"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          {durationOptions.map((option) => (
            <Card
              key={option.value}
              className={cn(
                "cursor-pointer transition-all hover:shadow-lg",
                duration === option.value && "ring-2 ring-primary"
              )}
              onClick={() => updateData({ duration: option.value })}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{option.label}</div>
                    <div className="text-xs text-muted-foreground">{option.description}</div>
                  </div>
                  {duration === option.value && (
                    <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-white" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="p-4 border rounded-lg bg-muted/50">
          <p className="text-xs text-muted-foreground">
            <strong>Recommended:</strong> 7-14 days for a gradual transition. Longer transitions (14 days) are better for pets with sensitive stomachs.
          </p>
        </div>
      </div>
    </FormWrapper>
  );
}


