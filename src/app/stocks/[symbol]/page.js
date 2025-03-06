'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import StockChart from '@/app/components/StockChart';

const StockPage = () => {
  const { symbol } = useParams();
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!symbol) return;

    const fetchStockData = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(`/api/stocks?symbol=${symbol}`);
        const data = await response.json();

        if (data.error) {
          setError(data.error);
          setStockData(null);
        } else {
          setStockData(data);
        }
      } catch (error) {
        console.error('Error fetching stock data:', error);
        setError('Failed to load stock data');
      }
      setLoading(false);
    };

    fetchStockData();
  }, [symbol]);

  if (loading) return <div className="text-center p-5">Loading...</div>;
  if (error) return <div className="text-center p-5 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold">
        {stockData.name} ({stockData.symbol})
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

      {/* Add Stock Chart Component */}
      <StockChart symbol={symbol} />
    </div>
  );
};

export default StockPage;
