"use client";

import React from "react";
import Link from "next/link";
import { Mail, ArrowRight, Phone, MessageCircle, Heart, Clock, HelpCircle, Bug, Github, ShieldAlert, FileText, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function ContactPage() {
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
              Contact Us
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-display-sm md:text-display-md text-primary dark:text-primary mb-6 font-bold leading-tight"
          >
            Get in Touch
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-secondary dark:text-secondary max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Have questions about PetPortions or need help with our tools? We're here to help.
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-background dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-h2 text-primary dark:text-primary mb-4 font-bold">Contact Information</h2>
            <p className="text-body-lg text-secondary dark:text-secondary max-w-2xl mx-auto">
              The fastest way to reach us is via email. We typically respond within 24-48 hours.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            {/* Email Support */}
            <Card className="border-2 border-border bg-card hover:border-primary hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 dark:bg-primary/20 mb-6 mx-auto">
                  <Mail className="h-10 w-10 text-primary dark:text-primary" />
                </div>
                
                <h3 className="text-h3 text-primary dark:text-primary mb-3">Email Support</h3>
                <p className="text-body-md text-secondary dark:text-secondary mb-6">
                  Best for detailed questions, feedback, and anything that needs context.
                </p>
                
                <a 
                  href="mailto:contact@petportions.com"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Mail className="h-5 w-5" />
                  contact@petportions.com
                </a>
              </CardContent>
            </Card>

            {/* FAQ First */}
            <Card className="border-2 border-border bg-card hover:border-primary hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 dark:bg-primary/20 mb-6 mx-auto">
                  <HelpCircle className="h-10 w-10 text-primary" />
                </div>
                
                <h3 className="text-h3 text-primary dark:text-primary mb-3">FAQ (Instant)</h3>
                <p className="text-body-md text-secondary dark:text-secondary mb-6">
                  Most questions are answered there, including calculator methodology and data storage.
                </p>
                
                <Link href="/faq">
                  <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4">
                    Read FAQ
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Report a Bug */}
            <Card className="border-2 border-border bg-card hover:border-primary hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 dark:bg-primary/20 mb-6 mx-auto">
                  <Bug className="h-10 w-10 text-primary" />
                </div>
                
                <h3 className="text-h3 text-primary dark:text-primary mb-3">Bug Reports</h3>
                <p className="text-body-md text-secondary dark:text-secondary mb-6">
                  Include what tool you used, what you expected, and what happened.
                </p>
                
                <a
                  href="mailto:contact@petportions.com?subject=PetPortions%20Bug%20Report"
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
                >
                  Send a bug report
                  <ArrowRight className="h-4 w-4" />
                </a>
              </CardContent>
            </Card>

            {/* Response Time */}
            <Card className="border-2 border-border bg-card hover:border-primary hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 dark:bg-primary/20 mb-6 mx-auto">
                  <Clock className="h-10 w-10 text-primary" />
                </div>
                
                <h3 className="text-h3 text-primary dark:text-primary mb-3">Response Time</h3>
                <p className="text-body-md text-secondary dark:text-secondary mb-6">
                  Typically within 24–48 hours on weekdays.
                </p>
                
                <div className="bg-tertiary dark:bg-gray-800 rounded-lg p-4">
                  <h4 className="font-semibold text-primary dark:text-primary mb-2">Include:</h4>
                  <ul className="text-sm text-secondary dark:text-secondary space-y-1 text-left">
                    <li>• Species, weight, age</li>
                    <li>• Tool used (calculator / grader / transition)</li>
                    <li>• Expected vs actual result</li>
                    <li>• Browser + device if technical</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* What we can help with */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mt-16 mb-12"
          >
            <h2 className="text-h2 text-primary dark:text-primary mb-4 font-bold">What we can help with</h2>
            <p className="text-body-lg text-secondary dark:text-secondary max-w-2xl mx-auto">
              Clear answers about the tools, outputs, and how to interpret them.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-2 border-border bg-card hover:border-primary hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10 dark:bg-primary/20 shrink-0">
                    <Lightbulb className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-h5 font-bold mb-2">How to use the tools</h3>
                    <p className="text-body-md text-secondary dark:text-secondary">
                      Calculator inputs, food selection, transition planning, and printing.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-border bg-card hover:border-primary hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10 dark:bg-primary/20 shrink-0">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-h5 font-bold mb-2">Methodology questions</h3>
                    <p className="text-body-md text-secondary dark:text-secondary">
                      RER/MER formulas, multipliers, grading categories, and what the score means.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* What we can't do */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 rounded-2xl border-2 border-primary/20 bg-primary/5 dark:bg-primary/10 p-8"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary/10 dark:bg-primary/20 shrink-0">
                <ShieldAlert className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-h4 font-bold text-primary dark:text-primary mb-2">Medical disclaimer</h3>
                <p className="text-body-md text-secondary dark:text-secondary">
                  We can explain the tools, but we can’t provide veterinary medical advice, diagnose conditions, or
                  recommend treatment plans. For health issues or weight-loss programs, consult your veterinarian.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
