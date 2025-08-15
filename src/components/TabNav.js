'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TabNav({ tabs = [] }) {
  const pathname = usePathname();

  const isActive = (href) =>
    href === '/portfolio'
      ? pathname === '/portfolio'
      : pathname === href || pathname.startsWith(href + '/');

  return (
    <nav aria-label="Portfolio tabs" className="border-b border-gray-700">
      <ul className="flex flex-wrap gap-2">
        {tabs.map((t) => {
          const active = isActive(t.href);
          return (
            <li key={t.href}>
              <Link
                href={t.href}
                aria-current={active ? 'page' : undefined}
                className={`inline-flex items-center gap-2 px-3 py-2 text-sm rounded-t
                  ${
                    active
                      ? 'bg-gray-800 text-white border border-gray-700 border-b-transparent'
                      : 'text-slate-300 hover:bg-gray-700'
                  }
                `}
              >
                {t.icon}
                {t.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
