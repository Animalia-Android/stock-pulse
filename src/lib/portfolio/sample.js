// src/lib/sample/portfolio.js
export const SAMPLE_POSITIONS = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    sector: 'Tech',
    shares: 45,
    avgCost: 172.1,
    price: 185.65,
    dayChangePct: -0.45,
    nextDiv: { exDate: 'Sep 05', amount: 0.24 },
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corp.',
    sector: 'Tech',
    shares: 30,
    avgCost: 355.2,
    price: 399.8,
    dayChangePct: +1.75,
    nextDiv: { exDate: 'Aug 28', amount: 0.75 },
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    sector: 'Cons. Disc.',
    shares: 20,
    avgCost: 148.3,
    price: 165.78,
    dayChangePct: +2.94,
    nextDiv: null,
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    sector: 'Cons. Disc.',
    shares: 12,
    avgCost: 242.0,
    price: 230.98,
    dayChangePct: -1.12,
    nextDiv: null,
  },
  {
    symbol: 'V',
    name: 'Visa Inc.',
    sector: 'Financials',
    shares: 15,
    avgCost: 228.1,
    price: 245.44,
    dayChangePct: +0.62,
    nextDiv: { exDate: 'Aug 22', amount: 0.52 },
  },
];

export const SAMPLE_PORTFOLIO_SERIES = [
  50340, 50790, 51020, 51560, 51920, 52010, 52340,
];
