/**
 * Migration script to move data from MongoDB to Netlify Blobs
 * Run locally with: npx tsx scripts/migrate-to-blobs.ts
 */

import { PrismaClient } from '@prisma/client';
import { getStore } from '@netlify/blobs';
import * as fs from 'fs/promises';

const prisma = new PrismaClient();

interface SimplePetFood {
  id: string;
  code: string;
  brand: string;
  productName: string;
  species: 'dog' | 'cat';
  lifestage: string;
  kcalPerCup: number;
  kcalPerKg: number;
  kcalPer100g?: number;
  source: 'custom';
}

async function migrate() {
  console.log('🚀 Starting migration from MongoDB to Netlify Blobs...\n');

  try {
    // Fetch all pet foods from MongoDB
    console.log('📦 Fetching pet foods from MongoDB...');
    const foods = await prisma.petFood.findMany({
      select: {
        id: true,
        brand: true,
        productName: true,
        species: true,
        lifestage: true,
        kcalPerCup: true,
        kcalPerKg: true,
        kcalPer100g: true,
      },
      orderBy: [
        { brand: 'asc' },
        { productName: 'asc' },
      ],
    });

    console.log(`✅ Found ${foods.length} pet foods\n`);

    // Transform to simple format
    console.log('🔄 Transforming data...');
    const simpleFoods: SimplePetFood[] = foods.map(f => ({
      id: f.id,
      code: f.id,
      brand: f.brand,
      productName: f.productName,
      species: f.species.toLowerCase() as 'dog' | 'cat',
      lifestage: f.lifestage.toLowerCase().replace('_', ' '),
      kcalPerCup: f.kcalPerCup || 0,
      kcalPerKg: f.kcalPerKg || 0,
      kcalPer100g: f.kcalPer100g ?? undefined,
      source: 'custom' as const,
    }));

    // Save to local file as backup
    console.log('💾 Saving backup to local file...');
    await fs.writeFile(
      'petfoods-backup.json',
      JSON.stringify(simpleFoods, null, 2)
    );
    console.log(`✅ Backup saved to petfoods-backup.json\n`);

    // If running in Netlify context with NETLIFY_TOKEN, save to Blobs
    if (process.env.NETLIFY_TOKEN) {
      console.log('☁️  Uploading to Netlify Blobs...');
      const store = getStore('petfoods');
      await store.set('all-foods', JSON.stringify(simpleFoods));
      console.log('✅ Data uploaded to Netlify Blobs\n');
    } else {
      console.log('⚠️  NETLIFY_TOKEN not set - skipping Blobs upload');
      console.log('   To upload to Netlify Blobs, run:');
      console.log('   netlify env:set NETLIFY_TOKEN <your-token>');
      console.log('   Then run this script again\n');
    }

    console.log('📊 Migration Summary:');
    console.log(`   Total foods: ${simpleFoods.length}`);
    console.log(`   Dogs: ${simpleFoods.filter(f => f.species === 'dog').length}`);
    console.log(`   Cats: ${simpleFoods.filter(f => f.species === 'cat').length}`);
    console.log('\n✨ Migration complete!');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

migrate();


