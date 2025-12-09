"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Calculator, ClipboardCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
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
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16 md:py-24 overflow-hidden bg-white dark:bg-gray-900">
      <motion.div
        className="container mx-auto max-w-6xl text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-display-md mb-6 text-primary dark:text-primary"
        >
          Know Exactly How Much to Feed Your Pet
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="text-body-lg text-secondary dark:text-secondary mb-8 max-w-2xl mx-auto"
        >
          Vet-grade nutrition calculators and food analysis tools to help you make
          informed decisions about your pet's diet. Simple, science-backed, and
          trusted by pet parents.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
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
          className="flex flex-wrap justify-center gap-4 pt-8 border-t border-primary/20 dark:border-primary/20"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/80 dark:bg-gray-800/80 border-2 border-primary/20 dark:border-primary/20 backdrop-blur-sm">
            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
            <span className="text-body-sm font-semibold text-gray-700 dark:text-gray-300">
              RER/MER Formulas
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/80 dark:bg-gray-800/80 border-2 border-primary/20 dark:border-primary/20 backdrop-blur-sm">
            <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-body-sm font-semibold text-gray-700 dark:text-gray-300">
              AAFCO Standards
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/80 dark:bg-gray-800/80 border-2 border-primary/20 dark:border-primary/20 backdrop-blur-sm">
            <CheckCircle2 className="h-4 w-4 text-primary dark:text-primary" />
            <span className="text-body-sm font-semibold text-gray-700 dark:text-gray-300">
              100% Free
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

