"use client";
import React, { Suspense, useState, useEffect, useMemo } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { StepIndicator, type Step } from "@/components/ui/step-indicator";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { useCalculationHistory } from "@/context/CalculationHistoryContext";
import { Step1PetType } from "@/components/calculator/Step1PetType";
import { Step2BodyDetails } from "@/components/calculator/Step2BodyDetails";
import { Step3Lifestyle } from "@/components/calculator/Step3Lifestyle";
import { Step4FoodSelection } from "@/components/calculator/Step4FoodSelection";
import type { FeedingCalculatorInput, FeedingCalculatorResult, PortionResult } from "@/lib/types/calculator";
import { calculateFeeding } from "@/lib/calculations/feeding";
import { calculatePortions } from "@/lib/calculations/portions";
import type { PetFood } from "@/lib/types/food";
import { Dog, Scale, Activity, Utensils } from "lucide-react";
import { CalculatorResultsVisualization } from "@/components/calculator/CalculatorResultsVisualization";
import { getCachedPetFoods } from "@/lib/cache/petfood-cache";
import { useSearchParams } from "next/navigation";

function CalculatorPageInner() {
  const { addCalculation } = useCalculationHistory();
  const [formData, setFormData] = useState<Partial<FeedingCalculatorInput>>({
    species: 'dog',
    weightUnit: 'kg',
    lifeStage: 'adult',
    activityLevel: 'moderate',
    reproductiveStatus: 'neutered',
    feedingFrequency: 'BID',
  });
  const [selectedFood, setSelectedFood] = useState<PetFood | null>(null);
  const [result, setResult] = useState<FeedingCalculatorResult | null>(null);
  const [selectedPet, setSelectedPet] = useState<any>(null);

  const {
    currentStepIndex,
    isFirstStep,
    isLastStep,
    nextStep,
    previousStep,
    goTo,
  } = useMultiStepForm(4);

  const steps: Step[] = [
    { id: 'pet-type', label: 'Pet Type', icon: <Dog className="h-5 w-5" /> },
    { id: 'body-details', label: 'Body Details', icon: <Scale className="h-5 w-5" /> },
    { id: 'lifestyle', label: 'Lifestyle', icon: <Activity className="h-5 w-5" /> },
    { id: 'food', label: 'Food', icon: <Utensils className="h-5 w-5" /> },
  ];

  const updateFormData = (updates: Partial<FeedingCalculatorInput>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const updateSelectedFood = (food: PetFood | null) => {
    setSelectedFood(food);
  };

  // Handle foodId from URL parameter
  const searchParams = useSearchParams();
  useEffect(() => {
    const foodId = searchParams.get('foodId');
    if (foodId) {
      const loadFood = async () => {
        try {
          const foods = await getCachedPetFoods();
          const food = foods.find(f => f.id === foodId);
          if (food) {
            setSelectedFood(food);
          }
        } catch (error) {
          console.error('Failed to load food:', error);
        }
      };
      loadFood();
    }
  }, [searchParams]);

  // Calculate portions when food is selected and result exists
  const portionResult = useMemo<PortionResult | null>(() => {
    if (result && selectedFood) {
      return calculatePortions(
        result.dailyKcal,
        result.mealsPerDay,
        selectedFood.kcalPerCup
      );
    }
    return null;
  }, [result, selectedFood]);

  const handleComplete = () => {
    // Validate all required fields
    if (
      formData.species &&
      formData.targetWeight &&
      formData.weightUnit &&
      formData.lifeStage &&
      formData.activityLevel &&
      formData.reproductiveStatus &&
      formData.feedingFrequency &&
      selectedFood
    ) {
      const input: FeedingCalculatorInput = {
        species: formData.species,
        targetWeight: formData.targetWeight,
        weightUnit: formData.weightUnit,
        lifeStage: formData.lifeStage,
        activityLevel: formData.activityLevel,
        reproductiveStatus: formData.reproductiveStatus,
        feedingFrequency: formData.feedingFrequency,
      };
      const calculated = calculateFeeding(input);
      setResult(calculated);
      
      // Record calculation in history
      addCalculation({
        type: 'calculator',
        data: {
          ...input,
          foodName: selectedFood.productName,
          foodBrand: selectedFood.brand,
        },
        result: calculated,
      });
    }
  };

  const handleNext = () => {
    // Validate current step before proceeding
    if (currentStepIndex === 1) {
      // Step 2 validation: weight and life stage required
      if (!formData.targetWeight || !formData.lifeStage) {
        return; // Don't proceed if validation fails
      }
    }
    
    if (currentStepIndex === 3) {
      // Step 4 validation: food selection required
      if (!selectedFood) {
        return;
      }
    }
    
    if (isLastStep) {
      handleComplete();
    } else {
      nextStep();
    }
  };

  const handleReset = () => {
    setResult(null);
    setSelectedFood(null);
    setFormData({
      species: 'dog',
      weightUnit: 'kg',
      lifeStage: 'adult',
      activityLevel: 'moderate',
      reproductiveStatus: 'neutered',
      feedingFrequency: 'BID',
      targetWeight: undefined,
    });
    goTo(0);
  };

  // Show results if calculation is complete
  if (result) {
    return (
      <div>
        <PageBreadcrumb pageTitle="Feeding Calculator" />
        <div className="max-w-6xl">
          <Card className="border-2 border-primary/20 dark:border-primary/20/50 bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-primary dark:text-primary">Feeding Recommendations</CardTitle>
              <CardDescription className="text-primary/80 dark:text-secondary">Based on your pet's information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <CalculatorResultsVisualization
                result={result}
                portionResult={portionResult}
                selectedFood={selectedFood}
                feedingFrequency={formData.feedingFrequency}
              />

              <div className="flex gap-2 pt-4 border-t border-primary/30 dark:border-primary/30">
                <Button onClick={handleReset} variant="outline" className="flex-1 border-primary/30 dark:border-primary/30 text-primary/80 dark:text-secondary hover:bg-tertiary dark:hover:bg-primary/10">
                  Calculate Again
                </Button>
                <Button onClick={() => window.print()} className="flex-1 no-print bg-primary hover:bg-primary/90 text-white">
                  <Printer className="mr-2 h-4 w-4" />
                  Print Summary
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Printable Summary */}
        <div className="print-only mt-8">
          <div className="max-w-2xl mx-auto p-8 border-2 border-black">
            <div className="text-center mb-6 pb-4 border-b-2 border-black">
              <div className="text-2xl font-bold mb-2">PetPortions</div>
              <div className="text-lg">Feeding Calculator Summary</div>
            </div>

            <div className="mb-6">
              <div className="text-sm font-semibold mb-2">Pet Information:</div>
              <div className="space-y-1 text-sm">
                <div><strong>Species:</strong> {formData.species === 'dog' ? 'Dog' : 'Cat'}</div>
                <div><strong>Target Weight:</strong> {formData.targetWeight} {formData.weightUnit}</div>
                <div><strong>Life Stage:</strong> {
                  formData.lifeStage === 'puppy' ? 'Puppy' :
                  formData.lifeStage === 'kitten' ? 'Kitten' :
                  formData.lifeStage === 'adult' ? 'Adult' : 'Senior'
                }</div>
                <div><strong>Activity Level:</strong> {
                  formData.activityLevel === 'sedentary' ? 'Sedentary' :
                  formData.activityLevel === 'moderate' ? 'Moderate' :
                  formData.activityLevel === 'active' ? 'Active' : 'Very Active'
                }</div>
                <div><strong>Reproductive Status:</strong> {formData.reproductiveStatus === 'neutered' ? 'Neutered' : 'Intact'}</div>
                <div><strong>Feeding Frequency:</strong> {
                  formData.feedingFrequency === 'SID' ? 'Once daily (SID)' :
                  formData.feedingFrequency === 'BID' ? 'Twice daily (BID)' : 'Three times daily (TID)'
                }</div>
              </div>
            </div>

            <div className="mb-6 pb-4 border-b border-black">
              <div className="text-sm font-semibold mb-3">Daily Caloric Requirements:</div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-semibold">Daily Calories:</div>
                  <div className="text-lg font-bold">{result.dailyKcal} kcal/day</div>
                </div>
                <div>
                  <div className="font-semibold">Per Meal:</div>
                  <div className="text-lg font-bold">{result.perMealKcal} kcal</div>
                </div>
                <div>
                  <div className="font-semibold">RER (Resting Energy):</div>
                  <div>{result.rerKcal} kcal</div>
                </div>
                <div>
                  <div className="font-semibold">MER (Maintenance Energy):</div>
                  <div>{result.merKcal} kcal</div>
                </div>
              </div>
            </div>

            {portionResult && selectedFood && (
              <div className="mb-6 pb-4 border-b border-black">
                <div className="text-sm font-semibold mb-3">Portion Recommendations:</div>
                <div className="mb-2">
                  <div className="font-semibold">Food:</div>
                  <div>{selectedFood.brand} - {selectedFood.productName}</div>
                  <div className="text-xs">({selectedFood.kcalPerCup} kcal/cup, {selectedFood.kcalPerKg} kcal/kg)</div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm mt-3">
                  <div>
                    <div className="font-semibold">Per Meal:</div>
                    <div className="text-lg font-bold">{portionResult.cupsPerMealRounded}</div>
                    <div className="text-xs">({portionResult.gramsPerMealRounded}g)</div>
                  </div>
                  <div>
                    <div className="font-semibold">Per Day:</div>
                    <div className="text-lg font-bold">{portionResult.cupsPerDay.toFixed(2)} cups</div>
                    <div className="text-xs">({portionResult.gramsPerDay}g)</div>
                  </div>
                </div>
              </div>
            )}

            <div className="text-xs text-center pt-4 border-t border-black">
              <div>Generated by PetPortions</div>
              <div>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
              <div className="mt-2 italic">This is a general guideline. Consult with your veterinarian for specific dietary needs.</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageBreadcrumb pageTitle="Feeding Calculator" />
      <div className="max-w-4xl">
        <Card className="border-2 border-primary/20 dark:border-primary/20/50 bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-primary dark:text-primary">Feeding Calculator</CardTitle>
            <CardDescription className="text-primary/80 dark:text-secondary">
              Calculate your pet's daily caloric needs step by step
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-section-sm">
              <StepIndicator
                steps={steps}
                currentStep={currentStepIndex + 1}
                onStepClick={(index) => {
                  // Only allow going back to previous steps
                  if (index < currentStepIndex) {
                    goTo(index);
                  }
                }}
              />
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleNext();
              }}
              className="min-h-[400px] form-spacing"
            >
              <AnimatePresence mode="wait">
                {currentStepIndex === 0 && (
                  <Step1PetType
                    key="step1"
                    species={formData.species || 'dog'}
                    updateData={updateFormData}
                    goToNext={handleNext}
                    onPetSelect={setSelectedPet}
                  />
                )}
                {currentStepIndex === 1 && (
                  <Step2BodyDetails
                    key="step2"
                    data={formData}
                    updateData={updateFormData}
                    selectedPet={selectedPet}
                  />
                )}
                {currentStepIndex === 2 && (
                  <Step3Lifestyle
                    key="step3"
                    data={formData}
                    updateData={updateFormData}
                  />
                )}
                {currentStepIndex === 3 && (
                  <Step4FoodSelection
                    key="step4"
                    data={formData}
                    selectedFood={selectedFood}
                    onFoodSelect={updateSelectedFood}
                  />
                )}
              </AnimatePresence>

              <div className="flex justify-between mt-section-sm pt-6 border-t border-primary/30 dark:border-primary/30">
                <Button
                  type="button"
                  variant="outline"
                  onClick={previousStep}
                  disabled={isFirstStep}
                  className="border-primary/30 dark:border-primary/30 text-primary/80 dark:text-secondary hover:bg-tertiary dark:hover:bg-primary/10 disabled:opacity-50"
                >
                  Back
                </Button>
                <Button type="submit" disabled={currentStepIndex === 3 && !selectedFood} className="bg-primary hover:bg-primary/90 text-white disabled:opacity-50">
                  {isLastStep ? "Calculate" : "Next"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function CalculatorPage() {
  return (
    <Suspense fallback={null}>
      <CalculatorPageInner />
    </Suspense>
  );
}
