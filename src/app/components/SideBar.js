'use client';

import Link from 'next/link';
import {
  Home,
  LineChart,
  Briefcase,
  Settings,
  Eye,
  TrendingUp,
  Search,
  Bookmark,
  List,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const SideBar = () => {
  const [active, setActive] = useState('dashboard');

  const menuItems = [
    {
      name: 'Dashboard',
      icon: <Home size={20} />,
      href: '/dashboard',
      key: 'dashboard',
    },
    {
      name: 'Market Overview',
      icon: <LineChart size={20} />,
      href: '/market',
      key: 'market',
    },
    {
      name: 'Watchlist',
      icon: <Eye size={20} />,
      href: '/watchlist',
      key: 'watchlist',
    },
    {
      name: 'Portfolio',
      icon: <Briefcase size={20} />,
      href: '/portfolio',
      key: 'portfolio',
    },
    {
      name: 'Settings',
      icon: <Settings size={20} />,
      href: '/settings',
      key: 'settings',
    },
  ];

  return (
    <div className="w-64 fixed h-screen bg-gray-800 p-4 text-white">
      <h2 className="text-xl font-bold mb-6">Stock Pulse</h2>
      <ul className="space-y-3">
        {menuItems.map((item) => (
          <motion.li
            key={item.key}
            whileHover={{ scale: 1.05 }}
            className={`flex items-center p-2 rounded transition-all duration-300 cursor-pointer ${
              active === item.key
                ? 'bg-green-500 text-white'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
            onClick={() => setActive(item.key)}
          >
            <Link href={item.href} className="flex items-center gap-3 w-full">
              {item.icon}
              <span>{item.name}</span>
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
