'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (!query) return;
    router.push(`/stocks/${query.toUpperCase()}`); // Navigate to stock page
    setQuery('');
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search (e.g. AAPL)"
        className="p-2 border border-gray-300 rounded"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
