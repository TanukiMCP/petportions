"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, FileText, Link as LinkIcon, ArrowRight, PawPrint, Calculator, ClipboardCheck, Scale, Heart, Lightbulb, ShieldCheck, ExternalLink, Info, FlaskConical, Utensils, AlertCircle, Flame } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type ResourceLink = {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
};

const quickStart: ResourceLink[] = [
  {
    title: "Start with the Calculator",
    description: "Use RER/MER-based calorie targets and turn them into practical portions.",
    href: "/calculator",
    icon: Calculator,
  },
  {
    title: "Grade a Food",
    description: "Compare foods using guaranteed analysis, ingredient quality, and safety flags.",
    href: "/food-grader",
    icon: ClipboardCheck,
  },
  {
    title: "Plan a Safe Transition",
    description: "Generate a day-by-day mixing schedule to reduce GI upset when switching foods.",
    href: "/diet-transition",
    icon: ArrowRight,
  },
  {
    title: "Understand the Method",
    description: "See exactly how RER → MER multipliers and scoring categories work.",
    href: "/how-it-works",
    icon: FlaskConical,
  },
];

const nutritionFundamentals: { title: string; description: string; icon: React.ElementType }[] = [
  {
    title: "Calories: the single lever",
    description: "Most weight change is driven by energy balance. Start by getting daily kcal right, then refine.",
    icon: Flame,
  },
  {
    title: "Protein and fat basics",
    description: "Protein supports lean mass; fat drives energy density and palatability. Requirements differ for dogs vs cats.",
    icon: Utensils,
  },
  {
    title: "Life stage matters",
    description: "Growth and reproduction change energy needs substantially. Seniors often need a different baseline.",
    icon: Heart,
  },
  {
    title: "Measure portions consistently",
    description: "Consistency beats precision. Use a scale when possible and keep treats accounted for.",
    icon: Scale,
  },
];

const externalResources: { title: string; description: string; href: string; icon: React.ElementType }[] = [
  {
    title: "AAFCO",
    description: "Official standards for pet food nutrient profiles and labeling.",
    href: "https://www.aafco.org/",
    icon: ShieldCheck,
  },
  {
    title: "NRC",
    description: "Scientific research and recommendations for pet nutrition.",
    href: "https://www.nap.edu/catalog/10668/nutrient-requirements-of-dogs",
    icon: BookOpen,
  },
  {
    title: "Pet Nutrition Alliance",
    description: "Industry-led initiative for pet nutrition education and advocacy.",
    href: "https://petnutritionalliance.org/",
    icon: PawPrint,
  },
];

