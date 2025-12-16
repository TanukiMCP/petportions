"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Calendar,
  ChevronsUpDown,
  Flame,
  Heart,
  HeartPulse,
  PawPrint,
  PrinterIcon,
  Scale,
  Search,
  Utensils,
  Zap,
} from "lucide-react";

const steps = [
  {
    number: "1",
    title: "Confirm Pet Details",
    description: "Pick a saved pet (or add one) to prefill the basics in seconds. Double-check weight, life stage, and activity level so the math matches your real life. Small details here lead to more accurate portions.",
    mockupBg: "bg-[#fdfbf7] dark:bg-gray-900",
    mockupContent: (
      <div className="space-y-3 text-left p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">Your pets</div>
            <div className="text-xs font-medium text-gray-600 dark:text-gray-400">Quick select to prefill info</div>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Step 1 of 3</div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-primary/25 bg-primary/5 p-2.5">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <PawPrint className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-tight">Max</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Dog • 25 lb</div>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 p-2.5">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <PawPrint className="h-4 w-4 text-gray-500 dark:text-gray-300" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-tight">Luna</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Cat • 10 lb</div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/60 p-3 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 items-stretch gap-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">Signalment</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Selected</div>
              </div>

              <div className="space-y-1.5">
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-800/60 px-3 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <PawPrint className="h-4 w-4 text-gray-500 dark:text-gray-400 shrink-0" />
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Species</span>
                  </div>
                  <span className="text-sm font-extrabold text-gray-900 dark:text-gray-100">Dog</span>
                </div>
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-800/60 px-3 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Scale className="h-4 w-4 text-gray-500 dark:text-gray-400 shrink-0" />
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Weight</span>
                  </div>
                  <span className="text-sm font-extrabold text-gray-900 dark:text-gray-100">25 lb</span>
                </div>
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-800/60 px-3 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HeartPulse className="h-4 w-4 text-gray-500 dark:text-gray-400 shrink-0" />
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Age</span>
                  </div>
                  <span className="text-sm font-extrabold text-gray-900 dark:text-gray-100">Adult</span>
                </div>
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-800/60 px-3 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-gray-500 dark:text-gray-400 shrink-0" />
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Status</span>
                  </div>
                  <span className="text-sm font-extrabold text-gray-900 dark:text-gray-100">Intact</span>
                </div>
              </div>
            </div>

            <div className="flex h-full flex-col">
              <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">Lifestyle</div>

              <div className="flex-1 flex flex-col gap-2">
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">Activity</div>
                  <div className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" />
                      Moderate
                    </div>
                    <ChevronsUpDown className="h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div className="mt-auto border-t-2 border-primary/25 dark:border-primary/30 pt-2 space-y-1.5">
                  <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">Meals/day</div>
                  <div className="space-y-1.5">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 px-3 py-1.5 text-center text-sm font-semibold text-gray-800 dark:text-gray-100">
                        1
                      </div>
                      <div className="rounded-lg border border-primary/25 bg-primary/5 px-3 py-1.5 text-center text-sm font-semibold text-primary">
                        2
                      </div>
                      <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 px-3 py-1.5 text-center text-sm font-semibold text-gray-800 dark:text-gray-100">
                        3
                      </div>
                    </div>
                    <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 px-3 py-1.5 text-center text-sm font-semibold text-gray-800 dark:text-gray-100">
                      Every 12 hours
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: "2",
    title: "Select Your Pet Food",
    description: "Search our food database by brand and product name to match what’s in your pantry. If your food isn’t listed, enter the kcal per cup from the label on the bag. We’ll use that to translate calories into practical cups per meal.",
    mockupBg: "bg-[#fdfbf7] dark:bg-gray-900",
    mockupContent: (
      <div className="space-y-3 text-left p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">Select Your Pet's Food</div>
            <div className="text-xs font-medium text-gray-600 dark:text-gray-400">Search database or enter manually</div>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Step 2 of 3</div>
        </div>

        <div className="space-y-3">
          <div className="space-y-1.5">
            <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">Search database</div>
            <div className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm font-medium text-gray-900 dark:text-gray-100">
              <div className="flex items-center gap-2 min-w-0">
                <Search className="h-4 w-4 text-gray-500 dark:text-gray-300" />
                <span className="truncate">Hill's - Science Diet Adult</span>
              </div>
              <ChevronsUpDown className="h-4 w-4 text-gray-400" />
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              372 kcal/cup • Dog • Adult
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900/50 px-3 py-2 shadow-sm">
            <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">Hill's - Science Diet Adult</div>
            <div className="mt-1 flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-gray-700 dark:text-gray-200">372 kcal/cup</span>
              <span>•</span>
              <span>Dog</span>
              <span>•</span>
              <span>Adult</span>
            </div>
            <div className="mt-1 text-xs font-semibold text-primary">✓ From our food database</div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">OR</div>
            <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
          </div>

          <div className="space-y-1.5">
            <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">Enter manually</div>
            <div className="flex gap-2">
              <div className="flex-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2">
                <div className="text-[11px] text-gray-500 dark:text-gray-400">kcal per cup</div>
                <div className="mt-0.5 text-base font-semibold text-gray-900 dark:text-gray-100">372</div>
              </div>
              <div className="w-28 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2">
                <div className="text-[11px] text-gray-500 dark:text-gray-400">Unit</div>
                <div className="mt-0.5 text-base font-semibold text-gray-900 dark:text-gray-100">kcal/cup</div>
              </div>
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">From the label on your bag.</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: "3",
    title: "Print & Share",
    description: "Review a clear breakdown of daily calories and per-meal targets in seconds. Download a clean PDF summary you can save, share with your vet, or keep for your records. Re-run anytime as weight, activity, or food changes.",
    mockupBg: "bg-[#fdfbf7] dark:bg-gray-900",
    mockupContent: (
      <div className="space-y-4 text-left p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">Results</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Calculated instantly</div>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Step 3 of 3</div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-800/60 px-3 py-2">
            <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
              <Flame className="h-3.5 w-3.5 text-primary" />
              Daily
            </div>
            <div className="mt-1 text-xl font-bold text-primary">842</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">kcal/day</div>
          </div>
          <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-800/60 px-3 py-2">
            <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
              <Utensils className="h-3.5 w-3.5 text-primary" />
              Per meal
            </div>
            <div className="mt-1 text-xl font-bold text-gray-900 dark:text-gray-100">421</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">kcal</div>
          </div>
          <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-800/60 px-3 py-2">
            <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
              <Calendar className="h-3.5 w-3.5 text-primary" />
              Meals/day
            </div>
            <div className="mt-1 text-xl font-bold text-gray-900 dark:text-gray-100">2</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">meals/day</div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">Feeding Summary</div>
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Export a PDF for your vet</div>
            </div>
            <div className="pointer-events-none select-none cursor-default inline-flex items-center gap-1 px-2.5 py-1.5 bg-gray-50 text-gray-600 border border-gray-200/80 rounded-md text-xs font-semibold shadow-none opacity-90">
              <PrinterIcon className="h-3.5 w-3.5 text-gray-400" />
              Download PDF
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-800/60 px-3 py-2">
          <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">Portions</div>
          <div className="mt-1 grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center justify-between rounded-md border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 px-2.5 py-1.5">
              <span>Per meal</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">1.25 cups</span>
            </div>
            <div className="flex items-center justify-between rounded-md border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 px-2.5 py-1.5">
              <span>Per day</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">2.5 cups</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

export function HowItWorksSection() {
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 1, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 px-4 bg-[#f8f6f2] dark:bg-gray-900">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-h1 font-extrabold text-gray-900 dark:text-gray-100 mb-4">
            How It Works
          </h2>
          <div className="mx-auto mb-4 h-1 w-16 rounded-full bg-primary/30" />
          <p className="text-body-md md:text-body-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
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
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className={`max-w-6xl mx-auto grid grid-cols-1 ${
                  isEven
                    ? "md:grid-cols-[minmax(0,1fr)_minmax(0,420px)]"
                    : "md:grid-cols-[minmax(0,420px)_minmax(0,1fr)]"
                } gap-8 md:gap-8 lg:gap-10 items-start md:items-center rounded-3xl bg-white/60 dark:bg-gray-900/40 border border-white/60 dark:border-gray-800/60 shadow-sm px-6 md:px-10 py-8`}
              >
                {/* Content Side */}
                <div
                  className={`w-full text-center md:text-left ${
                    isEven ? "md:order-1" : "md:order-2"
                  } md:max-w-[520px] ${isEven ? "md:justify-self-start" : "md:justify-self-end"}`}
                >
                  <div className="flex items-start justify-center md:justify-start gap-4">
                    <div className="text-5xl md:text-6xl font-extrabold tracking-tight leading-none text-primary">
                      {step.number}
                    </div>
                    <div className="pt-1">
                      <h3 className="text-h2 font-extrabold tracking-tight text-gray-900 dark:text-gray-100 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-body-lg font-medium text-gray-700 dark:text-gray-200 max-w-md mx-auto md:mx-0">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mockup Side */}
                <div
                  className={`w-full ${
                    isEven ? "md:order-2" : "md:order-1"
                  } ${isEven ? "md:justify-self-end" : "md:justify-self-start"}`}
                >
                  <Card className={`${step.mockupBg} w-full max-w-[420px] rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-md overflow-hidden`}>
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

