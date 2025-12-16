"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
  index?: number;
  imageUrl?: string;
}

const featureImages = [
  "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&q=80", // Calculator - dog eating
  "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=600&q=80", // Food Grader - pet food
  "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&q=80", // Weight Tracker - healthy pet
  "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=600&q=80", // Diet Transition - food transition
];

export function FeatureCard({
  icon: Icon,
  title,
  description,
  href,
  index = 0,
  imageUrl,
}: FeatureCardProps) {
  const defaultImage = featureImages[index % featureImages.length];
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
        <CardHeader className="pb-4">
          <motion.div
            className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 border-2 border-primary/30"
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

