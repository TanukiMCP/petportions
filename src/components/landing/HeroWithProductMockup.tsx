"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calculator, ClipboardCheck, ArrowRight, CheckCircle2, Flame, Utensils, Calendar, PawPrint, Scale, HeartPulse, Zap } from "lucide-react";
import { motion } from "framer-motion";

export function HeroWithProductMockup() {
  const dailyKcal = 842;
  const mealsPerDay = 2;
  const perMealKcal = Math.round(dailyKcal / mealsPerDay);
  const rerKcal = 550;
  const merKcal = 750;

  const percentOfDaily = (value: number) => {
    const pct = (value / dailyKcal) * 100;
    return `${Math.max(0, Math.min(100, pct))}%`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <section className="relative px-4 py-16 md:py-20 lg:py-24 bg-[#f8f6f2]">
      <div className="container mx-auto max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-start lg:items-center">
          {/* Left: Copy + CTAs */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-display-md lg:text-display-lg mb-5 font-semibold leading-tight text-gray-900"
            >
              Know <span className="text-primary">Exactly How Much</span> to Feed Your Pet
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="text-body-lg text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Vet-grade nutrition calculators and food analysis tools to help you make
              informed decisions about your pet's diet. Simple, science-backed, and
              trusted by pet parents.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8"
            >
              <Link href="/calculator">
                <Button
                  size="lg"
                  className="gap-2 group bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all duration-200 px-6 py-5"
                >
                  <Calculator className="h-5 w-5" />
                  Try Calculator
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/food-grader">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 group px-6 py-5 border border-gray-200 text-primary bg-white hover:bg-primary/5 transition-all duration-200"
                >
                  <ClipboardCheck className="h-5 w-5" />
                  Grade Your Food
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center lg:justify-start gap-3 pt-6"
            >
              {[
                "RER/MER Formulas",
                "AAFCO Standards",
                "100% Free",
              ].map((label) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200"
                >
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-body-sm font-medium text-gray-700">{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Product Mockup - Simplified Calculator UI */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative max-h-[600px]"
          >
            {/* Browser Window Frame */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Browser Chrome */}
              <div className="bg-gray-50 px-4 py-3 flex items-center gap-2 border-b border-gray-200">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-primary/70" />
                </div>
                <div className="flex-1 ml-4">
                  <div className="bg-white rounded px-3 py-1 text-xs text-gray-500 border border-gray-200">
                    petportions.com/calculator
                  </div>
                </div>
              </div>

              {/* Calculator Results Mockup */}
              <div className="p-6 space-y-4 bg-[#fdfbf7]">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-gray-900">Pet Details</p>
                    <p className="text-xs text-gray-500">Signalment</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs text-gray-500">Species</label>
                      <div className="flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
                        <PawPrint className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-gray-900">Dog</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-500">Weight</label>
                      <div className="flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
                        <Scale className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-gray-900">25 lb</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-500">Life Stage</label>
                      <div className="flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
                        <HeartPulse className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-gray-900">Adult</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-500">Activity</label>
                      <div className="flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
                        <Zap className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-gray-900">Moderate</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats Grid - matches actual design */}
                <div className="grid grid-cols-3 gap-3">
                  {/* Daily Calories */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="p-2 bg-primary/10 rounded-full">
                          <Flame className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Daily Calories</span>
                        <p className="text-2xl font-bold text-primary">{dailyKcal}</p>
                        <p className="text-xs text-gray-500">kcal/day</p>
                      </div>
                    </div>
                  </div>

                  {/* Per Meal */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="p-2 bg-primary/10 rounded-full">
                          <Utensils className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Per Meal</p>
                        <p className="text-2xl font-bold">{perMealKcal}</p>
                        <p className="text-xs text-gray-500">kcal</p>
                      </div>
                    </div>
                  </div>

                  {/* Meals Per Day */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="p-2 bg-primary/10 rounded-full">
                          <Calendar className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Meals/Day</p>
                        <p className="text-2xl font-bold">{mealsPerDay}</p>
                        <p className="text-xs text-gray-500">Twice daily</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Energy Bars - Visual representation */}
                <div className="bg-white rounded-lg p-4 border border-gray-200 space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-gray-700">RER (Resting Energy)</span>
                      <span className="text-xs font-bold text-gray-700">{rerKcal} kcal</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: percentOfDaily(rerKcal) }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-gray-700">MER (Maintenance Energy)</span>
                      <span className="text-xs font-bold text-gray-700">{merKcal} kcal</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary/60 h-2 rounded-full" style={{ width: percentOfDaily(merKcal) }} />
                    </div>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-primary">Recommended Daily Intake</span>
                      <span className="text-sm font-bold text-primary">{dailyKcal} kcal</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Based on activity level and life stage</p>
                  </div>
                </div>

                {/* CTA Button inside mockup */}
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                  <button className="w-full bg-primary text-white py-3 px-4 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm">
                    Print Summary
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating accent card - repositioned to avoid overlap */}
        <div className="hidden lg:flex justify-end mt-6">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Results</p>
                <p className="text-sm font-semibold text-gray-900">Instant & Accurate</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

