"use client";

import React from "react";
import Link from "next/link";
import { FileText, BookOpen, Shield, AlertTriangle, ArrowRight, CheckCircle, Scale, Gavel, AlertCircle, UserCheck, RefreshCw, HeartPulse, Lock, Ban, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function TermsPage() {
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900;">
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
              Terms of Service
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-display-sm md:text-display-md text-primary dark:text-primary mb-6 font-bold leading-tight"
          >
            Terms of Service
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-secondary dark:text-secondary max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Please read these terms carefully before using PetPortions.
          </motion.p>
        </div>
      </section>

      {/* Essential Summary */}
      <section className="py-16 md:py-24 bg-tertiary dark:bg-gray-800/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="border-2 border-primary/20 bg-background dark:bg-gray-800 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10 dark:bg-primary/20 shrink-0">
                    <Gavel className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-h4 font-bold text-primary dark:text-primary mb-2">Key points</h2>
                    <p className="text-body-md text-secondary dark:text-secondary mb-6">
                      PetPortions is an informational tool. Use it to establish a baseline, then confirm decisions with your veterinarian.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700">
                        <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-primary">Not medical advice</p>
                          <p className="text-sm text-secondary dark:text-secondary">No diagnosis or treatment guidance.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700">
                        <UserCheck className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-primary">You remain responsible</p>
                          <p className="text-sm text-secondary dark:text-secondary">Monitor body condition and adjust as needed.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700">
                        <Shield className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-primary">No warranties</p>
                          <p className="text-sm text-secondary dark:text-secondary">Tools are provided “as-is”.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700">
                        <RefreshCw className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-primary">Changes happen</p>
                          <p className="text-sm text-secondary dark:text-secondary">We may update formulas and features.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Full Terms */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-2 border-gray-200 dark:border-gray-700 bg-background dark:bg-gray-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-h4 text-primary dark:text-primary">1. Acceptance of terms</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-body-md text-secondary dark:text-secondary space-y-3">
                <p>
                  By accessing or using PetPortions, you agree to these Terms of Service. If you do not agree, do not use the service.
                </p>
                <p>
                  We may update these terms. Continued use after changes means you accept the updated terms.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200 dark:border-gray-700 bg-background dark:bg-gray-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-h4 text-primary dark:text-primary">2. Service description</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-body-md text-secondary dark:text-secondary space-y-3">
                <p>
                  PetPortions provides calculators and informational tools related to pet feeding, diet transitions, and food label interpretation.
                </p>
                <p>
                  Outputs are estimates based on your inputs and the available food label data.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-200 dark:border-orange-900/40 bg-orange-50 dark:bg-orange-900/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                    <HeartPulse className="h-6 w-6 text-orange-700 dark:text-orange-300" />
                  </div>
                  <CardTitle className="text-h4 text-orange-800 dark:text-orange-200">3. No veterinary advice</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-body-md text-orange-800/90 dark:text-orange-200/90 space-y-3">
                <p>
                  PetPortions does not provide veterinary medical advice. Nothing on the site is intended to diagnose, treat, cure, or prevent disease.
                </p>
                <p>
                  If your pet has a medical condition, is underweight/overweight, or requires a therapeutic diet, consult a licensed veterinarian.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20 dark:border-primary/30 bg-background dark:bg-gray-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                    <Scale className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-h4 text-primary dark:text-primary">4. Accuracy and limitations</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-body-md text-secondary dark:text-secondary space-y-3">
                <p>
                  Results depend on user-provided inputs and on food data sources (kcal/cup, guaranteed analysis, ingredient disclosures).
                </p>
                <p>
                  Pets vary. You are responsible for monitoring body condition and adjusting feeding decisions accordingly.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20 dark:border-primary/30 bg-background dark:bg-gray-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                    <UserCheck className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-h4 text-primary dark:text-primary">5. Your responsibilities</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-body-md text-secondary dark:text-secondary space-y-3">
                <p>
                  You agree to use the service lawfully and to not misuse it (e.g., attempting to disrupt, scrape excessively, or reverse engineer protected systems).
                </p>
                <p>
                  You are responsible for feeding decisions and for consulting professionals when appropriate.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20 dark:border-primary/30 bg-background dark:bg-gray-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                    <Lock className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-h4 text-primary dark:text-primary">6. Intellectual property</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-body-md text-secondary dark:text-secondary space-y-3">
                <p>
                  The service, design, and content are owned by PetPortions and protected by applicable laws.
                </p>
                <p>
                  You may use the service for personal use. You may not resell or redistribute the service without permission.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20 dark:border-primary/30 bg-background dark:bg-gray-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                    <Ban className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-h4 text-primary dark:text-primary">7. Disclaimers</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-body-md text-secondary dark:text-secondary space-y-3">
                <p>
                  The service is provided on an “as is” and “as available” basis without warranties of any kind.
                </p>
                <p>
                  We do not guarantee that the service will be uninterrupted or error-free.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20 dark:border-primary/30 bg-background dark:bg-gray-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                    <AlertTriangle className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-h4 text-primary dark:text-primary">8. Limitation of liability</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-body-md text-secondary dark:text-secondary space-y-3">
                <p>
                  To the maximum extent permitted by law, PetPortions is not liable for any indirect, incidental, special, consequential, or punitive damages.
                </p>
                <p>
                  Your use of PetPortions is at your own risk.
                </p>
              </CardContent>
            </Card>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 rounded-2xl border-2 border-primary/20 bg-background dark:bg-gray-800 p-8"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="text-h4 font-bold text-primary dark:text-primary mb-2">Questions?</h3>
                <p className="text-body-md text-secondary dark:text-secondary">
                  If you have questions about these terms, contact us.
                </p>
              </div>
              <a
                href="mailto:contact@petportions.com"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
              >
                <Mail className="h-4 w-4" />
                contact@petportions.com
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-6 flex items-center gap-2 text-sm text-secondary dark:text-secondary">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span>Last updated: January 2025</span>
            </div>
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
