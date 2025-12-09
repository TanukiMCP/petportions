/**
 * AAFCO Nutritional Adequacy Analysis
 * 
 * Compares pet food nutritional profiles against official AAFCO standards
 * to determine if food meets minimum requirements for different life stages.
 */

import { prisma } from '@/lib/db/prisma';
import { Species, Lifestage } from '@prisma/client';
import type { PetFood } from '@/lib/types/food';

export interface AAFCOComplianceResult {
  meetsStandards: boolean;
  profile: string; // "Growth", "Maintenance", "All Life Stages"
  deficiencies: string[];
  warnings: string[];
  excesses: string[];
  overallScore: number; // 0-100
  details: {
    protein: { actual: number; required: number; status: 'pass' | 'fail' | 'warning' };
    fat: { actual: number; required: number; status: 'pass' | 'fail' | 'warning' };
    calcium?: { actual: number; required: number; status: 'pass' | 'fail' | 'warning' };
    phosphorus?: { actual: number; required: number; status: 'pass' | 'fail' | 'warning' };
  };
}

/**
 * Analyze a pet food against AAFCO standards
 */
export async function analyzeAAFCOCompliance(
  food: PetFood,
  targetLifestage?: 'puppy' | 'kitten' | 'adult' | 'senior' | 'all life stages'
): Promise<AAFCOComplianceResult> {
  try {
    // Map species
    const species = food.species === 'dog' ? Species.DOG : Species.CAT;
    
    // Map lifestage
    let lifestage: Lifestage;
    const foodLifestage = targetLifestage || food.lifestage?.toLowerCase();
    
    if (foodLifestage?.includes('puppy')) {
      lifestage = Lifestage.PUPPY;
    } else if (foodLifestage?.includes('kitten')) {
      lifestage = Lifestage.KITTEN;
    } else if (foodLifestage?.includes('all')) {
      lifestage = Lifestage.ALL_LIFE_STAGES;
    } else if (foodLifestage?.includes('senior')) {
      lifestage = Lifestage.SENIOR;
    } else {
      lifestage = Lifestage.ADULT;
    }
    
    // Seniors use adult/maintenance standards
    if (lifestage === Lifestage.SENIOR) {
      lifestage = Lifestage.ADULT;
    }
    
    // Get AAFCO standard
    const standard = await prisma.aAFCOStandard.findFirst({
      where: {
        species,
        lifestage,
      },
    });
    
    if (!standard) {
      return {
        meetsStandards: false,
        profile: 'Unknown',
        deficiencies: ['No AAFCO standard found for this species/lifestage combination'],
        warnings: [],
        excesses: [],
        overallScore: 0,
        details: {
          protein: { actual: 0, required: 0, status: 'fail' },
          fat: { actual: 0, required: 0, status: 'fail' },
        },
      };
    }
    
    // Extract nutritional data from food (use DMB for comparison)
    const proteinDmb = food.nutrients?.protein || food.guaranteed_analysis?.protein_min || 0;
    const fatDmb = food.nutrients?.fat || food.guaranteed_analysis?.fat_min || 0;
    
    const deficiencies: string[] = [];
    const warnings: string[] = [];
    const excesses: string[] = [];
    let passCount = 0;
    let totalChecks = 0;
    
    // Check protein
    totalChecks++;
    const proteinStatus: 'pass' | 'fail' | 'warning' = 
      proteinDmb >= standard.proteinMinDmb ? 'pass' :
      proteinDmb >= standard.proteinMinDmb * 0.9 ? 'warning' : 'fail';
    
    if (proteinStatus === 'pass') {
      passCount++;
    } else if (proteinStatus === 'warning') {
      passCount += 0.5;
      warnings.push(`Protein (${proteinDmb.toFixed(1)}% DMB) is slightly below recommended ${standard.proteinMinDmb}%`);
    } else {
      deficiencies.push(`Protein (${proteinDmb.toFixed(1)}% DMB) is below minimum ${standard.proteinMinDmb}%`);
    }
    
    // Check fat
    totalChecks++;
    const fatStatus: 'pass' | 'fail' | 'warning' = 
      fatDmb >= standard.fatMinDmb ? 'pass' :
      fatDmb >= standard.fatMinDmb * 0.9 ? 'warning' : 'fail';
    
    if (fatStatus === 'pass') {
      passCount++;
    } else if (fatStatus === 'warning') {
      passCount += 0.5;
      warnings.push(`Fat (${fatDmb.toFixed(1)}% DMB) is slightly below recommended ${standard.fatMinDmb}%`);
    } else {
      deficiencies.push(`Fat (${fatDmb.toFixed(1)}% DMB) is below minimum ${standard.fatMinDmb}%`);
    }
    
    // Check calcium/phosphorus if available (from guaranteed analysis)
    let calciumStatus: 'pass' | 'fail' | 'warning' | undefined;
    let phosphorusStatus: 'pass' | 'fail' | 'warning' | undefined;
    
    // Note: Our scraped data doesn't have calcium/phosphorus yet, so these checks will be skipped for now
    // This is where you'd add calcium/phosphorus checks if that data becomes available
    
    // Calculate overall score
    const overallScore = Math.round((passCount / totalChecks) * 100);
    
    // Determine if it meets standards (>= 90% pass rate)
    const meetsStandards = overallScore >= 90 && deficiencies.length === 0;
    
    return {
      meetsStandards,
      profile: standard.profile,
      deficiencies,
      warnings,
      excesses,
      overallScore,
      details: {
        protein: {
          actual: proteinDmb,
          required: standard.proteinMinDmb,
          status: proteinStatus,
        },
        fat: {
          actual: fatDmb,
          required: standard.fatMinDmb,
          status: fatStatus,
        },
      },
    };
    
  } catch (error) {
    console.error('Error analyzing AAFCO compliance:', error);
    return {
      meetsStandards: false,
      profile: 'Error',
      deficiencies: ['Unable to analyze AAFCO compliance'],
      warnings: [],
      excesses: [],
      overallScore: 0,
      details: {
        protein: { actual: 0, required: 0, status: 'fail' },
        fat: { actual: 0, required: 0, status: 'fail' },
      },
    };
  }
}

/**
 * Get human-readable AAFCO compliance summary
 */
export function getAAFCOComplianceSummary(result: AAFCOComplianceResult): string {
  if (result.meetsStandards) {
    return `✓ Meets AAFCO ${result.profile} nutritional standards (${result.overallScore}% compliant)`;
  } else if (result.overallScore >= 75) {
    return `⚠ Mostly meets AAFCO ${result.profile} standards (${result.overallScore}% compliant) with minor gaps`;
  } else {
    return `✗ Does not meet AAFCO ${result.profile} standards (${result.overallScore}% compliant)`;
  }
}

/**
 * Get AAFCO badge color based on compliance
 */
export function getAAFCOBadgeColor(result: AAFCOComplianceResult): 'green' | 'yellow' | 'red' {
  if (result.meetsStandards) return 'green';
  if (result.overallScore >= 75) return 'yellow';
  return 'red';
}

