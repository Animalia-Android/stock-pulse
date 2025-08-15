// No 'use client' — keep it isomorphic

// Reuse formatters (creating Intl instances is relatively expensive)
const USD = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const USD_COMPACT = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const NUM = new Intl.NumberFormat(undefined, {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const PCT = new Intl.NumberFormat(undefined, {
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatUSD(n) {
  const val = Number(n ?? 0);
  return USD.format(val);
}

export function formatUSDCompact(n) {
  const val = Number(n ?? 0);
  return USD_COMPACT.format(val);
}

export function formatNumber(n, opts) {
  const val = Number(n ?? 0);
  return (opts ? new Intl.NumberFormat(undefined, opts) : NUM).format(val);
}

export function formatPercent(n) {
  // n as decimal (0.0345 -> 3.45%)
  const val = Number(n ?? 0);
  return PCT.format(val);
}

export function formatDelta(n, { withSign = true, asPercent = false } = {}) {
  // For +/- badges in tables
  const val = Number(n ?? 0);
  const sign = withSign && val > 0 ? '+' : '';
  if (asPercent) return `${sign}${formatPercent(val)}`;
  return `${sign}${formatNumber(val)}`;
}
