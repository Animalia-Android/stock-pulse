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

/** Match live signature: (symbol, { range } = {}) */
export async function getCandles(symbol, { range = '6M' } = {}) {
  const pointsByRange = {
    '1D': 78, // intraday-ish placeholder
    '5D': 5,
    '1M': 30,
    '6M': 180,
    '1Y': 365,
    '5Y': 260, // weekly-ish placeholder count
  };
  const n = pointsByRange[range] || 100;

  const nowSec = Math.floor(Date.now() / 1000);
  const stepSec =
    range === '1D'
      ? 60 * 5
      : range === '5D'
      ? 60 * 60
      : range === '1M'
      ? 60 * 60 * 4
      : range === '5Y'
      ? 7 * 24 * 60 * 60
      : 24 * 60 * 60;

  const t = Array.from({ length: n }, (_, i) => nowSec - (n - 1 - i) * stepSec);
  const base = 100;
  const c = t.map(
    (_, i) => base + Math.sin(i / 6) * 3 + (i % 9 === 0 ? 0.6 : 0)
  );

  return {
    s: 'ok',
    t,
    o: c.map((x, i) => x - 0.4 + (i % 7 === 0 ? 0.2 : 0)),
    h: c.map((x) => x + 0.8),
    l: c.map((x) => x - 0.8),
    c,
    v: c.map(() => 0),
  };
}

/** Mock general news – same shape as live getGeneralNews */
export async function getGeneralNews(limit = 6) {
  const now = Date.now();
  return Array.from({ length: limit }, (_, i) => ({
    id: `mock-${now - i * 3600_000}`,
    headline: `Mock headline ${i + 1}`,
    source: 'MockWire',
    url: 'https://example.com/mock',
    datetime: now - i * 3600_000,
  }));
}

/** Mock sectors – same shape as live getSectors */
export async function getSectors() {
  const names = [
    'Materials',
    'Energy',
    'Financials',
    'Industrials',
    'Technology',
    'Consumer Staples',
    'Utilities',
    'Health Care',
    'Consumer Discretionary',
    'Real Estate',
    'Communication Services',
  ];
  const symbols = [
    'XLB',
    'XLE',
    'XLF',
    'XLI',
    'XLK',
    'XLP',
    'XLU',
    'XLV',
    'XLY',
    'XLRE',
    'XLC',
  ];
  return names.map((name, i) => ({
    group: 'Sectors',
    symbol: symbols[i],
    name,
    price: 50 + i, // harmless placeholder
    changePct: ((i % 5) - 2) * 0.2, // -0.4 .. 0.4
  }));
}

/** Mock market summary – keep CARDS EXACTLY the same as live */
export async function getMarketSummary() {
  const CARDS = [
    // — US equity benchmarks & styles —
    { group: 'US', symbol: 'SPY', name: 'S&P 500' },
    { group: 'US', symbol: 'QQQ', name: 'Nasdaq 100' },
    { group: 'US', symbol: 'DIA', name: 'Dow' },
    { group: 'US', symbol: 'IWM', name: 'Russell 2000' },
    { group: 'US', symbol: 'VTI', name: 'Total US Market' },
    { group: 'US', symbol: 'RSP', name: 'S&P 500 Equal-Weight' },
    { group: 'US', symbol: 'MDY', name: 'Mid-Cap 400' },
    { group: 'US', symbol: 'VUG', name: 'US Large Growth' },
    { group: 'US', symbol: 'VTV', name: 'US Large Value' },

    // — Global equity —
    { group: 'Global', symbol: 'ACWI', name: 'All-World' },
    { group: 'Global', symbol: 'EFA', name: 'Developed ex-US' },
    { group: 'Global', symbol: 'VEA', name: 'Developed ex-US (Broad)' },
    { group: 'Global', symbol: 'EEM', name: 'Emerging Markets' },
    { group: 'Global', symbol: 'VWO', name: 'Emerging Markets (Broad)' },
    { group: 'Global', symbol: 'EWJ', name: 'Japan' },
    { group: 'Global', symbol: 'VGK', name: 'Europe' },
    { group: 'Global', symbol: 'MCHI', name: 'China' },

    // — Sectors (all 11 GICS sectors) —
    { group: 'Sectors', symbol: 'XLB', name: 'Materials' },
    { group: 'Sectors', symbol: 'XLE', name: 'Energy' },
    { group: 'Sectors', symbol: 'XLF', name: 'Financials' },
    { group: 'Sectors', symbol: 'XLI', name: 'Industrials' },
    { group: 'Sectors', symbol: 'XLK', name: 'Technology' },
    { group: 'Sectors', symbol: 'XLP', name: 'Consumer Staples' },
    { group: 'Sectors', symbol: 'XLU', name: 'Utilities' },
    { group: 'Sectors', symbol: 'XLV', name: 'Health Care' },
    { group: 'Sectors', symbol: 'XLY', name: 'Consumer Discretionary' },
    { group: 'Sectors', symbol: 'XLRE', name: 'Real Estate' },
    { group: 'Sectors', symbol: 'XLC', name: 'Communication Services' },

    // — Rates / Credit / RE —
    { group: 'Rates', symbol: 'SHY', name: 'US 1–3Y Treasuries' },
    { group: 'Rates', symbol: 'IEF', name: 'US 7–10Y Treasuries' },
    { group: 'Rates', symbol: 'TLT', name: 'US 20+Y Treasuries' },
    { group: 'Rates', symbol: 'TIP', name: 'TIPS (Inflation-Protected)' },
    { group: 'Credit', symbol: 'LQD', name: 'Investment Grade Credit' },
    { group: 'Credit', symbol: 'HYG', name: 'High Yield Credit' },
    { group: 'Rates', symbol: 'BND', name: 'US Total Bond Market' },
    { group: 'REITs', symbol: 'VNQ', name: 'US REITs' },

    // — Commodities —
    { group: 'Commodities', symbol: 'DBC', name: 'Broad Commodities' },
    { group: 'Commodities', symbol: 'GLD', name: 'Gold' },
    { group: 'Commodities', symbol: 'SLV', name: 'Silver' },
    { group: 'Commodities', symbol: 'USO', name: 'Crude Oil' },
    { group: 'Commodities', symbol: 'UNG', name: 'Natural Gas' },
    { group: 'Commodities', symbol: 'DBA', name: 'Agriculture' },
    { group: 'Commodities', symbol: 'CPER', name: 'Copper' },

    // — FX (ETF proxies) —
    { group: 'FX', symbol: 'UUP', name: 'US Dollar Index' },
    { group: 'FX', symbol: 'FXE', name: 'Euro' },
    { group: 'FX', symbol: 'FXY', name: 'Japanese Yen' },
    { group: 'FX', symbol: 'FXB', name: 'British Pound' },

    // — Crypto (ETF proxies) —
    { group: 'Crypto', symbol: 'BITO', name: 'Bitcoin (Futures ETF)' },
    { group: 'Crypto', symbol: 'IBIT', name: 'Bitcoin (Spot ETF)' },
  ];

  const [quotes, sectors, news] = await Promise.all([
    Promise.all(CARDS.map(({ symbol }) => getQuote(symbol).catch(() => null))),
    getSectors().catch(() => []),
    getGeneralNews(6).catch(() => []),
  ]);

  const indices = CARDS.map((c, i) => ({
    group: c.group,
    name: c.name,
    symbol: c.symbol,
    price: quotes[i]?.price ?? 100,
    changePct: quotes[i]?.percentChange ?? 0,
  }));

  return { indices, news, sectors };
}
