import { NextResponse } from 'next/server';
import { getQuote } from '@/lib/market/adapter';

export async function POST(req) {
  const { symbols } = await req.json().catch(() => ({}));
  if (!Array.isArray(symbols) || symbols.length === 0) {
    return NextResponse.json({ error: 'Missing symbols' }, { status: 400 });
  }

  const upper = symbols.map((s) => String(s).toUpperCase());
  const results = await Promise.allSettled(upper.map((s) => getQuote(s)));

  const data = upper.map((symbol, i) => {
    const r = results[i];
    return r.status === 'fulfilled'
      ? { symbol, ...r.value }
      : { symbol, error: String(r.reason || 'fetch failed') };
  });

  return NextResponse.json({ data });
}

export const dynamic = 'force-dynamic';
