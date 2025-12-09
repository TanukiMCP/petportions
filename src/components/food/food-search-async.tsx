"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Loader2, AlertCircle, Search } from "lucide-react";
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
import { searchPetFoodsFromDB } from "@/lib/actions/db-petfood-actions";
import type { PetFood } from "@/lib/types/food";
import type { PetSpecies } from "@/lib/types/openpetfood-api";

interface FoodSearchAsyncProps {
  selectedFood: PetFood | null;
  onSelect: (food: PetFood | null) => void;
  placeholder?: string;
  species?: PetSpecies;
  disabled?: boolean;
}

/**
 * Async Food Search Component
 * 
 * Searches the Open Pet Food Facts API in real-time with:
 * - Debounced search (500ms)
 * - Loading states
 * - Error handling with retry
 * - Empty states
 */
export function FoodSearchAsync({
  selectedFood,
  onSelect,
  placeholder = "Search for pet food...",
  species,
  disabled = false,
}: FoodSearchAsyncProps) {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [foods, setFoods] = React.useState<PetFood[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [hasSearched, setHasSearched] = React.useState(false);

  // Debounced search effect
  React.useEffect(() => {
    // Don't search if term is too short
    if (searchTerm.length < 2) {
      setFoods([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setError(null);

    // Debounce timer
    const timer = setTimeout(async () => {
      try {
        const result = await searchPetFoodsFromDB(searchTerm, species);
        setFoods(result);
        setHasSearched(true);
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error('Pet food search error:', err);
        const errorMessage = err instanceof Error 
          ? err.message.includes('Database connection error') 
            ? 'Unable to connect to database. Please check your connection and try again.'
            : err.message
          : 'Failed to search. Please try again.';
        setError(errorMessage);
        setFoods([]);
        setHasSearched(true); // Mark as searched so we show error state
      } finally {
        setLoading(false);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [searchTerm, species]);

  const handleRetry = () => {
    setError(null);
    // Trigger search again
    setSearchTerm(prev => prev + ' ');
    setTimeout(() => setSearchTerm(prev => prev.trim()), 0);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className="w-full justify-between"
        >
          {selectedFood ? (
            <span className="truncate">
              {selectedFood.brand} - {selectedFood.productName}
            </span>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start" sideOffset={4}>
        <Command shouldFilter={false}>
          <CommandInput 
            placeholder="Type to search (e.g., 'royal canin')..." 
            value={searchTerm}
            onValueChange={setSearchTerm}
          />
          <CommandList>
            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-8 text-sm text-muted-foreground">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching pet foods...
              </div>
            )}

            {/* Error State */}
            {!loading && error && (
              <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                <AlertCircle className="h-8 w-8 text-destructive mb-2" />
                <p className="text-sm text-destructive mb-2">{error}</p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleRetry}
                  className="mt-2"
                >
                  Try Again
                </Button>
              </div>
            )}

            {/* Empty State - No Search Yet */}
            {!loading && !error && !hasSearched && searchTerm.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 px-4 text-center text-muted-foreground">
                <Search className="h-8 w-8 mb-2 opacity-50" />
                <p className="text-sm">Start typing to search for pet foods</p>
                <p className="text-xs mt-1">Search by brand name or product</p>
              </div>
            )}

            {/* Empty State - Search Too Short */}
            {!loading && !error && searchTerm.length > 0 && searchTerm.length < 2 && (
              <div className="flex flex-col items-center justify-center py-8 px-4 text-center text-muted-foreground">
                <Search className="h-8 w-8 mb-2 opacity-50" />
                <p className="text-sm">Type at least 2 characters to search</p>
              </div>
            )}

            {/* Empty State - No Results */}
            {!loading && !error && hasSearched && foods.length === 0 && searchTerm.length >= 2 && (
              <CommandEmpty>
                <div className="flex flex-col items-center justify-center py-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">
                    No pet foods found for "{searchTerm}"
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Try different search terms or check spelling
                  </p>
                </div>
              </CommandEmpty>
            )}

            {/* Results */}
            {!loading && !error && foods.length > 0 && (
              <CommandGroup>
                {foods.map((food) => (
                  <CommandItem
                    key={food.id}
                    value={food.id}
                    onSelect={() => {
                      onSelect(food.id === selectedFood?.id ? null : food);
                      setOpen(false);
                    }}
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4 flex-shrink-0",
                        selectedFood?.id === food.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="font-medium truncate">
                        {food.brand} - {food.productName}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{food.kcalPerCup} kcal/cup</span>
                        <span>•</span>
                        <span className="capitalize">{food.species}</span>
                        {food.lifestage && (
                          <>
                            <span>•</span>
                            <span className="capitalize">{food.lifestage}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>

      {/* Selected Food Display */}
      {selectedFood && (
        <div className="mt-2 p-3 border rounded-lg bg-muted/50">
          <div className="text-sm font-semibold mb-1">
            {selectedFood.brand} - {selectedFood.productName}
          </div>
          <div className="text-xs text-muted-foreground space-x-2">
            <span className="font-medium">{selectedFood.kcalPerCup} kcal/cup</span>
            <span>•</span>
            <span>{selectedFood.kcalPerKg} kcal/kg</span>
            {selectedFood.kcalPer100g && (
              <>
                <span>•</span>
                <span>{selectedFood.kcalPer100g} kcal/100g</span>
              </>
            )}
          </div>
          {selectedFood.source === 'api' && (
            <div className="text-xs text-primary mt-1">
              ✓ From Open Pet Food Facts
            </div>
          )}
        </div>
      )}
    </Popover>
  );
}

