import SingleStock from '../components/SingleStock';

export default function Portfolio() {
  // Placeholder portfolio data
  const portfolioValue = '$52,340.75';
  const portfolioChange = '+3.45%'; // Mocked daily change

  const ownedStocks = [
    {
      ticker: 'AAPL',
      name: 'Apple Inc.',
      quantity: 10,
      price: '$1,856.50',
      change: '+2.3%',
    },
    {
      ticker: 'TSLA',
      name: 'Tesla Inc.',
      quantity: 5,
      price: '$1,154.90',
      change: '-1.2%',
    },
    {
      ticker: 'NVDA',
      name: 'Nvidia Corp.',
      quantity: 8,
      price: '$6,563.60',
      change: '+5.8%',
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Your Portfolio</h1>
      <p className="mb-4">A collection of your stocks</p>

      {/* Portfolio Summary */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold">📊 Portfolio Value</h2>
        <p className="text-3xl font-bold text-green-400">{portfolioValue}</p>
        <p
          className={`text-lg ${
            portfolioChange.startsWith('+') ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {portfolioChange} Today
        </p>
      </div>

      {/* Owned Stocks */}
      <h2 className="text-xl font-semibold mb-2">💰 Your Stocks</h2>
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <ul>
          {ownedStocks.map((stock) => (
            <SingleStock key={stock} stock={stock} />
          ))}
        </ul>
      </div>
    </div>
  );
}
