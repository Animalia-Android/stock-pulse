'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Bell, DollarSign, ExternalLink } from 'lucide-react';

import StockChart from '@/components/stock/StockChart';
import AddToWatchlistBtn from '@/components/stock/AddToWatchlistBtn';
import { deltaClass } from '@/lib/utils/converters/deltaClass';

export default function StockPageClient({ symbol, initialData }) {
  const router = useRouter();

  const [stockData, setStockData] = useState(initialData ?? null);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState('');
  const [range, setRange] = useState('1D');
  const [ticketOpen, setTicketOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    if (!symbol || initialData) return;

    (async () => {
      try {
        setLoading(true);
        setError('');
        const res = await fetch(`/api/stocks?symbol=${symbol}&details=true`, {
          cache: 'no-store',
        });
        const data = await res.json();
        if (cancelled) return;
        if (data?.error) {
          setError(data.error);
          setStockData(null);
        } else {
          setStockData(data);
        }
      } catch (e) {
        if (!cancelled) setError('Failed to load stock data');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [symbol, initialData]);

  const price = toNum(stockData?.price);
  const change = toNum(stockData?.change);
  const pct = toNum(stockData?.percentChange);

  if (loading) return <Skeleton />;
  if (error) return <ErrorState error={error} onBack={() => router.back()} />;

  return (
    <div className="p-6">
      {/* Back + crumb */}
      <div className="mb-3 flex items-center gap-2">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 px-2 py-1 rounded border border-gray-700 hover:bg-gray-700 text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <span className="text-slate-500 text-sm">/</span>
        <span className="text-sm text-slate-400 uppercase tracking-wide">
          {String(symbol).toUpperCase()}
        </span>
      </div>

      {/* HERO */}
      <section className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-start gap-3">
            <LogoBadge symbol={stockData?.symbol} logoUrl={stockData?.logo} />
            <div>
              <h1 className="text-2xl font-bold leading-tight">
                {stockData?.name || stockData?.symbol}{' '}
                <span className="text-slate-400 text-base">
                  ({String(stockData?.symbol || symbol).toUpperCase()})
                </span>
              </h1>
              <div className="mt-1 flex items-end gap-3">
                <span className="text-3xl font-bold">${fmt(price)}</span>
                <span className={`text-sm font-medium ${deltaClass(change)}`}>
                  {signed(change)} ({signed(pct)}%)
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-400">
                {stockData?.exchange || '—'} • {stockData?.sector || '—'}{' '}
                {stockData?.industry ? `• ${stockData.industry}` : ''}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <AddToWatchlistBtn
              symbol={stockData?.symbol}
              name={stockData?.name}
            />
            <Link
              href={`/alerts?symbol=${encodeURIComponent(symbol)}`}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-700 hover:bg-gray-700 text-sm"
            >
              <Bell className="w-4 h-4" /> Set Alert
            </Link>
            <button
              onClick={() => setTicketOpen(true)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm"
              title="Place a virtual trade"
            >
              <DollarSign className="w-4 h-4" /> Paper Trade
            </button>
          </div>
        </div>

        <nav
          className="mt-3 border-t border-gray-700 pt-2 sticky"
          style={{ top: 'calc(var(--sp-header-height,3.5rem) + 4px)' }}
        >
          <ul className="flex flex-wrap gap-2 text-sm">
            <SubLink href="#overview">Overview</SubLink>
            <SubLink href="#chart">Chart</SubLink>
            <SubLink href="#fundamentals">Fundamentals</SubLink>
            <SubLink href="#news">News</SubLink>
            <SubLink href="#about">About</SubLink>
          </ul>
        </nav>
      </section>

      {/* OVERVIEW */}
      <section id="overview" className="mb-4">
        <div className="grid md:grid-cols-3 gap-4">
          <StatCard label="Market Cap" value={fmtAbbr(stockData?.marketCap)} />
          <StatCard label="P/E (TTM)" value={safeVal(stockData?.peRatio)} />
          <StatCard label="EPS (TTM)" value={safeVal(stockData?.eps)} />
        </div>

        <div className="mt-4 grid md:grid-cols-3 gap-4">
          <StatCard
            label="Dividend Yield"
            value={percent(stockData?.dividendYield)}
          />
          <StatCard
            label="Volume"
            value={fmtAbbr(stockData?.volume)}
            hint={`Avg ${fmtAbbr(stockData?.avgVolume)}`}
          />
          <RangeCard
            label="52-Week Range"
            low={toNum(stockData?.fiftyTwoWeekLow)}
            high={toNum(stockData?.fiftyTwoWeekHigh)}
            cur={price}
          />
        </div>
      </section>

      {/* CHART */}
      <section
        id="chart"
        className="mb-4 bg-gray-800 border border-gray-700 rounded-lg p-3"
      >
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Price Chart</h2>
          <div className="flex items-center gap-1">
            {['1D', '5D', '1M', '6M', '1Y', '5Y'].map((r, i) => {
              const key = r + i;
              return (
                <button
                  key={key}
                  onClick={() => setRange(r)}
                  className={`px-2 py-1 text-xs rounded border ${
                    r === range
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'border-gray-700 hover:bg-gray-700'
                  }`}
                >
                  {r}
                </button>
              );
            })}
          </div>
        </div>
        {/* <StockChart symbol={symbol} range={range} /> */}
      </section>

      {/* FUNDAMENTALS */}
      <section
        id="fundamentals"
        className="mb-4 bg-gray-800 border border-gray-700 rounded-lg p-3"
      >
        <h2 className="text-lg font-semibold mb-2">Key Fundamentals</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
          <Pair k="Beta" v={safeVal(stockData?.beta)} />
          <Pair k="Revenue (TTM)" v={fmtAbbr(stockData?.revenue)} />
          <Pair k="Gross Margin" v={percent(stockData?.grossMargin)} />
          <Pair k="Operating Margin" v={percent(stockData?.operatingMargin)} />
          <Pair k="Net Margin" v={percent(stockData?.netMargin)} />
          <Pair k="ROE" v={percent(stockData?.roe)} />
          <Pair k="Debt / Equity" v={safeVal(stockData?.debtToEquity)} />
          <Pair k="Free Cash Flow" v={fmtAbbr(stockData?.freeCashFlow)} />
          <Pair
            k="Shares Outstanding"
            v={fmtAbbr(stockData?.sharesOutstanding)}
          />
        </div>
      </section>

      {/* NEWS */}
      <section
        id="news"
        className="mb-4 bg-gray-800 border border-gray-700 rounded-lg p-3"
      >
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Latest News</h2>
          {stockData?.news.length > 0 && (
            <Link
              href={`/news?symbol=${encodeURIComponent(symbol)}`}
              className="text-sm text-emerald-400 hover:underline"
            >
              See more
            </Link>
          )}
        </div>
        <ul className="space-y-2">
          {(stockData?.news || []).slice(0, 5).map((n, i) => {
            const key =
              n.id ??
              n.url ??
              `${n.source || 'src'}-${n.datetime || 't'}-${(
                n.headline || ''
              ).slice(0, 32)}`;

            return (
              <li
                key={key}
                className="rounded border border-gray-700/60 hover:bg-gray-700/30"
              >
                <a
                  href={n.url || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3 p-3"
                >
                  <div className="flex-1">
                    <p className="font-medium leading-snug">
                      {n.headline || 'Untitled'}{' '}
                      {n.url && (
                        <ExternalLink className="inline w-3.5 h-3.5 opacity-60" />
                      )}
                    </p>
                    <p className="text-xs text-slate-400">
                      {n.source || 'Source'} • {timeAgo(n.datetime)}
                    </p>
                  </div>
                </a>
              </li>
            );
          })}
          {(!stockData?.news || stockData.news.length === 0) && (
            <li className="text-sm text-slate-400">No recent headlines.</li>
          )}
        </ul>
      </section>

      {/* ABOUT + PEERS */}
      <section id="about" className="mb-4 grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-gray-800 border border-gray-700 rounded-lg p-3">
          <h2 className="text-lg font-semibold mb-2">About</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            {stockData?.description || 'No company description available.'}
          </p>
          <div className="mt-3 grid sm:grid-cols-2 gap-3 text-sm">
            <Pair k="CEO" v={stockData?.ceo || '—'} />
            <Pair
              k="Headquarters"
              v={stockData?.hq || stockData?.city || '—'}
            />
            <Pair k="Founded" v={stockData?.founded || '—'} />
            <Pair k="Employees" v={fmtAbbr(stockData?.employees)} />
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-3">
          <h2 className="text-lg font-semibold mb-2">Peers</h2>
          <div className="flex flex-wrap gap-2">
            {(stockData?.peers || []).slice(0, 10).map((p, i) => {
              const key = p + i;

              return (
                <Link
                  key={key}
                  href={`/stocks/${p}`}
                  className="text-xs px-2 py-1 rounded border border-gray-700 bg-gray-900/50 hover:bg-gray-700"
                >
                  {p}
                </Link>
              );
            })}
            {(!stockData?.peers || stockData.peers.length === 0) && (
              <span className="text-sm text-slate-400">No peer data.</span>
            )}
          </div>
        </div>
      </section>

      {ticketOpen && (
        <Modal
          onClose={() => setTicketOpen(false)}
          title={`Paper trade ${String(symbol).toUpperCase()}`}
        >
          <p className="text-sm text-slate-300">
            Order ticket goes here. (Wire to paper store later.)
          </p>
        </Modal>
      )}
    </div>
  );
}

// /* --------- small pieces ---------- */

// /* ---------- BREAK OFF INTO SEPARATE COMPONENTS ---------- */

function Skeleton() {
  return (
    <div className="p-6">
      <div className="mb-3 h-6 w-40 rounded bg-gray-700 animate-pulse" />
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded bg-gray-700 animate-pulse" />
          <div className="space-y-2">
            <div className="h-5 w-40 rounded bg-gray-700 animate-pulse" />
            <div className="h-4 w-24 rounded bg-gray-700 animate-pulse" />
          </div>
        </div>
        <div className="mt-3 h-6 w-24 rounded bg-gray-700 animate-pulse" />
      </div>
      <div className="h-64 rounded bg-gray-800 border border-gray-700 animate-pulse" />
    </div>
  );
}

function ErrorState({ error, onBack }) {
  return (
    <div className="p-6">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 px-2 py-1 rounded border border-gray-700 hover:bg-gray-700 text-sm mb-4"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-4">
        <p className="text-red-300">{error}</p>
      </div>
    </div>
  );
}

/* ---------- BREAK OFF INTO SEPARATE COMPONENTS ---------- */

function LogoBadge({ symbol, logoUrl }) {
  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt={symbol}
        className="h-10 w-10 rounded bg-gray-900 object-contain p-1 border border-gray-700"
      />
    );
  }
  const s = String(symbol || '?')
    .toUpperCase()
    .slice(0, 3);
  return (
    <div className="h-10 w-10 rounded grid place-items-center bg-emerald-600/20 text-emerald-300 border border-emerald-600/30 font-bold">
      {s}
    </div>
  );
}

function SubLink({ href, children }) {
  return (
    <li>
      <a
        href={href}
        className="px-2 py-1 rounded hover:bg-gray-700 text-slate-300 hover:text-white"
      >
        {children}
      </a>
    </li>
  );
}

function StatCard({ label, value, hint }) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-3">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-xl font-semibold">{value ?? '—'}</p>
      {hint ? <p className="text-xs text-slate-500 mt-0.5">{hint}</p> : null}
    </div>
  );
}

function RangeCard({ label, low, high, cur }) {
  const lowN = toNum(low),
    highN = toNum(high),
    curN = toNum(cur);
  const pct = highN > lowN ? ((curN - lowN) / (highN - lowN)) * 100 : 0;
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-3">
      <p className="text-xs text-slate-400">{label}</p>
      <div className="mt-2">
        <div className="h-2 bg-gray-700 rounded relative overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-emerald-600"
            style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between text-xs text-slate-400">
          <span>L: ${fmt(lowN)}</span>
          <span>H: ${fmt(highN)}</span>
        </div>
      </div>
    </div>
  );
}

