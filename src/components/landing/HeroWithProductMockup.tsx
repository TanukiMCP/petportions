"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calculator, ClipboardCheck, ArrowRight, CheckCircle2, Flame, Utensils, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export function HeroWithProductMockup() {
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
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative px-4 py-16 md:py-20 lg:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start lg:items-center">
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
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-primary dark:text-primary"
            >
              Know Exactly How Much to Feed Your Pet
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-secondary dark:text-secondary mb-8 leading-relaxed"
            >
              Vet-grade nutrition calculators and food analysis tools to help you make
              informed decisions about your pet's diet. Simple, science-backed, and
              trusted by pet parents.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <Link href="/calculator">
                <Button
                  size="lg"
                  className="gap-2 group hover:shadow-lg transition-all duration-300 bg-primary hover:bg-primary/90 text-primary-foreground"
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
                  className="gap-2 group hover:shadow-lg transition-all duration-300 border-2 border-primary/30 dark:border-primary/30 text-primary hover:bg-tertiary dark:hover:bg-tertiary/30"
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
              className="flex flex-wrap justify-center lg:justify-start gap-4 pt-8 border-t border-primary/20 dark:border-primary/20"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border-2 border-primary/20 dark:border-primary/20">
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-body-sm font-semibold text-gray-700 dark:text-gray-300">
                  RER/MER Formulas
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border-2 border-primary/20 dark:border-primary/20">
                <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-body-sm font-semibold text-gray-700 dark:text-gray-300">
                  AAFCO Standards
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border-2 border-primary/20 dark:border-primary/20">
                <CheckCircle2 className="h-4 w-4 text-primary dark:text-primary" />
                <span className="text-body-sm font-semibold text-gray-700 dark:text-gray-300">
                  100% Free
                </span>
              </div>
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
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Browser Chrome */}
              <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 flex items-center gap-2 border-b border-gray-200 dark:border-gray-600">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 ml-4">
                  <div className="bg-white dark:bg-gray-600 rounded px-3 py-1 text-xs text-gray-500 dark:text-gray-300">
                    petportions.com/calculator
                  </div>
                </div>
              </div>

              {/* Calculator Results Mockup */}
              <div className="p-6 space-y-4 bg-tertiary dark:bg-gray-900">
                {/* Stats Grid - matches actual design */}
                <div className="grid grid-cols-3 gap-3">
                  {/* Daily Calories */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="p-2 bg-primary/10 rounded-full">
                          <Flame className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Daily Calories</p>
                        <p className="text-2xl font-bold text-primary">842</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">kcal/day</p>
                      </div>
                    </div>
                  </div>

                  {/* Per Meal */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="p-2 bg-primary/10 rounded-full">
                          <Utensils className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Per Meal</p>
                        <p className="text-2xl font-bold">421</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">kcal</p>
                      </div>
                    </div>
                  </div>

                  {/* Meals Per Day */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="p-2 bg-primary/10 rounded-full">
                          <Calendar className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Meals/Day</p>
                        <p className="text-2xl font-bold">2</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Twice daily</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Bars - Visual representation */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">RER (Resting Energy)</span>
                      <span className="text-xs font-bold text-gray-700 dark:text-gray-300">550 kcal</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "65%" }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">MER (Maintenance Energy)</span>
                      <span className="text-xs font-bold text-gray-700 dark:text-gray-300">750 kcal</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-accent h-2 rounded-full" style={{ width: "89%" }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-primary dark:text-primary">Daily Total</span>
                      <span className="text-xs font-bold text-primary dark:text-primary">842 kcal</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "100%" }} />
                    </div>
                  </div>
                </div>

                {/* CTA Button inside mockup */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <button className="w-full bg-primary text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
                    Print Summary
                  </button>
                </div>
              </div>
            </div>

            {/* Floating accent card */}
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl border-2 border-primary/30 dark:border-primary/30 p-4 hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Results</p>
                  <p className="text-sm font-bold">Instant & Accurate</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

