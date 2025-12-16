"use client";
import React, { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, Printer, Dog, Cat, Calendar, Utensils, Calculator } from "lucide-react";
import { useCalculationHistory } from "@/context/CalculationHistoryContext";
import Link from "next/link";
import { FoodGraderResultsVisualization } from "@/components/food-grader/FoodGraderResultsVisualization";
import { AnimatePresence } from "framer-motion";
import { StepIndicator, type Step } from "@/components/ui/step-indicator";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { Step1Species } from "@/components/food-grader/Step1Species";
import { Step2LifeStage } from "@/components/food-grader/Step2LifeStage";
import { Step3FoodSelection } from "@/components/food-grader/Step3FoodSelection";
import { gradeFood } from "@/lib/grading/score";
import type { PetFood } from "@/lib/types/food";
import type { Species, LifeStage } from "@/lib/types/calculator";
import type { GradingResult } from "@/lib/types/grading";

export default function FoodGraderPage() {
  const { addCalculation } = useCalculationHistory();
  const [species, setSpecies] = useState<'dog' | 'cat'>('dog');
  const [lifeStage, setLifeStage] = useState<LifeStage>('adult');
  const [selectedFood, setSelectedFood] = useState<PetFood | null>(null);
  const [gradingResult, setGradingResult] = useState<GradingResult | null>(null);
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);

  const {
    currentStepIndex,
    isFirstStep,
    isLastStep,
    nextStep,
    previousStep,
    goTo,
  } = useMultiStepForm(3);

  const steps: Step[] = [
    { id: 'species', label: 'Species', icon: <Dog className="h-5 w-5" /> },
    { id: 'life-stage', label: 'Life Stage', icon: <Calendar className="h-5 w-5" /> },
    { id: 'food', label: 'Food Selection', icon: <Utensils className="h-5 w-5" /> },
  ];

  const updateFormData = (updates: { species?: Species; lifeStage?: LifeStage }) => {
    if (updates.species !== undefined) {
      setSpecies(updates.species);
    }
    if (updates.lifeStage !== undefined) {
      setLifeStage(updates.lifeStage);
    }
  };

  const handleComplete = () => {
    if (selectedFood) {
      const result = gradeFood(selectedFood, species, lifeStage);
      setGradingResult(result);
      
      // Record calculation in history
      addCalculation({
        type: 'grader',
        data: {
          species,
          lifeStage,
          foodName: selectedFood.productName,
          foodBrand: selectedFood.brand,
        },
        result: result,
      });
    }
  };

  const handleNext = () => {
    // Validate current step before proceeding
    if (currentStepIndex === 1) {
      // Step 2 validation: life stage required
      if (!lifeStage) {
        return;
      }
    }
    if (currentStepIndex === 2) {
      // Step 3 validation: food selection required
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
    setGradingResult(null);
    setSelectedFood(null);
    setSpecies('dog');
    setLifeStage('adult');
    goTo(0);
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A':
        return 'bg-green-500 text-white';
      case 'B':
        return 'bg-green-400 text-white';
      case 'C':
        return 'bg-yellow-500 text-white';
      case 'D':
        return 'bg-tertiary0 text-white';
      case 'F':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  // Show results if grading is complete
  if (gradingResult) {
    return (
      <div>
        <PageBreadcrumb pageTitle="Food Quality Grader" />
        <div className="max-w-6xl">
          <div className="space-y-6">
            <Card className="border-2 border-primary/20 dark:border-primary/20/50 bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-primary dark:text-primary">Food Quality Analysis Results</CardTitle>
                <CardDescription className="text-primary/80 dark:text-secondary">
                  {selectedFood?.brand} - {selectedFood?.productName}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FoodGraderResultsVisualization
                  gradingResult={gradingResult}
                  selectedFood={selectedFood}
                />

                {/* Methodology */}
                <div className="pt-6 border-t">
                  <Collapsible
                    open={isMethodologyOpen}
                    onOpenChange={setIsMethodologyOpen}
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-semibold">
                      <span>Grading Methodology</span>
                      {isMethodologyOpen ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-4 space-y-3 text-sm text-muted-foreground">
                      <div>
                        <div className="font-medium mb-1">AAFCO Compliance (25%):</div>
                        <div>Meets Association of American Feed Control Officials standards for complete and balanced nutrition.</div>
                      </div>
                      <div>
                        <div className="font-medium mb-1">Protein Quality (25%):</div>
                        <div>Evaluates protein source quality and appropriateness for the target species.</div>
                      </div>
                      <div>
                        <div className="font-medium mb-1">Ingredient Quality (20%):</div>
                        <div>Assesses the quality and sourcing of ingredients used in the formula.</div>
                      </div>
                      <div>
                        <div className="font-medium mb-1">Nutritional Balance (15%):</div>
                        <div>Reviews the balance of macronutrients and micronutrients.</div>
                      </div>
                      <div>
                        <div className="font-medium mb-1">Safety Flags (15%):</div>
                        <div>Identifies potential safety concerns, recalls, or problematic ingredients.</div>
                      </div>
                      <div className="pt-2 border-t text-xs italic">
                        Note: This is a simplified scoring system. Always consult with a veterinarian for specific dietary recommendations.
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>

                <div className="flex gap-3 pt-4 border-t border-primary/30 dark:border-primary/30">
                  <Button onClick={() => window.print()} variant="outline" className="w-full no-print border-primary/30 dark:border-primary/30 text-primary/80 dark:text-secondary hover:bg-tertiary dark:hover:bg-primary/10">
                    <Printer className="mr-2 h-4 w-4" />
                    Print Report
                  </Button>
                  <Link href={`/calculator?foodId=${selectedFood?.id}`}>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                      <Calculator className="mr-2 h-4 w-4" />
                      Calculate Portions for This Food
                    </Button>
                  </Link>
                  <Button onClick={handleReset} variant="outline" className="w-full no-print border-primary/30 dark:border-primary/30 text-primary/80 dark:text-secondary hover:bg-tertiary dark:hover:bg-primary/10">
                    Analyze Another Food
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
                  <p className="text-gray-600">Food Quality Analysis Report</p>
                </div>

                {/* Food Information */}
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">Brand</div>
                  <div className="text-lg font-semibold">{selectedFood?.brand}</div>
                  <div className="text-sm text-gray-600 mt-3">Product</div>
                  <div className="text-lg font-semibold">{selectedFood?.productName}</div>
                </div>

                {/* Overall Grade */}
                <div className="text-center py-8 border-y">
                  <div className="text-6xl font-bold mb-4 text-gray-800">
                    {gradingResult.overallGrade}
                  </div>
                  <div className="text-xl font-semibold text-gray-800 mb-2">
                    Overall Score: {gradingResult.overallScore}/100
                  </div>
                  <div className="text-sm text-gray-600">
                    {gradingResult.overallGrade === 'A' && 'Excellent nutritional quality'}
                    {gradingResult.overallGrade === 'B' && 'Good nutritional quality'}
                    {gradingResult.overallGrade === 'C' && 'Average nutritional quality'}
                    {gradingResult.overallGrade === 'D' && 'Below average nutritional quality'}
                    {gradingResult.overallGrade === 'F' && 'Poor nutritional quality'}
                  </div>
                </div>

                {/* Category Breakdown */}
                <div className="space-y-3">
                  <h2 className="text-lg font-semibold text-gray-800">Category Scores</h2>
                  {gradingResult.categories.map((category) => (
                    <div key={category.name} className="flex justify-between border-b pb-2 text-gray-700">
                      <span>{category.name}</span>
                      <span className="font-semibold">{category.score}/100</span>
                    </div>
                  ))}
                </div>

                {/* Positives */}
                {gradingResult.positives.length > 0 && (
                  <div className="space-y-2">
                    <h2 className="text-lg font-semibold text-gray-800">Strengths</h2>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {gradingResult.positives.map((positive, idx) => (
                        <li key={idx}>{positive}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Concerns */}
                {gradingResult.concerns.length > 0 && (
                  <div className="space-y-2">
                    <h2 className="text-lg font-semibold text-gray-800">Areas for Consideration</h2>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {gradingResult.concerns.map((concern, idx) => (
                        <li key={idx}>{concern}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Disclaimer */}
                <div className="border-t pt-6 text-xs text-gray-600 italic">
                  <p className="mb-2">
                    This Food Quality Analysis Report is provided for informational purposes only. The grading system is based on general nutritional principles and AAFCO guidelines. It is not a substitute for professional veterinary advice.
                  </p>
                  <p>
                    Always consult with a veterinarian before making changes to your pet's diet, especially for pets with specific health conditions or dietary requirements.
                  </p>
                </div>

                {/* Date */}
                <div className="text-center text-xs text-gray-600 border-t pt-6">
                  <p>Report Generated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageBreadcrumb pageTitle="Food Quality Grader" />
      <div className="max-w-4xl">
        <Card className="border-2 border-primary/20 dark:border-primary/20/50 bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-primary dark:text-primary">Food Quality Analysis</CardTitle>
            <CardDescription className="text-primary/80 dark:text-secondary">
              Analyze pet food quality based on AAFCO guidelines and nutritional standards
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
                  <Step1Species
                    key="step1"
                    species={species}
                    updateData={updateFormData}
                    goToNext={handleNext}
                  />
                )}
                {currentStepIndex === 1 && (
                  <Step2LifeStage
                    key="step2"
                    species={species}
                    lifeStage={lifeStage}
                    updateData={updateFormData}
                  />
                )}
                {currentStepIndex === 2 && (
                  <Step3FoodSelection
                    key="step3"
                    species={species}
                    selectedFood={selectedFood}
                    onFoodSelect={setSelectedFood}
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
                <Button type="submit" disabled={currentStepIndex === 2 && !selectedFood} className="bg-primary hover:bg-primary/90 text-white disabled:opacity-50">
                  {isLastStep ? "Analyze Food" : "Next"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
