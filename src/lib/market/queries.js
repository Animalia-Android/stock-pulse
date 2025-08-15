'use client';
import { useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { isMarketOpenET } from '@/lib/market/marketHours';

const json = async (url, opts) => {
  const r = await fetch(url, { cache: 'no-store', ...opts });
  const data = await r.json();
  if (!r.ok || data?.error) throw new Error(data?.error || 'Fetch failed');
  return data;
};

/* Quotes ----------------------------------------------------- */
export function useQuote(symbol) {
  const open = isMarketOpenET();
  const sym = String(symbol || '').toUpperCase();
  return useQuery({
    queryKey: ['quote', sym],
    queryFn: () => json(`/api/stocks?symbol=${encodeURIComponent(sym)}`),
    enabled: !!sym,
    staleTime: 10_000,
    refetchInterval: open ? 10_000 : false,
  });
}

/* Batch quotes (watchlist/dashboard) ------------------------- */
export function useBatchQuotes(symbols = []) {
  const open = isMarketOpenET();
  const body = JSON.stringify({
    symbols: symbols.map((s) => String(s).toUpperCase()),
  });

  return useQuery({
    queryKey: ['quotes-batch', symbols.sort().join(',')],
    queryFn: () =>
      json('/api/stocks/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      }).then((res) => {
        const arr = res.data || [];
        const map = Object.fromEntries(arr.map((q) => [q.symbol, q]));
        return { arr, map };
      }),
    enabled: symbols.length > 0,
    staleTime: 10_000,
    refetchInterval: open ? 10_000 : false,
  });
}

/* Details (fundamentals, profile) ---------------------------- */
export function useDetails(symbol) {
  const sym = String(symbol || '').toUpperCase();
  return useQuery({
    queryKey: ['details', sym],
    queryFn: () =>
      json(`/api/stocks?symbol=${encodeURIComponent(sym)}&details=true`),
    enabled: !!sym,
    staleTime: 6 * 60 * 60 * 1000, // 6h
  });
}

/* OHLC / candles -------------------------------------------- */
const RANGE_STALE = {
  '1D': 60_000,
  '5D': 120_000,
  '1M': 300_000,
  '6M': 600_000,
  '1Y': 1_200_000,
  '5Y': 3_600_000,
};

export function useOHLC(symbol, range = '1M') {
  const sym = String(symbol || '').toUpperCase();
  const stale = RANGE_STALE[range] ?? 300_000;
  const open = isMarketOpenET();
  const poll = range === '1D' && open ? 30_000 : false;

  return useQuery({
    queryKey: ['ohlc', sym, range],
    queryFn: () =>
      json(`/api/ohlc?symbol=${encodeURIComponent(sym)}&range=${range}`),
    enabled: !!sym,
    staleTime: stale,
    refetchInterval: poll,
  });
}

/* Indices + Movers (market page / dashboard) ----------------- */
export function useMarketOverview() {
  return useQuery({
    queryKey: ['market-overview'],
    queryFn: () => json('/api/market'),
    staleTime: 60_000,
    refetchInterval: 60_000,
  });
}

/* Prefetch helpers (hover for instant page) ------------------ */
export function usePrefetchSymbol() {
  const qc = useQueryClient();
  return (symbol) => {
    const sym = String(symbol || '').toUpperCase();
    qc.prefetchQuery({
      queryKey: ['details', sym],
      queryFn: () =>
        json(`/api/stocks?symbol=${encodeURIComponent(sym)}&details=true`),
      staleTime: 6 * 60 * 60 * 1000,
    });
    qc.prefetchQuery({
      queryKey: ['ohlc', sym, '1M'],
      queryFn: () =>
        json(`/api/ohlc?symbol=${encodeURIComponent(sym)}&range=1M`),
      staleTime: RANGE_STALE['1M'],
    });
  };
}
