'use client';

import React, { useState } from 'react';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import Dashboard from './components/Dashboard'; // New Default Component
import MarketOverview from './components/MarketOverview'; // Stocks Page

export default function Home() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <div className="flex min-h-screen bg-stockDark text-white">
      <SideBar setCurrentPage={setCurrentPage} />
      <div className="flex-1 ml-64">
        <NavBar />

        <div className="pt-20 px-6">
          {/* ✅ Render the selected page */}
          {currentPage === 'dashboard' && <Dashboard />}
          {currentPage === 'market' && <MarketOverview />}
        </div>
      </div>
    </div>
  );
}
