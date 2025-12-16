/**
 * Scrape K9 of Mine Google Sheet (2300+ dog foods) and CatInfo.org (cat foods)
 */

import puppeteer from 'puppeteer';
import * as fs from 'fs/promises';
import type { PetFood } from '../src/types/petfood';

const K9_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1mIHyvTG9joDGoh53iHlDEpMQl4m10FhXZ7bn75xMa4I/edit';
const CATINFO_URL = 'https://www.catinfo.org/chart/';

async function scrapeK9Sheet(): Promise<PetFood[]> {
  console.log('🐕 Scraping K9 of Mine spreadsheet...');
  
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  // Export as CSV
  const csvUrl = K9_SHEET_URL.replace('/edit', '/export?format=csv');
  
  try {
    const response = await fetch(csvUrl);
    const csvText = await response.text();
    
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');
    
    console.log(`Headers: ${headers.slice(0, 10).join(', ')}`);
    
    const foods: PetFood[] = [];
    
    // Parse CSV
    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(',');
      if (row.length < 5) continue;
      
      const brand = row[0]?.trim();
      const productName = row[1]?.trim();
      const kcalPerCup = parseFloat(row[6]); // Adjust index based on actual column
      
      if (!brand || !productName || !kcalPerCup) continue;
      
      foods.push({
        id: `k9-${i}`,
        brand,
        productName,
        species: 'dog',
        foodType: 'dry',
        lifestage: 'adult',
        isPrescription: false,
        kcalPerCup,
        kcalPerKg: Math.round(kcalPerCup * 9),
        guaranteedAnalysis: {
          proteinMin: parseFloat(row[3]) || 0,
          fatMin: parseFloat(row[4]) || 0,
          fiberMax: parseFloat(row[5]) || 0,
          moistureMax: 10,
        },
        sourceUrl: 'https://www.k9ofmine.com/the-ultimate-dog-food-comparison-table/',
        scrapedAt: new Date().toISOString(),
      });
    }
    
    console.log(`✅ Scraped ${foods.length} dog foods from K9 of Mine`);
    return foods;
  } finally {
    await browser.close();
  }
}

async function scrapeCatInfo(): Promise<PetFood[]> {
  console.log('🐱 Scraping CatInfo.org...');
  
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    await page.goto(CATINFO_URL, { waitUntil: 'networkidle2' });
    
    const foods = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('table tr'));
      const results: any[] = [];
      
      for (const row of rows) {
        const cells = Array.from(row.querySelectorAll('td'));
        if (cells.length < 5) continue;
        
        const brand = cells[0]?.textContent?.trim();
        const productName = cells[1]?.textContent?.trim();
        const protein = parseFloat(cells[2]?.textContent || '0');
        const fat = parseFloat(cells[3]?.textContent || '0');
        const carbs = parseFloat(cells[4]?.textContent || '0');
        
        if (!brand || !productName) continue;
        
        // Estimate kcal/cup from macronutrients (rough calculation)
        const kcalPerCup = Math.round((protein * 3.5 + fat * 8.5 + carbs * 3.5) * 0.9);
        
        results.push({
          brand,
          productName,
          protein,
          fat,
          carbs,
          kcalPerCup,
        });
      }
      
      return results;
    });
    
    const petFoods: PetFood[] = foods.map((f, i) => ({
      id: `catinfo-${i}`,
      brand: f.brand,
      productName: f.productName,
      species: 'cat' as const,
      foodType: 'wet' as const,
      lifestage: 'adult' as const,
      isPrescription: false,
      kcalPerCup: f.kcalPerCup,
      kcalPerKg: Math.round(f.kcalPerCup * 9),
      guaranteedAnalysis: {
        proteinMin: f.protein,
        fatMin: f.fat,
        fiberMax: 3,
        moistureMax: 78,
      },
      sourceUrl: CATINFO_URL,
      scrapedAt: new Date().toISOString(),
    }));
    
    console.log(`✅ Scraped ${petFoods.length} cat foods from CatInfo`);
    return petFoods;
  } finally {
    await browser.close();
  }
}

async function main() {
  const dogFoods = await scrapeK9Sheet();
  const catFoods = await scrapeCatInfo();
  
  const allFoods = [...dogFoods, ...catFoods];
  
  await fs.writeFile('public/petfoods-data.json', JSON.stringify(allFoods));
  await fs.writeFile('petfoods-scraped.json', JSON.stringify(allFoods, null, 2));
  
  console.log(`\n✅ DONE!`);
  console.log(`   Total: ${allFoods.length} foods`);
  console.log(`   Dogs: ${dogFoods.length}`);
  console.log(`   Cats: ${catFoods.length}`);
  console.log(`   Brands: ${new Set(allFoods.map(f => f.brand)).size}`);
}

main();


