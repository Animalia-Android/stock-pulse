'use client';

import { useMemo, useState } from 'react';
import {
  BellRing,
  Plus,
  PauseCircle,
  History,
  Clock,
  Edit3,
  Copy,
  Trash2,
} from 'lucide-react';

import { StatCard } from '@/components/ui/StatCard';
import { Toggle } from '@/components/controls/Toggle';
import { formatRuleText } from '@/lib/utils/converters/formatRuleText';

export default function AlertsClient({ initialRules, initialEvents }) {
  // ---- State (client) ----
  const [globalPaused, setGlobalPaused] = useState(false);
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all'); // all | price | percent | rsi | volume | earnings | news | pl | trailing
  const [statusFilter, setStatusFilter] = useState('all'); // all | armed | paused

  const [rules, setRules] = useState(initialRules ?? []);
  const [events] = useState(initialEvents ?? []);

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

  // ---- UI (unchanged visuals) ----
  return (
    <>
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
        <StatCard label="Quiet hours" value="Off" />
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
    </>
  );
}
