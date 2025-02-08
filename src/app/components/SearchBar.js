import { useState } from 'react';

const SearchBar = ({ onSearch, onClear }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query.trim().toUpperCase()); // Convert input to uppercase
  };

  const handleClear = () => {
    setQuery('');
    onClear(); // ✅ Reset stock view
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="text"
        placeholder="Search for a stock (e.g., AAPL, TSLA)..."
        className="w-full max-w-md p-3 rounded-l-md text-black outline-none"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        className="bg-stockGold px-5 py-3 hover:bg-yellow-400 transition"
        onClick={handleSearch}
      >
        🔍
      </button>
      {query && (
        <button
          className="bg-red-500 px-5 py-3 rounded-r-md hover:bg-red-700 transition ml-2"
          onClick={handleClear}
        >
          ❌ Clear
        </button>
      )}
    </div>
  );
};

export default SearchBar;
