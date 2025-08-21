'use client';

import Link from 'next/link';

import WatchlistTable from '@/components/watchlist/WatchlistTable';
import MoversCard from '@/components/MoversCard';
import AlertsList from '@/components/AlertsList';
import EarningsList from '@/components/EarningsList';
import NewsList from '@/components/NewsList';
import Card from '@/components/ui/Card';
import PortfolioSummary from '@/components/ui/PortfolioSummary';
import IndicesGrid from '@/components/ui/IndicesGrid';
import MarketSnapshot from '@/components/ui/MarketSnapshot';

export default function DashboardClient({ data, mockData }) {
  const { indices = [], sectors = [], news = [] } = data || {};
  const {
    marketSummary = {
      totalPortfolioValue: 0,
      dailyChange: 0,
      gainers: [],
      losers: [],
    },
    movers,
    watchlist = [],
    upcomingEarnings = [],
    alerts = [],
  } = mockData || {};

  return (
    <>
      <PortfolioSummary
        total={marketSummary.totalPortfolioValue}
        dailyChange={marketSummary.dailyChange}
      />

      <IndicesGrid indices={indices} type="dashboard" />

      <MarketSnapshot
        gainers={marketSummary.gainers}
        losers={marketSummary.losers}
      />

      {/* Watchlist + Movers */}
      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-semibold">👀 Watchlist (Preview)</h2>
              <Link
                href="/watchlist"
                className="text-sm text-emerald-400 hover:underline"
              >
                View all
              </Link>
            </div>
            <WatchlistTable rows={watchlist} />
          </Card>
        </div>

        <MoversCard movers={movers} />
      </div>

      {/* Earnings + Alerts + News */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <EarningsList upcoming={upcomingEarnings} />
        <AlertsList alerts={alerts} />
        {/* <NewsList headlines={news} /> */}

        {/* Cards row (unchanged) */}
        <div className="grid md:grid-cols-2 gap-4 mb-6 md:col-span-3">
          <Link
            href="/portfolio/performance"
            className="block bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">Portfolio Performance</p>
              <span className="text-xs px-2 py-0.5 rounded bg-gray-700 text-slate-200">
                YTD
              </span>
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <p className="text-2xl font-bold text-green-400">+7.4%</p>
              <p className="text-slate-400 text-sm">vs S&amp;P: +6.1%</p>
            </div>
            <div className="mt-3 h-2 rounded bg-gray-700">
              <div
                className="h-2 bg-emerald-500 rounded"
                style={{ width: '68%' }}
              />
            </div>
          </Link>

          <Link
            href="/screener"
            className="block bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">Saved Screeners</p>
              <span className="text-xs px-2 py-0.5 rounded bg-gray-700 text-slate-200">
                3
              </span>
            </div>
            <ul className="mt-2 text-sm text-slate-300 space-y-1" />
          </Link>
        </div>
      </div>
    </>
  );
}
