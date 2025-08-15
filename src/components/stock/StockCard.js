import React from 'react';

const StockCard = (stockData) => {
  return (
    <div>
      <h1 className="text-3xl font-bold">
        {/* {stockData.name} ({stockData.symbol}) */}
        Stock
      </h1>
      <p className="text-lg font-semibold">
        Price: ${stockData.price.toFixed(2)}
      </p>
      <p className="text-sm text-gray-400">
        Change: {stockData.change} ({stockData.percentChange}%)
      </p>
      <p className="text-sm text-gray-400">Open: ${stockData.open}</p>
      <p className="text-sm text-gray-400">High: ${stockData.high}</p>
      <p className="text-sm text-gray-400">Low: ${stockData.low}</p>
      <p className="text-sm text-gray-400">
        Previous Close: ${stockData.previousClose}
      </p>
    </div>
  );
};

export default StockCard;
