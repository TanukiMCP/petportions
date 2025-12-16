/**
 * API Route to serve all pet foods for client-side caching
 * Uses Netlify Blobs for fast, serverless-native storage
 */

import { NextResponse } from 'next/server';
import { getStore } from '@netlify/blobs';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Cache for 1 hour
export const maxDuration = 10; // Serverless function timeout (seconds)

export async function GET() {
  console.log('[API] /api/petfoods - Starting request');
  const startTime = Date.now();

  try {
    let foods;
    
    // In production, use Netlify Blobs
    if (process.env.NETLIFY) {
      console.log('[API] Fetching from Netlify Blobs...');
      const store = getStore('petfoods');
      const data = await store.get('all-foods', { type: 'text' });
      foods = data ? JSON.parse(data) : [];
    } 
    // In development, serve from public folder
    else {
      console.log('[API] Development mode - loading from public/petfoods-data.json');
      const fs = await import('fs/promises');
      const path = await import('path');
      const dataPath = path.join(process.cwd(), 'public', 'petfoods-data.json');
      
      try {
        const data = await fs.readFile(dataPath, 'utf-8');
        foods = JSON.parse(data);
      } catch (e) {
        console.error('[API] Could not read petfoods-data.json:', e);
        foods = [];
      }
    }

    console.log(`[API] Fetched ${foods.length} pet foods in ${Date.now() - startTime}ms`);

    return NextResponse.json(foods, {
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
  }
}

