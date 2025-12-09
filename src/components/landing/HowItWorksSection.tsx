"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Calculator, ClipboardCheck, PrinterIcon } from "lucide-react";

const steps = [
  {
    number: "1",
    icon: Calculator,
    title: "Enter Your Pet's Info",
    description: "Tell us about your pet - species, weight, age, and activity level. Our multi-step form makes it quick and easy.",
    mockupBg: "bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-950/30 dark:to-purple-900/20",
    mockupContent: (
      <div className="space-y-2 text-left p-4">
        <div className="text-xs font-semibold text-gray-600 dark:text-gray-400">Pet Type</div>
        <div className="flex gap-2">
          <div className="px-3 py-2 bg-primary/20 border-2 border-primary rounded-lg text-sm font-medium">Dog</div>
          <div className="px-3 py-2 bg-gray-100 border-2 border-gray-300 rounded-lg text-sm text-gray-500">Cat</div>
        </div>
        <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 pt-2">Weight</div>
        <div className="flex items-center gap-2">
          <div className="flex-1 px-3 py-2 bg-white border-2 border-primary rounded-lg text-sm font-medium">25</div>
          <div className="px-3 py-2 bg-white border-2 border-gray-300 rounded-lg text-sm">kg</div>
        </div>
      </div>
    ),
  },
  {
    number: "2",
    icon: ClipboardCheck,
    title: "Get Instant Results",
    description: "See your pet's daily caloric needs, recommended portion sizes, and meal breakdown - all calculated using veterinary-approved formulas.",
    mockupBg: "bg-gradient-to-br from-green-100 to-green-50 dark:from-green-950/30 dark:to-green-900/20",
    mockupContent: (
      <div className="space-y-3 text-left p-4">
        <div className="text-center py-3 bg-white dark:bg-gray-800 rounded-lg border-2 border-green-500">
          <div className="text-2xl font-bold text-green-600">842 kcal/day</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Daily Caloric Need</div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="text-center py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-300">
            <div className="text-lg font-bold text-gray-800 dark:text-gray-200">2.5 cups</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Per Day</div>
          </div>
          <div className="text-center py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-300">
            <div className="text-lg font-bold text-gray-800 dark:text-gray-200">1.25 cups</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Per Meal</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: "3",
    icon: PrinterIcon,
    title: "Print & Share",
    description: "Get a professional PDF summary to share with your vet or keep for your records. Track changes over time as your pet grows.",
    mockupBg: "bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-950/30 dark:to-blue-900/20",
    mockupContent: (
      <div className="space-y-2 text-left p-4">
        <div className="flex items-center gap-2 pb-2 border-b-2 border-gray-800 dark:border-gray-200">
          <div className="text-lg font-bold text-gray-800 dark:text-gray-200">PetPortions</div>
        </div>
        <div className="text-xs font-semibold text-gray-800 dark:text-gray-200">Feeding Summary</div>
        <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex justify-between">
            <span>Pet Name:</span>
            <span className="font-medium text-gray-800 dark:text-gray-200">Max</span>
          </div>
          <div className="flex justify-between">
            <span>Daily Calories:</span>
            <span className="font-medium text-gray-800 dark:text-gray-200">842 kcal</span>
          </div>
          <div className="flex justify-between">
            <span>Portion Size:</span>
            <span className="font-medium text-gray-800 dark:text-gray-200">1.25 cups/meal</span>
          </div>
        </div>
        <div className="pt-2 text-center">
          <div className="inline-flex items-center gap-1 px-2 py-1 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 rounded text-xs font-medium">
            <PrinterIcon className="h-3 w-3" />
            Print Ready
          </div>
        </div>
      </div>
    ),
  },
];

export function HowItWorksSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="py-16 md:py-24 lg:py-32 px-4 bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-h1 mb-4 text-primary dark:text-primary">
            How It Works
          </h2>
          <p className="text-body-lg text-secondary dark:text-secondary max-w-2xl mx-auto">
            Get personalized feeding recommendations in three simple steps
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          className="space-y-8 md:space-y-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 md:gap-8 items-center`}
              >
                {/* Content Side */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 dark:bg-primary/30 border-2 border-primary flex items-center justify-center">
                      <span className="text-xl font-bold text-primary dark:text-primary">{step.number}</span>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-tertiary dark:bg-tertiary/30 border-2 border-primary/30 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary dark:text-primary" />
                    </div>
                  </div>
                  <h3 className="text-h3 mb-3 text-primary dark:text-primary">{step.title}</h3>
                  <p className="text-body-md text-secondary dark:text-secondary max-w-md mx-auto md:mx-0">
                    {step.description}
                  </p>
                </div>

                {/* Mockup Side */}
                <div className="flex-1 w-full max-w-sm">
                  <Card className={`${step.mockupBg} border-2 border-primary/30 dark:border-primary/30 shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300`}>
                    <CardContent className="p-0">
                      {step.mockupContent}
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

