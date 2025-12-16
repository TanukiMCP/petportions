"use client";

import React from "react";
import Link from "next/link";
import { Cookie, Database, Settings, ArrowRight, Shield, CheckCircle, Eye, Lock, HardDrive, Key, BarChart3, Info, ServerOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function CookiesPage() {
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
              Cookie Policy
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-display-sm md:text-display-md text-primary dark:text-primary mb-6 font-bold leading-tight"
          >
            Cookie Policy
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-secondary dark:text-secondary max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Understanding how PetPortions uses browser storage and local data.
          </motion.p>
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
                <Cookie className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-h4 font-bold text-primary dark:text-primary mb-2">The short version</h2>
                <p className="text-body-md text-secondary dark:text-secondary">
                  PetPortions primarily uses browser local storage to remember tool inputs. We do not use advertising cookies.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-gray-800 border border-primary/20">
                    <HardDrive className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-primary">Local storage</p>
                      <p className="text-sm text-secondary dark:text-secondary">Used for profiles/history and preferences.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-gray-800 border border-primary/20">
                    <ServerOff className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-primary">No tracking</p>
                      <p className="text-sm text-secondary dark:text-secondary">No third-party ad tracking cookies.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cookie Details */}
      <section className="py-16 md:py-24 bg-tertiary dark:bg-gray-800/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Local Storage */}
            <Card className="border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 group h-full">
              <CardContent className="p-8 flex flex-col h-full">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 dark:bg-primary/20 mb-6 group-hover:bg-primary/20 transition-colors">
                  <HardDrive className="h-8 w-8 text-primary dark:text-primary" />
                </div>
                
                <h3 className="text-h5 font-bold mb-4 text-center group-hover:text-primary transition-colors">Local Storage</h3>
                
                <div className="text-body-md text-secondary dark:text-secondary space-y-4 flex-grow">
                  <p>
                    PetPortions saves pet profiles and calculation history on your device so the tools can remember your inputs and recent results.
                  </p>
                  <p className="text-sm text-secondary/80">
                    If you clear your browser data, this saved information may be removed.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Session Storage */}
            <Card className="border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 group h-full">
              <CardContent className="p-8 flex flex-col h-full">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 dark:bg-primary/20 mb-6 group-hover:bg-primary/20 transition-colors">
                  <Database className="h-8 w-8 text-primary dark:text-primary" />
                </div>

                <h3 className="text-h5 font-bold mb-4 text-center group-hover:text-primary transition-colors">Session Storage</h3>

                <div className="text-body-md text-secondary dark:text-secondary space-y-4 flex-grow">
                  <p>
                    Some temporary state may be held during your session (for example, in-progress form steps).
                  </p>
                  <p className="text-sm text-secondary/80">
                    This is typically cleared when you close the tab or browser.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Auth */}
            <Card className="border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 group h-full">
              <CardContent className="p-8 flex flex-col h-full">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 dark:bg-primary/20 mb-6 group-hover:bg-primary/20 transition-colors">
                  <Key className="h-8 w-8 text-primary dark:text-primary" />
                </div>
                
                <h3 className="text-h5 font-bold mb-4 text-center group-hover:text-primary transition-colors">Authentication</h3>
                
                <div className="text-body-md text-secondary dark:text-secondary space-y-4 flex-grow">
                  <p>
                    If you sign in, your session is managed in the browser.
                  </p>
                  <p>
                    Depending on your settings, the session may persist across browser restarts.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Analytics */}
            <Card className="border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 group h-full">
              <CardContent className="p-8 flex flex-col h-full">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 dark:bg-primary/20 mb-6 group-hover:bg-primary/20 transition-colors">
                  <BarChart3 className="h-8 w-8 text-primary dark:text-primary" />
                </div>
                
                <h3 className="text-h5 font-bold mb-4 text-center group-hover:text-primary transition-colors">Analytics Cookies</h3>
                
                <div className="text-body-md text-secondary dark:text-secondary space-y-4 flex-grow">
                  <p>
                    PetPortions does not currently use analytics tracking cookies.
                  </p>
                  <p className="text-sm font-medium bg-primary/5 dark:bg-primary/10 text-secondary dark:text-secondary p-3 rounded-lg border border-primary/20">
                    We respect your privacy and do not track your behavior across the site.
                  </p>
                </div>
              </CardContent>
            </Card>

          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary/10 dark:bg-primary/20 shrink-0">
                <Info className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-h4 font-bold text-primary dark:text-primary mb-2">Managing your stored data</h3>
                <p className="text-body-md text-secondary dark:text-secondary mb-6">
                  You can remove locally stored data at any time from your browser settings.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-semibold text-primary mb-1">Clear site data</p>
                    <p className="text-sm">Clear site data for petportions.com to remove stored profiles and history.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-semibold text-primary mb-1">Private browsing</p>
                    <p className="text-sm">Use an incognito/private window to reduce persistence between sessions.</p>
                  </div>
                </div>
              </div>
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
