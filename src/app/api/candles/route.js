import { NextResponse } from 'next/server';
import { getCandles } from '@/lib/market/adapter';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get('symbol');
  const range = searchParams.get('range') || '6M';
  if (!symbol)
    return NextResponse.json({ error: 'symbol required' }, { status: 400 });

  try {
    const data = await getCandles(symbol, { range });
    return NextResponse.json(data, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Failed to fetch candles' },
      { status: 500 }
    );
  }
}
