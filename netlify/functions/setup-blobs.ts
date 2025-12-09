/**
 * One-time Netlify Function to upload pet food data to Blobs
 * This function reads from the backup file and uploads to Netlify Blobs
 * 
 * Call this once after deployment: https://petportionsapp.netlify.app/.netlify/functions/setup-blobs
 */

import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { getStore } from '@netlify/blobs';
import * as fs from 'fs/promises';
import * as path from 'path';

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  console.log('[SETUP] Starting Blobs setup...');

  try {
    // Read the backup file
    const backupPath = path.join(process.cwd(), 'petfoods-backup.json');
    console.log('[SETUP] Reading backup from:', backupPath);
    
    const data = await fs.readFile(backupPath, 'utf-8');
    const foods = JSON.parse(data);
    
    console.log(`[SETUP] Found ${foods.length} pet foods in backup`);

    // Upload to Netlify Blobs
    const store = getStore('petfoods');
    await store.set('all-foods', JSON.stringify(foods));
    
    console.log('[SETUP] Successfully uploaded to Netlify Blobs!');

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        message: 'Pet food data uploaded to Netlify Blobs',
        count: foods.length,
        dogs: foods.filter((f: any) => f.species === 'dog').length,
        cats: foods.filter((f: any) => f.species === 'cat').length,
      }),
    };
  } catch (error) {
    console.error('[SETUP] Error:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};

export { handler };

