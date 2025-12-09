"use client";

import React from "react";
import Image from "next/image";
import { Calculator, ClipboardCheck, TrendingUp, ArrowRightLeft, Scale, Heart } from "lucide-react";
import { FeatureCardSimple } from "./FeatureCardSimple";
import { motion } from "framer-motion";

const features = [
  {
    icon: Calculator,
    title: "Feeding Calculator",
    description:
      "Calculate precise daily caloric needs and portion sizes based on your pet's weight, age, and activity level.",
    illustrationUrl: "/grid-icons/calculator.svg",
  },
  {
    icon: ClipboardCheck,
    title: "Food Quality Grader",
    description:
      "Analyze pet food quality using AAFCO guidelines and nutritional standards to make informed choices.",
    illustrationUrl: "/grid-icons/grader.svg",
  },
  {
    icon: TrendingUp,
    title: "Weight Tracker",
    description:
      "Monitor your pet's weight over time with visual charts to track progress toward health goals.",
    illustrationUrl: "/grid-icons/tracker.svg",
  },
  {
    icon: ArrowRightLeft,
    title: "Diet Transition",
    description:
      "Create safe, gradual transition plans when switching your pet's food to avoid digestive issues.",
    illustrationUrl: "/grid-icons/transition.svg",
  },
  {
    icon: Scale,
    title: "Portion Accuracy",
    description:
      "Eliminate guesswork with precise measurements based on established veterinary nutrition formulas.",
    illustrationUrl: "/grid-icons/accuracy.svg",
  },
  {
    icon: Heart,
    title: "Health Focused",
    description:
      "Science-backed recommendations to support your pet's long-term health and wellness goals.",
    illustrationUrl: "/grid-icons/health.svg",
  },
];

export function FeaturesSection() {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="features-section" className="py-16 md:py-24 lg:py-32 px-4 bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-h1 mb-4">
            Powerful Tools for Pet Nutrition
          </h2>
          <p className="text-body-lg text-secondary dark:text-secondary max-w-2xl mx-auto">
            Everything you need to make informed decisions about your pet's diet in one place
          </p>
        </motion.div>

        {/* Feature Cards Grid - 3 columns */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={itemVariants}>
              <FeatureCardSimple
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
                illustrationUrl={feature.illustrationUrl}
            />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
