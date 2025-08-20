import { NextResponse } from 'next/server';
import { getQuote, getDetails } from '@/lib/market/adapter';

const CACHE_TTL_MS = 60_000;
const memCache = new Map();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get('symbol');
  const details = searchParams.get('details') === 'true';
  if (!symbol) {
    return NextResponse.json(
      { error: 'Stock symbol required' },
      { status: 400 }
    );
  }

  const key = `${symbol.toUpperCase()}${details ? ':details' : ':quote'}`;
  const now = Date.now();
  const cached = memCache.get(key);
  if (cached && now - cached.t < CACHE_TTL_MS) {
    return NextResponse.json(cached.data, { status: 200 });
  }

  try {
    const data = details ? await getDetails(symbol) : await getQuote(symbol);
    console.log('Data fetched for symbol:', symbol, ': Data:', data);

    memCache.set(key, { t: now, data });
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error('Error fetching stock:', err);
    const status = /not found/i.test(String(err?.message)) ? 404 : 500;
    return NextResponse.json(
      { error: err?.message || 'Failed to fetch stock' },
      { status }
    );
  }
}
