import 'server-only';

import * as finnhub from './providers/finnHub';
import * as mock from './providers/mock';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';
const provider = USE_MOCK ? mock : finnhub;

export const getQuote = provider.getQuote;
export const getDetails = provider.getDetails;
export const getCandles = provider.getCandles;
export const getMarketSummary = provider.getMarketSummary;
export const getGeneralNews = provider.getGeneralNews;
export const getIndices = provider.getIndices;
