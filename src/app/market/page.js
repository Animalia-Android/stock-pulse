import TopTenStocks from '../components/TopPerformingStocks';

export default function MarketOverview() {
  // Placeholder stock data
  const topGainers = [
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

  const topLosers = [
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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Market Overview</h1>
      <p className="mb-4">Get the latest stock market updates here.</p>

      <div className="flex justify-center space-x-6 mt-6">
        <TopTenStocks stocks={topGainers} category={'Gainers'} />
        <TopTenStocks stocks={topLosers} category={'Losers'} />
      </div>
    </div>
  );
}
