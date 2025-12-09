/**
 * Complete Pet Food Scraper
 * 
 * Scrapes ThePetFoodIndex for all products and calculates all derived nutritional data
 * using our calculation utilities. No external enrichment needed!
 */

import { PrismaClient, Species, FoodType, Lifestage, ScraperJobType, ScraperJobStatus } from '@prisma/client';
import { 
  completeNutritionalAnalysis, 
  GuaranteedAnalysis 
} from '../../src/lib/nutrition/calculations';

const prisma = new PrismaClient();

interface ThePetFoodIndexProduct {
  brandName: string;
  name: string;
  type: 'dog' | 'cat';
  carriedByBAP: boolean;
  grainStatus: boolean;
  protein: number; // % as-fed
  fat: number; // % as-fed
  fiber: number; // % as-fed
  moisture: number; // % as-fed
  kcal: number; // kcal/cup
  ingredients: string;
}

/**
 * Fetch and parse ThePetFoodIndex JavaScript bundle
 */
async function fetchProductsFromBundle(): Promise<ThePetFoodIndexProduct[]> {
  console.log('📦 Fetching ThePetFoodIndex JavaScript bundle...');
  
  // The bundle URL might change - if this breaks, check the network tab
  const BUNDLE_URL = 'https://thepetfoodindex.com/assets/index-42ec9c7f.js';
  
  try {
    const response = await fetch(BUNDLE_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch bundle: ${response.status} ${response.statusText}`);
    }
    
    const bundleText = await response.text();
    console.log(`✅ Bundle fetched (${(bundleText.length / 1024 / 1024).toFixed(2)} MB)`);
    console.log('🔍 Extracting products...');
    
    // Extract products using regex to match individual product objects
    // Pattern: {brandName:"X",name:"Y",type:"dog/cat",carriedByBAP:bool,grainStatus:bool,protein:N,fat:N,fiber:N,moisture:N,kcal:N,ingredients:"..."}
    const productRegex = /\{brandName:"([^"]+)",name:"([^"]+)",type:"(dog|cat)",carriedByBAP:(!?\d),grainStatus:(!?\d),protein:(\d+),fat:(\d+),fiber:([\d.]+),moisture:(\d+),kcal:(\d+),ingredients:"([^"]+)"\}/g;
    
    const products: ThePetFoodIndexProduct[] = [];
    let match;
    
    while ((match = productRegex.exec(bundleText)) !== null) {
      products.push({
        brandName: match[1],
        name: match[2],
        type: match[3] as 'dog' | 'cat',
        carriedByBAP: match[4] === '!0',
        grainStatus: match[5] === '!0',
        protein: parseInt(match[6]),
        fat: parseInt(match[7]),
        fiber: parseFloat(match[8]),
        moisture: parseInt(match[9]),
        kcal: parseInt(match[10]),
        ingredients: match[11],
      });
    }
    
    console.log(`✅ Extracted ${products.length} products`);
    console.log(`   - Dogs: ${products.filter(p => p.type === 'dog').length}`);
    console.log(`   - Cats: ${products.filter(p => p.type === 'cat').length}`);
    
    return products;
    
  } catch (error) {
    console.error('❌ Failed to fetch products from bundle:', error);
    throw error;
  }
}

/**
 * Map ThePetFoodIndex product to our PetFood model with full calculations
 */
function mapProductToPetFood(product: ThePetFoodIndexProduct) {
  // Build guaranteed analysis from available data
  const ga: GuaranteedAnalysis = {
    protein: product.protein,
    fat: product.fat,
    fiber: product.fiber,
    moisture: product.moisture,
    // ash is not provided, will be estimated
  };
  
  // Run complete nutritional analysis
  const analysis = completeNutritionalAnalysis(ga);
  
  // Log warnings if any
  if (analysis.warnings.length > 0) {
    console.warn(`⚠️  ${product.brandName} ${product.name}:`, analysis.warnings);
  }
  
  // Determine species enum
  const species = product.type === 'dog' ? Species.DOG : Species.CAT;
  
  // Determine food type (ThePetFoodIndex is primarily dry food)
  const foodType = product.moisture > 70 ? FoodType.WET_CANNED : 
                   product.moisture > 40 ? FoodType.SEMI_MOIST : 
                   FoodType.DRY_KIBBLE;
  
  // Determine lifestage (default to ADULT, would need parsing product name for better accuracy)
  let lifestage: Lifestage = Lifestage.ADULT;
  const productNameLower = product.name.toLowerCase();
  if (product.type === 'dog' && productNameLower.includes('puppy')) {
    lifestage = Lifestage.PUPPY;
  } else if (product.type === 'cat' && productNameLower.includes('kitten')) {
    lifestage = Lifestage.KITTEN;
  } else if (productNameLower.includes('senior')) {
    lifestage = Lifestage.SENIOR;
  } else if (productNameLower.includes('all life') || productNameLower.includes('all ages')) {
    lifestage = Lifestage.ALL_LIFE_STAGES;
  }
  
  // Extract first ingredient
  const firstIngredient = product.ingredients.split(',')[0]?.trim() || null;
  
  // Generate a stable source URL (ThePetFoodIndex doesn't have direct product links)
  const sourceUrl = `thepetfoodindex.com/${product.type}/${encodeURIComponent(product.brandName)}-${encodeURIComponent(product.name)}`;
  
  return {
    // Basic info
    brand: product.brandName,
    productName: product.name,
    species,
    foodType,
    lifestage,
    
    // Source tracking
    sourceUrl,
    
    // Guaranteed Analysis (as-fed)
    proteinMin: ga.protein,
    fatMin: ga.fat,
    fiberMax: ga.fiber,
    moistureMax: ga.moisture,
    ashMax: analysis.guaranteedAnalysis.ash,
    
    // Dry Matter Basis
    proteinDmb: analysis.dryMatterBasis.protein,
    fatDmb: analysis.dryMatterBasis.fat,
    carbsDmb: analysis.dryMatterBasis.carbohydrates,
    fiberDmb: analysis.dryMatterBasis.fiber,
    
    // Calorie Weighted Basis
    proteinCalories: analysis.calorieWeightedBasis.protein,
    fatCalories: analysis.calorieWeightedBasis.fat,
    carbsCalories: analysis.calorieWeightedBasis.carbohydrates,
    
    // Caloric content
    kcalPerCup: product.kcal,
    kcalPerKg: analysis.metabolizableEnergy.kcalPerKg,
    kcalPer100g: analysis.metabolizableEnergy.kcalPer100g,
    
    // Ingredients
    ingredients: product.ingredients,
    firstIngredient,
    
    // Metadata
    notes: analysis.warnings.length > 0 ? analysis.warnings.join('; ') : null,
  };
}

/**
 * Save products to database
 */
async function saveProductsToDatabase(products: ThePetFoodIndexProduct[]) {
  console.log('\n💾 Saving products to database...');
  
  let saved = 0;
  let updated = 0;
  let errors = 0;
  
  for (const product of products) {
    try {
      const petFoodData = mapProductToPetFood(product);
      
      // Use upsert to avoid transaction requirement
      const result = await prisma.petFood.upsert({
        where: { sourceUrl: petFoodData.sourceUrl },
        update: {
          ...petFoodData,
          lastVerified: new Date(),
          version: { increment: 1 },
          updatedAt: new Date(),
        },
        create: {
          ...petFoodData,
          scrapedAt: new Date(),
          lastVerified: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      
      // Check if it was created or updated based on scrapedAt
      const isNew = result.scrapedAt.getTime() === new Date().setMilliseconds(0);
      if (isNew) {
        saved++;
      } else {
        updated++;
      }
      
      // Progress indicator
      if ((saved + updated) % 100 === 0) {
        console.log(`  Progress: ${saved + updated}/${products.length} (${saved} new, ${updated} updated)`);
      }
      
    } catch (error) {
      console.error(`  ❌ Failed to save ${product.brandName} ${product.name}:`, error);
      errors++;
    }
  }
  
  return { saved, updated, errors };
}

/**
 * Main scraper execution
 */
async function main() {
  console.log('🚀 Starting Complete Pet Food Scraper...');
  console.log('📊 Strategy: ThePetFoodIndex + Full Nutritional Calculations\n');
  
  try {
    // Fetch products from bundle
    const products = await fetchProductsFromBundle();
    
    if (products.length === 0) {
      throw new Error('No products found in bundle');
    }
    
    // Save to database
    const { saved, updated, errors } = await saveProductsToDatabase(products);
    
    console.log('\n✅ Scraper completed successfully!');
    console.log(`   - New products: ${saved}`);
    console.log(`   - Updated products: ${updated}`);
    console.log(`   - Errors: ${errors}`);
    console.log(`   - Total in database: ${saved + updated}`);
    
  } catch (error: any) {
    console.error('\n❌ Scraper failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run scraper
main().catch(console.error);

