import SingleStock from '../components/SingleStock';

export default function Watchlist() {
  // Placeholder watchlist data
  const watchlistStocks = [
    {
      ticker: 'GOOGL',
      name: 'Alphabet Inc.',
      price: 135.6,
      change: '+3.88%',
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
      ticker: 'TSLA',
      name: 'Tesla Inc.',
      price: 230.98,
      change: '-1.12%',
      color: 'text-red-500',
    },
    {
      ticker: 'AAPL',
      name: 'Apple Inc.',
      price: 185.65,
      change: '-0.45%',
      color: 'text-red-500',
    },
    {
      ticker: 'MSFT',
      name: 'Microsoft Corp.',
      price: 399.8,
      change: '+1.75%',
      color: 'text-green-500',
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Your Watchlist</h1>
      <p className="mb-4">A collection of stocks you want to watch</p>

      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <ul>
          {watchlistStocks.map((stock) => (
            <SingleStock key={stock.ticker} stock={stock} />
          ))}
        </ul>
      </div>
    </div>
  );
}
