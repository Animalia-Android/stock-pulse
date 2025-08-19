'use client';

import HeatMap from '@/components/HeatMap';
import MarketBreadth from '@/components/MarketBreadth';
import SectorPerformanceCard from '@/components/SectorPerformanceCard';
import SnapshotCard from '@/components/SnapshotCard';
import TopTenStocks from '@/components/stock/TopPerformingStocks';
import IndicesGrid from '@/components/ui/IndicesGrid';
import VolatilityRatesCard from '@/components/VolatilityRatesCard';

export default function MarketClient({ initial }) {
  const {
    globalIndices = [],
    sectorPerf = [],
    breadth = {},
    volRates = {},
    futures = [],
    commodities = [],
    crypto = [],
    econCalendar = [],
    topGainers = [],
    topLosers = [],
  } = initial || {};

  return (
    <>
      {/* Global Indices */}
      <IndicesGrid type="🌍 Global Indices" indices={globalIndices} />

      {/* Volatility & Rates + Breadth */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {/* Vol & Rates */}
        <VolatilityRatesCard volRates={volRates} breadth={breadth} />

        {/* Market Breadth */}
        <MarketBreadth breadth={breadth} />
      </div>

      {/* Sector Performance */}
      <SectorPerformanceCard sectorPerf={sectorPerf} />

      {/* Futures / Commodities / Crypto / Calendar */}
      <div className="grid lg:grid-cols-4 gap-4 mt-6 mb-6">
        {/* Futures */}
        <SnapshotCard title="🧾 Equity Futures" data={futures} />

        {/* Commodities */}
        <SnapshotCard title="⛽ Commodities" data={commodities} />

        {/* Crypto */}
        <SnapshotCard title="₿ Crypto Snapshot" data={crypto} />

        {/* Economic Calendar */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">📅 Economic Calendar</h3>
          <ul className="space-y-2 text-sm">
            {econCalendar.map((e, idx) => (
              <li key={idx} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{e.event}</p>
                  <p className="text-slate-400">
                    {e.date} • {e.time}
                  </p>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded ${
                    e.impact === 'High'
                      ? 'bg-red-500/20 text-red-300'
                      : 'bg-emerald-500/20 text-emerald-300'
                  }`}
                >
                  {e.impact}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Heatmap (placeholder) + Gainers/Losers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Row 1: Top 10 lists side-by-side on lg */}
        <div className="lg:col-span-6 min-w-0">
          <div className="flex flex-col gap-4">
            <TopTenStocks stocks={topGainers} category="Gainers" />
          </div>
        </div>
        <div className="lg:col-span-6 min-w-0">
          <div className="flex flex-col gap-4">
            <TopTenStocks stocks={topLosers} category="Losers" />
          </div>
        </div>

        {/* Row 2: Heatmap full width */}
        <HeatMap />
      </div>
    </>
  );
}
