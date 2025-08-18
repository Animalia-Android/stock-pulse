import { NextResponse } from 'next/server';
import { getQuote } from '@/lib/market/adapter';

const CACHE_TTL_MS = 60_000;
const memCache = new Map();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get('symbol');
  if (!symbol) {
    return NextResponse.json(
      { error: 'Stock symbol required' },
      { status: 400 }
    );
  }

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
    console.error('Error fetching quote:', err?.message || err);
    if (err?.code === 'NO_DATA') {
      return NextResponse.json({ error: 'Stock not found' }, { status: 404 });
    }
    if (String(err?.message || '').includes('Missing FINNHUB_API_KEY')) {
      return NextResponse.json(
        { error: 'Server misconfigured: API key missing' },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: 'Upstream quote provider error' },
      { status: 502 }
    );
  }
}
