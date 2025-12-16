"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { usePetContext } from "@/context/PetContext";
import type { Pet } from "@/lib/types/pet";

interface EditPetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pet: Pet | null;
}

export function EditPetModal({ open, onOpenChange, pet }: EditPetModalProps) {
  const { updatePet } = usePetContext();
  const [formData, setFormData] = useState({
    name: "",
    species: "dog" as "dog" | "cat",
    currentWeight: "",
    targetWeight: "",
  });
  const [loading, setLoading] = useState(false);

  // Initialize form when pet changes
  useEffect(() => {
    if (pet) {
      setFormData({
        name: pet.name,
        species: pet.species,
        currentWeight: pet.currentWeight.toString(),
        targetWeight: pet.targetWeight.toString(),
      });
    }
  }, [pet]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!pet || !formData.name || !formData.currentWeight || !formData.targetWeight) {
      return;
    }

    setLoading(true);
    
    try {
      const updates: Partial<Pet> = {
        name: formData.name.trim(),
        species: formData.species,
        currentWeight: parseFloat(formData.currentWeight),
        targetWeight: parseFloat(formData.targetWeight),
      };

      updatePet(pet.id, updates);
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to update pet:', error);
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
          <DialogTitle>Edit Pet</DialogTitle>
          <DialogDescription>
            Update your pet's information to keep feeding recommendations accurate.
          </DialogDescription>
        </DialogHeader>
        
        {pet && (
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
                {loading ? "Updating..." : "Update Pet"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
