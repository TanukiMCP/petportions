/**
 * API Route to serve all pet foods for client-side caching
 * This allows instant, zero-latency searches after initial load
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  try {
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

    return NextResponse.json(simpleFoods, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
  } catch (error) {
    console.error('Error fetching pet foods:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pet foods' },
      { status: 500 }
    );
  }
}

