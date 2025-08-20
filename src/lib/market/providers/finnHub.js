import 'server-only';

const API_KEY = process.env.FINNHUB_API_KEY;
const BASE = 'https://finnhub.io/api/v1';

if (!API_KEY) {
  // don’t crash prod if you prefer, but it’s helpful in dev
  console.warn('FINNHUB_API_KEY is not set. Live market calls will fail.');
}

async function fetchJSON(path, params = {}) {
  const url = new URL(BASE + path);
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null) url.searchParams.set(k, v);
  }
  url.searchParams.set('token', API_KEY || '');
  const res = await fetch(url.toString(), { cache: 'no-store' });
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`Finnhub ${res.status}: ${txt || res.statusText}`);
  }
  return res.json();
}

/** Quote: price + delta */
export async function getQuote(symbol) {
  const sym = String(symbol || '').toUpperCase();
  const q = await fetchJSON('/quote', { symbol: sym });
  if (q?.s === 'no_data' || !q?.c) throw new Error('Symbol not found');

  return {
    symbol: sym,
    name: sym,
    price: q.c,
    change: q.d,
    percentChange: q.dp,
    open: q.o,
    high: q.h,
    low: q.l,
    previousClose: q.pc,
  };
}

/** Details: quote + profile + metrics + peers + recent news (7d) */
export async function getDetails(symbol) {
  const sym = String(symbol || '').toUpperCase();

  const [quote, profile, metrics, peers, news] = await Promise.all([
    fetchJSON('/quote', { symbol: sym }),
    fetchJSON('/stock/profile2', { symbol: sym }).catch(() => null),
    fetchJSON('/stock/metric', { symbol: sym, metric: 'all' }).catch(
      () => null
    ),
    fetchJSON('/stock/peers', { symbol: sym }).catch(() => []),
    (async () => {
      const to = new Date();
      const from = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const arr = await fetchJSON('/company-news', {
        symbol: sym,
        from: from.toISOString().slice(0, 10),
        to: to.toISOString().slice(0, 10),
      }).catch(() => []);
      return Array.isArray(arr)
        ? arr.slice(0, 20).map((n) => ({
            headline: n.headline,
            url: n.url,
            source: n.source,
            datetime: n.datetime ? n.datetime * 1000 : undefined,
          }))
        : [];
    })(),
  ]);

  if (quote?.s === 'no_data' || !quote?.c) throw new Error('Symbol not found');

  const m = metrics?.metric || {};
  const pct = (x) => (typeof x === 'number' ? x / 100 : null);

  return {
    // identity
    symbol: sym,
    name: profile?.name || sym,
    logo: profile?.logo || null,
    exchange: profile?.exchange || null,
    sector: profile?.finnhubIndustry || null,
    industry: profile?.finnhubIndustry || null,

    // quote
    price: quote.c,
    change: quote.d,
    percentChange: quote.dp,
    open: quote.o,
    high: quote.h,
    low: quote.l,
    previousClose: quote.pc,

    // metrics (best-effort)
    marketCap: profile?.marketCapitalization ?? m?.marketCapitalization ?? null,
    peRatio: m?.peTTM ?? m?.peBasicExclExtraTTM ?? null,
    eps: m?.epsBasicExclExtraItemsTTM ?? m?.epsTTM ?? null,
    dividendYield:
      typeof m?.dividendYieldIndicatedAnnual === 'number'
        ? m.dividendYieldIndicatedAnnual / 100
        : typeof m?.dividendYieldTTM === 'number'
        ? m.dividendYieldTTM / 100
        : null,
    volume: m?.volume ?? null,
    avgVolume:
      m?.['10DayAverageTradingVolume'] ?? m?.['52WeekAvgDailyVolume'] ?? null,
    fiftyTwoWeekLow: m?.['52WeekLow'] ?? null,
    fiftyTwoWeekHigh: m?.['52WeekHigh'] ?? null,
    beta: m?.beta ?? null,
    revenue: m?.revenueTTM ?? null,
    grossMargin: pct(m?.grossMarginTTM),
    operatingMargin: pct(m?.operatingMarginTTM),
    netMargin: pct(m?.netMarginTTM),
    roe: pct(m?.roeTTM),
    debtToEquity: m?.totalDebtTotalEquityAnnual ?? null,
    freeCashFlow: m?.freeCashFlowTTM ?? null,
    sharesOutstanding: profile?.shareOutstanding ?? null,

    // content
    news,
    peers: Array.isArray(peers) ? peers : [],

    // not provided by finnhub; keep null-safe (your UI already handles nulls)
    description: null,
    ceo: null,
    hq: profile?.country || null,
    founded: profile?.ipo || null,
    employees: null,
  };
}

/** Candles for charts */
export async function getCandles(symbol, { range = '6M' } = {}) {
  const sym = String(symbol || '').toUpperCase();
  const now = Math.floor(Date.now() / 1000);

  const MAP = {
    '1D': { res: '5', secs: 1 * 24 * 60 * 60 },
    '5D': { res: '15', secs: 5 * 24 * 60 * 60 },
    '1M': { res: '60', secs: 30 * 24 * 60 * 60 },
    '6M': { res: 'D', secs: 180 * 24 * 60 * 60 },
    '1Y': { res: 'D', secs: 365 * 24 * 60 * 60 },
    '5Y': { res: 'W', secs: 5 * 365 * 24 * 60 * 60 },
  };
  const cfg = MAP[range] || MAP['6M'];

  const d = await fetchJSON('/stock/candle', {
    symbol: sym,
    resolution: cfg.res,
    from: now - cfg.secs,
    to: now,
  });

  if (d?.s !== 'ok') return { t: [], o: [], h: [], l: [], c: [], v: [] };
  return d;
}

/** Sector snapshot via Select Sector SPDR ETFs */
export async function getSectors() {
  // [symbol, pretty name]
  const SECTORS = [
    ['XLK', 'Technology'],
    ['XLF', 'Financials'],
    ['XLE', 'Energy'],
    ['XLV', 'Health Care'],
    ['XLI', 'Industrials'],
    ['XLY', 'Consumer Discretionary'],
    ['XLP', 'Consumer Staples'],
    ['XLB', 'Materials'],
    ['XLRE', 'Real Estate'],
    ['XLU', 'Utilities'],
    ['XLC', 'Communication Services'],
  ];

  const results = await Promise.all(
    SECTORS.map(async ([symbol, name]) => {
      try {
        const q = await fetchJSON('/quote', { symbol });
        return {
          group: 'Sectors',
          symbol,
          name,
          price: q?.c ?? null,
          changePct: q?.dp ?? null, // Finnhub returns change % as dp
        };
      } catch {
        // keep the slot to avoid UI jumps if one request fails
        return { group: 'Sectors', symbol, name, price: null, changePct: null };
      }
    })
  );

  return results;
}

/** "Market summary" composed from ETF proxies + general news */
export async function getMarketSummary() {
  // ETF proxies are the most reliable cross-plan symbols
  // Popular markets (ETF proxies so we can reuse getQuote)

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

  const [quotes, news] = await Promise.all([
    Promise.all(CARDS.map((c) => getQuote(c.symbol).catch(() => null))),
    getGeneralNews(6),
  ]);

  const indices = CARDS.map((c, i) => {
    const q = quotes[i] || {};
    return {
      group: c.group,
      name: c.name,
      symbol: c.symbol,
      price: q.price ?? null,
      changePct: q.percentChange ?? null,
    };
  });

  const sectors = await getSectors().catch(() => []);

  return { indices, news, sectors };
}
