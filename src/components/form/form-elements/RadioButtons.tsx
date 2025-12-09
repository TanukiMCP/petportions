"use client";
import React, { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function RadioButtons() {
  const [selectedValue, setSelectedValue] = useState<string>("option2");

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };
  return (
    <ComponentCard title="Radio Buttons">
      <RadioGroup value={selectedValue} onValueChange={handleRadioChange}>
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option1" id="radio1" />
            <Label htmlFor="radio1" className="cursor-pointer">Default</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option2" id="radio2" />
            <Label htmlFor="radio2" className="cursor-pointer">Selected</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option3" id="radio3" disabled />
            <Label htmlFor="radio3" className="cursor-pointer">Disabled</Label>
          </div>
        </div>
      </RadioGroup>
    </ComponentCard>
  );
}
