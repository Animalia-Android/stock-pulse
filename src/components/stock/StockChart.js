'use client'; // Needed for Next.js App Router

import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StockChart = ({ symbol }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  console.log('Finnhub API Key:', process.env.NEXT_PUBLIC_FINNHUB_API_KEY);
  useEffect(() => {
    if (!symbol) return;

    const fetchStockHistory = async () => {
      setLoading(true);
      setError('');

      try {
        const API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;
        const API_URL = `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&count=30&token=${API_KEY}`;

        const response = await fetch(API_URL);
        const data = await response.json();

        if (!data.t || data.s === 'no_data') {
          setError('No historical data available');
          setLoading(false);
          return;
        }

        const formattedData = {
          labels: data.t.map((timestamp) =>
            new Date(timestamp * 1000).toLocaleDateString()
          ),
          datasets: [
            {
              label: `${symbol} Price`,
              data: data.c, // Closing prices
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderWidth: 2,
              pointRadius: 0,
              tension: 0.1, // Smooth curve
            },
          ],
        };

        setChartData(formattedData);
      } catch (err) {
        console.error('Error fetching stock chart data:', err);
        setError('Failed to load chart');
      }

      setLoading(false);
    };

    fetchStockHistory();
  }, [symbol]);

  if (loading)
    return <p className="text-center text-gray-500">Loading chart...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-bold mb-2">
        {symbol} Stock Chart (Last 30 Days)
      </h2>
      <Line data={chartData} />
    </div>
  );
};

export default StockChart;
