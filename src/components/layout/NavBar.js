'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Bell, User, Moon, Sun, LogIn, Command } from 'lucide-react';
import SearchBar from '../SearchBar';
import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Derive current section from URL (for the little label next to brand)
  const section = useMemo(() => {
    const seg = pathname.split('/').filter(Boolean)[0] || 'Home';
    return seg.charAt(0).toUpperCase() + seg.slice(1);
  }, [pathname]);

  const isVirtual = pathname.startsWith('/paper');

  return (
    <header className="sticky top-0 z-50 border-b border-gray-700 bg-gray-900/80 backdrop-blur">
      <div className="h-14 px-3 sm:px-4 flex items-center gap-2">
        {/* Brand cluster (always visible) */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded px-2 py-1 hover:bg-gray-800/60"
          aria-label="Go to Home"
        >
          <Image
            src="/stockPulseIcon.png"
            alt="Stock Pulse"
            width={45}
            height={45}
            className="rounded-sm"
            priority
          />
          <span className="hidden sm:inline font-semibold tracking-tight">
            Stock <span className="text-emerald-400">Pulse</span>
          </span>
          {/* tiny pulsing dot for personality */}
          <span className="hidden sm:inline-block h-2 w-2 rounded-full bg-emerald-400/80 group-hover:bg-emerald-300 animate-pulse" />
        </Link>

        {/* Section + mode chip */}
        <div className="hidden md:flex items-center gap-2 pl-2 border-l border-gray-700">
          <span className="text-sm text-slate-400">{section}</span>
          {isVirtual && (
            <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-600/20 text-emerald-300">
              Virtual
            </span>
          )}
        </div>

        {/* Center search */}
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-xl">
            <SearchBar />
          </div>
        </div>

        {/* Right cluster: command, market status, theme, account */}
        <div className="flex items-center gap-1 sm:gap-2">
          <IconButton
            aria-label="Command palette"
            title="Search (⌘K)"
            onClick={() => {
              /* open your command palette here */
            }}
          >
            <Command className="w-5 h-5" />
          </IconButton>

          <div className="hidden lg:flex items-center gap-2 px-2 py-1 rounded-lg border border-gray-700 bg-gray-800/50">
            <MarketStatus />
          </div>

          <IconButton aria-label="Notifications" title="Notifications">
            <Bell className="w-5 h-5" />
          </IconButton>

          <IconButton
            aria-label="Toggle theme"
            title="Theme (UI only)"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </IconButton>

          {isLoggedIn ? (
            <IconButton aria-label="Account" title="Account">
              <User className="w-5 h-5" />
            </IconButton>
          ) : (
            <button
              onClick={() => setIsLoggedIn(true)}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-sm"
            >
              <LogIn className="w-4 h-4" /> Sign In
            </button>
          )}
        </div>
      </div>

      {/* subtle gradient accent line for character */}
      <div className="h-px bg-gradient-to-r from-emerald-600/40 via-transparent to-emerald-600/40" />
    </header>
  );
}

/* ---------- BREAK OFF INTO SEPARATE COMPONENTS ---------- */

/* ---------- tiny bits ---------- */

function IconButton({ children, ...props }) {
  return (
    <button
      {...props}
      className="p-2 rounded-lg hover:bg-gray-800/60 text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600/40"
      type="button"
    >
      {children}
    </button>
  );
}

function MarketStatus() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const { isOpen, timeET } = useMemo(() => {
    const et = new Date(
      now.toLocaleString('en-US', { timeZone: 'America/New_York' })
    );
    const day = et.getDay(); // 0 Sun, 6 Sat
    const open = new Date(et);
    open.setHours(9, 30, 0, 0);
    const close = new Date(et);
    close.setHours(16, 0, 0, 0);
    const openNow = day >= 1 && day <= 5 && et >= open && et <= close;
    const timeStr = et.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
    return { isOpen: openNow, timeET: timeStr + ' ET' };
  }, [now]);

  return (
    <div className="flex items-center gap-2 text-xs">
      <span
        className={`inline-block h-2 w-2 rounded-full ${
          isOpen ? 'bg-emerald-400' : 'bg-red-400'
        }`}
        aria-hidden
      />
      <span className="text-slate-300">
        {isOpen ? 'US Market Open' : 'US Market Closed'}
      </span>
      <span className="text-slate-500">•</span>
      <span className="text-slate-400">{timeET}</span>
    </div>
  );
}
