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
    
    // Add a timeout to the Prisma query
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Database query timeout')), 8000)
    );

    const queryPromise = prisma.petFood.findMany({
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
      take: 5000, // Limit to 5000 foods to avoid memory issues
    });

    const foods = await Promise.race([queryPromise, timeoutPromise]) as any[];
    
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

    console.log(`[API] Transformed foods in ${Date.now() - startTime}ms`);

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

