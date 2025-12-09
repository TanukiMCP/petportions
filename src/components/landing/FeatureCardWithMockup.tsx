"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { LucideIcon, Flame, Utensils, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";

interface FeatureCardWithMockupProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
  index?: number;
  mockupType: "calculator" | "grader" | "tracker" | "transition";
}

const CalculatorMockup = () => (
  <div className="bg-white dark:bg-gray-800 p-8 rounded-lg border-2 border-primary/20 dark:border-primary/20">
    <div className="text-center">
      <Flame className="h-10 w-10 text-primary mx-auto mb-3" />
      <div className="text-5xl font-bold text-primary mb-1">842</div>
      <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">kcal per day</div>
    </div>
  </div>
);

const GraderMockup = () => (
  <div className="bg-white dark:bg-gray-800 p-8 rounded-lg border-2 border-primary/20 dark:border-primary/20">
    <div className="text-center">
      <div className="w-24 h-24 mx-auto rounded-full bg-green-500 flex items-center justify-center text-white text-5xl font-bold shadow-lg mb-3">
        A
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Excellent Quality</div>
    </div>
  </div>
);

const TrackerMockup = () => (
  <div className="bg-white dark:bg-gray-800 p-8 rounded-lg border-2 border-primary/20 dark:border-primary/20">
    <div className="text-center">
      <TrendingUp className="h-10 w-10 text-green-500 mx-auto mb-3" />
      <div className="text-5xl font-bold text-green-500 mb-1">-2.5</div>
      <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">kg lost</div>
    </div>
  </div>
);

const TransitionMockup = () => (
  <div className="bg-white dark:bg-gray-800 p-8 rounded-lg border-2 border-primary/20 dark:border-primary/20">
    <div className="text-center">
      <ArrowRight className="h-10 w-10 text-primary mx-auto mb-3" />
      <div className="text-5xl font-bold text-primary mb-1">7</div>
      <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">days</div>
    </div>
  </div>
);

export function FeatureCardWithMockup({
  icon: Icon,
  title,
  description,
  href,
  index = 0,
  mockupType,
}: FeatureCardWithMockupProps) {
  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  };

  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.3,
      },
    },
  };

  const mockups = {
    calculator: <CalculatorMockup />,
    grader: <GraderMockup />,
    tracker: <TrackerMockup />,
    transition: <TransitionMockup />,
  };

  const content = (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Card className="h-full border-2 border-primary/20 dark:border-primary/20 hover:border-primary/40 dark:hover:border-primary/40 transition-all duration-300 hover:shadow-lg bg-white dark:bg-gray-800 overflow-hidden group">
        {/* Mockup Header */}
        <div className="p-4">
          {mockups[mockupType]}
        </div>
        
        <CardHeader className="pb-4">
          <motion.div
            className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 dark:from-primary/30 dark:to-primary/20 rounded-xl flex items-center justify-center mb-4 border-2 border-primary/30 dark:border-primary/30"
            variants={iconVariants}
            initial="initial"
            whileHover="hover"
          >
            <Icon className="h-7 w-7 text-primary dark:text-primary" />
          </motion.div>
          <CardTitle className="text-h4">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-body-sm">
            {description}
          </CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}

