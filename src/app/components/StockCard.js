import { useState } from 'react';

const StockCard = ({ symbol, stock, toggleWatchlist, isInWatchlist }) => {
  if (!stock) return null; // Prevent errors if stock data is missing

  // Determine price movement color
  const priceChange = stock.d;
  const changeColor = priceChange > 0 ? 'text-stockGreen' : 'text-stockRed';
  const changeIcon = priceChange > 0 ? '🔺' : '🔻';

  return (
    <div className="bg-stockDark p-6 rounded-lg shadow-lg w-full sm:w-[220px] text-center text-white border border-gray-700 hover:border-stockGold transition-all">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{symbol}</h2>
        <button
          className={`p-2 rounded-full ${
            isInWatchlist ? 'bg-stockGold' : 'bg-gray-700'
          }`}
          onClick={() => toggleWatchlist(symbol)}
        >
          {isInWatchlist ? '⭐' : '☆'}
        </button>
      </div>
      <p className="text-3xl font-bold text-stockGold">${stock.c.toFixed(2)}</p>
      <p className={`text-lg font-semibold ${changeColor}`}>
        {changeIcon} {stock.d.toFixed(2)} ({stock.dp.toFixed(2)}%)
      </p>
      <p className="text-sm text-stockLight">
        📊 High: ${stock.h.toFixed(2)} | Low: ${stock.l.toFixed(2)}
      </p>
      <p className="text-sm text-stockLight">🔄 Open: ${stock.o.toFixed(2)}</p>
      <p className="text-sm text-stockLight">
        📅 Prev Close: ${stock.pc.toFixed(2)}
      </p>
    </div>
  );
};

export default StockCard;
