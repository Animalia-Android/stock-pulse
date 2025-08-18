const FINNHUB_BASE = 'https://finnhub.io/api/v1';

function readApiKey() {
  return process.env.FINNHUB_API_KEY || process.env.NEXT_PUBLIC_FINNHUB_API_KEY;
}

/**
 * Fetch a normalized quote for a symbol from Finnhub.
 * @param {string} symbol - e.g. "AAPL"
 * @returns {Promise<{
 *   name: string, symbol: string, price: number,
 *   change: number, percentChange: number,
 *   open: number, high: number, low: number, previousClose: number
 * }>}
 */
export async function getQuote(symbol) {
  const key = readApiKey();
  if (!key) throw new Error('Missing FINNHUB_API_KEY');

  const url = `${FINNHUB_BASE}/quote?symbol=${encodeURIComponent(
    symbol
  )}&token=${key}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Finnhub HTTP ${res.status}`);

  const data = await res.json();

  // Finnhub returns { s: "no_data" } for unknown/missing symbols
  if (data?.s === 'no_data' || data?.c == null) {
    const err = new Error('No quote data');
    err.code = 'NO_DATA';
    throw err;
  }

  return {
    name: symbol.toUpperCase(),
    symbol: symbol.toUpperCase(),
    price: data.c,
    change: data.d,
    percentChange: data.dp,
    open: data.o,
    high: data.h,
    low: data.l,
    previousClose: data.pc,
  };
}
