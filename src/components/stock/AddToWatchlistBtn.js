'use client';

import React, { useMemo } from 'react';
import { useWatchlistStore } from '@/stores/watchlistStore';
import { Bookmark, BookmarkCheck } from 'lucide-react';

export default function AddToWatchlistBtn({ symbol, name }) {
  const sym = useMemo(
    () =>
      String(symbol || '')
        .trim()
        .toUpperCase(),
    [symbol]
  );

  const watchlisted = useWatchlistStore((s) => s.symbols.includes(sym));
  const toggle = useWatchlistStore((s) => s.toggle);

  const label = watchlisted ? 'On Watchlist' : 'Add to Watchlist';

  return (
    <>
      <button
        onClick={() => toggle(sym, name)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-700 hover:bg-gray-700 text-sm"
      >
        {watchlisted ? (
          <BookmarkCheck className="w-4 h-4" />
        ) : (
          <Bookmark className="w-4 h-4" />
        )}
        {label}
      </button>
    </>
  );
}
