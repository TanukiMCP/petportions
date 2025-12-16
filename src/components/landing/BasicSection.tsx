"use client";

import React, { PropsWithChildren } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export interface BasicSectionProps {
  imageUrl: string;
  imageClassName?: string;
  title: string;
  overTitle: string;
  reversed?: boolean;
}

export default function BasicSection({
  imageUrl,
  imageClassName,
  title,
  overTitle,
  reversed,
  children,
}: PropsWithChildren<BasicSectionProps>) {
  return (
    <section className={`py-16 md:py-24 lg:py-32 px-4 bg-background dark:bg-gray-900`}>
      <div className="container mx-auto max-w-7xl">
        <div
          className={`flex flex-col ${
            reversed ? "lg:flex-row-reverse" : "lg:flex-row"
          } items-center gap-12`}
        >
          {/* Image Container */}
          <motion.div
            className="flex-1 w-full"
            initial={{ opacity: 1, x: reversed ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-xl">
              <Image
                src={imageUrl}
                alt={title}
                fill
                className={`object-cover ${imageClassName ?? ""}`}
              />
            </div>
          </motion.div>

          {/* Content Container */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 1, x: reversed ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 border-2 border-primary/30 mb-6">
              <span className="text-sm font-semibold text-primary dark:text-primary uppercase tracking-wide">
                {overTitle}
              </span>
            </div>
            <h2 className="text-h1 mb-6">{title}</h2>
            <div className="text-body-lg text-secondary dark:text-secondary space-y-4">
              {children}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

