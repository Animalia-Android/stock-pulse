'use client';

import { useMemo } from 'react';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PieChart,
  Calendar,
  FileDown,
} from 'lucide-react';

export default function Portfolio() {
  // --- Mock positions (swap with API later) ---
  const positions = [
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      sector: 'Tech',
      shares: 45,
      avgCost: 172.1,
      price: 185.65,
      dayChangePct: -0.45,
      nextDiv: { exDate: 'Sep 05', amount: 0.24 },
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corp.',
      sector: 'Tech',
      shares: 30,
      avgCost: 355.2,
      price: 399.8,
      dayChangePct: +1.75,
      nextDiv: { exDate: 'Aug 28', amount: 0.75 },
    },
    {
      symbol: 'AMZN',
      name: 'Amazon.com Inc.',
      sector: 'Cons. Disc.',
      shares: 20,
      avgCost: 148.3,
      price: 165.78,
      dayChangePct: +2.94,
      nextDiv: null,
    },
    {
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      sector: 'Cons. Disc.',
      shares: 12,
      avgCost: 242.0,
      price: 230.98,
      dayChangePct: -1.12,
      nextDiv: null,
    },
    {
      symbol: 'V',
      name: 'Visa Inc.',
      sector: 'Financials',
      shares: 15,
      avgCost: 228.1,
      price: 245.44,
      dayChangePct: +0.62,
      nextDiv: { exDate: 'Aug 22', amount: 0.52 },
    },
  ];

  // Mock portfolio value history for sparkline
  const portfolioSeries = [50340, 50790, 51020, 51560, 51920, 52010, 52340]; // last point ≈ total MV

  // --- Derived totals & groupings ---
  const data = useMemo(() => {
    const mv = positions.map((p) => ({
      ...p,
      marketValue: p.price * p.shares,
      cost: p.avgCost * p.shares,
    }));
    const totalMV = mv.reduce((a, p) => a + p.marketValue, 0);
    const totalCost = mv.reduce((a, p) => a + p.cost, 0);
    const unrealPL = totalMV - totalCost;
    const dayPL = mv.reduce(
      (a, p) => a + p.marketValue * (p.dayChangePct / 100),
      0
    );

    // allocation by holding
    const byHold = mv.map((p) => ({
      symbol: p.symbol,
      name: p.name,
      value: p.marketValue,
      pct: (p.marketValue / totalMV) * 100,
    }));

    // allocation by sector
    const sectorMap = {};
    mv.forEach((p) => {
      sectorMap[p.sector] = (sectorMap[p.sector] || 0) + p.marketValue;
    });
    const bySector = Object.entries(sectorMap).map(([sector, val]) => ({
      sector,
      value: val,
      pct: (val / totalMV) * 100,
    }));

    // upcoming dividends
    const income = positions
      .filter((p) => p.nextDiv)
      .map((p) => ({
        symbol: p.symbol,
        ...p.nextDiv,
        estIncome: p.nextDiv.amount * p.shares,
      }));

    return {
      mv,
      totalMV,
      totalCost,
      unrealPL,
      dayPL,
      byHold,
      bySector,
      income,
    };
  }, [positions]);

  // --- Helpers ---
  const fmtUSD = (n) =>
    `$${(n ?? 0).toLocaleString(undefined, {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    })}`;
  const fmtPct = (n) => `${(n ?? 0).toFixed(2)}%`;
  const deltaClass = (v) => (v >= 0 ? 'text-green-400' : 'text-red-400');

  // Sparkline path
  const Sparkline = ({ series }) => {
    const width = 260,
      height = 48,
      pad = 4;
    const min = Math.min(...series),
      max = Math.max(...series);
    const span = Math.max(1e-9, max - min);
    const pts = series.map((v, i) => {
      const x = pad + (i * (width - pad * 2)) / (series.length - 1);
      const y = pad + (height - pad * 2) * (1 - (v - min) / span);
      return `${x},${y}`;
    });
    const d = `M ${pts.join(' L ')}`;
    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-12">
        <path
          d={d}
          fill="none"
          className={
            series[series.length - 1] >= series[0]
              ? 'stroke-green-400'
              : 'stroke-red-400'
          }
          strokeWidth="2"
        />
      </svg>
    );
  };

  const downloadCSV = () => {
    const header = [
      'Symbol',
      'Name',
      'Sector',
      'Shares',
      'Avg Cost',
      'Price',
      'Market Value',
      'Unrealized P/L',
      'Unrealized P/L %',
      'Day %',
    ];
    const rows = data.mv.map((p) => {
      const pl = p.marketValue - p.cost;
      const plPct = (pl / p.cost) * 100;
      return [
        p.symbol,
        p.name,
        p.sector,
        p.shares,
        p.avgCost,
        p.price,
        p.marketValue,
        pl,
        plPct,
        p.dayChangePct,
      ];
    });
    const csv = [header, ...rows]
      .map((r) =>
        r
          .map((v) =>
            typeof v === 'string' ? `"${v.replace(/"/g, '""')}"` : v
          )
          .join(',')
      )
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Your Portfolio</h1>
      <p className="mb-4 text-slate-300">
        Holdings you own: P/L, allocation, income, and recent activity.
      </p>

      {/* Top summary */}
      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Wallet className="w-5 h-5" /> Value
            </h2>
            <button
              onClick={downloadCSV}
              className="text-xs inline-flex items-center gap-1 px-2 py-1 rounded border border-gray-700 hover:bg-gray-700"
            >
              <FileDown className="w-3.5 h-3.5" /> Export
            </button>
          </div>
          <p className="text-3xl font-bold text-green-400 mt-1">
            {fmtUSD(data.totalMV)}
          </p>
          <div className="mt-1 text-sm">
            <span className={`${deltaClass(data.unrealPL)} font-medium`}>
              {data.unrealPL >= 0 ? '+' : ''}
              {fmtUSD(data.unrealPL)}
            </span>
            <span className="text-slate-400"> total P/L</span>
          </div>
          <div className="mt-1 text-sm">
            <span className={`${deltaClass(data.dayPL)} font-medium`}>
              {data.dayPL >= 0 ? '+' : ''}
              {fmtUSD(data.dayPL)}
            </span>
            <span className="text-slate-400"> today</span>
          </div>
          <div className="mt-3">
            <Sparkline series={portfolioSeries} />
          </div>
        </div>

        {/* Allocation by holding */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <PieChart className="w-5 h-5" /> Allocation (Holdings)
          </h2>
          <div className="mt-3 h-4 w-full bg-gray-700 rounded flex overflow-hidden">
            {data.byHold.map((h) => (
              <div
                key={h.symbol}
                className="h-4"
                style={{
                  width: `${h.pct}%`,
                  backgroundColor: colorFromSymbol(h.symbol),
                }}
                title={`${h.symbol} ${h.pct.toFixed(1)}%`}
              />
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
            {data.byHold.map((h) => (
              <div key={h.symbol} className="flex items-center gap-2">
                <span
                  className="inline-block w-3 h-3 rounded"
                  style={{ backgroundColor: colorFromSymbol(h.symbol) }}
                />
                <span className="text-slate-300">{h.symbol}</span>
                <span className="ml-auto">{h.pct.toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Allocation by sector */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Allocation (Sector)</h2>
          <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
            {data.bySector.map((s) => (
              <div
                key={s.sector}
                className="bg-gray-900/40 rounded p-2 flex items-center"
              >
                <span
                  className="inline-block w-2 h-2 rounded-full mr-2"
                  style={{ backgroundColor: colorFromSector(s.sector) }}
                />
                <span className="text-slate-300">{s.sector}</span>
                <span className="ml-auto">{s.pct.toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Positions table */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-2">Positions</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-400 border-b border-gray-700">
                <th className="py-2">Symbol</th>
                <th className="py-2">Name</th>
                <th className="py-2 text-right">Shares</th>
                <th className="py-2 text-right">Avg Cost</th>
                <th className="py-2 text-right">Price</th>
                <th className="py-2 text-right">Market Value</th>
                <th className="py-2 text-right">Unrealized P/L</th>
                <th className="py-2 text-right">P/L %</th>
                <th className="py-2 text-right">Day %</th>
              </tr>
            </thead>
            <tbody>
              {data.mv.map((p) => {
                const pl = p.marketValue - p.cost;
                const plPct = (pl / p.cost) * 100;
                return (
                  <tr key={p.symbol} className="border-b border-gray-700/60">
                    <td className="py-2 font-semibold">{p.symbol}</td>
                    <td className="py-2 text-slate-300">{p.name}</td>
                    <td className="py-2 text-right">{p.shares}</td>
                    <td className="py-2 text-right">{fmtUSD(p.avgCost)}</td>
                    <td className="py-2 text-right">{fmtUSD(p.price)}</td>
                    <td className="py-2 text-right">{fmtUSD(p.marketValue)}</td>
                    <td className={`py-2 text-right ${deltaClass(pl)}`}>
                      {pl >= 0 ? '+' : ''}
                      {fmtUSD(pl)}
                    </td>
                    <td className={`py-2 text-right ${deltaClass(plPct)}`}>
                      {plPct >= 0 ? '+' : ''}
                      {fmtPct(plPct)}
                    </td>
                    <td
                      className={`py-2 text-right ${deltaClass(
                        p.dayChangePct
                      )}`}
                    >
                      {p.dayChangePct >= 0 ? '+' : ''}
                      {fmtPct(p.dayChangePct)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={5} className="py-3 font-semibold">
                  Total
                </td>
                <td className="py-3 text-right font-semibold">
                  {fmtUSD(data.totalMV)}
                </td>
                <td
                  className={`py-3 text-right font-semibold ${deltaClass(
                    data.unrealPL
                  )}`}
                >
                  {data.unrealPL >= 0 ? '+' : ''}
                  {fmtUSD(data.unrealPL)}
                </td>
                <td className="py-3 text-right text-slate-300">—</td>
                <td
                  className={`py-3 text-right font-semibold ${deltaClass(
                    data.dayPL
                  )}`}
                >
                  {data.dayPL >= 0 ? '+' : ''}
                  {fmtUSD(data.dayPL)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Income + Transactions */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Income */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <Calendar className="w-5 h-5" /> Upcoming Dividends
          </h2>
          {data.income.length === 0 ? (
            <p className="text-slate-400 text-sm">No upcoming dividends.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {data.income.map((d, i) => (
                <li key={i} className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold">{d.symbol}</span>
                    <span className="text-slate-400">
                      {' '}
                      • Ex-Date {d.exDate}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-300">
                      Est. ${d.amount.toFixed(2)} / sh
                    </p>
                    <p className="text-emerald-400">~{fmtUSD(d.estIncome)}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Transactions (mock) */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center justify-between">
              <span>
                <span className="font-semibold">BUY</span> • MSFT • 5 @ $390.00
              </span>
              <span className="text-slate-400">Aug 10</span>
            </li>
            <li className="flex items-center justify-between">
              <span>
                <span className="font-semibold">SELL</span> • TSLA • 3 @ $235.20
              </span>
              <span className="text-slate-400">Aug 07</span>
            </li>
            <li className="flex items-center justify-between">
              <span>
                <span className="font-semibold">DIV</span> • V • $7.80
              </span>
              <span className="text-slate-400">Aug 02</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// simple color helpers for allocations (keeps visuals consistent without extra deps)
function colorFromSymbol(sym) {
  const palette = [
    '#10b981',
    '#22d3ee',
    '#f59e0b',
    '#ef4444',
    '#a78bfa',
    '#34d399',
    '#f472b6',
    '#60a5fa',
    '#84cc16',
    '#fb7185',
  ];
  let hash = 0;
  for (let i = 0; i < sym.length; i++)
    hash = sym.charCodeAt(i) + ((hash << 5) - hash);
  return palette[Math.abs(hash) % palette.length];
}
function colorFromSector(sector) {
  const palette = [
    '#22c55e',
    '#3b82f6',
    '#eab308',
    '#ef4444',
    '#14b8a6',
    '#a78bfa',
    '#f97316',
    '#06b6d4',
  ];
  let hash = 0;
  for (let i = 0; i < sector.length; i++)
    hash = sector.charCodeAt(i) + ((hash << 5) - hash);
  return palette[Math.abs(hash) % palette.length];
}
