import React, { useState, useEffect } from 'react';
import { BarChart, Star, Newspaper, Settings } from 'lucide-react';

import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  LineChart,
} from 'lucide-react';

const SideBar = ({ setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(true);

  //Load sidebar state from localStorage when the component mounts
  useEffect(() => {
    const storedState = localStorage.getItem('sidebarOpen');
    if (storedState !== null) {
      setIsOpen(JSON.parse(storedState));
    }
  }, []);

  //Save sidebar state to localStorage whenever it changes
  const toggleSidebar = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    localStorage.setItem('sidebarOpen', JSON.stringify(newState));
  };

  return (
    <aside
      className={`fixed left-0 top-16 h-full bg-gray-800 text-white shadow-md transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Sidebar Header with Toggle Button */}
      <div className="flex items-center justify-between px-4 py-3">
        <span
          className={`text-lg font-semibold transition-all duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'
          }`}
        >
          Menu
        </span>
        <button
          className="bg-gray-700 text-white p-1 rounded-md hover:bg-gray-600 transition"
          onClick={toggleSidebar}
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {/* Navigation Links */}
      <ul className="mt-4 space-y-4">
        <li
          className="flex items-center gap-3 hover:bg-gray-700 p-3 rounded-md cursor-pointer"
          onClick={() => setCurrentPage('dashboard')}
        >
          <LayoutDashboard size={20} />
          <span className={`${isOpen ? 'block' : 'hidden'}`}>Dashboard</span>
        </li>
        <li
          className="flex items-center gap-3 hover:bg-gray-700 p-3 rounded-md cursor-pointer"
          onClick={() => setCurrentPage('market')}
        >
          <LineChart size={20} />
          <span className={`${isOpen ? 'block' : 'hidden'}`}>
            Market Overview
          </span>
        </li>
        <li
          className="flex items-center gap-3 hover:bg-gray-700 p-3 rounded-md cursor-pointer"
          onClick={() => setCurrentPage('portfolio')}
        >
          <BarChart size={20} />
          <span className={`${isOpen ? 'block' : 'hidden'}`}>Portfolio</span>
        </li>
        <li
          className="flex items-center gap-3 hover:bg-gray-700 p-3 rounded-md cursor-pointer"
          onClick={() => setCurrentPage('watchlist')}
        >
          <Star size={20} />
          <span className={`${isOpen ? 'block' : 'hidden'}`}>Watchlist</span>
        </li>
        <li
          className="flex items-center gap-3 hover:bg-gray-700 p-3 rounded-md cursor-pointer"
          onClick={() => setCurrentPage('news')}
        >
          <Newspaper size={20} />
          <span className={`${isOpen ? 'block' : 'hidden'}`}>Market News</span>
        </li>
        <li
          className="flex items-center gap-3 hover:bg-gray-700 p-3 rounded-md cursor-pointer"
          onClick={() => setCurrentPage('settings')}
        >
          <Settings size={20} />
          <span className={`${isOpen ? 'block' : 'hidden'}`}>Settings</span>
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
