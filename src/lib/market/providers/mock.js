// src/lib/market/providers/mock.js
import 'server-only';

export async function getQuote(symbol) {
  const s = String(symbol || '').toUpperCase();
  return {
    symbol: s,
    name: s,
    price: 100,
    change: 0.5,
    percentChange: 0.5,
    open: 99.7,
    high: 101.2,
    low: 99.5,
    previousClose: 99.5,
  };
}

export async function getDetails(symbol) {
  const s = String(symbol || '').toUpperCase();
  return {
    symbol: s,
    name: `${s} Corp.`,
    logo: null,
    exchange: 'NASDAQ',
    sector: 'Tech',
    industry: 'Semiconductors',
    price: 100,
    change: 0.5,
    percentChange: 0.5,
    open: 99.7,
    high: 101.2,
    low: 99.5,
    previousClose: 99.5,
    marketCap: 250_000_000_000,
    peRatio: 28.3,
    eps: 3.21,
    dividendYield: 0.006,
    volume: 12_345_678,
    avgVolume: 10_000_000,
    fiftyTwoWeekLow: 80,
    fiftyTwoWeekHigh: 120,
    beta: 1.2,
    revenue: 50_000_000_000,
    grossMargin: 0.62,
    operatingMargin: 0.33,
    netMargin: 0.24,
    roe: 0.18,
    debtToEquity: 0.28,
    freeCashFlow: 12_000_000_000,
    sharesOutstanding: 1_500_000_000,
    news: [],
    peers: ['AMD', 'INTC', 'AVGO'],
    description: 'Mock company description.',
    ceo: 'Jane Doe',
    hq: 'US',
    founded: '2004-08-19',
    employees: 120000,
  };
}

export async function getCandles() {
  const n = 100,
    now = Math.floor(Date.now() / 1000);
  const t = Array.from({ length: n }, (_, i) => now - (n - 1 - i) * 86400);
  const c = t.map((_, i) => 100 + Math.sin(i / 6) * 3);
  return {
    s: 'ok',
    t,
    o: c,
    h: c.map((x) => x + 0.8),
    l: c.map((x) => x - 0.8),
    c,
    v: c.map(() => 0),
  };
}
