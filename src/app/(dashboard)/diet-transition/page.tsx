"use client";
import React, { useState, useEffect } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Printer, Utensils, ArrowRight, Scale, Calendar } from "lucide-react";
import { TransitionScheduleVisualization } from "@/components/diet-transition/TransitionScheduleVisualization";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AnimatePresence } from "framer-motion";
import { StepIndicator, type Step } from "@/components/ui/step-indicator";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { Step1CurrentFood } from "@/components/diet-transition/Step1CurrentFood";
import { Step2NewFood } from "@/components/diet-transition/Step2NewFood";
import { Step3CurrentPortion } from "@/components/diet-transition/Step3CurrentPortion";
import { Step4Duration } from "@/components/diet-transition/Step4Duration";
import { calculateTransition } from "@/lib/calculations/transition";
import type { PetFood } from "@/lib/types/food";
import type { TransitionPlan } from "@/lib/types/transition";
import { getCachedPetFoods } from "@/lib/cache/petfood-cache";
import { useSearchParams } from "next/navigation";

export default function DietTransitionPage() {
  const [currentFood, setCurrentFood] = useState<PetFood | null>(null);
  const [newFood, setNewFood] = useState<PetFood | null>(null);
  const [currentPortion, setCurrentPortion] = useState<string>("");
  const [duration, setDuration] = useState<string>("7");
  const [transitionPlan, setTransitionPlan] = useState<TransitionPlan | null>(null);

  const {
    currentStepIndex,
    isFirstStep,
    isLastStep,
    nextStep,
    previousStep,
    goTo,
  } = useMultiStepForm(4);

  const steps: Step[] = [
    { id: 'current-food', label: 'Current Food', icon: <Utensils className="h-5 w-5" /> },
    { id: 'new-food', label: 'New Food', icon: <ArrowRight className="h-5 w-5" /> },
    { id: 'portion', label: 'Portion', icon: <Scale className="h-5 w-5" /> },
    { id: 'duration', label: 'Duration', icon: <Calendar className="h-5 w-5" /> },
  ];

  // Handle URL parameters for pre-filling data
  const searchParams = useSearchParams();
  useEffect(() => {
    const oldFoodId = searchParams.get('oldFoodId');
    const oldPortion = searchParams.get('oldPortion');
    
    if (oldFoodId) {
      const loadFood = async () => {
        try {
          const foods = await getCachedPetFoods();
          const food = foods.find(f => f.id === oldFoodId);
          if (food) {
            setCurrentFood(food);
          }
        } catch (error) {
          console.error('Failed to load current food:', error);
        }
      };
      loadFood();
    }
    
    if (oldPortion) {
      setCurrentPortion(oldPortion);
    }
  }, [searchParams]);

  const updateFormData = (updates: { currentPortion?: string; duration?: string }) => {
    if (updates.currentPortion !== undefined) {
      setCurrentPortion(updates.currentPortion);
    }
    if (updates.duration !== undefined) {
      setDuration(updates.duration);
    }
  };

  const handleComplete = () => {
    if (currentFood && newFood && currentPortion) {
      const plan = calculateTransition(
        currentFood,
        newFood,
        parseFloat(currentPortion),
        parseInt(duration)
      );
      setTransitionPlan(plan);
    }
  };

  const handleNext = () => {
    // Validate current step before proceeding
    if (currentStepIndex === 0) {
      // Step 1 validation: current food required
      if (!currentFood) {
        return;
      }
    }
    if (currentStepIndex === 1) {
      // Step 2 validation: new food required and different from current
      if (!newFood || newFood.id === currentFood?.id) {
        return;
      }
    }
    if (currentStepIndex === 2) {
      // Step 3 validation: current portion required
      if (!currentPortion || parseFloat(currentPortion) <= 0) {
        return;
      }
    }
    if (currentStepIndex === 3) {
      // Step 4 validation: duration required
      if (!duration) {
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
    setTransitionPlan(null);
    setCurrentFood(null);
    setNewFood(null);
    setCurrentPortion("");
    setDuration("7");
    goTo(0);
  };

  // Show results if transition plan is complete
  if (transitionPlan) {
    return (
      <div>
        <PageBreadcrumb pageTitle="Diet Transition" />
        <div className="max-w-6xl content-spacing">
          <Card className="border-2 border-primary/20 dark:border-primary/20/50 bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-primary dark:text-primary">Transition Schedule</CardTitle>
              <CardDescription className="text-primary/80 dark:text-secondary">
                Day-by-day plan to transition from {transitionPlan.currentFood.brand} {transitionPlan.currentFood.productName} to {transitionPlan.newFood.brand} {transitionPlan.newFood.productName}
              </CardDescription>
            </CardHeader>
            <CardContent className="content-spacing">
              <TransitionScheduleVisualization transitionPlan={transitionPlan} />

              <div className="pt-6 border-t border-primary/30 dark:border-primary/30">
                <div className="p-4 bg-tertiary dark:bg-primary/10 rounded-lg border-2 border-primary/30 dark:border-primary/30">
                  <p className="text-sm font-medium mb-2 text-primary dark:text-primary">Transition Tips:</p>
                  <ul className="text-sm text-primary/80 dark:text-secondary space-y-1 list-disc list-inside">
                    <li>Mix the foods thoroughly before serving</li>
                    <li>Monitor your pet for any digestive issues</li>
                    <li>If issues occur, slow down the transition</li>
                    <li>Ensure fresh water is always available</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-primary/30 dark:border-primary/30">
                <Button onClick={() => window.print()} variant="outline" className="w-full no-print border-primary/30 dark:border-primary/30 text-primary/80 dark:text-secondary hover:bg-tertiary dark:hover:bg-primary/10">
                  <Printer className="mr-2 h-4 w-4" />
                  Print Schedule
                </Button>
                <Button onClick={handleReset} variant="outline" className="w-full no-print border-primary/30 dark:border-primary/30 text-primary/80 dark:text-secondary hover:bg-tertiary dark:hover:bg-primary/10">
                  Create New Transition Plan
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Print-Only Section */}
          <div className="print-only p-8 bg-white">
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Header */}
              <div className="text-center border-b pb-6">
                <h1 className="text-3xl font-bold text-primary mb-2">PetPortions</h1>
                <h2 className="text-2xl font-semibold text-gray-800">Diet Transition Schedule</h2>
              </div>

              {/* Food Information */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600 font-semibold">Current Food</div>
                    <div className="text-lg">{transitionPlan?.currentFood.brand} - {transitionPlan?.currentFood.productName}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 font-semibold">New Food</div>
                    <div className="text-lg">{transitionPlan?.newFood.brand} - {transitionPlan?.newFood.productName}</div>
                  </div>
                </div>
              </div>

              {/* Transition Table */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">Day-by-Day Transition Plan</h3>
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 p-2 text-left bg-gray-100">☐</th>
                      <th className="border border-gray-300 p-2 text-left bg-gray-100">Day</th>
                      <th className="border border-gray-300 p-2 text-left bg-gray-100">Current Food</th>
                      <th className="border border-gray-300 p-2 text-left bg-gray-100">New Food</th>
                      <th className="border border-gray-300 p-2 text-left bg-gray-100">Mix Ratio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transitionPlan?.days.map((day) => (
                      <tr key={day.day}>
                        <td className="border border-gray-300 p-2">☐</td>
                        <td className="border border-gray-300 p-2 font-semibold">Day {day.day}</td>
                        <td className="border border-gray-300 p-2">{day.oldFoodCups}</td>
                        <td className="border border-gray-300 p-2">{day.newFoodCups}</td>
                        <td className="border border-gray-300 p-2">{day.oldFoodPercent}% / {day.newFoodPercent}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Warning Signs */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">Warning Signs to Watch For</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                  <li>Vomiting or nausea</li>
                  <li>Diarrhea or constipation</li>
                  <li>Excessive gas or bloating</li>
                  <li>Refusal to eat</li>
                  <li>Allergic reactions (itching, rashes)</li>
                </ul>
                <p className="text-sm text-gray-600 italic mt-3">
                  If you observe any of these signs, slow down the transition process and consult your veterinarian.
                </p>
              </div>

              {/* Transition Tips */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">Transition Tips</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                  <li>Mix the foods thoroughly before serving</li>
                  <li>Monitor your pet for any digestive issues</li>
                  <li>If issues occur, slow down the transition</li>
                  <li>Ensure fresh water is always available</li>
                </ul>
              </div>

              {/* Disclaimer */}
              <div className="border-t pt-6 text-xs text-gray-600 italic">
                <p className="mb-2">
                  This Diet Transition Schedule is provided for informational purposes only. Every pet is unique and may respond differently to dietary changes. Always consult with your veterinarian before making significant changes to your pet's diet, especially for pets with health conditions, allergies, or digestive sensitivities.
                </p>
                <p>
                  If your pet experiences any adverse reactions during the transition, stop the transition immediately and contact your veterinarian.
                </p>
              </div>

              {/* Date */}
              <div className="text-center text-xs text-gray-600 border-t pt-6">
                <p>Created: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageBreadcrumb pageTitle="Diet Transition" />
      <div className="max-w-4xl">
        <Card className="border-2 border-primary/20 dark:border-primary/20/50 bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-primary dark:text-primary">Diet Transition Planner</CardTitle>
            <CardDescription className="text-primary/80 dark:text-secondary">
              Create a gradual transition plan to switch your pet's food safely
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-8">
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
                  <Step1CurrentFood
                    key="step1"
                    currentFood={currentFood}
                    onFoodSelect={setCurrentFood}
                  />
                )}
                {currentStepIndex === 1 && (
                  <Step2NewFood
                    key="step2"
                    currentFood={currentFood}
                    newFood={newFood}
                    onFoodSelect={setNewFood}
                  />
                )}
                {currentStepIndex === 2 && (
                  <Step3CurrentPortion
                    key="step3"
                    currentPortion={currentPortion}
                    updateData={updateFormData}
                  />
                )}
                {currentStepIndex === 3 && (
                  <Step4Duration
                    key="step4"
                    duration={duration}
                    updateData={updateFormData}
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
                <Button
                  type="submit"
                  disabled={
                    (currentStepIndex === 0 && !currentFood) ||
                    (currentStepIndex === 1 && (!newFood || newFood.id === currentFood?.id)) ||
                    (currentStepIndex === 2 && (!currentPortion || parseFloat(currentPortion) <= 0)) ||
                    (currentStepIndex === 3 && !duration)
                  }
                  className="bg-primary hover:bg-primary/90 text-white disabled:opacity-50"
                >
                  {isLastStep ? "Create Transition Plan" : "Next"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
