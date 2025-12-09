"use client";
import React from "react";
import ComponentCard from "../../common/ComponentCard";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function ToggleSwitch() {
  const handleSwitchChange = (checked: boolean) => {
    console.log("Switch is now:", checked ? "ON" : "OFF");
  };
  return (
    <ComponentCard title="Toggle switch input">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="switch-default"
              defaultChecked={true}
              onCheckedChange={handleSwitchChange}
            />
            <Label htmlFor="switch-default" className="cursor-pointer">Default</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="switch-checked"
              defaultChecked={true}
              onCheckedChange={handleSwitchChange}
            />
            <Label htmlFor="switch-checked" className="cursor-pointer">Checked</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="switch-disabled" disabled />
            <Label htmlFor="switch-disabled" className="cursor-pointer">Disabled</Label>
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}
