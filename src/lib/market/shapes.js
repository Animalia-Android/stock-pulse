// Normalizers convert raw provider payloads into one consistent shape

// Finnhub -> normalized
export function normalizeFinnhub(symbol, raw) {
  return {
    symbol,
    price: raw.c,
    change: raw.d ?? raw.c - raw.pc,
    percentChange: raw.dp ?? ((raw.c - raw.pc) / raw.pc) * 100,
    open: raw.o,
    high: raw.h,
    low: raw.l,
    previousClose: raw.pc,
    timestamp: raw.t,
  };
}

// Yahoo -> normalized
export function normalizeYahoo(raw) {
  return {
    symbol: raw.symbol,
    name: raw.shortName,
    currency: raw.currency,
    price: raw.regularMarketPrice,
    change: raw.regularMarketChange,
    percentChange: raw.regularMarketChangePercent,
    open: raw.regularMarketOpen,
    high: raw.regularMarketDayHigh,
    low: raw.regularMarketDayLow,
    previousClose: raw.regularMarketPreviousClose,
    timestamp: raw.regularMarketTime,
  };
}

// Alpha Vantage -> normalized
export function normalizeAlpha(globalQuote) {
  const g = globalQuote['Global Quote'] || {};
  const pct =
    typeof g['10. change percent'] === 'string'
      ? parseFloat(g['10. change percent'].replace('%', ''))
      : g['10. change percent'];

  return {
    symbol: g['01. symbol'],
    price: parseFloat(g['05. price']),
    change: parseFloat(g['09. change']),
    percentChange: pct,
    open: parseFloat(g['02. open']),
    high: parseFloat(g['03. high']),
    low: parseFloat(g['04. low']),
    previousClose: parseFloat(g['08. previous close']),
    // Alpha doesn’t provide unix timestamp here
  };
}
