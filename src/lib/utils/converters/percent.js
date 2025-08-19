// src/lib/utils/converters/percent.js

/**
 * Convert a percent-like value to a CSS width string, clamped 0–100%.
 * Accepts: "62%", "62", 62, and (optionally) 0.62 as 62% when allowFraction:true
 * @param {string|number} pct
 * @param {{ allowFraction?: boolean }} [opts]
 * @returns {string} e.g. "62%"
 */
export function widthFromPct(pct, { allowFraction = false } = {}) {
  let n =
    typeof pct === 'number'
      ? pct
      : parseFloat(String(pct ?? '').replace('%', ''));

  if (Number.isNaN(n)) n = 0;
  if (allowFraction && n <= 1) n *= 100;

  n = Math.max(0, Math.min(100, n));
  return `${n}%`;
}

export function fmtPct(
  value,
  { decimals = 2, signed = false, absolute = false } = {}
) {
  // accept numbers or strings like "3.2%" or "-1.0"
  let n =
    typeof value === 'number'
      ? value
      : parseFloat(String(value ?? '').replace('%', ''));

  if (!Number.isFinite(n)) n = 0;
  const out = absolute ? Math.abs(n) : n;

  const core = `${out.toFixed(decimals)}%`;
  return signed ? `${n > 0 ? '+' : ''}${core}` : core;
}
