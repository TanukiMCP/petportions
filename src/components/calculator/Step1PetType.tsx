"use client";

import React from "react";
import { FormWrapper } from "@/components/ui/form-wrapper";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dog, Cat, PawPrint } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePetContext } from "@/context/PetContext";
import type { Pet } from "@/lib/types/pet";

interface Step1Props {
  species: 'dog' | 'cat';
  updateData: (updates: { species: 'dog' | 'cat' }) => void;
  goToNext: () => void;
  onPetSelect?: (pet: Pet) => void;
}

export function Step1PetType({ species, updateData, goToNext, onPetSelect }: Step1Props) {
  const { pets } = usePetContext();
  
  const handleSpeciesChange = (value: string) => {
    updateData({ species: value as 'dog' | 'cat' });
    // Auto-advance after selection
    setTimeout(() => {
      goToNext();
    }, 500);
  };

  const handlePetSelect = (petId: string) => {
    const pet = pets.find(p => p.id === petId);
    if (pet) {
      updateData({ species: pet.species });
      if (onPetSelect) {
        onPetSelect(pet);
      }
      // Auto-advance after selection
      setTimeout(() => {
        goToNext();
      }, 500);
    }
  };

  return (
    <FormWrapper
      title="What type of pet?"
      description="Select your pet's species to get started"
    >
      {/* Pet Selector */}
      {pets.length > 0 && (
        <div className="mb-6">
          <Label className="text-sm font-medium text-foreground mb-2 block">
            Quick Start - Select Your Pet
          </Label>
          <Select onValueChange={handlePetSelect}>
            <SelectTrigger className="w-full">
              <div className="flex items-center gap-2">
                <PawPrint className="h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Choose a pet to pre-fill data" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {pets.map((pet) => (
                <SelectItem key={pet.id} value={pet.id}>
                  <div className="flex items-center gap-2">
                    {pet.species === 'dog' ? (
                      <Dog className="h-4 w-4" />
                    ) : (
                      <Cat className="h-4 w-4" />
                    )}
                    <span>{pet.name}</span>
                    <span className="text-muted-foreground text-sm">
                      ({pet.currentWeight} kg)
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground mt-2">
            Select a pet to automatically fill in their species and weight information
          </p>
        </div>
      )}

      {/* Manual Species Selection */}
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">
          Or select manually:
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card
          className={cn(
            "cursor-pointer transition-all hover:shadow-lg border-2",
            species === 'dog' 
              ? "ring-2 ring-primary border-primary/40 dark:border-primary/40 bg-tertiary dark:bg-tertiary/30" 
              : "border-primary/20 dark:border-primary/20 hover:border-primary/30 dark:hover:border-primary/30 bg-white dark:bg-gray-800"
          )}
          onClick={() => handleSpeciesChange('dog')}
        >
          <CardContent className="p-6 flex flex-col items-center gap-4">
            <div className={cn(
              "p-4 rounded-full border-2",
              species === 'dog' 
                ? "bg-tertiary dark:bg-tertiary/30 border-primary/40 dark:border-primary/40" 
                : "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            )}>
              <Dog className={cn(
                "h-12 w-12",
                species === 'dog' ? "text-primary dark:text-primary" : "text-muted-foreground"
              )} />
            </div>
            <div className="text-center">
              <h3 className={cn(
                "text-lg font-semibold",
                species === 'dog' ? "text-primary dark:text-primary" : "text-foreground"
              )}>Dog</h3>
              <p className={cn(
                "text-sm",
                species === 'dog' ? "text-primary dark:text-primary" : "text-muted-foreground"
              )}>Canine companion</p>
            </div>
          </CardContent>
        </Card>

        <Card
          className={cn(
            "cursor-pointer transition-all hover:shadow-lg border-2",
            species === 'cat' 
              ? "ring-2 ring-primary border-primary/40 dark:border-primary/40 bg-tertiary dark:bg-tertiary/30" 
              : "border-primary/20 dark:border-primary/20 hover:border-primary/30 dark:hover:border-primary/30 bg-white dark:bg-gray-800"
          )}
          onClick={() => handleSpeciesChange('cat')}
        >
          <CardContent className="p-6 flex flex-col items-center gap-4">
            <div className={cn(
              "p-4 rounded-full border-2",
              species === 'cat' 
                ? "bg-tertiary dark:bg-tertiary/30 border-primary/40 dark:border-primary/40" 
                : "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            )}>
              <Cat className={cn(
                "h-12 w-12",
                species === 'cat' ? "text-primary dark:text-primary" : "text-muted-foreground"
              )} />
            </div>
            <div className="text-center">
              <h3 className={cn(
                "text-lg font-semibold",
                species === 'cat' ? "text-primary dark:text-primary" : "text-foreground"
              )}>Cat</h3>
              <p className={cn(
                "text-sm",
                species === 'cat' ? "text-primary dark:text-primary" : "text-muted-foreground"
              )}>Feline friend</p>
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
    </FormWrapper>
  );
}

