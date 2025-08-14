import React from 'react';
import SingleStock from './SingleStock';

function TopTenStocks({ stocks, category }) {
  return (
    <div className="w-175 h-134 bg-gray-700 bg-opacity-30 backdrop-blur-lg p-4 rounded-lg shadow-md mx-auto">
      <h2 className="text-xl font-semibold mt-6 mb-2">
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
