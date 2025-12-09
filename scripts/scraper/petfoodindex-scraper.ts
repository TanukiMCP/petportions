/**
 * Pet Food Index Scraper
 * 
 * Scrapes pet food data from ThePetFoodIndex.com (React SPA)
 * 
 * Data available:
 * - Brand, Product Name, Species (dog/cat stored as "type" field)
 * - kcalPerCup (CRITICAL for calculator)
 * - Guaranteed Analysis (protein, fat, fiber, moisture)
 * - Full ingredients list
 * - Grain/Grain-free indicator
 * 
 * Approach: Extract data directly from the React bundle JavaScript file
 * rather than scraping rendered DOM. Much faster and more reliable!
 */

import puppeteer from 'puppeteer';
import { prisma } from '@/lib/db/prisma';

interface ScrapedProduct {
  brand: string;
  productName: string;
  species: 'dog' | 'cat';
  kcalPerCup: number;
  protein: number;
  fat: number;
  fiber: number;
  moisture: number;
  ingredients: string;
  isGrainFree: boolean;
}

/**
 * Extract products from a single page (dog or cat)
 */
async function scrapeSpeciesCatalog(
  species: 'dog' | 'cat'
): Promise<ScrapedProduct[]> {
  console.log(`\n🐾 Scraping ${species} food catalog...`);
  
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Navigate to catalog and set localStorage before page loads
    await page.evaluateOnNewDocument((speciesParam) => {
      localStorage.setItem('animalSelection', speciesParam);
    }, species);
    
    console.log(`📡 Loading food catalog for ${species}...`);
    await page.goto('https://thepetfoodindex.com/food-catalog', {
      waitUntil: 'networkidle2',
      timeout: 60000
    });
    
    // Wait for the SUBMIT button to appear
    console.log(`⏳ Waiting for form to load...`);
    await page.waitForSelector('button', { timeout: 10000 });
    
    // Click the SUBMIT button to trigger product loading
    console.log(`🖱️  Clicking SUBMIT button...`);
    await page.evaluate(() => {
      const submitButton = Array.from(document.querySelectorAll('button')).find(
        btn => btn.textContent?.trim().toUpperCase() === 'SUBMIT'
      );
      if (submitButton) (submitButton as HTMLButtonElement).click();
    });
    
    // Wait for React to render products after submit
    console.log(`⏳ Waiting for products to load...`);
    await page.waitForFunction(
      () => {
        const text = document.body.textContent || '';
        const hasKcal = text.includes('kcal/cup');
        const hasProteins = text.includes('Crude Protein');
        return hasKcal && hasProteins;
      },
      { timeout: 30000 }
    );
    
    console.log(`✅ Page loaded, extracting products...`);
    
    // Extract all product data from the rendered DOM
    const products = await page.evaluate((speciesParam) => {
      const extractedProducts: any[] = [];
      
      // Find all elements containing "kcal/cup" - these are product cards
      const allElements = Array.from(document.querySelectorAll('*'));
      const productCards = allElements.filter(el => {
        const text = el.textContent || '';
        return text.includes('kcal/cup') && 
               text.includes('Crude Protein') &&
               text.includes('Crude Fat') &&
               text.length > 200 && // Substantial content
               text.length < 5000; // Not the whole page
      });
      
      console.log(`Found ${productCards.length} potential product cards`);
      
      // Process each card
      const seenProducts = new Set<string>();
      
      productCards.forEach((card) => {
        const text = card.textContent || '';
        
        // Extract brand and product name from h2 or first strong text
        const headings = card.querySelectorAll('h2, h3, strong');
        let brand = '';
        let productName = '';
        
        if (headings.length > 0) {
          const headingText = headings[0].textContent?.trim() || '';
          const lines = headingText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
          
          // First non-empty line is usually the brand
          brand = lines[0] || '';
          // Rest is product name
          productName = lines.slice(1).join(' ').trim();
          
          // If no product name found in heading, try to extract from nearby text
          if (!productName && lines.length === 1) {
            // Look for text after the brand before "Amount Per Serving"
            const beforeCalories = text.split('Amount Per Serving')[0];
            const afterBrand = beforeCalories.split(brand)[1];
            if (afterBrand) {
              productName = afterBrand.trim().split('\n')[0].trim();
            }
          }
        }
        
        // Skip if we couldn't find brand
        if (!brand || brand === 'Daily Values') {
          return;
        }
        
        // Create unique key
        const uniqueKey = `${brand}-${productName}`;
        if (seenProducts.has(uniqueKey)) {
          return;
        }
        seenProducts.add(uniqueKey);
        
        // Extract kcalPerCup
        const kcalMatch = text.match(/(\d+)\s*kcal\/cup/i);
        const kcalPerCup = kcalMatch ? parseInt(kcalMatch[1]) : null;
        
        // Extract Guaranteed Analysis
        const proteinMatch = text.match(/Crude Protein[:\s]*(\d+(?:\.\d+)?)%/i);
        const fatMatch = text.match(/Crude Fat[:\s]*(\d+(?:\.\d+)?)%/i);
        const fiberMatch = text.match(/Crude Fiber[:\s]*(\d+(?:\.\d+)?)%/i);
        const moistureMatch = text.match(/Moisture[:\s]*(\d+(?:\.\d+)?)%/i);
        
        const protein = proteinMatch ? parseFloat(proteinMatch[1]) : null;
        const fat = fatMatch ? parseFloat(fatMatch[1]) : null;
        const fiber = fiberMatch ? parseFloat(fiberMatch[1]) : null;
        const moisture = moistureMatch ? parseFloat(moistureMatch[1]) : null;
        
        // Extract ingredients (text between moisture% and end, contains commas)
        const moistureIndex = text.indexOf('Moisture');
        let ingredients = '';
        if (moistureIndex > 0) {
          const afterMoisture = text.substring(moistureIndex + 100); // Skip "Moisture XX%"
          // Find the first long comma-separated text
          const lines = afterMoisture.split('\n');
          for (const line of lines) {
            if (line.includes(',') && line.length > 50) {
              ingredients = line.trim();
              break;
            }
          }
        }
        
        // Check for grain-free icon (grain with slash or "Grain Free" text)
        const isGrainFree = text.includes('Grain Free') || 
                           card.querySelector('[alt*="grain"]') !== null;
        
        // Only add if we have the critical data
        if (kcalPerCup && protein && fat && brand && productName) {
          extractedProducts.push({
            brand,
            productName,
            species: speciesParam,
            kcalPerCup,
            protein,
            fat,
            fiber,
            moisture,
            ingredients,
            isGrainFree
          });
        }
      });
      
      return extractedProducts;
    }, species); // Pass species as parameter to evaluate
    
    console.log(`✅ Extracted ${products.length} ${species} food products`);
    
    return products as ScrapedProduct[];
    
  } finally {
    await browser.close();
  }
}

