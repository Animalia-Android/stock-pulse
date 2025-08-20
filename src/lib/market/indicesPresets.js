// src/lib/market/indicesPresets.js
export const TYPE_PRESETS = {
  dashboard: (arr) => {
    const wanted = new Set([
      'SPY',
      'QQQ',
      'DIA',
      'IWM',
      'TLT',
      'GLD',
      'UUP',
      'BITO',
    ]);
    return arr.filter((x) => wanted.has(String(x.symbol || '').toUpperCase()));
  },
  us: (arr) => arr.filter((x) => x.group === 'US'),
  global: (arr) => arr.filter((x) => x.group === 'Global'),
  sectors: (arr) => arr.filter((x) => x.group === 'Sectors'),
  rates: (arr) =>
    arr.filter(
      (x) => x.group === 'Rates' || x.group === 'Credit' || x.group === 'REITs'
    ),
  commodities: (arr) => arr.filter((x) => x.group === 'Commodities'),
  fx: (arr) => arr.filter((x) => x.group === 'FX'),
  crypto: (arr) => arr.filter((x) => x.group === 'Crypto'),
  all: (arr) => arr,
};

export function filterIndices(indices, type = 'all') {
  const arr = Array.isArray(indices) ? indices : [];
  const fn = TYPE_PRESETS[type] || TYPE_PRESETS.all;
  return fn(arr);
}
