'use client';

import { useMemo, useState } from 'react';
import { LayoutList, LayoutGrid, Plus } from 'lucide-react';

import { useWatchlistStore } from '@/stores/watchlistStore';

import SingleStock from '@/components/stock/SingleStock';
import MiniCard from '@/components/ui/MiniCard';
import AddStockModal from '@/components/modals/AddStockModal';

/* ---------- small helpers ---------- */
const S = (v) => (v == null ? '' : String(v));
const L = (v) => S(v).toLowerCase();
const U = (v) => S(v).trim().toUpperCase();
const cmp = (a, b) => S(a).localeCompare(S(b));
const num = (v) =>
  typeof v === 'number' && Number.isFinite(v) ? v : Number(S(v)) || 0;
const changeNum = (v) => {
  if (typeof v === 'number') return v;
  const s = S(v).trim();
  const n = parseFloat(s.replace(/[+%,$\s]/g, ''));
  if (!Number.isFinite(n)) return 0;
  return s.startsWith('-') ? -Math.abs(n) : Math.abs(n);
};

// Make sure every row has good string fields
const sanitizeRow = (x = {}) => {
  const rawTicker = Array.isArray(x.ticker) ? x.ticker[0] : x.ticker;
  const rawName = Array.isArray(x.name) ? x.name[0] : x.name;

  const ticker = U(
    typeof rawTicker === 'string'
      ? rawTicker
      : rawTicker?.ticker ?? rawTicker?.symbol ?? rawTicker
  );

  // Filter out junk like "[OBJECT OBJECT]"
  const validTicker =
    ticker && !/^\[object\sObject\]$/i.test(ticker) ? ticker : '';

  return {
    ticker: validTicker,
    name:
      S(
        typeof rawName === 'string'
          ? rawName
          : rawName?.name ?? rawName?.company ?? rawName
      ) || validTicker,
    price: num(x.price),
    change: S(x.change ?? '0'),
    series: Array.isArray(x.series) ? x.series : [],
    low: num(x.low),
    high: num(x.high),
    pinned: !!x.pinned,
  };
};

// Accept many shapes from the store and yield an array of tickers (strings)
const normalizeSymbols = (value) => {
  let arr = [];

  if (Array.isArray(value)) {
    arr = value;
  } else if (value && typeof value === 'object') {
    // Set / Map / Record guards
    if (typeof value.values === 'function') {
      arr = Array.from(value.values());
    } else if (Array.isArray(value.items)) {
      arr = value.items;
    } else {
      // record → use keys as a fallback
      arr = Object.keys(value);
    }
  } else if (typeof value === 'string') {
    // persisted JSON string?
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) arr = parsed;
    } catch {
      // ignore
    }
  }

  // Convert to uppercased tickers
  const res = arr
    .map((x) =>
      typeof x === 'string'
        ? U(x)
        : U(x?.ticker ?? x?.symbol ?? (typeof x === 'object' ? '' : x))
    )
    .filter(Boolean)
    .filter((t) => !/^\[object\sObject\]$/i.test(t)); // drop junk

  // Dedupe
  return Array.from(new Set(res));
};

