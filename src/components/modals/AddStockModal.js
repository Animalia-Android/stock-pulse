'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

export default function AddStockModal({
  isOpen,
  onClose,
  onSubmit, // (symbol: string) => Promise<void> | void
  suggestions = [], // [{ symbol, name }]
}) {
  const [tab, setTab] = useState('search'); // 'search' | 'manual'
  const [query, setQuery] = useState('');
  const [manual, setManual] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setError('');
      setQuery('');
      setManual('');
      setTab('search');
      setTimeout(() => inputRef.current?.focus(), 0);
      // prevent background scroll
      document.documentElement.style.overflow = 'hidden';
      return () => {
        document.documentElement.style.overflow = '';
      };
    }
  }, [isOpen]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return suggestions.slice(0, 20);
    return suggestions
      .filter(
        (s) =>
          s.symbol.toLowerCase().includes(q) ||
          (s.name || '').toLowerCase().includes(q)
      )
      .slice(0, 50);
  }, [query, suggestions]);

  if (!isOpen) return null;

  const commit = async (raw) => {
    setError('');
    const sym = String(raw || '')
      .trim()
      .toUpperCase();
    if (!sym) return;
    try {
      await onSubmit?.(sym);
      onClose?.();
    } catch (e) {
      setError(e?.message || 'Failed to add symbol. Try again.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      onKeyDown={(e) => e.key === 'Escape' && onClose?.()}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* card */}
      <div className="relative w-full max-w-lg bg-gray-800 rounded-xl shadow-xl border border-gray-700">
        {/* header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
          <h3 className="text-lg font-semibold">Add a Stock</h3>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white px-2 py-1 rounded"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* tabs */}
        <div className="px-4 pt-3">
          <div className="inline-flex rounded-lg border border-gray-700 bg-gray-900/60 mb-3">
            <button
              onClick={() => setTab('search')}
              className={`px-3 py-1.5 text-sm rounded-l-lg ${
                tab === 'search' ? 'bg-gray-700' : ''
              }`}
            >
              Search
            </button>
            <button
              onClick={() => setTab('manual')}
              className={`px-3 py-1.5 text-sm rounded-r-lg ${
                tab === 'manual' ? 'bg-gray-700' : ''
              }`}
            >
              Manual
            </button>
          </div>
        </div>

        {/* content */}
        <div className="px-4 pb-4">
          {tab === 'search' ? (
            <>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by symbol or name (e.g., AAPL, Tesla)…"
                className="w-full rounded-lg border border-gray-700 bg-gray-900/60 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <ul className="mt-3 max-h-72 overflow-y-auto divide-y divide-gray-700/60">
                {filtered.map((s) => (
                  <li
                    key={s.symbol}
                    className="flex items-center justify-between px-2 py-2 hover:bg-gray-700/40 cursor-pointer"
                    onClick={() => commit(s.symbol)}
                  >
                    <div className="min-w-0">
                      <p className="font-semibold">{s.symbol}</p>
                      {s.name ? (
                        <p className="text-xs text-slate-400 truncate max-w-[420px]">
                          {s.name}
                        </p>
                      ) : null}
                    </div>
                    <button
                      className="text-xs px-2 py-1 rounded bg-emerald-600 text-white hover:bg-emerald-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        commit(s.symbol);
                      }}
                    >
                      Add
                    </button>
                  </li>
                ))}
                {filtered.length === 0 && (
                  <li className="px-2 py-6 text-center text-slate-400 text-sm">
                    No matches. Try a different search.
                  </li>
                )}
              </ul>
            </>
          ) : (
            <form
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                commit(manual);
              }}
            >
              <input
                ref={inputRef}
                value={manual}
                onChange={(e) => setManual(e.target.value)}
                placeholder="Enter symbol (e.g., AAPL)"
                className="w-full rounded-lg border border-gray-700 bg-gray-900/60 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 uppercase"
              />
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 py-2 text-sm rounded border border-gray-700 hover:bg-gray-700/40"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-2 text-sm rounded bg-emerald-600 hover:bg-emerald-500 text-white"
                >
                  Add
                </button>
              </div>
            </form>
          )}

          {error && <div className="mt-3 text-sm text-red-300">{error}</div>}
        </div>
      </div>
    </div>
  );
}
