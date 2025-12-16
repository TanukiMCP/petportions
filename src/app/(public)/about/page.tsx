"use client";

import React from "react";
import Link from "next/link";
import { Calculator, ClipboardCheck, ArrowRightLeft, Database, ShieldCheck, HardDrive, ArrowRight, PawPrint, CheckCircle2, Scale, Flame, EyeOff, Lock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import BasicSection from "@/components/landing/BasicSection";
import { MER_MULTIPLIERS } from "@/lib/calculations/constants";
import { calculateRER } from "@/lib/calculations/feeding";

export default function AboutPage() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
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

  const heroVariants = {
    hidden: { opacity: 0, y: 20 },
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
              Our Mission
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-display-sm md:text-display-md text-primary dark:text-primary mb-6 font-bold leading-tight"
          >
            Empowering Pet Parents with Science
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-secondary dark:text-secondary max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            PetPortions provides veterinary-grade nutrition tools designed to help you make clearer, more consistent feeding decisions for your furry friends.
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
        imageUrl="https://raw.githubusercontent.com/quentincaffeino/manypixels-illustrations/main/packages/svg/src/outline/Analysis.svg"
        imageClassName="grayscale saturate-0 opacity-90"
        title="Making Veterinary Nutrition Clear and Practical"
        overTitle="Why PetPortions Exists"
      >
        <p>
          Feeding guides on bags and random advice online are rarely tailored to your pet. PetPortions exists to
          translate established veterinary nutrition formulas into clear daily targets and practical portions you can
          measure.
        </p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="p-2 rounded-full bg-primary/10">
              <Flame className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-primary dark:text-primary">Energy targets</p>
              <p className="text-sm text-secondary dark:text-secondary">RER → MER-based daily calorie guidance.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="p-2 rounded-full bg-primary/10">
              <Scale className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-primary dark:text-primary">Portions you can measure</p>
              <p className="text-sm text-secondary dark:text-secondary">Cups/meal guidance using kcal-per-cup food data.</p>
            </div>
          </div>
        </div>
      </BasicSection>

      {/* How We're Different */}
      <section className="py-16 md:py-24 bg-tertiary dark:bg-gray-800/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-h2 text-primary dark:text-primary mb-4 font-bold">How We're Different</h2>
            <p className="text-body-lg text-secondary dark:text-secondary max-w-2xl mx-auto">
              Clear methodology, privacy-first defaults, and tools that are designed for real decision-making.
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
              <Card className="h-full border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 group">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-h5 font-bold mb-2">Explainable math</h3>
                      <p className="text-body-md text-secondary dark:text-secondary">
                        We use standard RER and MER concepts and show the inputs that drive the recommendation.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 group">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                      <EyeOff className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-h5 font-bold mb-2">Privacy-first</h3>
                      <p className="text-body-md text-secondary dark:text-secondary">
                        Pet profiles and calculation history are stored locally on your device by default.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 group">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                      <ShieldCheck className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-h5 font-bold mb-2">Built for collaboration</h3>
                      <p className="text-body-md text-secondary dark:text-secondary">
                        Print-friendly outputs help you share a consistent baseline with your veterinarian.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 group">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                      <Database className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-h5 font-bold mb-2">Food context included</h3>
                      <p className="text-body-md text-secondary dark:text-secondary">
                        Portion math uses kcal-per-cup and guaranteed analysis when available.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <BasicSection
        imageUrl="https://raw.githubusercontent.com/quentincaffeino/manypixels-illustrations/main/packages/svg/src/outline/Wireframe.svg"
        imageClassName="grayscale saturate-0 opacity-90"
        title="The Formula Backbone"
        overTitle="The Science"
        reversed
      >
        <p>
          PetPortions uses Resting Energy Requirement (RER) as the base metabolic estimate, then applies a
          maintenance multiplier (MER) based on life stage, reproductive status, and activity level.
        </p>
        <div className="mt-6 rounded-xl border-2 border-primary/20 bg-primary/5 dark:bg-primary/10 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-primary/20 p-4">
              <p className="text-xs font-semibold text-secondary dark:text-secondary">RER</p>
              <p className="text-2xl font-bold text-primary">70 × kg^0.75</p>
              <p className="text-xs text-secondary dark:text-secondary mt-1">Resting Energy Requirement</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-primary/20 p-4">
              <p className="text-xs font-semibold text-secondary dark:text-secondary">MER</p>
              <p className="text-2xl font-bold text-primary">RER × multiplier</p>
              <p className="text-xs text-secondary dark:text-secondary mt-1">Maintenance adjustment</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-primary/20 p-4">
              <p className="text-xs font-semibold text-secondary dark:text-secondary">Portions</p>
              <p className="text-2xl font-bold text-primary">kcal ÷ kcal/cup</p>
              <p className="text-xs text-secondary dark:text-secondary mt-1">Practical measurement</p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5">
            <p className="text-sm font-semibold text-primary dark:text-primary mb-3">Common dog multipliers</p>
            <div className="space-y-2 text-sm text-secondary dark:text-secondary">
              <div className="flex justify-between">
                <span>Adult neutered, moderate</span>
                <span className="font-semibold">{MER_MULTIPLIERS.dog.adult.neutered.moderate}×</span>
              </div>
              <div className="flex justify-between">
                <span>Adult intact, active</span>
                <span className="font-semibold">{MER_MULTIPLIERS.dog.adult.intact.active}×</span>
              </div>
              <div className="flex justify-between">
                <span>Puppy baseline</span>
                <span className="font-semibold">{MER_MULTIPLIERS.dog.puppy}×</span>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5">
            <p className="text-sm font-semibold text-primary dark:text-primary mb-3">Example (25 lb dog)</p>
            <div className="space-y-2 text-sm text-secondary dark:text-secondary">
              {(() => {
                const weightKg = 25 * 0.453592;
                const rer = Math.round(calculateRER(weightKg));
                const mer = Math.round(rer * MER_MULTIPLIERS.dog.adult.neutered.moderate);
                return (
                  <>
                    <div className="flex justify-between"><span>RER</span><span className="font-semibold">{rer} kcal/day</span></div>
                    <div className="flex justify-between"><span>MER multiplier</span><span className="font-semibold">{MER_MULTIPLIERS.dog.adult.neutered.moderate}×</span></div>
                    <div className="flex justify-between"><span>Daily target</span><span className="font-semibold">{mer} kcal/day</span></div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      </BasicSection>

      {/* Data Privacy Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-h2 text-primary dark:text-primary mb-4 font-bold">Privacy First Design</h2>
            <p className="text-body-lg text-secondary dark:text-secondary max-w-2xl mx-auto">
              We believe your pet's data belongs to you. Here's how we handle your information.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <div className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 hover:border-primary dark:hover:border-primary transition-all duration-300 hover:shadow-lg hover:-translate-y-1 transform hover:scale-105">
                <div className="p-4 bg-white dark:bg-gray-700 rounded-full shadow-sm mb-6">
                  <HardDrive className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-h5 font-bold mb-3">Local Storage</h3>
                <p className="text-body-sm text-secondary dark:text-secondary leading-relaxed">
                  Pet profiles and history are saved directly on your device. Clearing browser data removes this information.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 hover:border-primary dark:hover:border-primary transition-all duration-300 hover:shadow-lg hover:-translate-y-1 transform hover:scale-105">
                <div className="p-4 bg-white dark:bg-gray-700 rounded-full shadow-sm mb-6">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-h5 font-bold mb-3">Secure Access</h3>
                <p className="text-body-sm text-secondary dark:text-secondary leading-relaxed">
                  Authentication is handled by secure third-party providers. We only use your email to manage account access.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 hover:border-primary dark:hover:border-primary transition-all duration-300 hover:shadow-lg hover:-translate-y-1 transform hover:scale-105">
                <div className="p-4 bg-white dark:bg-gray-700 rounded-full shadow-sm mb-6">
                  <Database className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-h5 font-bold mb-3">Food Database</h3>
                <p className="text-body-sm text-secondary dark:text-secondary leading-relaxed">
                  Our food data is built-in and read-only, ensuring consistent and accurate nutritional information.
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 rounded-2xl border-2 border-primary/20 bg-primary/5 dark:bg-primary/10 p-8"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="text-h4 font-bold text-primary dark:text-primary mb-2">Your data stays yours</h3>
                <p className="text-body-md text-secondary dark:text-secondary">
                  We don't sell pet data, and we don't need behavioral tracking to provide useful results.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/privacy">
                  <Button variant="outline" className="gap-2 border-2 border-primary/30 text-primary hover:bg-white dark:hover:bg-gray-700 bg-white dark:bg-gray-800">
                    <Lock className="h-4 w-4" />
                    Read Privacy Policy
                  </Button>
                </Link>
                <Link href="/calculator">
                  <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Calculator className="h-4 w-4" />
                    Use Calculator
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-tertiary dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 border-2 border-primary/30 mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-bold text-primary dark:text-primary uppercase tracking-wide">
                Free • No Sign-Up Required
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-h1 mb-6"
            >
              Start with a clear baseline
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-body-lg text-secondary dark:text-secondary mb-10 max-w-2xl mx-auto"
            >
              Use the calculator to estimate daily calories and portions, then validate changes with your veterinarian.
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/calculator">
                <Button size="lg" className="gap-2 group bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all text-base px-8 py-6">
                  <Calculator className="h-5 w-5" />
                  Calculate Portions
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/food-grader">
                <Button size="lg" variant="outline" className="gap-2 border-2 border-primary/40 dark:border-primary/40 text-primary hover:bg-white dark:hover:bg-gray-700 text-base px-8 py-6 bg-white dark:bg-gray-800">
                  <ClipboardCheck className="h-5 w-5" />
                  Grade a Food
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-4 pt-10 mt-10 border-t border-primary/20 dark:border-primary/20">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border-2 border-primary/20 dark:border-primary/20">
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-body-sm font-semibold text-gray-700 dark:text-gray-300">RER/MER Formulas</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border-2 border-primary/20 dark:border-primary/20">
                <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-body-sm font-semibold text-gray-700 dark:text-gray-300">AAFCO Threshold Checks</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border-2 border-primary/20 dark:border-primary/20">
                <CheckCircle2 className="h-4 w-4 text-primary dark:text-primary" />
                <span className="text-body-sm font-semibold text-gray-700 dark:text-gray-300">Local-First Data</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900 border-t border-primary/10">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 border-2 border-primary/20 shadow-lg flex flex-col md:flex-row gap-6 items-start hover:shadow-xl transition-shadow duration-300"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="p-3 bg-primary/10 rounded-full shrink-0"
            >
              <PawPrint className="h-8 w-8 text-primary" />
            </motion.div>
            <div>
              <h3 className="text-h4 font-bold text-primary dark:text-primary mb-3">Important Veterinary Disclaimer</h3>
              <p className="text-body-md text-secondary dark:text-secondary mb-4">
                PetPortions provides informational calculations and planning tools based on veterinary standards. However, every pet is unique.
              </p>
              <p className="text-body-md text-secondary dark:text-secondary font-medium">
                Always consult your veterinarian for specific advice regarding medical conditions, allergies, or special dietary needs.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
