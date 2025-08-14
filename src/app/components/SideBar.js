// 'use client';

// import Link from 'next/link';
// import {
//   Home,
//   LineChart,
//   Briefcase,
//   Settings,
//   Eye,
//   TrendingUp,
//   Search,
//   Bookmark,
//   List,
// } from 'lucide-react';
// import { motion } from 'framer-motion';
// import { useState } from 'react';
// import Image from 'next/image';

// const SideBar = () => {
//   const [active, setActive] = useState('dashboard');

//   const menuItems = [
//     {
//       name: 'Dashboard',
//       icon: <Home size={20} />,
//       href: '/dashboard',
//       key: 'dashboard',
//     },
//     {
//       name: 'Market Overview',
//       icon: <LineChart size={20} />,
//       href: '/market',
//       key: 'market',
//     },
//     {
//       name: 'Watchlist',
//       icon: <Eye size={20} />,
//       href: '/watchlist',
//       key: 'watchlist',
//     },
//     {
//       name: 'Portfolio',
//       icon: <Briefcase size={20} />,
//       href: '/portfolio',
//       key: 'portfolio',
//     },
//     {
//       name: 'Settings',
//       icon: <Settings size={20} />,
//       href: '/settings',
//       key: 'settings',
//     },
//   ];

//   return (
//     <div className="w-64 fixed h-screen bg-gray-800 p-4 text-white">
//       <Link className="flex items-center justify-center mb-6" href="/">
//         <Image
//           src="/stockPulseIcon.png"
//           alt="Icon"
//           width={55}
//           height={55}
//           href="\"
//         />
//         <h2 className="text-xl font-bold mb-6 p-2">Stock Pulse</h2>
//       </Link>
//       <ul className="space-y-3">
//         {menuItems.map((item) => (
//           <motion.li
//             key={item.key}
//             whileHover={{ scale: 1.05 }}
//             className={`flex items-center p-2 rounded transition-all duration-300 cursor-pointer ${
//               active === item.key
//                 ? 'bg-green-500 text-white'
//                 : 'bg-gray-700 hover:bg-gray-600'
//             }`}
//             onClick={() => setActive(item.key)}
//           >
//             <Link href={item.href} className="flex items-center gap-3 w-full">
//               {item.icon}
//               <span>{item.name}</span>
//             </Link>
//           </motion.li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SideBar;

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  Home,
  LineChart,
  Briefcase,
  Settings as SettingsIcon,
  Eye,
  Bell,
  ChevronsLeft,
  ChevronsRight,
  Paperclip, // Assuming you want to use Paperclip for paper trading
} from 'lucide-react';

export default function SideBar({
  counts = { watchlist: 5, alerts: 2, positions: 4 },
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  // (Optional) persist collapsed state
  useEffect(() => {
    const saved = localStorage.getItem('sp.sidebar.collapsed');
    if (saved) setCollapsed(saved === '1');
  }, []);
  useEffect(() => {
    localStorage.setItem('sp.sidebar.collapsed', collapsed ? '1' : '0');
  }, [collapsed]);

  const items = [
    { name: 'Dashboard', href: '/dashboard', icon: Home, key: 'dashboard' },
    {
      name: 'Portfolio',
      href: '/portfolio',
      icon: Briefcase,
      key: 'portfolio',
      badge: counts.positions,
    },
    {
      name: 'Paper Trading',
      href: '/paper',
      icon: Paperclip,
      key: 'portfolio',
      badge: counts.positions,
    },

    {
      name: 'Market Overview',
      href: '/market',
      icon: LineChart,
      key: 'market',
    },
    {
      name: 'Watchlist',
      href: '/watchlist',
      icon: Eye,
      key: 'watchlist',
      badge: counts.watchlist,
    },
    {
      name: 'Alerts',
      href: '/alerts',
      icon: Bell,
      key: 'alerts',
      badge: counts.alerts,
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: SettingsIcon,
      key: 'settings',
    },
  ];

  const isActive = (href) =>
    pathname === href || pathname.startsWith(href + '/');

  return (
    <nav
      aria-label="Primary"
      className={`${
        collapsed ? 'w-16' : 'w-64'
      } fixed h-screen bg-gray-800 border-r border-gray-700 p-3 text-white flex flex-col`}
    >
      {/* Brand + collapse */}
      <div className="flex items-center justify-between mb-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            className="rounded-sm"
            src="/stockPulseIcon.png"
            alt="Stock Pulse"
            width={collapsed ? 28 : 36}
            height={collapsed ? 28 : 36}
            priority
          />
          {!collapsed && <span className="text-lg font-bold">Stock Pulse</span>}
        </Link>
        <button
          onClick={() => setCollapsed((v) => !v)}
          className="p-2 rounded-lg hover:bg-gray-700 text-slate-300"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          {collapsed ? (
            <ChevronsRight className="w-4 h-4" />
          ) : (
            <ChevronsLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Menu */}
      <ul className="space-y-1 flex-1">
        {items.map((item) => {
          const active = isActive(item.href);
          return (
            <li key={item.key}>
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`relative group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors
                  ${active ? 'text-white' : 'text-slate-300 hover:text-white'}
                  ${
                    active
                      ? 'bg-gray-700/60 ring-1 ring-emerald-500/30'
                      : 'hover:bg-gray-700/50'
                  }
                `}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {!collapsed && (
                  <>
                    <span className="truncate">{item.name}</span>
                    {item.badge != null && (
                      <span className="ml-auto text-xs px-2 py-0.5 rounded bg-gray-700 text-slate-200">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
                {active && (
                  <motion.span
                    layoutId="active-bg"
                    className="absolute inset-0 -z-10 rounded-lg bg-emerald-500/10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Footer (optional quick link or status) */}
      <div
        className={`${
          collapsed ? 'px-0' : 'px-2'
        } pt-2 border-t border-gray-700`}
      >
        {!collapsed ? (
          <p className="text-xs text-slate-400">
            Press <kbd className="px-1 py-0.5 bg-gray-700 rounded">⌘K</kbd> for
            quick search
          </p>
        ) : (
          <p className="text-xs text-center text-slate-400">⌘K</p>
        )}
      </div>
    </nav>
  );
}
