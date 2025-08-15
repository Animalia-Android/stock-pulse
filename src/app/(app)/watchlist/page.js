'use client';

import { useMemo, useState } from 'react';
import { LayoutList, LayoutGrid } from 'lucide-react';
import SingleStock from '@/components/stock/SingleStock';

import { useWatchlistStore } from '@/stores/watchlistStore';

// Watchlist table
// const symbols = useWatchlistStore(s => s.symbols);
// const { data, isLoading } = useBatchQuotes(symbols);
// data.map is quick; data.map[sym] for O(1)

export default function Watchlist() {
  // --- Mock data: added series/low/high/pinned (ignored by older SingleStock; useful if you upgraded it)
  const [items, setItems] = useState([
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
  ]);

  //Use the watchlist store
  const symbols = useWatchlistStore((s) => s.symbols);
  const add = useWatchlistStore((s) => s.add);
  const remove = useWatchlistStore((s) => s.remove);

  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState('pinned'); // pinned | symbol | price | change
  const [compact, setCompact] = useState(false);
  const [view, setView] = useState('list'); // 'list' | 'grid'

  const parsed = useMemo(() => {
    const toNum = (s) =>
      (typeof s === 'number' ? s : parseFloat(String(s).replace(/[+%]/g, ''))) *
      (String(s).trim().startsWith('-') ? -1 : 1);

    let list = items
      .filter(Boolean)
      .filter(
        (x) =>
          (x.ticker || '').toLowerCase().includes(query.toLowerCase()) ||
          (x.name || '').toLowerCase().includes(query.toLowerCase())
      );

    list.sort((a, b) => {
      if (sortKey === 'pinned')
        return (
          (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) ||
          a.ticker.localeCompare(b.ticker)
        );
      if (sortKey === 'symbol') return a.ticker.localeCompare(b.ticker);
      if (sortKey === 'price') return b.price - a.price;
      if (sortKey === 'change') return toNum(b.change) - toNum(a.change);
      return 0;
    });

    const winners = list.filter((x) =>
      String(x.change).trim().startsWith('+')
    ).length;
    const losers = list.filter((x) =>
      String(x.change).trim().startsWith('-')
    ).length;
    const avg = list.length
      ? (
          list.reduce((acc, x) => acc + toNum(x.change), 0) / list.length
        ).toFixed(2)
      : '0.00';

    return { list, winners, losers, avg };
  }, [items, query, sortKey]);

  const deltaClass = (val) =>
    String(val).trim().startsWith('+')
      ? 'text-green-400'
      : String(val).trim().startsWith('-')
      ? 'text-red-400'
      : 'text-slate-300';

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Your Watchlist</h1>
      <p className="mb-4 text-slate-300">
        A collection of stocks you want to watch.
      </p>

      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        {/* Toolbar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter by symbol or name…"
              className="w-full sm:w-72 rounded-lg border border-gray-700 bg-gray-900/60 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
              className="w-full sm:w-48 rounded-lg border border-gray-700 bg-gray-900/60 px-3 py-2 text-sm"
            >
              <option value="pinned">Sort: Pinned first</option>
              <option value="symbol">Sort: Symbol A→Z</option>
              <option value="price">Sort: Price high→low</option>
              <option value="change">Sort: % change high→low</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center rounded-lg border border-gray-700 bg-gray-900/60">
              <button
                onClick={() => setView('list')}
                className={`px-3 py-2 text-sm inline-flex items-center gap-1 rounded-l-lg ${
                  view === 'list' ? 'bg-gray-700' : ''
                }`}
                title="List view"
              >
                <LayoutList className="w-4 h-4" /> List
              </button>
              <button
                onClick={() => setView('grid')}
                className={`px-3 py-2 text-sm inline-flex items-center gap-1 rounded-r-lg ${
                  view === 'grid' ? 'bg-gray-700' : ''
                }`}
                title="Grid view"
              >
                <LayoutGrid className="w-4 h-4" /> Grid
              </button>
            </div>

            <label className="inline-flex items-center gap-2 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={compact}
                onChange={(e) => setCompact(e.target.checked)}
                className="accent-emerald-500"
              />
              Compact
            </label>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="rounded-lg border border-gray-700 bg-gray-900/50 p-3 text-center">
            <p className="text-xs text-slate-400">Tickers</p>
            <p className="text-lg font-semibold">{parsed.list.length}</p>
          </div>
          <div className="rounded-lg border border-gray-700 bg-gray-900/50 p-3 text-center">
            <p className="text-xs text-slate-400">Winners / Losers</p>
            <p className="text-lg font-semibold">
              <span className="text-green-400">{parsed.winners}</span> /{' '}
              <span className="text-red-400">{parsed.losers}</span>
            </p>
          </div>
          <div className="rounded-lg border border-gray-700 bg-gray-900/50 p-3 text-center">
            <p className="text-xs text-slate-400">Avg % change</p>
            <p
              className={`text-lg font-semibold ${
                Number(parsed.avg) >= 0 ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {Number(parsed.avg) >= 0 ? '+' : ''}
              {parsed.avg}%
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="mt-4">
          {view === 'list' ? (
            <>
              {/* Column header row (for readability) */}
              <div className="hidden md:grid grid-cols-[24px,96px,1fr,auto,96px,64px] px-4 py-2 text-xs text-slate-400 border-b border-gray-700/60">
                <span /> {/* pin */}
                <span>Symbol</span>
                <span>Name</span>
                <span className="text-right">Price</span>
                <span className="text-right">Change</span>
                <span className="text-center">Trend</span>
              </div>

              <ul className="max-h-[70vh] overflow-y-auto divide-y divide-gray-700/60">
                {parsed.list.map((stock) => (
                  <li key={stock.ticker}>
                    {/* If you upgraded SingleStock, these props enhance it; otherwise they’re harmless */}
                    <SingleStock
                      stock={stock}
                      compact={compact}
                      onPin={() =>
                        setItems((arr) =>
                          arr.map((x) =>
                            x.ticker === stock.ticker
                              ? { ...x, pinned: !x.pinned }
                              : x
                          )
                        )
                      }
                      onAlert={() => alert(`Create alert for ${stock.ticker}`)}
                      onRemove={() =>
                        setItems((arr) =>
                          arr.filter((x) => x.ticker !== stock.ticker)
                        )
                      }
                    />
                  </li>
                ))}
              </ul>
            </>
          ) : (
            // Grid view: minimal cards (nice for large lists)
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {parsed.list.map((s) => (
                <MiniCard key={s.ticker} s={s} />
              ))}
            </div>
          )}
        </div>

        {/* Empty state */}
        {parsed.list.length === 0 && (
          <div className="p-10 text-center text-slate-400">
            No matches. Try a different search.
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- BREAK OFF INTO SEPARATE COMPONENTS ---------- */

// Small grid card alternative
function MiniCard({ s }) {
  const up = String(s.change).trim().startsWith('+');
  return (
    <div className="rounded-lg border border-gray-700 bg-gray-900/50 p-3">
      <div className="flex items-baseline justify-between">
        <div>
          <p className="text-sm font-semibold">{s.ticker}</p>
          <p className="text-xs text-slate-400 truncate max-w-[160px]">
            {s.name}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold">${Number(s.price).toFixed(2)}</p>
          <p className={`text-xs ${up ? 'text-green-400' : 'text-red-400'}`}>
            {s.change}
          </p>
        </div>
      </div>

      {/* tiny progress "today vs range" bar (uses low/high if present) */}
      <div className="mt-3">
        <div className="h-1.5 bg-gray-700 rounded">
          <div
            className={`h-1.5 rounded ${up ? 'bg-green-500' : 'bg-red-500'}`}
            style={{
              width: `${Math.max(
                0,
                Math.min(
                  100,
                  ((s.price - (s.low ?? s.price * 0.97)) /
                    Math.max(
                      1e-9,
                      (s.high ?? s.price * 1.03) - (s.low ?? s.price * 0.97)
                    )) *
                    100
                )
              )}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
