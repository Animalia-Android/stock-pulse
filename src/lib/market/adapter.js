import 'server-only';

import { cookies } from 'next/headers';
import * as finnhub from './providers/finnhub';
import * as mock from './providers/mock';
// (future)
// import * as alpha from './providers/alpha';
// import * as yahoo from './providers/yahoo';

const DEFAULT_PROVIDER_ID = process.env.NEXT_PUBLIC_DATA_PROVIDER || null; // e.g. 'finnhub' | 'mock'
const DEFAULT_USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

async function resolveProviderId() {
  const store = await cookies();
  const id = store.get('sp_provider')?.value; // 'mock' | 'finnhub' | 'alpha' | 'yahoo'
  console.log('resolveProviderId:', id, 'default:', DEFAULT_PROVIDER_ID);
  if (id === 'mock') return 'mock';
  if (id === 'finnhub') return 'finnhub';
  // if (id === 'alpha') return 'alpha';
  // if (id === 'yahoo') return 'yahoo';
  if (DEFAULT_PROVIDER_ID === 'mock' || DEFAULT_PROVIDER_ID === 'finnhub') {
    return DEFAULT_PROVIDER_ID;
  }
  return null; // fall back to boolean flag below
}

async function resolveBooleanFlag() {
  const store = await cookies();
  const v = store.get('sp_use_mock')?.value; // '1' | '0' | undefined
  if (v === '1') return true;
  if (v === '0') return false;
  return DEFAULT_USE_MOCK;
}

async function provider() {
  const id = await resolveProviderId();
  if (id === 'mock') return mock;
  if (id === 'finnhub') return finnhub;
  // if (id === 'alpha') return alpha;
  // if (id === 'yahoo') return yahoo;

  // backward‑compat: boolean flag decides
  const useMock = await resolveBooleanFlag();
  return useMock ? mock : finnhub;
}

// -----------------------------
// Exports
// -----------------------------
// NOTE: these are async wrappers so provider() is chosen per call.
export const getQuote = async (...args) => (await provider()).getQuote(...args);

export const getDetails = async (...args) =>
  (await provider()).getDetails(...args);

export const getCandles = async (...args) =>
  (await provider()).getCandles(...args);

export const getMarketSummary = async (...args) =>
  (await provider()).getMarketSummary(...args);

export const getGeneralNews = async (...args) =>
  (await provider()).getGeneralNews(...args);

// Only export if BOTH providers implement them
export const getSectors = async (...args) =>
  (await provider()).getSectors(...args);
// export const getIndices    = async (...args) => (await provider()).getIndices(...args);
