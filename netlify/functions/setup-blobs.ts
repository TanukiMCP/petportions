/**
 * One-time Netlify Function to upload pet food data to Blobs
 * This function accepts POST data with the pet food array
 * 
 * POST to: https://petportionsapp.netlify.app/.netlify/functions/setup-blobs
 * Body: JSON array of pet foods
 */

import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { getStore } from '@netlify/blobs';

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  console.log('[SETUP] Starting Blobs setup...');

  try {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method not allowed. Use POST.' }),
      };
    }

    // Parse the request body
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Request body is required' }),
      };
    }

    const foods = JSON.parse(event.body);
    
    if (!Array.isArray(foods)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Body must be an array of pet foods' }),
      };
    }

    console.log(`[SETUP] Received ${foods.length} pet foods`);

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