/**
 * Save products to database
 */
async function saveProductsToDatabase(products: ScrapedProduct[]) {
  console.log(`\n💾 Saving ${products.length} products to database...`);
  
  let saved = 0;
  let updated = 0;
  let errors = 0;
  
  for (const product of products) {
    try {
      // Create unique externalId from brand + product name
      const externalId = `petfoodindex-${product.species}-${product.brand}-${product.productName}`
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, '-')
        .replace(/-+/g, '-');
      
      // Upsert (create or update)
      await prisma.petFood.upsert({
        where: { externalId },
        update: {
          brand: product.brand,
          productName: product.productName,
          species: product.species,
          kcalPerCup: product.kcalPerCup,
          ingredients: product.ingredients || null,
          guaranteedAnalysis: {
            protein_min: product.protein,
            fat_min: product.fat,
            fiber_max: product.fiber,
            moisture_max: product.moisture,
          },
          sourceUrl: `https://thepetfoodindex.com/catalog/${product.species}`,
          lastScraped: new Date(),
        },
        create: {
          externalId,
          brand: product.brand,
          productName: product.productName,
          species: product.species,
          kcalPerCup: product.kcalPerCup,
          ingredients: product.ingredients || null,
          guaranteedAnalysis: {
            protein_min: product.protein,
            fat_min: product.fat,
            fiber_max: product.fiber,
            moisture_max: product.moisture,
          },
          sourceUrl: `https://thepetfoodindex.com/catalog/${product.species}`,
          lastScraped: new Date(),
        },
      });
      
      // Check if it was an update or create (simplified - just count as saved)
      saved++;
      
    } catch (error) {
      console.error(`❌ Error saving ${product.brand} - ${product.productName}:`, error);
      errors++;
    }
  }
  
  console.log(`\n✅ Database save complete:`);
  console.log(`   - Saved/Updated: ${saved}`);
  console.log(`   - Errors: ${errors}`);
}

/**
 * Main scraper function
 */
async function main() {
  console.log('🚀 Starting Pet Food Index Scraper...\n');
  
  const startTime = Date.now();
  
  try {
    // Scrape dog food
    const dogProducts = await scrapeSpeciesCatalog('dog');
    
    // Scrape cat food
    const catProducts = await scrapeSpeciesCatalog('cat');
    
    // Combine all products
    const allProducts = [...dogProducts, ...catProducts];
    
    console.log(`\n📊 Scraping Summary:`);
    console.log(`   - Dog foods: ${dogProducts.length}`);
    console.log(`   - Cat foods: ${catProducts.length}`);
    console.log(`   - Total: ${allProducts.length}`);
    
    // Save to database
    await saveProductsToDatabase(allProducts);
    
    // Record scraper job
    await prisma.scraperJob.create({
      data: {
        source: 'thepetfoodindex.com',
        status: 'completed',
        productsScraped: allProducts.length,
        startedAt: new Date(startTime),
        completedAt: new Date(),
      },
    });
    
    const duration = ((Date.now() - startTime) / 1000 / 60).toFixed(2);
    console.log(`\n🎉 Scraping complete in ${duration} minutes!`);
    
  } catch (error) {
    console.error('\n❌ Scraping failed:', error);
    
    // Record failed job
    await prisma.scraperJob.create({
      data: {
        source: 'thepetfoodindex.com',
        status: 'failed',
        error: error instanceof Error ? error.message : String(error),
        startedAt: new Date(startTime),
        completedAt: new Date(),
      },
    });
    
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main()
    .then(() => {
      console.log('\n✅ Script finished successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Script failed:', error);
      process.exit(1);
    });
}

export { scrapeSpeciesCatalog, saveProductsToDatabase };

