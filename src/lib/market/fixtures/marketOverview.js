// src/lib/sample/marketOverview.js

export const GLOBAL_INDICES = [
  { name: 'S&P 500', symbol: '^GSPC', price: '5,567.4', change: '+0.67%' },
  { name: 'Nasdaq', symbol: '^IXIC', price: '18,245.1', change: '+0.91%' },
  { name: 'Dow', symbol: '^DJI', price: '40,112.3', change: '-0.12%' },
  { name: 'Russell 2000', symbol: '^RUT', price: '2,260.8', change: '+0.35%' },
  { name: 'FTSE 100', symbol: '^FTSE', price: '8,190.2', change: '+0.21%' },
  { name: 'DAX', symbol: '^GDAXI', price: '18,240.9', change: '-0.18%' },
  { name: 'Nikkei 225', symbol: '^N225', price: '41,320.6', change: '+0.44%' },
  { name: 'Hang Seng', symbol: '^HSI', price: '17,980.3', change: '+0.12%' },
];

export const SECTOR_PERF = [
  {
    group: 'Sectors',
    symbol: 'XLK',
    name: 'Technology',
    price: 256.25,
    changePct: -2.0526,
  },
  {
    group: 'Sectors',
    symbol: 'XLF',
    name: 'Financials',
    price: 52.6599,
    changePct: 0.1139,
  },
  {
    group: 'Sectors',
    symbol: 'XLE',
    name: 'Energy',
    price: 85.39,
    changePct: 0.3644,
  },
  {
    group: 'Sectors',
    symbol: 'XLV',
    name: 'Health Care',
    price: 137.24,
    changePct: 0.351,
  },
  {
    group: 'Sectors',
    symbol: 'XLI',
    name: 'Industrials',
    price: 150.37,
    changePct: -0.6541,
  },
  {
    group: 'Sectors',
    symbol: 'XLY',
    name: 'Consumer Discretionary',
    price: 226.53,
    changePct: -1.4444,
  },
  {
    group: 'Sectors',
    symbol: 'XLP',
    name: 'Consumer Staples',
    price: 83.42,
    changePct: 0.8097,
  },
  {
    group: 'Sectors',
    symbol: 'XLB',
    name: 'Materials',
    price: 90.06,
    changePct: 0.0111,
  },
  {
    group: 'Sectors',
    symbol: 'XLRE',
    name: 'Real Estate',
    price: 41.9,
    changePct: 0.552,
  },
  {
    group: 'Sectors',
    symbol: 'XLU',
    name: 'Utilities',
    price: 86.235,
    changePct: 0.1801,
  },
  {
    group: 'Sectors',
    symbol: 'XLC',
    name: 'Communication Services',
    price: 109.02,
    changePct: -1.0528,
  },
];

export const BREADTH = {
  advancers: 3472,
  decliners: 2115,
  unchanged: 412,
  above50dma: '62%',
  above200dma: '54%',
  upVolVsDownVol: '1.3x',
  putCall: '0.86',
};

export const VOL_RATES = { vix: '13.9', us2y: '4.51%', us10y: '4.18%' };

export const FUTURES = [
  { symbol: 'ES', name: 'S&P 500 Futures', change: '+0.3%' },
  { symbol: 'NQ', name: 'Nasdaq Futures', change: '+0.5%' },
  { symbol: 'YM', name: 'Dow Futures', change: '-0.1%' },
];

export const COMMODITIES = [
  { symbol: 'CL', name: 'Crude Oil', change: '+0.7%' },
  { symbol: 'GC', name: 'Gold', change: '-0.2%' },
  { symbol: 'SI', name: 'Silver', change: '+0.4%' },
  { symbol: 'HG', name: 'Copper', change: '+0.9%' },
];

export const CRYPTO = [
  { symbol: 'BTC', name: 'Bitcoin', price: '64,250', change: '+1.8%' },
  { symbol: 'ETH', name: 'Ethereum', price: '3,120', change: '+1.1%' },
  { symbol: 'SOL', name: 'Solana', price: '148.2', change: '-0.6%' },
];

export const ECON_CALENDAR = [
  {
    date: 'Aug 15',
    time: '8:30 AM ET',
    event: 'Initial Jobless Claims',
    impact: 'Med',
  },
  {
    date: 'Aug 15',
    time: '10:00 AM ET',
    event: 'Existing Home Sales',
    impact: 'Med',
  },
  {
    date: 'Aug 16',
    time: '8:30 AM ET',
    event: 'CPI (EU YoY, flash)',
    impact: 'High',
  },
  { date: 'Aug 20', time: '2:00 PM ET', event: 'FOMC Minutes', impact: 'High' },
];

