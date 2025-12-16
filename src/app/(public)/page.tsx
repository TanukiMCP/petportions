import React from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, PawPrint, Calculator, ClipboardCheck } from "lucide-react";
import { HeroWithProductMockup } from "@/components/landing/HeroWithProductMockup";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <HeroWithProductMockup />

      <FeaturesSection />

      <HowItWorksSection />

      {/* Resources CTA */}
      <section className="py-16 md:py-24 px-4 bg-tertiary dark:bg-gray-800">
        <div className="container mx-auto max-w-7xl">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center rounded-3xl bg-white/70 dark:bg-gray-900/40 border border-white/60 dark:border-gray-800/60 shadow-sm px-6 md:px-10 py-10">
              <div className="space-y-5">
                <div className="text-sm font-semibold tracking-wide text-primary">
                  Resources
                </div>
                <h2 className="text-h1 text-gray-900 dark:text-gray-100">
                  Evidence-based feeding guides, made practical
                </h2>
                <p className="text-body-lg text-gray-700 dark:text-gray-200 max-w-xl">
                  Learn how to read labels, compare calorie density, and make sense of ingredients so your calculator results translate to real-world portions.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/resources">
                    <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all duration-200 px-6 py-6">
                      Explore Resources
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/calculator">
                    <Button size="lg" variant="outline" className="gap-2 px-6 py-6 border border-gray-200 text-primary bg-white hover:bg-primary/5 transition-all duration-200">
                      Try Calculator
                      <Calculator className="h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="p-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    Featured articles
                  </div>
                  <Link href="/resources" className="text-xs font-semibold text-primary hover:underline underline-offset-4">
                    View all
                  </Link>
                </div>

                <div className="space-y-3">
                  <Link
                    href="/resources"
                    className="group flex gap-4 rounded-2xl bg-white/70 dark:bg-gray-900/40 border border-gray-200/70 dark:border-gray-800 hover:border-primary/30 hover:bg-primary/5 transition-colors p-4"
                  >
                    <div className="w-20 shrink-0">
                      <div className="relative aspect-[4/3] rounded-xl bg-[#fdfbf7] dark:bg-gray-900 border border-gray-200/70 dark:border-gray-800 overflow-hidden">
                        <img
                          src="https://cdn.undraw.co/illustration/continuous-learning_a1ld.svg?type=svg"
                          alt=""
                          className="absolute inset-0 w-full h-full object-contain p-2"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-600 dark:text-gray-400">
                        <span className="text-primary">Labels</span>
                        <span className="text-gray-300 dark:text-gray-700">•</span>
                        <span>4 min read</span>
                      </div>
                      <div className="mt-1 text-sm font-semibold text-gray-900 dark:text-gray-100 leading-snug">
                        How to read kcal/cup & kcal/kg on pet food labels
                      </div>
                      <div className="mt-1 text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                        Quickly find calorie density and avoid the most common label interpretation mistakes.
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors mt-1 shrink-0" />
                  </Link>

                  <Link
                    href="/resources"
                    className="group flex gap-4 rounded-2xl bg-white/70 dark:bg-gray-900/40 border border-gray-200/70 dark:border-gray-800 hover:border-primary/30 hover:bg-primary/5 transition-colors p-4"
                  >
                    <div className="w-20 shrink-0">
                      <div className="relative aspect-[4/3] rounded-xl bg-[#fdfbf7] dark:bg-gray-900 border border-gray-200/70 dark:border-gray-800 overflow-hidden">
                        <img
                          src="https://cdn.undraw.co/illustration/document-ready_o5d5.svg?type=svg"
                          alt=""
                          className="absolute inset-0 w-full h-full object-contain p-2"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-600 dark:text-gray-400">
                        <span className="text-primary">Portions</span>
                        <span className="text-gray-300 dark:text-gray-700">•</span>
                        <span>5 min read</span>
                      </div>
                      <div className="mt-1 text-sm font-semibold text-gray-900 dark:text-gray-100 leading-snug">
                        Cups vs grams: when measuring by weight matters
                      </div>
                      <div className="mt-1 text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                        Learn when to weigh food for accuracy and how to convert from cups to grams.
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors mt-1 shrink-0" />
                  </Link>

                  <Link
                    href="/resources"
                    className="group flex gap-4 rounded-2xl bg-white/70 dark:bg-gray-900/40 border border-gray-200/70 dark:border-gray-800 hover:border-primary/30 hover:bg-primary/5 transition-colors p-4"
                  >
                    <div className="w-20 shrink-0">
                      <div className="relative aspect-[4/3] rounded-xl bg-[#fdfbf7] dark:bg-gray-900 border border-gray-200/70 dark:border-gray-800 overflow-hidden">
                        <img
                          src="https://cdn.undraw.co/illustration/homework-research_kufa.svg?type=svg"
                          alt=""
                          className="absolute inset-0 w-full h-full object-contain p-2"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-600 dark:text-gray-400">
                        <span className="text-primary">Nutrition</span>
                        <span className="text-gray-300 dark:text-gray-700">•</span>
                        <span>6 min read</span>
                      </div>
                      <div className="mt-1 text-sm font-semibold text-gray-900 dark:text-gray-100 leading-snug">
                        Choosing foods by life stage and calorie density
                      </div>
                      <div className="mt-1 text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                        How to match puppy/adult/senior formulas to your pet and avoid overfeeding.
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors mt-1 shrink-0" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-tertiary dark:bg-gray-800">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-8">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                100% Free • No Sign-Up Required
              </span>
            </div>
            <h2 className="text-display-sm mb-6 text-gray-900 dark:text-gray-100">
              Start Making <span className="text-primary">Better Nutrition Decisions</span> Today
            </h2>
            <p className="text-body-lg text-secondary dark:text-secondary mb-10 max-w-2xl mx-auto">
              Free veterinary-grade calculators based on established nutrition science. Get personalized feeding recommendations in under 2 minutes.
          </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/calculator">
                <Button size="lg" className="gap-2 group bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all text-base px-8 py-6">
                  <Calculator className="h-5 w-5" />
                  Calculate Portions Now
                  <PawPrint className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </Button>
              </Link>
              <Link href="/food-grader">
                <Button size="lg" variant="outline" className="gap-2 border-2 border-primary/40 dark:border-primary/40 text-primary hover:bg-white dark:hover:bg-gray-700 text-base px-8 py-6 bg-white dark:bg-gray-800">
                  <ClipboardCheck className="h-5 w-5" />
                  Grade Your Food
            </Button>
          </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

