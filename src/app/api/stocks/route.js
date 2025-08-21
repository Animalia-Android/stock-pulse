import { NextResponse } from 'next/server';
import { getQuote, getDetails } from '@/lib/market/adapter';

export const dynamic = 'force-dynamic'; // <-- make sure Next doesn't cache this route

const CACHE_TTL_MS = 60_000;
const memCache = new Map();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const raw = searchParams.get('symbol');
  const details = searchParams.get('details') === 'true';

  const symbol = String(raw || '').toUpperCase();
  if (!symbol) {
    return NextResponse.json(
      { error: 'Stock symbol required' },
      { status: 400 }
    );
  }

  const key = `${symbol}${details ? ':details' : ':quote'}`;
  const now = Date.now();
  const cached = memCache.get(key);
  if (cached && now - cached.t < CACHE_TTL_MS) {
    return NextResponse.json(cached.data, { status: 200 });
  }

  try {
    const data = details ? await getDetails(symbol) : await getQuote(symbol);
    // only cache successful responses
    memCache.set(key, { t: now, data });
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    const msg = String(err?.message || '');
    // map upstream errors to appropriate status
    const status = /429/.test(msg)
      ? 429
      : /not found/i.test(msg)
      ? 404
      : /5\d\d/.test(msg)
      ? 502 // upstream 5xx → Bad Gateway
      : 500;

    // don't cache errors
    return NextResponse.json(
      { error: msg || 'Failed to fetch stock' },
      { status }
    );
  }
}
