import React, { useState, useEffect } from 'react';
import { Bell, User, Moon, Sun } from 'lucide-react';
import SearchBar from './SearchBar'; // Importing Search functionality

const NavBar = (onSearch, onClear) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  // ✅ Toggle Dark Mode & Store in localStorage
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  // ✅ Load Dark Mode State on Mount
  useEffect(() => {
    const storedMode = localStorage.getItem('darkMode');
    if (storedMode !== null) {
      setDarkMode(JSON.parse(storedMode));
      if (JSON.parse(storedMode))
        document.documentElement.classList.add('dark');
    }
  }, []);

  const handleSearch = (query) => {
    console.log('Searching for:', query); // Replace with actual API logic
    setSearchQuery(query);
  };

  const handleClear = () => {
    console.log('Search cleared');
    setSearchQuery('');
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-gray-900 text-white flex items-center px-6 shadow-md z-50">
      {/* App Name/Logo */}
      <div className="text-xl font-bold">StockPulse</div>

      {/* Search Bar */}
      <div className="flex-1 mx-6">
        <SearchBar onSearch={onSearch} onClear={onClear} />
      </div>

      {/* Right Section: Alerts, User Profile, and Dark Mode */}
      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <button
          className="bg-gray-700 text-white p-2 rounded-md hover:bg-gray-600 transition"
          onClick={toggleDarkMode}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button className="p-2 rounded-full hover:bg-gray-800">
          <Bell size={20} />
        </button>
        <div className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-md cursor-pointer hover:bg-gray-700">
          <User size={20} />
          <span className="hidden sm:block">User Name</span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
