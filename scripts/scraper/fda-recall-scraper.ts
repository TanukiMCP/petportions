/**
 * FDA Pet Food Recall Scraper
 * 
 * Fetches recent pet food recalls from FDA and stores them in MongoDB
 * Matches recalls to products in our database
 * Run this daily/weekly to keep recall data up to date
 */

import { PrismaClient, Species } from '@prisma/client';
import { searchFDARecalls, getRecallSeverity, type FDARecall } from '../../src/lib/api/fda-recalls';

const prisma = new PrismaClient();

/**
 * Simple brand name matching algorithm
 * Checks if recall firm name matches any brand in our database
 */
function matchBrandName(recallingFirm: string, productDescription: string, brands: string[]): string[] {
  const matches: string[] = [];
  const searchText = `${recallingFirm} ${productDescription}`.toLowerCase();
  
  for (const brand of brands) {
    const brandLower = brand.toLowerCase();
    
    // Direct match
    if (searchText.includes(brandLower)) {
      matches.push(brand);
      continue;
    }
    
    // Check for common variations
    // e.g., "Blue Buffalo" vs "Blue" or "Buffalo"
    const brandWords = brandLower.split(/[\s-]/);
    if (brandWords.length > 1) {
      const allWordsMatch = brandWords.every(word => 
        word.length > 3 && searchText.includes(word)
      );
      if (allWordsMatch) {
        matches.push(brand);
      }
    }
  }
  
  return [...new Set(matches)]; // Remove duplicates
}

/**
 * Determine species from product description
 */
function determineSpecies(productDescription: string): Species | null {
  const desc = productDescription.toLowerCase();
  
  const hasDog = desc.includes('dog') || desc.includes('canine') || desc.includes('puppy');
  const hasCat = desc.includes('cat') || desc.includes('feline') || desc.includes('kitten');
  
  if (hasDog && !hasCat) return Species.DOG;
  if (hasCat && !hasDog) return Species.CAT;
  return null; // Both or neither - ambiguous
}

/**
 * Match FDA recall to products in our database
 */
async function matchRecallToProducts(recall: FDARecall): Promise<string[]> {
  try {
    // Get all unique brands from database
    const brands = await prisma.petFood.findMany({
      select: { brand: true },
      distinct: ['brand'],
    });
    
    const brandNames = brands.map(b => b.brand);
    
    // Find matching brands
    const matchedBrands = matchBrandName(
      recall.recallingFirm,
      recall.productDescription,
      brandNames
    );
    
    if (matchedBrands.length === 0) {
      return [];
    }
    
    // Get all products from matched brands
    const species = determineSpecies(recall.productDescription);
    
    const where: any = {
      brand: { in: matchedBrands },
    };
    
    if (species) {
      where.species = species;
    }
    
    const matchedProducts = await prisma.petFood.findMany({
      where,
      select: { id: true },
    });
    
    return matchedProducts.map(p => p.id);
    
  } catch (error) {
    console.error('Error matching recall to products:', error);
    return [];
  }
}

/**
 * Calculate match confidence score (0-1)
 */
function calculateMatchConfidence(
  recallingFirm: string,
  productDescription: string,
  matchedBrands: string[]
): number {
  if (matchedBrands.length === 0) return 0;
  
  const firmLower = recallingFirm.toLowerCase();
  const descLower = productDescription.toLowerCase();
  
  // High confidence if exact brand name match in firm
  for (const brand of matchedBrands) {
    if (firmLower.includes(brand.toLowerCase())) {
      return 0.95;
    }
  }
  
  // Medium confidence if brand appears in description
  for (const brand of matchedBrands) {
    if (descLower.includes(brand.toLowerCase())) {
      return 0.75;
    }
  }
  
  // Low confidence - partial word match
  return 0.5;
}

/**
 * Main scraper function
 */
