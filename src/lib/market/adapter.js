import { finnhubQuote } from './providers/finnHub';
import { mockQuote } from './providers/mock';
import { normalizeFinnhub } from './shapes';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export async function getQuote(symbol) {
  if (USE_MOCK) {
    return mockQuote(symbol); // mock is already normalized
  }

  // Finnhub as primary
  const raw = await finnhubQuote(symbol);
  return normalizeFinnhub(symbol, raw);
}