const internalTools: ResourceLink[] = [
  { title: "About", description: "What PetPortions is and what it does.", href: "/about", icon: Info },
  { title: "FAQ", description: "Common questions about accuracy, data, and usage.", href: "/faq", icon: BookOpen },
  { title: "Contact", description: "Support and feedback.", href: "/contact", icon: LinkIcon },
  { title: "Privacy", description: "What we store and how we handle data.", href: "/privacy", icon: ShieldCheck },
  { title: "Terms", description: "Disclaimers and usage terms.", href: "/terms", icon: FileText },
  { title: "Cookies", description: "Local storage and session handling.", href: "/cookies", icon: Heart },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

export default function ResourcesPage() {
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
              Resources
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-display-sm md:text-display-md text-primary dark:text-primary mb-6 font-bold leading-tight"
          >
            Pet Nutrition Resources
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-secondary dark:text-secondary max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Curated collection of guides, articles, and tools to help you make informed decisions about your pet's nutrition.
          </motion.p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 border-2 border-primary/30 mb-6">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wide">Quick Start</span>
              </div>
              <h2 className="text-h2 text-primary dark:text-primary mb-4 font-bold">Get oriented fast</h2>
              <p className="text-body-lg text-secondary dark:text-secondary">
                Start with your pet’s baseline, then measure consistently. Use the tools below to move from “guessing” to a repeatable system.
              </p>
            </div>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl border-2 border-primary/20 bg-background">
              <img
                src="https://raw.githubusercontent.com/quentincaffeino/manypixels-illustrations/main/packages/svg/src/outline/Analysis.svg"
                alt="PetPortions illustration"
                className="h-full w-full object-cover grayscale saturate-0 opacity-90"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-16 md:py-24 bg-background dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-h2 text-primary dark:text-primary mb-4 font-bold">Quick Start</h2>
            <p className="text-body-lg text-secondary dark:text-secondary max-w-2xl mx-auto">
              If you only do one thing: calculate a baseline, then measure consistently.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {quickStart.map((item) => (
              <motion.div key={item.title} variants={itemVariants}>
                <Link href={item.href} className="block h-full group">
                  <Card className="h-full border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 group-hover:-translate-y-1 transform hover:scale-105">
                    <CardContent className="p-8 flex flex-col h-full">
                      <div className="flex items-center gap-4 mb-5">
                        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 transition-colors">
                          <item.icon className="h-7 w-7 text-primary" />
                        </div>
                        <h3 className="text-h4 font-bold group-hover:text-primary transition-colors">{item.title}</h3>
                      </div>
                      <p className="text-body-md text-secondary dark:text-secondary leading-relaxed mb-6">
                        {item.description}
                      </p>
                      <div className="mt-auto text-primary font-semibold inline-flex items-center gap-2 group-hover:underline">
                        Open <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
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
                <h3 className="text-h4 font-bold text-primary dark:text-primary mb-2">Vet disclaimer</h3>
                <p className="text-body-md text-secondary dark:text-secondary">
                  PetPortions is informational. For medical conditions or weight loss plans, verify with your veterinarian.
                </p>
              </div>
              <Link href="/how-it-works">
                <Button variant="outline" className="gap-2 border-2 border-primary/30 text-primary hover:bg-white dark:hover:bg-gray-700 bg-white dark:bg-gray-800">
                  <AlertCircle className="h-4 w-4" />
                  Read methodology
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Nutrition Fundamentals */}
      <section className="py-16 md:py-24 bg-tertiary dark:bg-gray-800/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-h2 text-primary dark:text-primary mb-4 font-bold">Nutrition fundamentals</h2>
            <p className="text-body-lg text-secondary dark:text-secondary max-w-2xl mx-auto">
              A short baseline that helps you interpret calculator results and food labels.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {nutritionFundamentals.map((item) => (
              <motion.div key={item.title} variants={itemVariants}>
                <Card className="h-full border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-h5 font-bold mb-2">{item.title}</h3>
                        <p className="text-body-md text-secondary dark:text-secondary">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* External References */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-h2 text-primary dark:text-primary mb-4 font-bold">External references</h2>
            <p className="text-body-lg text-secondary dark:text-secondary max-w-2xl mx-auto">
              Primary sources and standards used across veterinary nutrition.
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
              <a
                href="https://www.aafco.org/"
                target="_blank"
                rel="noreferrer"
                className="block h-full group"
              >
                <Card className="h-full border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 group-hover:-translate-y-1 transform hover:scale-105">
                  <CardContent className="p-8 flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 transition-colors">
                        <ShieldCheck className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="text-h4 font-bold">AAFCO</h3>
                    </div>
                    <p className="text-body-md text-secondary dark:text-secondary leading-relaxed mb-6">
                      Official standards for pet food nutrient profiles and labeling.
                    </p>
                    <div className="mt-auto text-primary font-semibold inline-flex items-center gap-2 group-hover:underline">
                      Visit <ExternalLink className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </a>
            </motion.div>

            <motion.div variants={itemVariants}>
              <a
                href="https://wsava.org/global-guidelines/global-nutrition-guidelines/"
                target="_blank"
                rel="noreferrer"
                className="block h-full group"
              >
                <Card className="h-full border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 group-hover:-translate-y-1 transform hover:scale-105">
                  <CardContent className="p-8 flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 transition-colors">
                        <BookOpen className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="text-h4 font-bold">WSAVA nutrition</h3>
                    </div>
                    <p className="text-body-md text-secondary dark:text-secondary leading-relaxed mb-6">
                      Global guidance on assessing diets and working with your veterinarian.
                    </p>
                    <div className="mt-auto text-primary font-semibold inline-flex items-center gap-2 group-hover:underline">
                      Visit <ExternalLink className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </a>
            </motion.div>

            <motion.div variants={itemVariants}>
              <a
                href="https://petnutritionalliance.org/"
                target="_blank"
                rel="noreferrer"
                className="block h-full group"
              >
                <Card className="h-full border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 group-hover:-translate-y-1 transform hover:scale-105">
                  <CardContent className="p-8 flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 transition-colors">
                        <PawPrint className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="text-h4 font-bold">Pet Nutrition Alliance</h3>
                    </div>
                    <p className="text-body-md text-secondary dark:text-secondary leading-relaxed mb-6">
                      Independent education resources used by veterinarians and pet owners.
                    </p>
                    <div className="mt-auto text-primary font-semibold inline-flex items-center gap-2 group-hover:underline">
                      Visit <ExternalLink className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Site Pages */}
      <section className="py-16 md:py-24 bg-tertiary dark:bg-gray-800/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-h2 text-primary dark:text-primary mb-4 font-bold">More from PetPortions</h2>
            <p className="text-body-lg text-secondary dark:text-secondary max-w-2xl mx-auto">
              Policies, FAQs, and support.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {internalTools.map((resource: ResourceLink) => (
              <motion.div key={resource.title} variants={itemVariants}>
                <Link href={resource.href} className="block h-full group">
                  <Card className="h-full border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 group-hover:-translate-y-1 transform hover:scale-105">
                    <CardContent className="p-8 flex flex-col items-center text-center h-full">
                      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 dark:bg-primary/20 mb-6 group-hover:bg-primary/20 transition-all duration-300">
                        <resource.icon className="h-10 w-10 text-primary dark:text-primary group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <h3 className="text-h4 mb-3 font-bold group-hover:text-primary transition-colors">{resource.title}</h3>
                      <p className="text-body-md text-secondary dark:text-secondary leading-relaxed mb-6">
                        {resource.description}
                      </p>
                      <div className="mt-auto text-primary font-semibold flex items-center gap-2 group-hover:underline">
                        Read More <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