async function scrapeFDARecalls() {
  console.log('🚨 Starting FDA Pet Food Recall Scraper...\n');
  
  try {
    // Fetch recent recalls (last 2 years to catch any ongoing ones)
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
    
    console.log('📡 Fetching recalls from FDA API...');
    const recalls = await searchFDARecalls({
      dateFrom: twoYearsAgo.toISOString().split('T')[0],
      limit: 500,
    });
    
    console.log(`✅ Found ${recalls.length} pet food recalls\n`);
    
    if (recalls.length === 0) {
      console.log('No recalls found. Done!');
      return;
    }
    
    let saved = 0;
    let updated = 0;
    let matched = 0;
    
    console.log('💾 Processing and saving recalls...\n');
    
    for (const recall of recalls) {
      try {
        // Match to products in database
        const matchedProductIds = await matchRecallToProducts(recall);
        
        // Get matched brands for confidence calculation
        const brands = await prisma.petFood.findMany({
          where: { id: { in: matchedProductIds } },
          select: { brand: true },
          distinct: ['brand'],
        });
        const matchedBrands = [...new Set(brands.map(b => b.brand))];
        
        const matchConfidence = calculateMatchConfidence(
          recall.recallingFirm,
          recall.productDescription,
          matchedBrands
        );
        
        // Determine species
        const species = determineSpecies(recall.productDescription);
        
        // Check if recall already exists
        const existing = await prisma.petFoodRecall.findUnique({
          where: { recallNumber: recall.recallNumber },
        });
        
        // Parse recall date safely
        const recallDate = new Date(recall.recallDate);
        const validRecallDate = isNaN(recallDate.getTime()) ? new Date() : recallDate;
        
        const recallData = {
          recallDate: validRecallDate,
          recallStatus: recall.status,
          productNames: recall.productDescription.substring(0, 500), // Limit length
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
          matchedPetFoodIds: matchedProductIds,
          matchConfidence,
          resolved: recall.status.toLowerCase().includes('terminated') || recall.status.toLowerCase().includes('completed'),
          resolvedAt: recall.status.toLowerCase().includes('terminated') ? new Date() : null,
        };
        
        if (existing) {
          await prisma.petFoodRecall.update({
            where: { id: existing.id },
            data: recallData,
          });
          updated++;
        } else {
          await prisma.petFoodRecall.create({
            data: {
              recallNumber: recall.recallNumber,
              ...recallData,
            },
          });
          saved++;
        }
        
        if (matchedProductIds.length > 0) {
          matched++;
          console.log(`  ⚠️  ${recall.recallNumber}: ${recall.recallingFirm} - Matched ${matchedProductIds.length} products (${(matchConfidence * 100).toFixed(0)}% confidence)`);
        }
        
      } catch (error) {
        console.error(`  ❌ Failed to process recall ${recall.recallNumber}:`, error);
      }
    }
    
    console.log(`\n✅ FDA Recall Scraper completed!`);
    console.log(`   - New recalls: ${saved}`);
    console.log(`   - Updated recalls: ${updated}`);
    console.log(`   - Recalls matched to products: ${matched}`);
    console.log(`   - Total in database: ${saved + updated}`);
    
  } catch (error) {
    console.error('\n❌ Scraper failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * Extract contaminant from recall reason
 */
function extractContaminant(reason: string): string | null {
  const reasonLower = reason.toLowerCase();
  
  const contaminants = [
    'salmonella',
    'listeria',
    'e. coli',
    'aflatoxin',
    'pentobarbital',
    'euthanasia',
    'metal',
    'plastic',
    'glass',
    'vitamin d',
    'thiamine',
    'mold',
    'bacteria',
  ];
  
  for (const contaminant of contaminants) {
    if (reasonLower.includes(contaminant)) {
      return contaminant.charAt(0).toUpperCase() + contaminant.slice(1);
    }
  }
  
  return null;
}

// Run scraper
scrapeFDARecalls().catch((error) => {
  console.error(error);
  process.exit(1);
});

