'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const dummyStocks = [
  {
    ticker: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 135.6,
    change: '+3.88%',
    series: [131, 132, 133, 134, 135, 136],
    low: 130,
    high: 138,
    pinned: false,
  },
  {
    ticker: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 165.78,
    change: '+2.94%',
    series: [162, 163, 164, 165, 166],
    low: 160,
    high: 168,
    pinned: true,
  },
  {
    ticker: 'TSLA',
    name: 'Tesla Inc.',
    price: 230.98,
    change: '-1.12%',
    series: [236, 235, 233, 232, 231],
    low: 228,
    high: 240,
    pinned: false,
  },
  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    price: 185.65,
    change: '-0.45%',
    series: [186, 186, 185, 185, 186],
    low: 182,
    high: 189,
    pinned: false,
  },
  {
    ticker: 'MSFT',
    name: 'Microsoft Corp.',
    price: 399.8,
    change: '+1.75%',
    series: [392, 395, 397, 399, 400],
    low: 390,
    high: 402,
    pinned: false,
  },
];

const normalize = (s) =>
  String(s || '')
    .trim()
    .toUpperCase();

const initial = {
  symbols: /** @type {string[]} */ ([dummyStocks]),
  meta: /** @type {Record<string, { name?: string }>} */ ({}),
};

export const useWatchlistStore = create()(
  persist(
    (set, get) => ({
      ...initial,

      add: (symbol, meta = {}) => {
        const sym = normalize(symbol);
        if (!sym) return;
        const { symbols, meta: m } = get();
        if (symbols.includes(sym)) return;
        set({
          symbols: [sym, ...symbols],
          meta: { ...m, [sym]: { ...m[sym], ...meta } },
        });
      },

      remove: (symbol) => {
        const sym = normalize(symbol);
        const { symbols, meta } = get();
        if (!symbols.includes(sym)) return;
        const nextMeta = { ...meta };
        delete nextMeta[sym];
        set({ symbols: symbols.filter((s) => s !== sym), meta: nextMeta });
      },

      toggle: (symbol, meta = {}) => {
        const sym = normalize(symbol);
        const { symbols } = get();
        if (symbols.includes(sym)) get().remove(sym);
        else get().add(sym, meta);
      },

      isWatched: (symbol) => {
        const sym = normalize(symbol);
        return get().symbols.includes(sym);
      },
    }),
    {
      name: 'sp.watchlist',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ symbols: s.symbols, meta: s.meta }),
    }
  )
);
