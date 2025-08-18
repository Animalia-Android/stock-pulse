import SingleStock from './SingleStock';

function TopTenStocks({ stocks, category, className = '' }) {
  return (
    <div
      className={`bg-gray-800/30 backdrop-blur-lg p-4 rounded-lg shadow-md h-full w-full min-w-0 ${className}`}
    >
      <h2 className="text-xl font-semibold mb-2">
        🔥 Top {category} of the Day
      </h2>
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <ul className="scrollable max-h-96 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent">
          {stocks.map((stock) => (
            <SingleStock key={stock.ticker} stock={stock} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TopTenStocks;
