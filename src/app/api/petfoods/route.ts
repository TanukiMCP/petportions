/**
 * API Route to serve all pet foods for client-side caching
 * This allows instant, zero-latency searches after initial load
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Cache for 1 hour
export const maxDuration = 10; // Serverless function timeout (seconds)

export async function GET() {
  console.log('[API] /api/petfoods - Starting request');
  const startTime = Date.now();

  try {
    console.log('[API] Connecting to database...');
    
    // First, get a count to see how much data we're dealing with
    const count = await prisma.petFood.count();
    console.log(`[API] Total pet foods in DB: ${count}`);

    // If no data, return empty array
    if (count === 0) {
      console.log('[API] No pet foods found in database');
      return NextResponse.json([], {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
        },
      });
    }

    // Fetch with a reasonable limit and only essential fields
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
      take: 1000, // Limit to first 1000 for performance
    });
    
    console.log(`[API] Found ${foods.length} pet foods in ${Date.now() - startTime}ms`);

    // Transform to simple format for client
    const simpleFoods = foods.map(f => ({
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

    console.log(`[API] Transformed ${simpleFoods.length} foods in ${Date.now() - startTime}ms`);

    return NextResponse.json(simpleFoods, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
  } catch (error) {
    const elapsed = Date.now() - startTime;
    console.error(`[API] Error after ${elapsed}ms:`, error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch pet foods',
        message: error instanceof Error ? error.message : 'Unknown error',
        elapsed 
      },
      { status: 500 }
    );
  } finally {
    // Disconnect Prisma to free up resources in serverless
    await prisma.$disconnect().catch(e => console.error('[API] Disconnect error:', e));
  }
}

