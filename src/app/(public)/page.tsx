import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PawPrint, Calculator, ClipboardCheck } from "lucide-react";
import { HeroWithProductMockup } from "@/components/landing/HeroWithProductMockup";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import BasicSection from "@/components/landing/BasicSection";
import { Badge } from "@/components/ui/badge";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <HeroWithProductMockup />

      <FeaturesSection />

      <HowItWorksSection />

      {/* For Veterinary Professionals */}
      <BasicSection
        imageUrl="/demo-illustration-1.svg"
        title="Built on Veterinary Nutrition Science"
        overTitle="For Veterinary Professionals"
      >
        <p>
          Our calculators use established RER and MER formulas recommended by veterinary nutritionists. 
          Free tools for in-clinic use with printable client handouts.
        </p>
        <ul className="space-y-3 mt-6">
          <li className="flex items-start gap-3">
            <span className="text-primary">✓</span>
            <div>
              <strong>In-Room Use:</strong> Calculate in seconds during consultations
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary">✓</span>
            <div>
              <strong>Evidence-Based:</strong> Algorithms based on veterinary nutrition science
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary">✓</span>
            <div>
              <strong>AAFCO Aligned:</strong> Follows AAFCO standards and guidelines
            </div>
          </li>
        </ul>
        <div className="mt-8 p-6 bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-xl border-2 border-primary/20 dark:border-primary/30">
          <p className="text-sm font-semibold text-primary dark:text-primary mb-4 uppercase tracking-wide">
            Scientific Foundation:
          </p>
          <div className="flex flex-wrap gap-3">
            <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-2 border-primary/40 text-primary dark:border-primary/40 dark:text-primary bg-white dark:bg-gray-800">
              RER/MER Formulas
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-2 border-primary/40 text-primary dark:border-primary/40 dark:text-primary bg-white dark:bg-gray-800">
              AAFCO Guidelines
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-2 border-primary/40 text-primary dark:border-primary/40 dark:text-primary bg-white dark:bg-gray-800">
              Peer-Reviewed Research
            </Badge>
          </div>
        </div>
      </BasicSection>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-tertiary dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 border-2 border-primary/30 mb-8">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-bold text-primary dark:text-primary uppercase tracking-wide">
                100% Free • No Sign-Up Required
              </span>
        </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-primary dark:text-primary leading-tight">
              Start Making Better Nutrition Decisions Today
            </h2>
            <p className="text-lg md:text-xl text-secondary dark:text-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
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