function Pair({ k, v }) {
  return (
    <div className="flex items-center justify-between rounded border border-gray-700/60 bg-gray-900/40 px-3 py-2">
      <span className="text-slate-400">{k}</span>
      <span className="font-medium">{v ?? '—'}</span>
    </div>
  );
}

function Modal({ children, onClose, title }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-lg border border-gray-700 bg-gray-800">
        <div className="flex items-center justify-between border-b border-gray-700 px-3 py-2">
          <h3 className="font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="px-2 py-1 text-slate-300 hover:bg-gray-700 rounded"
          >
            ✕
          </button>
        </div>
        <div className="p-3">{children}</div>
      </div>
    </div>
  );
}

/* ---------- BREAK OFF INTO SEPARATE COMPONENTS ---------- */
/* --------- helpers ---------- */
function toNum(x) {
  const n = Number(x);
  return Number.isFinite(n) ? n : 0;
}
function fmt(n) {
  return (Number.isFinite(n) ? n : 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
function fmtAbbr(n) {
  const v = Number(n);
  if (!Number.isFinite(v)) return '—';
  const abs = Math.abs(v);
  if (abs >= 1e12) return (v / 1e12).toFixed(2) + 'T';
  if (abs >= 1e9) return (v / 1e9).toFixed(2) + 'B';
  if (abs >= 1e6) return (v / 1e6).toFixed(2) + 'M';
  if (abs >= 1e3) return (v / 1e3).toFixed(2) + 'K';
  return v.toLocaleString();
}
function percent(x) {
  const n = Number(x);
  return Number.isFinite(n) ? `${(n * 100).toFixed(2)}%` : '—';
}
function signed(x) {
  const n = Number(x);
  if (!Number.isFinite(n)) return '—';
  const s = n > 0 ? '+' : '';
  return s + n.toFixed(2);
}
function timeAgo(ts) {
  if (!ts) return '';
  const t = typeof ts === 'number' ? ts : Date.parse(ts);
  const diff = Date.now() - t;
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

function safeVal(v, opts = {}) {
  const { digits = 2, prefix = '', suffix = '' } = opts;
  if (v === null || v === undefined || v === '') return '—';

  // If it's numeric (or stringy-number), format it
  const n = typeof v === 'number' ? v : Number(v);
  if (Number.isFinite(n)) {
    return `${prefix}${n.toLocaleString(undefined, {
      maximumFractionDigits: digits,
    })}${suffix}`;
  }

  // Otherwise return a clean string
  return String(v);
}
