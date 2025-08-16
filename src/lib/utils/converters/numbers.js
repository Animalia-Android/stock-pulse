// src/lib/utils/numbers.js

// --- helpers ---------------------------------------------------------------
const isFiniteNumber = (n) => Number.isFinite(n);
const toNumber = (n) => Number(n ?? 0);
const normalizeNegZero = (n) => (Object.is(n, -0) ? 0 : n);

// Small cache for dynamic formatters by JSON-ified options
const formatterCache = new Map();
const getFormatter = (opts) => {
  const key = JSON.stringify(opts || {});
  if (!formatterCache.has(key)) {
    formatterCache.set(key, new Intl.NumberFormat(undefined, opts));
  }
  return formatterCache.get(key);
};

// --- default, reusable formatters -----------------------------------------
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

// --- exports ---------------------------------------------------------------
export function formatUSD(
  n,
  {
    currency = 'USD',
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
  } = {}
) {
  const val = normalizeNegZero(toNumber(n));
  if (!isFiniteNumber(val)) return '—';
  // Use cached dynamic formatter if currency differs from default
  if (
    currency !== 'USD' ||
    minimumFractionDigits !== 2 ||
    maximumFractionDigits !== 2
  ) {
    return getFormatter({
      style: 'currency',
      currency,
      minimumFractionDigits,
      maximumFractionDigits,
    }).format(val);
  }
  return USD.format(val);
}

export function formatUSDCompact(n, { currency = 'USD' } = {}) {
  const val = normalizeNegZero(toNumber(n));
  if (!isFiniteNumber(val)) return '—';
  if (currency !== 'USD') {
    return getFormatter({
      style: 'currency',
      currency,
      notation: 'compact',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  }
  return USD_COMPACT.format(val);
}

export function formatUSDNoCents(n, { currency = 'USD' } = {}) {
  const val = normalizeNegZero(toNumber(n));
  if (!isFiniteNumber(val)) return '—';
  return getFormatter({
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(val);
}

export function formatNumber(n, opts) {
  const val = normalizeNegZero(toNumber(n));
  if (!isFiniteNumber(val)) return '—';
  return (opts ? getFormatter(opts) : NUM).format(val);
}

export function formatPercent(n) {
  // n as decimal (0.0345 -> 3.45%)
  const val = normalizeNegZero(toNumber(n));
  if (!isFiniteNumber(val)) return '—';
  return PCT.format(val);
}

export function formatPercentFrom100(n) {
  // n as whole percent (3.45 -> 3.45%)
  const val = normalizeNegZero(toNumber(n)) / 100;
  if (!isFiniteNumber(val)) return '—';
  return PCT.format(val);
}

export function formatDelta(n, { withSign = true, asPercent = false } = {}) {
  const val = normalizeNegZero(toNumber(n));
  if (!isFiniteNumber(val)) return '—';
  const sign = withSign && val > 0 ? '+' : '';
  if (asPercent) return `${sign}${formatPercent(val)}`;
  return `${sign}${formatNumber(val)}`;
}

// Optional: tiny helper just for signs (useful for badges)
export const sign = (n) => (toNumber(n) > 0 ? '+' : toNumber(n) < 0 ? '−' : '');
