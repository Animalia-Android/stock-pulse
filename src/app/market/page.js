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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Market Overview</h1>
      <p className="mb-4">Get the latest stock market updates here.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        🔥 Top Performing Stocks
      </h2>
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <ul>
          {topGainers.map((stock) => (
            <li
              key={stock.ticker}
              className="flex justify-between p-2 border-b border-gray-700"
            >
              <span className="font-medium">
                {stock.name} ({stock.ticker})
              </span>
              <span className={stock.color}>{stock.change}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
