"use client";

import React from "react";
import Link from "next/link";
import { Calculator, ClipboardCheck, ArrowRightLeft, Database, ShieldCheck, HardDrive, ArrowRight, PawPrint, Scale, BookOpen, FileText, CheckCircle2, AlertCircle, Utensils, Activity, Target, ShieldAlert, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import BasicSection from "@/components/landing/BasicSection";
import { MER_MULTIPLIERS } from "@/lib/calculations/constants";
import { calculateRER } from "@/lib/calculations/feeding";
import { GRADING_CRITERIA } from "@/lib/grading/criteria";

export default function HowItWorksPage() {
  const exampleWeightLb = 25;
  const exampleWeightKg = exampleWeightLb * 0.453592;
  const exampleRer = Math.round(calculateRER(exampleWeightKg));
  const exampleMerMultiplier = MER_MULTIPLIERS.dog.adult.neutered.moderate;
  const exampleDailyKcal = Math.round(exampleRer * exampleMerMultiplier);

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-tertiary dark:bg-gray-800/50">
        <div className="container mx-auto px-4 text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 border-2 border-primary/30 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-bold text-primary dark:text-primary uppercase tracking-wide">
              How It Works
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-display-sm md:text-display-md text-primary dark:text-primary mb-6 font-bold leading-tight"
          >
            Science-Based Pet Nutrition
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-secondary dark:text-secondary max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Understand the veterinary science behind our calculators and how they help you make informed feeding decisions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/calculator">
              <Button size="lg" className="gap-2 group bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 text-base px-8 py-6 transform hover:scale-105">
                <Calculator className="h-5 w-5" />
                Try Calculator
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
            <Link href="/food-grader">
              <Button size="lg" variant="outline" className="gap-2 border-2 border-primary/30 dark:border-primary/30 text-primary hover:bg-tertiary dark:hover:bg-tertiary/30 text-base px-8 py-6 transform hover:scale-105 transition-all duration-300">
                <ClipboardCheck className="h-5 w-5" />
                Grade Your Food
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <BasicSection
        imageUrl="https://raw.githubusercontent.com/quentincaffeino/manypixels-illustrations/main/packages/svg/src/outline/AnalyzingProcess.svg"
        imageClassName="grayscale saturate-0 opacity-90"
        title="Feeding Calculator: RER → MER"
        overTitle="Core Method"
      >
        <p>
          The calculator uses Resting Energy Requirement (RER) as a baseline, then applies a Maintenance Energy
          Requirement (MER) multiplier based on life stage, reproductive status, and activity level.
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
            <p className="text-xs font-semibold text-secondary dark:text-secondary">Step 1</p>
            <p className="text-h5 font-bold mt-1">Calculate RER</p>
            <p className="text-sm text-secondary dark:text-secondary mt-2">
              <span className="font-mono">70 × (weight in kg)^0.75</span>
            </p>
          </div>
          <div className="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
            <p className="text-xs font-semibold text-secondary dark:text-secondary">Step 2</p>
            <p className="text-h5 font-bold mt-1">Apply MER</p>
            <p className="text-sm text-secondary dark:text-secondary mt-2">RER × multiplier</p>
          </div>
          <div className="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
            <p className="text-xs font-semibold text-secondary dark:text-secondary">Step 3</p>
            <p className="text-h5 font-bold mt-1">Divide per meal</p>
            <p className="text-sm text-secondary dark:text-secondary mt-2">Based on SID/BID/TID</p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border-2 border-primary/20 bg-primary/5 dark:bg-primary/10 p-6">
          <div className="flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-primary dark:text-primary mb-1">Worked example</p>
              <p className="text-body-md text-secondary dark:text-secondary">
                Dog, adult, neutered, moderate activity — {exampleWeightLb} lb ({exampleWeightKg.toFixed(1)} kg)
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-primary/20 p-4">
                <p className="text-xs text-secondary dark:text-secondary">RER</p>
                <p className="text-lg font-bold">{exampleRer} kcal/day</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-primary/20 p-4">
                <p className="text-xs text-secondary dark:text-secondary">MER</p>
                <p className="text-lg font-bold">× {exampleMerMultiplier}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-primary/20 p-4">
                <p className="text-xs text-secondary dark:text-secondary">Daily target</p>
                <p className="text-lg font-bold text-primary">{exampleDailyKcal} kcal/day</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <Activity className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-primary dark:text-primary">Where the multiplier comes from</p>
                <p className="text-sm text-secondary dark:text-secondary mt-1">
                  Values are selected from a species + life-stage table (e.g. dog adult neutered moderate = {MER_MULTIPLIERS.dog.adult.neutered.moderate}×).
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-primary dark:text-primary">How to use it responsibly</p>
                <p className="text-sm text-secondary dark:text-secondary mt-1">
                  Treat results as a baseline, then adjust based on body condition and your veterinarian’s guidance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </BasicSection>

      {/* Detailed Breakdown Section */}
      <section className="py-16 md:py-24 bg-tertiary dark:bg-gray-800/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Calculator Card */}
            <Card className="border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 group">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 transition-colors">
                    <Calculator className="h-8 w-8 text-primary dark:text-primary" />
                  </div>
                  <h3 className="text-h4 font-bold text-gray-900 dark:text-gray-100">Feeding Calculator</h3>
                </div>
                
                <div className="text-body-md text-secondary dark:text-secondary space-y-4">
                  <p>The calculator estimates daily calories using the two-step veterinary standard:</p>
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700 space-y-3">
                    <div>
                      <span className="font-bold text-primary">1. RER (Resting Energy Requirement)</span>
                      <p className="text-sm font-mono mt-1 text-gray-600 dark:text-gray-400">70 × (weight in kg)^0.75</p>
                    </div>
                    <div>
                      <span className="font-bold text-primary">2. MER (Maintenance Energy Requirement)</span>
                      <p className="text-sm mt-1">RER × Multiplier (based on life stage, activity, status)</p>
                    </div>
                  </div>
                  <p className="text-sm text-secondary/80">
                    You can enter weight in kg or lbs. Meal calories are automatically divided by your selected feeding frequency.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Portion Math Card */}
            <Card className="border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 group">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 transition-colors">
                    <Utensils className="h-8 w-8 text-primary dark:text-primary" />
                  </div>
                  <h3 className="text-h4 font-bold text-gray-900 dark:text-gray-100">Portion Mathematics</h3>
                </div>
                
                <div className="text-body-md text-secondary dark:text-secondary space-y-4">
                  <p>We convert daily calories into practical food portions using the food's specific energy density:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>Cups/day = Daily Kcal ÷ Kcal/cup</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>Cups/meal = Cups/day ÷ Meals/day</span>
                    </li>
                  </ul>
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <p className="text-sm font-medium text-primary">Smart Rounding:</p>
                    <p className="text-sm text-secondary/80 mt-1">
                      Results are rounded to common measuring fractions (1/4, 1/3, 1/2) for practicality, with gram estimates provided for accuracy.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Food Grader Card */}
            <Card className="border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 group">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 transition-colors">
                    <ClipboardCheck className="h-8 w-8 text-primary dark:text-primary" />
                  </div>
                  <h3 className="text-h4 font-bold text-gray-900 dark:text-gray-100">Food Grading System</h3>
                </div>
                
                <div className="text-body-md text-secondary dark:text-secondary space-y-4">
                  <p>
                    The grader evaluates guaranteed analysis, ingredient disclosures, calorie density, and safety flags to produce a weighted score:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-start gap-3 bg-gray-50 dark:bg-gray-900/50 p-3 rounded">
                      <div className="p-1.5 rounded-full bg-primary/10">
                        <ListChecks className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">AAFCO Compliance</p>
                        <p className="text-xs text-secondary/80">{GRADING_CRITERIA.aafcoCompliance.weight}% weight</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-gray-50 dark:bg-gray-900/50 p-3 rounded">
                      <div className="p-1.5 rounded-full bg-primary/10">
                        <Utensils className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">Protein Quality</p>
                        <p className="text-xs text-secondary/80">{GRADING_CRITERIA.proteinQuality.weight}% weight</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-gray-50 dark:bg-gray-900/50 p-3 rounded">
                      <div className="p-1.5 rounded-full bg-primary/10">
                        <BookOpen className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">Ingredient Quality</p>
                        <p className="text-xs text-secondary/80">{GRADING_CRITERIA.ingredientQuality.weight}% weight</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-gray-50 dark:bg-gray-900/50 p-3 rounded">
                      <div className="p-1.5 rounded-full bg-primary/10">
                        <ShieldAlert className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">Safety Flags</p>
                        <p className="text-xs text-secondary/80">{GRADING_CRITERIA.safetyFlags.weight}% weight</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-secondary/60 italic mt-2">
                    *This is an informational scoring system for comparison and not a substitute for veterinary advice.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Diet Transition Card */}
            <Card className="border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 group">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 transition-colors">
                    <ArrowRightLeft className="h-8 w-8 text-primary dark:text-primary" />
                  </div>
                  <h3 className="text-h4 font-bold text-gray-900 dark:text-gray-100">Transition Planner</h3>
                </div>
                
                <div className="text-body-md text-secondary dark:text-secondary space-y-4">
                  <p>
                    Builds a safe, gradual transition schedule to prevent digestive upset when switching foods.
                  </p>
                  <div className="flex items-center justify-between gap-2 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    <div className="text-center">
                      <div className="text-xs text-gray-500">Day 1</div>
                      <div className="font-bold text-primary">25% New</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-300" />
                    <div className="text-center">
                      <div className="text-xs text-gray-500">Day 3</div>
                      <div className="font-bold text-primary">50% New</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-300" />
                    <div className="text-center">
                      <div className="text-xs text-gray-500">Day 7</div>
                      <div className="font-bold text-primary">100% New</div>
                    </div>
                  </div>
                  <p className="text-sm">
                    The tool calculates exact cup fractions for both old and new food for every day of the transition.
                  </p>
                </div>
              </CardContent>
            </Card>

          </div>

          <div className="pt-16 text-center">
            <Link href="/resources" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors">
              <ArrowRightLeft className="h-4 w-4 rotate-180" />
              Back to Resources Hub
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
