'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWatchlistStore = create()(
  persist(
    (set, get) => ({
      symbols: ['AAPL', 'NVDA', 'MSFT'],

      add: (s) => {
        s = String(s || '')
          .toUpperCase()
          .trim();
        if (!s) return;
        const list = get().symbols;
        if (!list.includes(s)) set({ symbols: [s, ...list] });
      },

      remove: (s) => set({ symbols: get().symbols.filter((x) => x !== s) }),
      clear: () => set({ symbols: [] }),
      reorder: (next) => set({ symbols: next }),
    }),
    { name: 'sp.watchlist' }
  )
);
