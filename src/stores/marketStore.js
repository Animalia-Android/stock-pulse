import { create } from 'zustand';
import { SAMPLE_QUOTES } from '@/lib/market/fixtures/quotes';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export const useMarketStore = create((set, get) => ({
  quotes: USE_MOCK
    ? SAMPLE_QUOTES.reduce((acc, q) => {
        acc[q.symbol] = q;
        return acc;
      }, {})
    : {},

  async fetchQuote(symbol) {
    const key = symbol.toUpperCase();

    if (USE_MOCK) {
      return get().quotes[key] || null;
    }

    const res = await fetch(`/api/stocks?symbol=${encodeURIComponent(key)}`);
    if (!res.ok) throw new Error('Failed to fetch stock');
    const data = await res.json();

    set((state) => ({
      quotes: { ...state.quotes, [key]: data },
    }));

    return data;
  },

  async fetchQuotes(symbols = []) {
    const keys = symbols.map((s) => s.toUpperCase());

    if (USE_MOCK) {
      return keys.map((k) => get().quotes[k]).filter(Boolean);
    }

    const res = await fetch('/api/stocks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symbols: keys }),
    });
    if (!res.ok) throw new Error('Failed to fetch stocks');
    const json = await res.json();

    const results = json.results || [];
    set((state) => {
      const updated = { ...state.quotes };
      for (const q of results) updated[q.symbol] = q;
      return { quotes: updated };
    });

    return results;
  },
}));
