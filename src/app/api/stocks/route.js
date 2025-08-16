// import fs from 'fs';
// import path from 'path';

// const CACHE_FILE = path.join(process.cwd(), 'stock_cache.json');
// const CACHE_TTL = 60 * 1000; // 60 seconds cache duration

// const loadCache = () => {
//   try {
//     if (fs.existsSync(CACHE_FILE)) {
//       return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
//     }
//   } catch (error) {
//     console.error('Error loading cache:', error);
//   }
//   return {};
// };

// const saveCache = (cache) => {
//   try {
//     fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf-8');
//   } catch (error) {
//     console.error('Error saving cache:', error);
//   }
// };

// export async function GET(request) {
//   const { searchParams } = new URL(request.url);
//   const symbol = searchParams.get('symbol');

//   if (!symbol) {
//     return new Response(JSON.stringify({ error: 'Stock symbol is required' }), {
//       status: 400,
//     });
//   }

//   const now = Date.now();
//   const cache = loadCache();

//   if (cache[symbol] && now - cache[symbol].timestamp < CACHE_TTL) {
//     console.log(`Cache hit for ${symbol}`);
//     return new Response(JSON.stringify(cache[symbol].data), { status: 200 });
//   }

//   console.log(`Fetching fresh data for ${symbol}`);

//   const API_KEY = 'cuja3dhr01qm7p9nmj30cuja3dhr01qm7p9nmj3g';
//   const API_URL = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`;
//   console.log('Finnhub API Key:', process.env.NEXT_PUBLIC_FINNHUB_API_KEY);

//   try {
//     const response = await fetch(API_URL);
//     const data = await response.json();

//     // Finnhub returns `{ s: "no_data" }` if the stock doesn't exist
//     if (data.s === 'no_data' || !data.c) {
//       return new Response(JSON.stringify({ error: 'Stock not found' }), {
//         status: 404,
//       });
//     }

//     const stockData = {
//       name: symbol.toUpperCase(),
//       symbol: symbol.toUpperCase(),
//       price: data.c,
//       change: data.d,
//       percentChange: data.dp,
//       open: data.o,
//       high: data.h,
//       low: data.l,
//       previousClose: data.pc,
//     };

//     cache[symbol] = { data: stockData, timestamp: now };
//     saveCache(cache);

//     return new Response(JSON.stringify(stockData), { status: 200 });
//   } catch (error) {
//     console.error('Error fetching stock data:', error);
//     return new Response(
//       JSON.stringify({ error: 'Failed to fetch stock data' }),
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from 'next/server';
import { getQuote } from '@/lib/market/adapter';

const CACHE_TTL_MS = 60_000;
const memCache = new Map();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get('symbol');
  if (!symbol)
    return NextResponse.json(
      { error: 'Stock symbol required' },
      { status: 400 }
    );

  const key = symbol.toUpperCase();
  const now = Date.now();
  const cached = memCache.get(key);

  if (cached && now - cached.t < CACHE_TTL_MS) {
    return NextResponse.json(cached.data, { status: 200 });
  }

  try {
    const data = await getQuote(key);
    memCache.set(key, { t: now, data });
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error('Error fetching quote:', err);
    return NextResponse.json(
      { error: 'Failed to fetch stock' },
      { status: 500 }
    );
  }
}
