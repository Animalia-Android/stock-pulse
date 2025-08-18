/**
 * @typedef {'price'|'percent'|'rsi'|'volume'|'earnings'|'news'|'pl'|'trailing'|string} RuleType
 * @typedef {{ type: RuleType, text: string }} Rule
 */

/** @type {Record<string, string>} */
const LABELS = {
  price: 'Price',
  percent: '% Change',
  rsi: 'RSI',
  volume: 'Volume',
  earnings: 'Earnings',
  news: 'News',
  pl: 'P/L',
  trailing: 'Trailing stop',
};

/**
 * Format a rule object into display text for the UI.
 * Falls back to "Rule" if type isn’t recognized.
 * @param {Rule} r
 * @returns {string}
 */
export function formatRuleText(r) {
  const label = LABELS[r?.type] ?? 'Rule';
  return `${label} — ${r?.text ?? ''}`;
}
