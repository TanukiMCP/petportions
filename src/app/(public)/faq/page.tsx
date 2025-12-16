"use client";

import React from "react";
import Link from "next/link";
import { HelpCircle, BookOpen, Calculator, ClipboardCheck, Database, ShieldCheck, ArrowRight, PawPrint, CreditCard, User, Printer, Scale, Heart, AlertTriangle, Lock, FlaskConical, Utensils, BadgeCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { MER_MULTIPLIERS } from "@/lib/calculations/constants";
import { GRADING_CRITERIA } from "@/lib/grading/criteria";

export default function FAQPage() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

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
              FAQ
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-display-sm md:text-display-md text-primary dark:text-primary mb-6 font-bold leading-tight"
          >
            Frequently Asked Questions
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-secondary dark:text-secondary max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Find answers to common questions about PetPortions, our tools, and how to use them effectively.
          </motion.p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-tertiary dark:bg-gray-800/50">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Getting Started */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-h2 text-primary dark:text-primary mb-4 font-bold">Getting started</h2>
            <p className="text-body-lg text-secondary dark:text-secondary max-w-2xl mx-auto">
              The basics: cost, accounts, and what you should do first.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <Card className="border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 group">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 transition-colors shrink-0">
                      <CreditCard className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-h5 font-bold mb-3 group-hover:text-primary transition-colors">Is PetPortions free?</h3>
                      <p className="text-body-md text-secondary dark:text-secondary leading-relaxed">
                        Yes. The public tools are available without a paywall. If we add paid features in the future,
                        the core calculators remain accessible.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 group">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 transition-colors shrink-0">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-h5 font-bold mb-3 group-hover:text-primary transition-colors">Do I need an account?</h3>
                      <p className="text-body-md text-secondary dark:text-secondary leading-relaxed">
                        No. You can use the tools directly. Sign-in is only needed for account-specific features.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 group">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 transition-colors shrink-0">
                      <PawPrint className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-h5 font-bold mb-3 group-hover:text-primary transition-colors">What should I do first?</h3>
                      <p className="text-body-md text-secondary dark:text-secondary leading-relaxed">
                        Start with the calculator to get a daily kcal target, then pick a food and convert kcal into cups.
                      </p>
                      <div className="mt-4 flex flex-col sm:flex-row gap-3">
                        <Link href="/calculator">
                          <span className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
                            Open Calculator <ArrowRight className="h-4 w-4" />
                          </span>
                        </Link>
                        <Link href="/how-it-works">
                          <span className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
                            Read Methodology <ArrowRight className="h-4 w-4" />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 group">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 transition-colors shrink-0">
                      <Printer className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-h5 font-bold mb-3 group-hover:text-primary transition-colors">Can I print results?</h3>
                      <p className="text-body-md text-secondary dark:text-secondary leading-relaxed">
                        Yes. The tools include printer-friendly summaries intended to be shared with your veterinarian.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Calculator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mt-20 mb-12"
          >
            <h2 className="text-h2 text-primary dark:text-primary mb-4 font-bold">Calculator</h2>
            <p className="text-body-lg text-secondary dark:text-secondary max-w-2xl mx-auto">
              How calorie targets are computed and how to apply them.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <Card className="border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 group">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 transition-colors shrink-0">
                      <Calculator className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-h5 font-bold mb-3 group-hover:text-primary transition-colors">How are calories estimated?</h3>
                      <p className="text-body-md text-secondary dark:text-secondary leading-relaxed mb-3">
                        We calculate RER using:
                        <span className="font-mono text-sm bg-gray-100 dark:bg-gray-900 px-1 rounded ml-2">70 × (weight in kg)^0.75</span>
                      </p>
                      <p className="text-body-md text-secondary dark:text-secondary leading-relaxed">
                        Then we apply a MER multiplier based on your selections.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 group">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 transition-colors shrink-0">
                      <Scale className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-h5 font-bold mb-3 group-hover:text-primary transition-colors">What multipliers do you use?</h3>
                      <p className="text-body-md text-secondary dark:text-secondary leading-relaxed">
                        Multipliers are stored as a species/life-stage/activity table. For example, dog adult neutered moderate is {MER_MULTIPLIERS.dog.adult.neutered.moderate}×.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 group">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 transition-colors shrink-0">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-h5 font-bold mb-3 group-hover:text-primary transition-colors">Should I adjust for treats?</h3>
                      <p className="text-body-md text-secondary dark:text-secondary leading-relaxed">
                        Yes. Treat calories still count. If treats are frequent, reduce main-meal calories accordingly.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 group">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 transition-colors shrink-0">
                      <AlertTriangle className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-h5 font-bold mb-3 group-hover:text-primary transition-colors">What if my pet is overweight?</h3>
                      <p className="text-body-md text-secondary dark:text-secondary leading-relaxed">
                        Use results as a baseline, then work with your veterinarian on a safe weight-loss plan.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Food Grader */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mt-20 mb-12"
          >
            <h2 className="text-h2 text-primary dark:text-primary mb-4 font-bold">Food grader</h2>
            <p className="text-body-lg text-secondary dark:text-secondary max-w-2xl mx-auto">
              How the score is computed and what it can (and cannot) tell you.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <Card className="border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 group">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 transition-colors shrink-0">
                      <ClipboardCheck className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-h5 font-bold mb-3 group-hover:text-primary transition-colors">How do you grade food?</h3>
                      <p className="text-body-md text-secondary dark:text-secondary leading-relaxed mb-3">
                        We score multiple categories and combine them with fixed weights.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center justify-between gap-3 p-2 rounded bg-gray-50 dark:bg-gray-900/50">
                          <span className="font-semibold">AAFCO compliance</span>
                          <span className="text-primary font-semibold">{GRADING_CRITERIA.aafcoCompliance.weight}%</span>
                        </div>
                        <div className="flex items-center justify-between gap-3 p-2 rounded bg-gray-50 dark:bg-gray-900/50">
                          <span className="font-semibold">Protein quality</span>
                          <span className="text-primary font-semibold">{GRADING_CRITERIA.proteinQuality.weight}%</span>
                        </div>
                        <div className="flex items-center justify-between gap-3 p-2 rounded bg-gray-50 dark:bg-gray-900/50">
                          <span className="font-semibold">Ingredient quality</span>
                          <span className="text-primary font-semibold">{GRADING_CRITERIA.ingredientQuality.weight}%</span>
                        </div>
                        <div className="flex items-center justify-between gap-3 p-2 rounded bg-gray-50 dark:bg-gray-900/50">
                          <span className="font-semibold">Safety flags</span>
                          <span className="text-primary font-semibold">{GRADING_CRITERIA.safetyFlags.weight}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 group">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 transition-colors shrink-0">
                      <BadgeCheck className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-h5 font-bold mb-3 group-hover:text-primary transition-colors">What does the grade mean?</h3>
                      <p className="text-body-md text-secondary dark:text-secondary leading-relaxed">
                        It’s a comparison score based on the available label data. It helps you spot red flags and
                        identify formulas that better align with basic standards.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Privacy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mt-20 mb-12"
          >
            <h2 className="text-h2 text-primary dark:text-primary mb-4 font-bold">Data & privacy</h2>
            <p className="text-body-lg text-secondary dark:text-secondary max-w-2xl mx-auto">
              What’s stored, where it lives, and how to remove it.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <Card className="border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 group">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 transition-colors shrink-0">
                      <Database className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-h5 font-bold mb-3 group-hover:text-primary transition-colors">Where is my data stored?</h3>
                      <p className="text-body-md text-secondary dark:text-secondary leading-relaxed">
                        Basic usage stores pet profiles and history locally in your browser. Clearing site data removes it.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 group">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 transition-colors shrink-0">
                      <Lock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-h5 font-bold mb-3 group-hover:text-primary transition-colors">Do you track me?</h3>
                      <p className="text-body-md text-secondary dark:text-secondary leading-relaxed">
                        PetPortions is designed to work without behavioral tracking. See details in the privacy policy.
                      </p>
                      <div className="mt-4">
                        <Link href="/privacy" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
                          Read Privacy Policy <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <div className="pt-16 text-center">
            <Link href="/resources" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors">
              <ArrowRight className="h-4 w-4 rotate-180" />
              Back to Resources
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
