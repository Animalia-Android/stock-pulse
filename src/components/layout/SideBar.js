'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Home,
  LineChart,
  Briefcase,
  Settings as SettingsIcon,
  Eye,
  Bell,
  ChevronsLeft,
  ChevronsRight,
  Paperclip,
  Plus,
  Zap,
} from 'lucide-react';

import { useUIStore } from '@/stores/uiStore';
import ProviderToggle from '../controls/ProviderToggle';

export default function SideBar({
  counts = { watchlist: 5, alerts: 2, positions: 4, paperOpen: 0 },
}) {
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const collapsed = useUIStore((s) => s.sidebarCollapsed);

  const pathname = usePathname();
  //old way of keeping state
  // const [collapsed, setCollapsed] = useState(false);

  // Publish sidebar width for layout consumption
  useEffect(() => {
    const width = collapsed ? '4rem' : '16rem'; // w-16 vs w-64
    document.documentElement.style.setProperty('--sp-sidebar-width', width);
  }, [collapsed]);

  const recentSymbols = useMemo(
    () => ['AAPL', 'NVDA', 'MSFT', 'TSLA', 'AMZN'],
    []
  );

  const itemsOverview = [
    { name: 'Dashboard', href: '/dashboard', icon: Home, key: 'dashboard' },
    {
      name: 'Market Overview',
      href: '/market',
      icon: LineChart,
      key: 'market',
    },
  ];

  const itemsYourHub = [
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
      key: 'paper',
      badge: counts.paperOpen,
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
      } h-full bg-gray-800 border-r border-gray-700 p-3 text-white flex flex-col`}
    >
      {/* Header bar: title + collapse button (anchored, not floating) */}
      <div className="mb-3 relative flex items-center rounded-lg border border-gray-700 bg-gray-900/60 px-2 py-1.5">
        {/* centered label */}
        {!collapsed && (
          <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-[16px] uppercase tracking-wide text-slate-400">
            Trade Desk
          </span>
        )}

        {/* right-aligned collapse/expand */}
        <button
          onClick={() => toggleSidebar()}
          className="ml-auto p-2 rounded-lg hover:bg-gray-700 text-slate-300"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          {collapsed ? (
            <ChevronsRight className="w-3 h-3" />
          ) : (
            <ChevronsLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation groups */}
      <ul className="space-y-1 flex-1">
        {!collapsed && <SectionLabel>Overview</SectionLabel>}
        {itemsOverview.map((item) => (
          <NavItem
            key={item.key}
            item={item}
            active={isActive(item.href)}
            collapsed={collapsed}
          />
        ))}

        <div className="my-2" />

        {!collapsed && <SectionLabel>Your hub</SectionLabel>}
        {itemsYourHub.map((item) => (
          <NavItem
            key={item.key}
            item={item}
            active={isActive(item.href)}
            collapsed={collapsed}
          />
        ))}
      </ul>

      {/* Footer hint */}
      <div
        className={`${
          collapsed ? 'px-0' : 'px-2'
        } pt-2 border-t border-gray-700`}
      ></div>
      {/* Quick actions — structured card */}
      {!collapsed && (
        <SectionCard title="Quick actions">
          <div className="grid grid-cols-1 gap-2">
            <ActionButton
              href="/paper"
              icon={<Plus className="w-4 h-4" />}
              label="New paper order"
            />
            <ActionButton
              href="/alerts"
              icon={<Zap className="w-4 h-4" />}
              label="New alert"
            />
          </div>
        </SectionCard>
      )}

      {/* Recent symbols — structured card */}
      {!collapsed && (
        <SectionCard
          title="Recent symbols"
          right={
            <Link
              href="/watchlist"
              className="text-[11px] text-emerald-400 hover:underline"
            >
              Manage
            </Link>
          }
        >
          <div className="flex flex-wrap gap-2">
            {recentSymbols.map((sym) => (
              <Link
                key={sym}
                href={`/stocks/${sym}`}
                className="text-xs px-2 py-1 rounded border border-gray-700 bg-gray-900/50 hover:bg-gray-700"
              >
                {sym}
              </Link>
            ))}
          </div>
        </SectionCard>
      )}
      <ProviderToggle />
      {/* {!collapsed ? (
        <p className="text-xs text-slate-400">
          Press <kbd className="px-1 py-0.5 bg-gray-700 rounded">⌘K</kbd> for
          quick search
        </p>
      ) : (
        <p className="text-xs text-center text-slate-400">⌘K</p>
      )} */}
    </nav>
  );
}

/* ---------- BREAK OFF INTO SEPARATE COMPONENTS ---------- */

function SectionCard({ title, right, children }) {
  return (
    <div className="mb-3 rounded-lg border border-gray-700 bg-gray-900/40 p-2">
      <div className="mb-2 flex items-center justify-between px-1">
        <p className="text-[11px] uppercase tracking-wide text-slate-400">
          {title}
        </p>
        {right ?? null}
      </div>
      {children}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <li className="px-3 py-1 text-[11px] uppercase tracking-wide text-slate-500">
      {children}
    </li>
  );
}

function NavItem({ item, active, collapsed }) {
  return (
    <li>
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
        title={collapsed ? item.name : undefined}
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
}

function ActionButton({ href, icon, label }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-between gap-2 rounded-lg border border-gray-700 bg-gray-900/50 hover:bg-gray-700 px-2.5 py-1.5 text-xs"
    >
      <span className="inline-flex items-center gap-2">
        {icon}
        <span>{label}</span>
      </span>
      <span className="text-slate-500">→</span>
    </Link>
  );
}