export default function WatchlistClient({ initial = [] }) {
  // Local UI catalogue (original mock rows)
  const [items, setItems] = useState(() => initial.map(sanitizeRow));

  // Zustand store (guarded)
  const symbolsRaw = useWatchlistStore?.((s) => s.symbols) ?? [];
  const meta = useWatchlistStore?.((s) => s.meta) ?? {};
  const add = useWatchlistStore?.((s) => s.add);
  const remove = useWatchlistStore?.((s) => s.remove);

  // Normalized symbol order from the store (robust to any shape)
  const symOrder = useMemo(() => normalizeSymbols(symbolsRaw), [symbolsRaw]);

  // UI state
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState('pinned'); // pinned | symbol | price | change
  const [compact, setCompact] = useState(false);
  const [view, setView] = useState('list'); // list | grid
  const [showAdd, setShowAdd] = useState(false);

  // Suggestions (dedup)
  const suggestions = useMemo(() => {
    const base = [
      { symbol: 'AAPL', name: 'Apple Inc.' },
      { symbol: 'MSFT', name: 'Microsoft Corp.' },
      { symbol: 'NVDA', name: 'NVIDIA Corp.' },
      { symbol: 'AMZN', name: 'Amazon.com Inc.' },
      { symbol: 'GOOGL', name: 'Alphabet Inc.' },
      { symbol: 'META', name: 'Meta Platforms Inc.' },
      { symbol: 'TSLA', name: 'Tesla Inc.' },
      { symbol: 'AMD', name: 'Advanced Micro Devices Inc.' },
      { symbol: 'NFLX', name: 'Netflix Inc.' },
      { symbol: 'COIN', name: 'Coinbase Global Inc.' },
    ];
    const fromItems = items
      .map(sanitizeRow)
      .filter((r) => r.ticker)
      .map((i) => ({ symbol: i.ticker, name: i.name }));
    const fromStore = symOrder.map((sym) => ({
      symbol: sym,
      name: meta?.[sym]?.name || sym,
    }));

    const all = [...base, ...fromItems, ...fromStore];
    const seen = new Set();
    return all.filter((s) =>
      seen.has(U(s.symbol)) ? false : (seen.add(U(s.symbol)), true)
    );
  }, [items, symOrder, meta]);

  // Build the list we actually show
  const sourceList = useMemo(() => {
    const bySym = new Map(items.map((i) => [i.ticker, sanitizeRow(i)]));

    if (symOrder.length === 0) {
      // no store yet → just sanitized items
      return items.map(sanitizeRow).filter((r) => r.ticker);
    }

    // Build from store order; fall back to placeholder rows if missing
    return symOrder
      .map((sym) => {
        const row = bySym.get(sym);
        if (row) return row;
        return sanitizeRow({
          ticker: sym,
          name: meta?.[sym]?.name || sym,
          price: 0,
          change: '0',
          series: [],
          low: 0,
          high: 0,
          pinned: false,
        });
      })
      .filter((r) => r.ticker);
  }, [items, symOrder, meta]);

  const parsed = useMemo(() => {
    let list = (Array.isArray(sourceList) ? sourceList : [])
      .filter((x) => x && typeof x === 'object')
      .map(sanitizeRow)
      .filter((x) => x.ticker) // drop invalid tickers
      .filter(
        (x) => L(x.ticker).includes(L(query)) || L(x.name).includes(L(query))
      );

    list.sort((a, b) => {
      if (sortKey === 'pinned')
        return (
          (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) ||
          a.ticker.localeCompare(b.ticker)
        );
      if (sortKey === 'symbol') return a.ticker.localeCompare(b.ticker);
      if (sortKey === 'price') return num(b.price) - num(a.price);
      if (sortKey === 'change')
        return changeNum(b.change) - changeNum(a.change);
      return 0;
    });

    const winners = list.filter((x) => changeNum(x.change) > 0).length;
    const losers = list.filter((x) => changeNum(x.change) < 0).length;
    const avg = list.length
      ? (
          list.reduce((acc, x) => acc + changeNum(x.change), 0) / list.length
        ).toFixed(2)
      : '0.00';

    return { list, winners, losers, avg };
  }, [sourceList, query, sortKey]);

  const handleAddSymbol = async (input) => {
    const sym = typeof input === 'string' ? U(input) : U(input?.symbol);
    if (!sym) return;
    if (add) add(sym);

    setItems((arr) =>
      arr.some((x) => U(x.ticker) === sym)
        ? arr
        : [
            sanitizeRow({
              ticker: sym,
              name: sym,
              price: 0,
              change: '0',
              series: [],
              low: 0,
              high: 0,
              pinned: false,
            }),
            ...arr,
          ]
    );
  };

  const handleRemove = (ticker) => {
    const key = U(ticker);
    if (remove) remove(key);
    setItems((arr) => arr.filter((x) => U(x.ticker) !== key));
  };

  return (
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

          <button
            onClick={() => setShowAdd(true)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm"
            title="Add symbol"
          >
            <Plus className="w-4 h-4" /> Add New Stock to Follow
          </button>
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
            <div className="hidden md:grid grid-cols-[24px,96px,1fr,auto,96px,64px] px-4 py-2 text-xs text-slate-400 border-b border-gray-700/60">
              <span />
              <span>Symbol</span>
              <span>Name</span>
              <span className="text-right">Price</span>
              <span className="text-right">Change</span>
              <span className="text-center">Trend</span>
            </div>

            <ul className="max-h-[70vh] overflow-y-auto divide-y divide-gray-700/60">
              {parsed.list.map((stock) => (
                <li key={stock.ticker || crypto.randomUUID()}>
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
                    onRemove={() => handleRemove(stock.ticker)}
                  />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {parsed.list.map((s) => (
              <MiniCard key={s.ticker || crypto.randomUUID()} s={s} />
            ))}
          </div>
        )}
      </div>

      {parsed.list.length === 0 && (
        <div className="p-10 text-center text-slate-400">
          No matches. Try a different search.
        </div>
      )}

      {/* Modal */}
      {showAdd && (
        <AddStockModal
          isOpen
          onClose={() => setShowAdd(false)}
          onSubmit={handleAddSymbol}
          suggestions={suggestions}
        />
      )}
    </div>
  );
}
