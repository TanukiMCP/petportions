"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { usePetContext } from "@/context/PetContext";
import type { Pet } from "@/lib/types/pet";

interface AddPetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddPetModal({ open, onOpenChange }: AddPetModalProps) {
  const { addPet } = usePetContext();
  const [formData, setFormData] = useState({
    name: "",
    species: "dog" as "dog" | "cat",
    currentWeight: "",
    targetWeight: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.currentWeight || !formData.targetWeight) {
      return;
    }

    setLoading(true);
    
    try {
      const newPet: Omit<Pet, 'id'> = {
        name: formData.name.trim(),
        species: formData.species,
        currentWeight: parseFloat(formData.currentWeight),
        targetWeight: parseFloat(formData.targetWeight),
        weightUnit: 'kg',
      };

      addPet(newPet);
      
      // Reset form and close modal
      setFormData({
        name: "",
        species: "dog",
        currentWeight: "",
        targetWeight: "",
      });
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to add pet:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = formData.name.trim() && 
                     formData.currentWeight && 
                     formData.targetWeight &&
                     !isNaN(parseFloat(formData.currentWeight)) &&
                     !isNaN(parseFloat(formData.targetWeight));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Pet</DialogTitle>
          <DialogDescription>
            Enter your pet's information to get started with personalized feeding recommendations.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pet-name">Pet Name</Label>
            <Input
              id="pet-name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g., Max, Bella, Charlie"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="species">Species</Label>
            <Select value={formData.species} onValueChange={(value: "dog" | "cat") => handleInputChange('species', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select species" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dog">Dog</SelectItem>
                <SelectItem value="cat">Cat</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="current-weight">Current Weight (kg)</Label>
            <Input
              id="current-weight"
              type="number"
              step="0.1"
              min="0.1"
              value={formData.currentWeight}
              onChange={(e) => handleInputChange('currentWeight', e.target.value)}
              placeholder="e.g., 25.5"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="target-weight">Target Weight (kg)</Label>
            <Input
              id="target-weight"
              type="number"
              step="0.1"
              min="0.1"
              value={formData.targetWeight}
              onChange={(e) => handleInputChange('targetWeight', e.target.value)}
              placeholder="e.g., 24.0"
              required
            />
            <p className="text-xs text-muted-foreground">
              Enter your pet's ideal weight. This helps calculate appropriate portions for weight management.
            </p>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!isFormValid || loading}>
              {loading ? "Adding..." : "Add Pet"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
