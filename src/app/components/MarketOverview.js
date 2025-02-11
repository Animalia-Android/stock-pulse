import React, { useState, useEffect } from 'react';
import { fetchStockData } from '../utils/finnhub';
import StockCard from './StockCard';

const MarketOverview = () => {
  const [stocks, setStocks] = useState([]);
  const symbols = [
    'AAPL',
    'TSLA',
    'AMZN',
    'GOOGL',
    'MSFT',
    'NVDA',
    'META',
    'NFLX',
    'BRK.B',
    'JPM',
    'V',
    'MA',
    'DIS',
    'KO',
    'PEP',
    'PG',
    'INTC',
    'AMD',
    'BA',
    'GE',
  ];

  useEffect(() => {
    const loadStocks = async () => {
      const stockData = await Promise.all(
        symbols.map((symbol) => fetchStockData(symbol))
      );
      setStocks(stockData);
    };
    loadStocks();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Stock Market Overview</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {stocks.map((stock, index) => (
          <StockCard key={index} symbol={symbols[index]} stock={stock} />
        ))}
      </div>
    </div>
  );
};

export default MarketOverview;
