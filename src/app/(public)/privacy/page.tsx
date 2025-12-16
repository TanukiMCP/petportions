"use client";

import React from "react";
import Link from "next/link";
import { Shield, Eye, Database, Lock, ArrowRight, User, EyeOff, CheckCircle, Info, HardDrive, ServerOff, Cookie, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function PrivacyPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
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
              Privacy Policy
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12"
          >
            <Card className="border-2 border-border bg-card">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                    <Cookie className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-h4 text-primary dark:text-primary">Local storage & browser data</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-body-md text-secondary dark:text-secondary space-y-4">
                  <p>
                    PetPortions may store tool inputs and results in your browser (local storage) to make repeat use easier. This is not an advertising cookie.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-tertiary dark:bg-gray-900/40 border border-border">
                      <p className="text-sm font-semibold text-primary mb-1">To clear stored data</p>
                      <p className="text-sm">Clear site data for petportions.com in your browser settings.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-tertiary dark:bg-gray-900/40 border border-border">
                      <p className="text-sm font-semibold text-primary mb-1">To use without storage</p>
                      <p className="text-sm">Use a private/incognito window (storage may be cleared when closed).</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-display-sm md:text-display-md text-primary dark:text-primary mb-6 font-bold leading-tight"
          >
            Privacy Policy
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-secondary dark:text-secondary max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            How we protect your privacy and handle your data at PetPortions.
          </motion.p>

          <div className="mx-auto max-w-4xl">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl border-2 border-primary/20 bg-background">
              <img
                src="https://raw.githubusercontent.com/quentincaffeino/manypixels-illustrations/main/packages/svg/src/outline/Authentication.svg"
                alt="Privacy illustration"
                className="h-full w-full object-cover grayscale saturate-0 opacity-90"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Short Version */}
      <section className="py-10 md:py-14 bg-background dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border-2 border-primary/20 bg-primary/5 dark:bg-primary/10 p-8"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary/10 dark:bg-primary/20 shrink-0">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-h4 font-bold text-primary dark:text-primary mb-2">The short version</h2>
                <p className="text-body-md text-secondary dark:text-secondary">
                  PetPortions is designed to work without behavioral tracking. Your pet profiles and calculation history stay on your device by default.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-background dark:bg-gray-800 border border-primary/20">
                    <ServerOff className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-primary">No selling data</p>
                      <p className="text-sm text-secondary dark:text-secondary">We don't sell pet data or share it for advertising.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-background dark:bg-gray-800 border border-primary/20">
                    <HardDrive className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-primary">Local-first storage</p>
                      <p className="text-sm text-secondary dark:text-secondary">Clear browser site data to remove local history.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-16 md:py-24 bg-background dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <Card className="border-2 border-border bg-card">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10 dark:bg-primary/20 shrink-0">
                    <EyeOff className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-h5 font-bold mb-2">What we do not collect</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 text-sm text-secondary dark:text-secondary">
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-tertiary dark:bg-gray-900/40 border border-border">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                        <span>Advertising identifiers or third-party tracking cookies</span>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-tertiary dark:bg-gray-900/40 border border-border">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                        <span>Sensitive personal info about you or your household</span>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-tertiary dark:bg-gray-900/40 border border-border">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                        <span>Browsing history outside PetPortions</span>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-tertiary dark:bg-gray-900/40 border border-border">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                        <span>Sale of data to data brokers</span>
                      </div>
                    </div>
                    <p className="text-sm text-secondary dark:text-secondary mt-4">
                      If you email us, we receive your email address and message content so we can respond.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <Card className="border-2 border-border hover:border-primary hover:shadow-xl transition-all duration-300 bg-card transform hover:scale-105">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                      <Shield className="h-6 w-6 text-primary dark:text-primary" />
                    </div>
                    <CardTitle className="text-h4 text-primary dark:text-primary">Data Collection</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-body-md text-secondary dark:text-secondary">
                    <p><strong className="text-primary">What we collect:</strong></p>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-primary/5 dark:bg-primary/10 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <span>Pet weight and basic information (stored locally)</span>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-primary/5 dark:bg-primary/10 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <span>Food brand selections (stored locally)</span>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-primary/5 dark:bg-primary/10 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <span>Calculation results (stored locally)</span>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-primary/5 dark:bg-primary/10 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <span>No personal information is collected</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-2 border-border hover:border-primary hover:shadow-xl transition-all duration-300 bg-card transform hover:scale-105">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                      <Eye className="h-6 w-6 text-primary dark:text-primary" />
                    </div>
                    <CardTitle className="text-h4 text-primary dark:text-primary">How We Use Data</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-body-md text-secondary dark:text-secondary">
                    <p><strong className="text-primary">Usage purposes:</strong></p>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-primary/5 dark:bg-primary/10 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <span>Calculate feeding portions and calories</span>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-primary/5 dark:bg-primary/10 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <span>Grade pet food products</span>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-primary/5 dark:bg-primary/10 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <span>Generate transition schedules</span>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-primary/5 dark:bg-primary/10 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <span>Provide personalized recommendations</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-2 border-border hover:border-primary hover:shadow-xl transition-all duration-300 bg-card transform hover:scale-105">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                      <Database className="h-6 w-6 text-primary dark:text-primary" />
                    </div>
                    <CardTitle className="text-h4 text-primary dark:text-primary">Data Storage</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-body-md text-secondary dark:text-secondary">
                    <p><strong className="text-primary">Storage details:</strong></p>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-primary/5 dark:bg-primary/10 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <span>All data stored locally in your browser</span>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-primary/5 dark:bg-primary/10 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <span>No data transmitted to external servers</span>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-primary/5 dark:bg-primary/10 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <span>Data persists until browser cache is cleared</span>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-primary/5 dark:bg-primary/10 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <span>You control when to delete stored information</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-2 border-border hover:border-primary hover:shadow-xl transition-all duration-300 bg-card transform hover:scale-105">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                      <Lock className="h-6 w-6 text-primary dark:text-primary" />
                    </div>
                    <CardTitle className="text-h4 text-primary dark:text-primary">Your Rights</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-body-md text-secondary dark:text-secondary">
                    <p><strong className="text-primary">Your control:</strong></p>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-primary/5 dark:bg-primary/10 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <span>Clear browser data to remove all information</span>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-primary/5 dark:bg-primary/10 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <span>Use incognito mode for no data storage</span>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-primary/5 dark:bg-primary/10 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <span>Export or print your data anytime</span>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-primary/5 dark:bg-primary/10 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <span>No account creation required</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 bg-tertiary dark:bg-gray-800 rounded-lg p-8 border border-border"
          >
            <h3 className="text-h3 text-primary dark:text-primary mb-4 font-bold">Contact Us</h3>
            <p className="text-body-md text-secondary dark:text-secondary mb-4">
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <a 
              href="mailto:contact@petportions.com"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors group"
            >
              contact@petportions.com
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
