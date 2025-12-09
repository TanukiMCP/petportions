"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Stethoscope,
  CheckCircle2,
  BarChart3,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: Clock,
    label: "In-Room Use",
    description: "Calculate in seconds during consultations",
  },
  {
    icon: BarChart3,
    label: "Evidence-Based",
    description: "Algorithms based on veterinary nutrition science",
  },
  {
    icon: CheckCircle2,
    label: "AAFCO Aligned",
    description: "Follows AAFCO standards and guidelines",
  },
];

export function ProfessionalsSection() {
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

  return (
    <section className="py-16 md:py-24 px-4 relative bg-tertiary dark:bg-gray-800">

      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-primary/30 bg-white dark:border-primary/30 dark:bg-gray-800 mb-4">
            <Stethoscope className="h-4 w-4 text-primary dark:text-primary" />
            <span className="text-sm font-semibold text-primary dark:text-primary">FOR VETERINARY PROFESSIONALS</span>
          </div>

          <h2 className="text-h1 mb-4 text-primary dark:text-primary">
            Built on Veterinary Nutrition Science
          </h2>
          <p className="text-body-lg text-secondary dark:text-secondary max-w-2xl mx-auto">
            Our calculators use established RER and MER formulas recommended by veterinary nutritionists. Free tools for in-clinic use with printable client handouts.
          </p>
        </motion.div>

        {/* Main Content - Simple Grid */}
          <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.label}
                  variants={itemVariants}
              >
                <Card className="h-full border-2 border-primary/20 dark:border-primary/20 bg-white dark:bg-gray-800 hover:border-primary/40 dark:hover:border-primary/40 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 dark:from-primary/30 dark:to-primary/20 border-2 border-primary/30 mx-auto mb-4">
                      <Icon className="h-7 w-7 text-primary dark:text-primary" />
                    </div>
                    <h3 className="text-h5 mb-2 text-primary dark:text-primary">{benefit.label}</h3>
                    <p className="text-body-sm text-secondary dark:text-secondary">{benefit.description}</p>
                  </CardContent>
                </Card>
                </motion.div>
              );
            })}
          </motion.div>

        {/* Standards Badge */}
          <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Card className="inline-block border-2 border-primary/30 dark:border-primary/30 bg-tertiary/50 dark:bg-tertiary/20">
            <CardContent className="p-4">
              <p className="text-sm text-secondary dark:text-secondary mb-2">
                Calculations based on:
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge variant="outline" className="text-xs border-primary/30 dark:border-primary/30 text-primary dark:text-primary">
                      AAFCO Standards
                    </Badge>
                <Badge variant="outline" className="text-xs border-primary/30 dark:border-primary/30 text-primary dark:text-primary">
                  RER/MER Formulas
                </Badge>
                <Badge variant="outline" className="text-xs border-primary/30 dark:border-primary/30 text-primary dark:text-primary">
                      Evidence-Based
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
      </div>
    </section>
  );
}

