'use client';

import { Star, Bell, X } from 'lucide-react';

export default function SingleStock({
  stock = {}, // ✅ safe default
  compact = false,
  onPin = () => {},
  onAlert = () => {},
  onRemove = () => {},
}) {
  // Destructure with fallbacks
  const {
    ticker = '—',
    name = '',
    price = 0,
    change, // may be undefined
    series,
    low,
    high,
    pinned = false,
  } = stock || {};

  // Normalize change to a string like "+1.23%" or "-0.45%"
  const changeStr =
    typeof change === 'string'
      ? change
      : typeof change === 'number'
      ? `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`
      : '+0.00%';

  const isUp = changeStr.trim().startsWith('+');
  const changeColor = isUp ? 'text-green-400' : 'text-red-400';

  // Sparkline with fallback
  const fallbackSeries = [
    price * 0.98,
    price * 0.995,
    price * 1.002,
    price * 1.01,
  ];
  const s =
    Array.isArray(series) && series.length > 1 ? series : fallbackSeries;

  const width = 96,
    height = 28,
    pad = 2;
  const min = Math.min(...s),
    max = Math.max(...s);
  const span = Math.max(1e-9, max - min);
  const points = s.map((v, i) => {
    const x = pad + (i * (width - pad * 2)) / (s.length - 1);
    const y = pad + (height - pad * 2) * (1 - (v - min) / span);
    return `${x},${y}`;
  });
  const path = `M ${points.join(' L ')}`;

  // Day range bar with fallback to series min/max if low/high missing
  const lo = typeof low === 'number' ? low : min;
  const hi = typeof high === 'number' ? high : max;
  const pctInRange = Math.max(
    0,
    Math.min(100, ((price - lo) / Math.max(1e-9, hi - lo)) * 100)
  );

  return (
    <div
      className={`px-4 ${
        compact ? 'py-2' : 'py-3'
      } hover:bg-gray-700/40 transition`}
    >
      <div className="flex items-center gap-3">
        {/* Pin */}
        <button
          onClick={onPin}
          title={pinned ? 'Unpin' : 'Pin'}
          className={`shrink-0 p-1 rounded ${
            pinned ? 'text-amber-400' : 'text-slate-400'
          } hover:bg-gray-700`}
        >
          <Star className={`w-4 h-4 ${pinned ? 'fill-amber-400' : ''}`} />
        </button>

        {/* Symbol / name */}
        <div className="min-w-[88px]">
          <div className="font-semibold leading-none">{ticker}</div>
          <div className="text-xs text-slate-400 truncate max-w-[160px]">
            {name}
          </div>
        </div>

        {/* Price / change */}
        <div className="ml-auto text-right">
          <div className="font-medium">${Number(price || 0).toFixed(2)}</div>
          <div className={`text-xs ${changeColor}`}>{changeStr}</div>
        </div>

        {/* Sparkline */}
        <svg viewBox={`0 0 ${width} ${height}`} className="w-24 h-7 -mx-1">
          <path
            d={path}
            fill="none"
            className={isUp ? 'stroke-green-400' : 'stroke-red-400'}
            strokeWidth="2"
          />
        </svg>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={onAlert}
            title="Create alert"
            className="p-1 rounded text-slate-300 hover:bg-gray-700"
          >
            <Bell className="w-4 h-4" />
          </button>
          <button
            onClick={onRemove}
            title="Remove"
            className="p-1 rounded text-slate-300 hover:bg-gray-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ---------- BREAK OFF INTO SEPARATE COMPONENTS ---------- */}
      {/* Range bar */}
      <div className="mt-2 flex items-center gap-2">
        <span className="text-xs text-slate-400">
          ${Number(lo || 0).toFixed(2)}
        </span>
        <div className="relative h-1.5 flex-1 bg-gray-700 rounded">
          <div
            className={`absolute top-0 h-1.5 rounded ${
              isUp ? 'bg-green-500' : 'bg-red-500'
            }`}
            style={{ width: `${pctInRange}%` }}
          />
        </div>
        <span className="text-xs text-slate-400">
          ${Number(hi || 0).toFixed(2)}
        </span>
      </div>
    </div>
  );
}
