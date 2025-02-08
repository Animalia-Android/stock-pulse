'use client';

import { useEffect, useState } from 'react';
import { fetchStockData } from './utils/finnhub';
import StockCard from './components/StockCard';
import SearchBar from './components/SearchBar';

export default function Home() {
  const [stocks, setStocks] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedStock, setSearchedStock] = useState(null); // ✅ Holds dynamically fetched stock
  const [loading, setLoading] = useState([]);

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

  useEffect(() => {
    const savedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    setWatchlist(savedWatchlist);
  }, []);

  const toggleWatchlist = (symbol) => {
    let updatedWatchlist = watchlist.includes(symbol)
      ? watchlist.filter((s) => s !== symbol)
      : [...watchlist, symbol];

    setWatchlist(updatedWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
  };

  // ✅ Fetch any stock when searched
  // const handleSearch = async (query) => {
  //   setSearchQuery(query);
  //   setSearchedStock(null); // Reset previous search

  //   try {
  //     const stock = await fetchStockData(query);
  //     setSearchedStock(stock);
  //   } catch (error) {
  //     console.error('Error fetching searched stock:', error);
  //   }
  // };
  const handleSearch = async (query) => {
    setSearchQuery(query);
    setSearchedStock(null); // Reset previous search
    setLoading(true); // ✅ Show loading state

    try {
      const stock = await fetchStockData(query);
      if (!stock || !stock.c) {
        setError('Stock not found. Please try another symbol.');
      } else {
        setSearchedStock(stock);
        setError(null);
      }
    } catch (error) {
      console.error('Error fetching searched stock:', error);
      setError('Failed to fetch stock data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchedStock(null); // ✅ Reset searched stock
  };

  return (
    <div className="min-h-screen bg-stockDark text-white px-6 py-10">
      <h1 className="text-5xl font-bold mb-8 text-center text-stockGold">
        📈 StockPulse - Track Your Favorite Stocks
      </h1>

      {/* ✅ Search Bar */}
      <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />

      {/* ✅ Show searched stock if available */}
      {searchedStock && (
        <div className="flex justify-center mb-6">
          <StockCard
            symbol={searchQuery}
            stock={searchedStock}
            toggleWatchlist={toggleWatchlist}
            isInWatchlist={watchlist.includes(searchQuery)}
          />
        </div>
      )}

      {/* ✅ Show predefined stocks if no search */}
      {!searchedStock && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {stocks.map((stock, index) => (
            <StockCard
              key={index}
              symbol={symbols[index]}
              stock={stock}
              toggleWatchlist={toggleWatchlist}
              isInWatchlist={watchlist.includes(symbols[index])}
            />
          ))}
        </div>
      )}
      {loading && (
        <p className="text-center text-stockGold">Loading stock data...</p>
      )}
      {/* {error && <p className="text-center text-red-500">{error}</p>} */}
    </div>
  );
}
