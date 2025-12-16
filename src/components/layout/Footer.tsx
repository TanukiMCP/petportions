"use client";

import React from "react";
import Link from "next/link";
import { PawPrint, Calculator, ClipboardCheck, TrendingUp, ArrowRightLeft, Mail, Twitter, Facebook, Instagram } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    tools: [
      { name: "Feeding Calculator", href: "/calculator", icon: Calculator },
      { name: "Food Grader", href: "/food-grader", icon: ClipboardCheck },
      { name: "Weight Tracker", href: "/pets", icon: TrendingUp },
      { name: "Diet Transition", href: "/diet-transition", icon: ArrowRightLeft },
    ],
    resources: [
      { name: "About Us", href: "/about" },
      { name: "How It Works", href: "/how-it-works" },
      { name: "FAQ", href: "/faq" },
      { name: "Contact", href: "/contact" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
    ],
  };

  const socialLinks = [
    { name: "Twitter", href: "#", icon: Twitter },
    { name: "Facebook", href: "#", icon: Facebook },
    { name: "Instagram", href: "#", icon: Instagram },
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-primary/20 dark:border-primary/20">
      <div className="container mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <PawPrint className="h-6 w-6 text-primary dark:text-primary group-hover:scale-110 transition-transform" />
              <span className="text-h4 font-bold text-primary dark:text-primary">PetPortions</span>
            </Link>
            <p className="text-body-sm text-secondary dark:text-secondary mb-4 max-w-xs">
              Veterinary-grade nutrition calculators and food analysis tools to help you make informed decisions about your pet's diet.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    className="flex items-center justify-center h-10 w-10 rounded-lg border border-primary/30 dark:border-primary/30 text-primary dark:text-primary hover:bg-primary/10 dark:hover:bg-primary/10 transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Tools Section */}
          <div>
            <h3 className="text-h5 font-semibold text-primary dark:text-primary mb-4">Tools</h3>
            <ul className="space-y-3">
              {footerLinks.tools.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-body-sm text-secondary dark:text-secondary hover:text-primary dark:hover:text-primary transition-colors group"
                    >
                      <Icon className="h-4 w-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h3 className="text-h5 font-semibold text-primary dark:text-primary mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-secondary dark:text-secondary hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="text-h5 font-semibold text-primary dark:text-primary mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-secondary dark:text-secondary hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary/20 dark:border-primary/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-body-sm text-secondary dark:text-secondary text-center md:text-left">
              © {currentYear} PetPortions. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-body-sm text-secondary dark:text-secondary">
              <Mail className="h-4 w-4" />
              <a href="mailto:contact@petportions.com" className="hover:text-primary dark:hover:text-primary transition-colors">
                contact@petportions.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}



