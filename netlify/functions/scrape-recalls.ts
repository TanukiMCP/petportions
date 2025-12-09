/**
 * Netlify Scheduled Function: FDA Recall Scraper
 * 
 * Runs daily to check for new pet food recalls
 * Schedule: Every day at 6 AM UTC
 * 
 * To configure schedule, add to netlify.toml:
 * [functions."scrape-recalls"]
 *   schedule = "0 6 * * *"
 */

import type { Config } from "@netlify/functions";
import { PrismaClient, Species } from '@prisma/client';
import { searchFDARecalls, getRecallSeverity } from '../../src/lib/api/fda-recalls';

const prisma = new PrismaClient();

function matchBrandName(recallingFirm: string, productDescription: string, brands: string[]): string[] {
  const matches: string[] = [];
  const searchText = `${recallingFirm} ${productDescription}`.toLowerCase();
  
  for (const brand of brands) {
    const brandLower = brand.toLowerCase();
    if (searchText.includes(brandLower)) {
      matches.push(brand);
    }
  }
  
  return [...new Set(matches)];
}

function determineSpecies(productDescription: string): Species | null {
  const desc = productDescription.toLowerCase();
  const hasDog = desc.includes('dog') || desc.includes('canine') || desc.includes('puppy');
  const hasCat = desc.includes('cat') || desc.includes('feline') || desc.includes('kitten');
  
  if (hasDog && !hasCat) return Species.DOG;
  if (hasCat && !hasDog) return Species.CAT;
  return null;
}

function extractContaminant(reason: string): string | null {
  const reasonLower = reason.toLowerCase();
  const contaminants = ['salmonella', 'listeria', 'e. coli', 'aflatoxin', 'pentobarbital', 'metal', 'plastic', 'glass', 'vitamin d', 'mold'];
  
  for (const contaminant of contaminants) {
    if (reasonLower.includes(contaminant)) {
      return contaminant.charAt(0).toUpperCase() + contaminant.slice(1);
    }
  }
  return null;
}

async function matchRecallToProducts(recallingFirm: string, productDescription: string, species: Species | null) {
  const brands = await prisma.petFood.findMany({
    select: { brand: true },
    distinct: ['brand'],
  });
  
  const brandNames = brands.map(b => b.brand);
  const matchedBrands = matchBrandName(recallingFirm, productDescription, brandNames);
  
  if (matchedBrands.length === 0) return { productIds: [], confidence: 0 };
  
  const where: any = { brand: { in: matchedBrands } };
  if (species) where.species = species;
  
  const products = await prisma.petFood.findMany({
    where,
    select: { id: true },
  });
  
  const firmLower = recallingFirm.toLowerCase();
  const confidence = matchedBrands.some(b => firmLower.includes(b.toLowerCase())) ? 0.95 : 0.75;
  
  return { productIds: products.map(p => p.id), confidence };
}

export default async (req: Request) => {
  const startTime = Date.now();
  
  try {
    console.log('🚨 Starting FDA Recall Scraper (Netlify Function)...');
    
    // Fetch recalls from last 60 days
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
    
    const recalls = await searchFDARecalls({
      dateFrom: sixtyDaysAgo.toISOString().split('T')[0],
      limit: 100,
    });
    
    console.log(`✅ Found ${recalls.length} pet food recalls`);
    
    let saved = 0;
    let updated = 0;
    let matched = 0;
    
    for (const recall of recalls) {
      try {
        const species = determineSpecies(recall.productDescription);
        const { productIds, confidence } = await matchRecallToProducts(
          recall.recallingFirm,
          recall.productDescription,
          species
        );
        
        if (productIds.length > 0) matched++;
        
        const recallDate = new Date(recall.recallDate);
        const validRecallDate = isNaN(recallDate.getTime()) ? new Date() : recallDate;
        
        const recallData = {
          recallDate: validRecallDate,
          recallStatus: recall.status,
          productNames: recall.productDescription.substring(0, 500),
          brandName: recall.recallingFirm,
          species,
          companyName: recall.recallingFirm,
          companyCity: recall.city,
          companyState: recall.state,
          companyCountry: recall.country,
          reason: recall.reason.substring(0, 1000),
          recallClass: recall.classification,
          hazardClassification: recall.classification,
          contaminant: extractContaminant(recall.reason),
          healthRisk: getRecallSeverity(recall.classification) === 'high' ? 'High Risk' : 
                      getRecallSeverity(recall.classification) === 'medium' ? 'Moderate Risk' : 'Low Risk',
          distributionPattern: recall.distributionPattern,
          quantity: recall.productQuantity,
          lotNumbers: recall.codeInfo,
          fdaReportUrl: `https://www.accessdata.fda.gov/scripts/enforcement/enforce_rpt-Product-Tabs.cfm?action=select&recall_number=${recall.recallNumber}`,
          matchedPetFoodIds: productIds,
          matchConfidence: confidence,
          resolved: recall.status.toLowerCase().includes('terminated') || recall.status.toLowerCase().includes('completed'),
          resolvedAt: recall.status.toLowerCase().includes('terminated') ? new Date() : null,
        };
        
        const existing = await prisma.petFoodRecall.findUnique({
          where: { recallNumber: recall.recallNumber },
        });
        
        if (existing) {
          await prisma.petFoodRecall.update({
            where: { id: existing.id },
            data: recallData,
          });
          updated++;
        } else {
          await prisma.petFoodRecall.create({
            data: { recallNumber: recall.recallNumber, ...recallData },
          });
          saved++;
        }
      } catch (error) {
        console.error(`Failed to process recall ${recall.recallNumber}:`, error);
      }
    }
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    const result = {
      success: true,
      timestamp: new Date().toISOString(),
      duration: `${duration}s`,
      stats: {
        total: recalls.length,
        saved,
        updated,
        matched,
      }
    };
    
    console.log('✅ Recall scraper completed:', result);
    
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error: any) {
    console.error('❌ Recall scraper failed:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  } finally {
    await prisma.$disconnect();
  }
};

export const config: Config = {
  schedule: "0 6 * * *" // Every day at 6 AM UTC
};

