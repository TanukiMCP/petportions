"use client";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { PetFood } from "@/lib/types/food";

interface FoodSearchProps {
  foods: PetFood[];
  selectedFood: PetFood | null;
  onSelect: (food: PetFood | null) => void;
  placeholder?: string;
  species?: 'dog' | 'cat';
}

export function FoodSearch({
  foods,
  selectedFood,
  onSelect,
  placeholder = "Search for pet food...",
  species,
}: FoodSearchProps) {
  const [open, setOpen] = React.useState(false);

  // Filter foods by species if provided
  const filteredFoods = species
    ? foods.filter((food) => food.species === species)
    : foods;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedFood
            ? `${selectedFood.brand} - ${selectedFood.productName}`
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Search by brand or product name..." />
          <CommandList>
            <CommandEmpty>No food found.</CommandEmpty>
            <CommandGroup>
              {filteredFoods.map((food) => (
                <CommandItem
                  key={food.id}
                  value={`${food.brand} ${food.productName}`}
                  onSelect={() => {
                    onSelect(food.id === selectedFood?.id ? null : food);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedFood?.id === food.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex flex-col flex-1">
                    <span className="font-medium">
                      {food.brand} - {food.productName}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {food.kcalPerCup} kcal/cup
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
      {selectedFood && (
        <div className="mt-2 text-sm text-muted-foreground">
          <span className="font-medium">{selectedFood.kcalPerCup} kcal/cup</span>
          {" • "}
          <span>{selectedFood.kcalPerKg} kcal/kg</span>
        </div>
      )}
    </Popover>
  );
}

