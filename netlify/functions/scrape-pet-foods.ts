/**
 * Netlify Scheduled Function: Pet Food Scraper
 * 
 * Runs weekly to update pet food database with latest products
 * Schedule: Every Sunday at 2 AM UTC
 * 
 * To configure schedule, add to netlify.toml:
 * [functions."scrape-pet-foods"]
 *   schedule = "0 2 * * 0"
 */

import type { Config } from "@netlify/functions";
import { PrismaClient, Species, FoodType, Lifestage } from '@prisma/client';
import { 
  completeNutritionalAnalysis, 
  type GuaranteedAnalysis 
} from '../../src/lib/nutrition/calculations';

const prisma = new PrismaClient();

interface ThePetFoodIndexProduct {
  brandName: string;
  name: string;
  type: 'dog' | 'cat';
  carriedByBAP: boolean;
  grainStatus: boolean;
  protein: number;
  fat: number;
  fiber: number;
  moisture: number;
  kcal: number;
  ingredients: string;
}

async function fetchProductsFromBundle(): Promise<ThePetFoodIndexProduct[]> {
  const BUNDLE_URL = 'https://thepetfoodindex.com/assets/index-42ec9c7f.js';
  
  const response = await fetch(BUNDLE_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch bundle: ${response.status}`);
  }
  
  const bundleText = await response.text();
  
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
  
  return products;
}

function mapProductToPetFood(product: ThePetFoodIndexProduct) {
  const ga: GuaranteedAnalysis = {
    protein: product.protein,
    fat: product.fat,
    fiber: product.fiber,
    moisture: product.moisture,
  };
  
  const analysis = completeNutritionalAnalysis(ga);
  const species = product.type === 'dog' ? Species.DOG : Species.CAT;
  const foodType = product.moisture > 70 ? FoodType.WET_CANNED : 
                   product.moisture > 40 ? FoodType.SEMI_MOIST : 
                   FoodType.DRY_KIBBLE;
  
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
  
  const firstIngredient = product.ingredients.split(',')[0]?.trim() || null;
  const sourceUrl = `thepetfoodindex.com/${product.type}/${encodeURIComponent(product.brandName)}-${encodeURIComponent(product.name)}`;
  
  return {
    brand: product.brandName,
    productName: product.name,
    species,
    foodType,
    lifestage,
    sourceUrl,
    proteinMin: ga.protein,
    fatMin: ga.fat,
    fiberMax: ga.fiber,
    moistureMax: ga.moisture,
    ashMax: analysis.guaranteedAnalysis.ash,
    proteinDmb: analysis.dryMatterBasis.protein,
    fatDmb: analysis.dryMatterBasis.fat,
    carbsDmb: analysis.dryMatterBasis.carbohydrates,
    fiberDmb: analysis.dryMatterBasis.fiber,
    proteinCalories: analysis.calorieWeightedBasis.protein,
    fatCalories: analysis.calorieWeightedBasis.fat,
    carbsCalories: analysis.calorieWeightedBasis.carbohydrates,
    kcalPerCup: product.kcal,
    kcalPerKg: analysis.metabolizableEnergy.kcalPerKg,
    kcalPer100g: analysis.metabolizableEnergy.kcalPer100g,
    ingredients: product.ingredients,
    firstIngredient,
    notes: analysis.warnings.length > 0 ? analysis.warnings.join('; ') : null,
  };
}

export default async (req: Request) => {
  const startTime = Date.now();
  
  try {
    console.log('🚀 Starting Pet Food Scraper (Netlify Function)...');
    
    const products = await fetchProductsFromBundle();
    console.log(`✅ Extracted ${products.length} products`);
    
    let saved = 0;
    let updated = 0;
    let errors = 0;
    
    for (const product of products) {
      try {
        const petFoodData = mapProductToPetFood(product);
        
        await prisma.petFood.upsert({
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
        
        const isNew = await prisma.petFood.findUnique({
          where: { sourceUrl: petFoodData.sourceUrl },
          select: { scrapedAt: true }
        }).then(result => {
          const timeDiff = Date.now() - result!.scrapedAt.getTime();
          return timeDiff < 5000; // Created in last 5 seconds
        });
        
        if (isNew) saved++;
        else updated++;
        
      } catch (error) {
        errors++;
      }
    }
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    const result = {
      success: true,
      timestamp: new Date().toISOString(),
      duration: `${duration}s`,
      stats: {
        total: products.length,
        saved,
        updated,
        errors,
      }
    };
    
    console.log('✅ Scraper completed:', result);
    
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error: any) {
    console.error('❌ Scraper failed:', error);
    
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
  schedule: "0 2 * * 0" // Every Sunday at 2 AM UTC
};

