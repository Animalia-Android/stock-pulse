'use client'; // Required for Client Components in App Router

import React, { useState } from 'react';
import { Bell, User, Moon, Sun } from 'lucide-react';
import SearchBar from './SearchBar';

const NavBar = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="bg-gray-800 p-4 flex justify-between items-center">
      <h2 className="text-xl font-bold">Stock Pulse</h2>

      {/* Search Bar */}
      <SearchBar />

      {/* Icons (Bell, User, Theme Toggle) */}
      <div className="flex items-center gap-4">
        <Bell className="w-6 h-6 cursor-pointer text-gray-400 hover:text-white" />
        <User className="w-6 h-6 cursor-pointer text-gray-400 hover:text-white" />
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? (
            <Sun className="w-6 h-6 text-yellow-500" />
          ) : (
            <Moon className="w-6 h-6 text-gray-400" />
          )}
        </button>
      </div>
    </div>
  );
};

export default NavBar;
