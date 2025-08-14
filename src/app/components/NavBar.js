'use client'; // Required for Client Components in App Router

import React, { useState } from 'react';
import { Bell, User, Moon, Sun, LogIn } from 'lucide-react';
import SearchBar from './SearchBar';

const NavBar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="bg-gray-800 p-4 flex items-center justify-between">
      <div className="w-1/3 flex items-center">
        {/* Optional logo or leave empty */}
      </div>
      <div className='"w-1/3 flex justify-center"'>
        <SearchBar />
      </div>

      <div className="w-1/3 flex justify-end items-center gap-4">
        <Bell className="w-6 h-6 cursor-pointer text-gray-400 hover:text-white" />
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? (
            <Sun className="w-6 h-6 text-yellow-500" />
          ) : (
            <Moon className="w-6 h-6 text-gray-400" />
          )}
        </button>

        {isLoggedIn ? (
          <User className="w-6 h-6 cursor-pointer text-gray-400 hover:text-white" />
        ) : (
          <button
            onClick={() => setIsLoggedIn(true)}
            className="flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
          >
            <LogIn className="w-5 h-5" /> Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
