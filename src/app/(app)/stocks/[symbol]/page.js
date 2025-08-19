import { headers } from 'next/headers';
import StockClient from './StockClient';

export const dynamic = 'force-dynamic';

export default async function Page({ params: paramsPromise }) {
  const { symbol: raw } = await paramsPromise;
  const symbol = (raw ?? '').toUpperCase();

  let initialData = null;
  try {
    const h = await headers();
    const origin = `${h.get('x-forwarded-proto') || 'http'}://${h.get('host')}`;
    const res = await fetch(
      `${origin}/api/stocks?symbol=${encodeURIComponent(symbol)}&details=true`,
      { cache: 'no-store' }
    );
    if (res.ok) initialData = await res.json();
  } catch {}

  return <StockClient symbol={symbol} initialData={initialData} />;
}
