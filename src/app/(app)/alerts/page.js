'use client';

import { useMemo, useState } from 'react';
import {
  BellRing,
  BellOff,
  Plus,
  PauseCircle,
  History,
  Filter,
  Edit3,
  Copy,
  Trash2,
  Clock,
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';

export default function AlertsPage() {
  // ---- Mock data ----
  const [globalPaused, setGlobalPaused] = useState(false);
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all'); // all | price | percent | rsi | volume | earnings | news | pl | trailing
  const [statusFilter, setStatusFilter] = useState('all'); // all | armed | paused

  const [rules, setRules] = useState([
    {
      id: 1,
      symbol: 'AAPL',
      type: 'price',
      text: 'Crosses above 190.00',
      timeframe: 'intraday',
      channels: ['in-app'],
      status: 'armed',
      last: '—',
      cooldown: '15m',
    },
    {
      id: 2,
      symbol: 'NVDA',
      type: 'percent',
      text: 'Day change ≤ -3%',
      timeframe: 'daily',
      channels: ['in-app', 'email'],
      status: 'armed',
      last: 'Aug 12 • 10:42',
      cooldown: '30m',
    },
    {
      id: 3,
      symbol: 'TSLA',
      type: 'rsi',
      text: 'RSI(14) < 30',
      timeframe: 'intraday',
      channels: ['in-app'],
      status: 'paused',
      last: '—',
      cooldown: '15m',
    },
    {
      id: 4,
      symbol: 'MSFT',
      type: 'earnings',
      text: 'Earnings in 2 days',
      timeframe: 'daily',
      channels: ['in-app', 'push'],
      status: 'armed',
      last: 'Aug 09 • 09:01',
      cooldown: '1d',
    },
  ]);

  const [events] = useState([
    {
      id: 'e5',
      symbol: 'NVDA',
      when: '10:42 AM',
      summary: 'Day change -3.1% (≤ -3%)',
      type: 'percent',
    },
    {
      id: 'e4',
      symbol: 'AMZN',
      when: '10:21 AM',
      summary: 'Volume 1.7× 30-day avg',
      type: 'volume',
    },
    {
      id: 'e3',
      symbol: 'AAPL',
      when: '9:58 AM',
      summary: 'Crossed above 190.00',
      type: 'price',
    },
  ]);

  // ---- Derived ----
  const filtered = useMemo(() => {
    return rules.filter((r) => {
      const matchQ = (r.symbol + r.text)
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchT = typeFilter === 'all' || r.type === typeFilter;
      const matchS = statusFilter === 'all' || r.status === statusFilter;
      return matchQ && matchT && matchS;
    });
  }, [rules, query, typeFilter, statusFilter]);

  const counts = {
    active: rules.filter((r) => r.status === 'armed').length,
    triggeredToday: events.length,
  };

  // ---- Handlers ----
  const toggleRule = (id) =>
    setRules((rs) =>
      rs.map((r) =>
        r.id === id
          ? { ...r, status: r.status === 'armed' ? 'paused' : 'armed' }
          : r
      )
    );

  const duplicateRule = (id) =>
    setRules((rs) => {
      const r = rs.find((x) => x.id === id);
      if (!r) return rs;
      const nextId = Math.max(...rs.map((x) => x.id)) + 1;
      return [...rs, { ...r, id: nextId, last: '—', status: 'armed' }];
    });

  const deleteRule = (id) => setRules((rs) => rs.filter((r) => r.id !== id));
  const pauseAll = () => setGlobalPaused(true);
  const resumeAll = () => setGlobalPaused(false);

  // ---- UI ----
  return (
    <PageLayout
      title="Alerts"
      description="Create rules, manage channels, and review recent triggers."
    >
      {/* Top bar */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
        <div className="flex items-center gap-3 flex-1">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by symbol or text…"
            className="w-full md:w-72 rounded-lg border border-gray-700 bg-gray-900/60 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-lg border border-gray-700 bg-gray-900/60 px-3 py-2 text-sm"
          >
            <option value="all">All types</option>
            <option value="price">Price level</option>
            <option value="percent">% change</option>
            <option value="rsi">RSI</option>
            <option value="volume">Volume spike</option>
            <option value="earnings">Earnings</option>
            <option value="news">News keyword</option>
            <option value="pl">Position P/L</option>
            <option value="trailing">Trailing stop</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-gray-700 bg-gray-900/60 px-3 py-2 text-sm"
          >
            <option value="all">All statuses</option>
            <option value="armed">Armed</option>
            <option value="paused">Paused</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-900/60 px-3 py-2 text-sm hover:bg-gray-700">
            <Plus className="w-4 h-4" /> New alert
          </button>
          {!globalPaused ? (
            <button
              onClick={pauseAll}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-900/60 px-3 py-2 text-sm hover:bg-gray-700"
            >
              <PauseCircle className="w-4 h-4" /> Pause all
            </button>
          ) : (
            <button
              onClick={resumeAll}
              className="inline-flex items-center gap-2 rounded-lg border border-emerald-600 bg-emerald-600/10 px-3 py-2 text-sm hover:bg-emerald-600/20"
            >
              <BellRing className="w-4 h-4" /> Resume all
            </button>
          )}
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <StatCard label="Active rules" value={counts.active} />
        <StatCard label="Triggered today" value={counts.triggeredToday} />
        <StatCard
          label="Paused"
          value={rules.filter((r) => r.status === 'paused').length}
        />
        <StatCard label="Quiet hours" value="Off" />{' '}
        {/* Wire to Settings later */}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Rules table */}
        <section className="lg:col-span-2 bg-gray-800 p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold">Rules</h2>
            <span className="text-xs text-slate-400">
              Cooldown respected • {rules.length} total
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-400 border-b border-gray-700">
                  <th className="py-2">On</th>
                  <th className="py-2">Symbol</th>
                  <th className="py-2">Condition</th>
                  <th className="py-2">Timeframe</th>
                  <th className="py-2">Channels</th>
                  <th className="py-2">Last</th>
                  <th className="py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-b border-gray-700/60">
                    <td className="py-2">
                      <Toggle
                        checked={r.status === 'armed'}
                        onChange={() => toggleRule(r.id)}
                      />
                    </td>
                    <td className="py-2 font-semibold">{r.symbol}</td>
                    <td className="py-2 text-slate-300">{formatRuleText(r)}</td>
                    <td className="py-2">{r.timeframe}</td>
                    <td className="py-2">{r.channels.join(', ')}</td>
                    <td className="py-2">{r.last}</td>
                    <td className="py-2">
                      <div className="flex justify-end gap-2 text-slate-300">
                        <button
                          className="p-1 rounded hover:bg-gray-700"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => duplicateRule(r.id)}
                          className="p-1 rounded hover:bg-gray-700"
                          title="Duplicate"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteRule(r.id)}
                          className="p-1 rounded hover:bg-gray-700 text-red-300"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td
                      className="py-10 text-center text-slate-400"
                      colSpan={7}
                    >
                      No rules match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Quick templates (mock) */}
          <div className="mt-4">
            <p className="text-xs text-slate-400 mb-2">Quick templates</p>
            <div className="flex flex-wrap gap-2">
              {[
                'Price crosses',
                '±% change',
                'RSI threshold',
                'Volume spike',
                'Earnings soon',
              ].map((t, i) => (
                <button
                  key={i}
                  className="text-xs px-2 py-1 rounded-lg border border-gray-700 bg-gray-900/60 hover:bg-gray-700"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Recent triggers feed */}
        <section className="bg-gray-800 p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold">Recent Triggers</h2>
            <button className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded border border-gray-700 hover:bg-gray-700">
              <History className="w-3.5 h-3.5" /> View all
            </button>
          </div>
          <ul className="space-y-2">
            {events.map((ev) => (
              <li
                key={ev.id}
                className="flex items-start justify-between bg-gray-900/40 border border-gray-700 rounded p-2"
              >
                <div>
                  <p className="font-semibold">{ev.symbol}</p>
                  <p className="text-xs text-slate-300">{ev.summary}</p>
                  <p className="text-xs text-slate-500 inline-flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" /> {ev.when}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`/stocks/${ev.symbol}`}
                    className="text-xs px-2 py-1 rounded bg-emerald-600 text-white hover:bg-emerald-500"
                  >
                    Open
                  </a>
                  <button className="text-xs px-2 py-1 rounded border border-gray-700 hover:bg-gray-700">
                    Snooze 1h
                  </button>
                </div>
              </li>
            ))}
            {events.length === 0 && (
              <li className="text-slate-400 text-sm">No triggers yet today.</li>
            )}
          </ul>
        </section>
      </div>
    </PageLayout>
  );
}

/* ---------- BREAK OFF INTO SEPARATE COMPONENTS ---------- */

function StatCard({ label, value }) {
  return (
    <div className="rounded-lg border border-gray-700 bg-gray-800 p-3 text-center">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition ${
        checked ? 'bg-emerald-600' : 'bg-gray-600'
      }`}
      role="switch"
      aria-checked={checked}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
          checked ? 'translate-x-4' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

function formatRuleText(r) {
  const map = {
    price: 'Price',
    percent: '% Change',
    rsi: 'RSI',
    volume: 'Volume',
    earnings: 'Earnings',
    news: 'News',
    pl: 'P/L',
    trailing: 'Trailing stop',
  };
  return `${map[r.type] || 'Rule'} — ${r.text}`;
}
