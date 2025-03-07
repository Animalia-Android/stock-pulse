export default function Dashboard() {
  // Placeholder market summary
  const marketSummary = {
    totalPortfolioValue: '$52,340.75',
    dailyChange: '+3.45%',
    gainers: 8,
    losers: 2,
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mb-4">
        View your stock portfolio and latest market trends here.
      </p>

      {/* Portfolio Summary */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold">📊 Portfolio Overview</h2>
        <p className="text-3xl font-bold text-green-400">
          {marketSummary.totalPortfolioValue}
        </p>
        <p
          className={`text-lg ${
            marketSummary.dailyChange.startsWith('+')
              ? 'text-green-400'
              : 'text-red-400'
          }`}
        >
          {marketSummary.dailyChange} Today
        </p>
      </div>

      {/* Market Snapshot */}
      <h2 className="text-xl font-semibold mb-2">📈 Market Snapshot</h2>
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <p className="text-green-400">Top Gainers: {marketSummary.gainers}</p>
        <p className="text-red-400">Top Losers: {marketSummary.losers}</p>
      </div>
    </div>
  );
}