export const TOP_GAINERS = [
  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    price: 185.65,
    change: '+3.21%',
    color: 'text-green-500',
  },
  {
    ticker: 'TSLA',
    name: 'Tesla Inc.',
    price: 230.98,
    change: '+5.12%',
    color: 'text-green-500',
  },
  {
    ticker: 'NVDA',
    name: 'Nvidia Corp.',
    price: 820.45,
    change: '+4.87%',
    color: 'text-green-500',
  },
  {
    ticker: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 165.78,
    change: '+2.94%',
    color: 'text-green-500',
  },
  {
    ticker: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 135.6,
    change: '+3.88%',
    color: 'text-green-500',
  },
  {
    ticker: 'MSFT',
    name: 'Microsoft Corp.',
    price: 399.8,
    change: '+2.45%',
    color: 'text-green-500',
  },
  {
    ticker: 'NFLX',
    name: 'Netflix Inc.',
    price: 490.15,
    change: '+4.32%',
    color: 'text-green-500',
  },
  {
    ticker: 'META',
    name: 'Meta Platforms Inc.',
    price: 320.25,
    change: '+3.67%',
    color: 'text-green-500',
  },
  {
    ticker: 'AMD',
    name: 'Advanced Micro Devices Inc.',
    price: 112.4,
    change: '+5.55%',
    color: 'text-green-500',
  },
  {
    ticker: 'BA',
    name: 'Boeing Co.',
    price: 210.5,
    change: '+2.89%',
    color: 'text-green-500',
  },
];

export const TOP_LOSERS = [
  {
    ticker: 'NFLX',
    name: 'Netflix Inc.',
    price: 475.32,
    change: '-4.15%',
    color: 'text-red-500',
  },
  {
    ticker: 'DIS',
    name: 'Walt Disney Co.',
    price: 89.5,
    change: '-3.72%',
    color: 'text-red-500',
  },
  {
    ticker: 'BA',
    name: 'Boeing Co.',
    price: 205.1,
    change: '-2.94%',
    color: 'text-red-500',
  },
  {
    ticker: 'PYPL',
    name: 'PayPal Holdings Inc.',
    price: 58.45,
    change: '-5.10%',
    color: 'text-red-500',
  },
  {
    ticker: 'SQ',
    name: 'Block Inc. (Square)',
    price: 67.89,
    change: '-4.63%',
    color: 'text-red-500',
  },
  {
    ticker: 'INTC',
    name: 'Intel Corp.',
    price: 35.28,
    change: '-2.41%',
    color: 'text-red-500',
  },
  {
    ticker: 'WBD',
    name: 'Warner Bros Discovery Inc.',
    price: 11.2,
    change: '-6.05%',
    color: 'text-red-500',
  },
  {
    ticker: 'RIVN',
    name: 'Rivian Automotive Inc.',
    price: 15.75,
    change: '-4.88%',
    color: 'text-red-500',
  },
  {
    ticker: 'F',
    name: 'Ford Motor Co.',
    price: 12.6,
    change: '-3.11%',
    color: 'text-red-500',
  },
  {
    ticker: 'COIN',
    name: 'Coinbase Global Inc.',
    price: 88.95,
    change: '-5.89%',
    color: 'text-red-500',
  },
];

export const SAMPLE_MARKET_OVERVIEW = {
  globalIndices: GLOBAL_INDICES,
  sectorPerf: SECTOR_PERF,
  breadth: BREADTH,
  volRates: VOL_RATES,
  futures: FUTURES,
  commodities: COMMODITIES,
  crypto: CRYPTO,
  econCalendar: ECON_CALENDAR,
  topGainers: TOP_GAINERS,
  topLosers: TOP_LOSERS,
};

export function getInitialData() {
  // ---- Mock data (server-side; swap with real API later) ----
  const marketSummary = {
    totalPortfolioValue: '$52,340.75',
    dailyChange: '+3.45%',
    gainers: 8,
    losers: 2,
  };

  const indices = [
    { name: 'S&P 500', symbol: '^GSPC', price: '5,567.42', change: '+0.67%' },
    { name: 'Nasdaq', symbol: '^IXIC', price: '18,245.10', change: '+0.91%' },
    { name: 'Dow', symbol: '^DJI', price: '40,112.33', change: '-0.12%' },
  ];

  const watchlist = [
    { symbol: 'AAPL', name: 'Apple', price: 224.31, change: '+1.12%' },
    { symbol: 'NVDA', name: 'NVIDIA', price: 128.77, change: '-0.84%' },
    { symbol: 'MSFT', name: 'Microsoft', price: 458.09, change: '+0.37%' },
    { symbol: 'TSLA', name: 'Tesla', price: 244.62, change: '+2.45%' },
  ];

  const movers = {
    gainers: [
      { symbol: 'PLTR', change: '+5.9%' },
      { symbol: 'COIN', change: '+4.1%' },
      { symbol: 'AMD', change: '+3.6%' },
    ],
    losers: [
      { symbol: 'SNOW', change: '-3.2%' },
      { symbol: 'RBLX', change: '-2.7%' },
      { symbol: 'DIS', change: '-1.8%' },
    ],
  };

  const upcomingEarnings = [
    { symbol: 'AAPL', date: 'Aug 22', session: 'AMC' },
    { symbol: 'NVDA', date: 'Aug 27', session: 'AMC' },
    { symbol: 'TSLA', date: 'Sep 03', session: 'AMC' },
  ];

  const alerts = [
    { symbol: 'NVDA', text: 'Crosses above 130.00', status: 'Armed' },
    { symbol: 'AAPL', text: 'Daily change > +2%', status: 'Triggered' },
    { symbol: 'MSFT', text: 'RSI < 30', status: 'Armed' },
  ];

  const news = [
    'Fed speakers hint at data-dependent path into Q4',
    'Chipmakers rally on strong datacenter demand',
    'Oil edges higher as inventories tighten',
  ];

  return {
    marketSummary,
    indices,
    watchlist,
    movers,
    upcomingEarnings,
    alerts,
    news,
  };
}
