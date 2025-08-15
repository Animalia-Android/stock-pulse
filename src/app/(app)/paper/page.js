'use client';

import { useEffect, useMemo } from 'react';
import { usePaperStore } from '@/stores/paperStore';
import OrderTicket from '@/components/paper/orderTicket';
import { useBatchQuotes } from '@/lib/market/queries';

export default function Paper() {
  // read store
  const lots = usePaperStore((s) => s.lots);
  const orders = usePaperStore((s) => s.orders);
  const reset = usePaperStore((s) => s.reset);
  const view = usePaperStore((s) => s.view);
  const reevaluateOrders = usePaperStore((s) => s.reevaluateOrders);

  // which symbols to fetch quotes for (open positions + a default)
  const symbols = useMemo(() => {
    const set = new Set(lots.map((l) => l.symbol));
    if (set.size === 0) set.add('AAPL');
    return Array.from(set);
  }, [lots]);

  const { data, isLoading } = useBatchQuotes(symbols);
  const quotesMap = data?.map || {};

  // Re-check any WORKING orders whenever quotes refresh
  useEffect(() => {
    if (data) reevaluateOrders(quotesMap);
  }, [data, quotesMap, reevaluateOrders]);

  const { cash, equity, positions } = view(quotesMap);

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-2">
        <h1 className="text-2xl font-bold">Paper Trading</h1>
        <span className="text-xs px-2 py-0.5 rounded bg-emerald-600/20 text-emerald-300">
          Virtual
        </span>
      </div>
      <p className="mb-4 text-slate-300">
        Practice with simulated cash. Results are hypothetical.
      </p>

      {/* Top cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <Stat label="Equity" value={fmtUSD(equity)} />
        <Stat label="Cash" value={fmtUSD(cash)} />
        <Stat
          label="Today P/L"
          value={
            <span className={0 >= 0 ? 'text-green-400' : 'text-red-400'}>
              +{fmtUSD(0)}
            </span>
          }
        />
      </div>

      {/* Ticket + Reset */}
      <div className="flex items-center justify-between mb-3">
        <OrderTicket initialSymbol="AAPL" />
        <button
          onClick={() => {
            if (confirm('Reset virtual account?')) reset();
          }}
          className="text-sm px-3 py-2 rounded border border-gray-700 hover:bg-gray-700"
        >
          Reset
        </button>
      </div>

      {/* Positions */}
      <section className="bg-gray-800 p-4 rounded-lg shadow-md mb-4">
        <h2 className="text-xl font-semibold mb-2">Positions</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-400 border-b border-gray-700">
                <th className="py-2">Symbol</th>
                <th>Qty</th>
                <th className="text-right">Avg Cost</th>
                <th className="text-right">Price</th>
                <th className="text-right">Value</th>
                <th className="text-right">Unreal. P/L</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((p) => (
                <tr key={p.symbol} className="border-b border-gray-700/60">
                  <td className="py-2 font-semibold">{p.symbol}</td>
                  <td>{p.qty.toFixed(4)}</td>
                  <td className="text-right">{fmtUSD(p.avgCost)}</td>
                  <td className="text-right">{fmtUSD(p.price)}</td>
                  <td className="text-right">{fmtUSD(p.value)}</td>
                  <td
                    className={`text-right ${
                      p.upl >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {p.upl >= 0 ? '+' : ''}
                    {fmtUSD(p.upl)}
                  </td>
                </tr>
              ))}
              {!positions.length && (
                <tr>
                  <td className="py-6 text-slate-400" colSpan={6}>
                    {isLoading
                      ? 'Loading quotes…'
                      : 'No positions yet. Place a trade above.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Orders */}
      <section className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-400 border-b border-gray-700">
                <th className="py-2">Time</th>
                <th>Symbol</th>
                <th>Side</th>
                <th>Type</th>
                <th className="text-right">Qty</th>
                <th className="text-right">Limit</th>
                <th>Status</th>
                <th className="text-right">Filled @</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-gray-700/60">
                  <td className="py-2">
                    {new Date(o.createdAt).toLocaleTimeString()}
                  </td>
                  <td>{o.symbol}</td>
                  <td>{o.side}</td>
                  <td>{o.type}</td>
                  <td className="text-right">{o.qty}</td>
                  <td className="text-right">{o.limitPrice ?? '—'}</td>
                  <td>{o.status}</td>
                  <td className="text-right">
                    {o.avgFillPrice ? fmtUSD(o.avgFillPrice) : '—'}
                  </td>
                </tr>
              ))}
              {!orders.length && (
                <tr>
                  <td className="py-6 text-slate-400" colSpan={8}>
                    No orders yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

/* ---------- BREAK OFF INTO SEPARATE COMPONENTS ---------- */

function Stat({ label, value }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

const fmtUSD = (n) =>
  `$${(n ?? 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
