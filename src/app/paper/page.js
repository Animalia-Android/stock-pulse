// app/paper/page.jsx
'use client';
import { useEffect, useState } from 'react';
import { getState, placeOrder, resetAccount, computeView } from './paperStore';
import OrderTicket from './ticket';

export default function Paper() {
  const [state, setState] = useState(getState());

  // app/paper/page.jsx (add near the poll)
  useEffect(() => {
    const id = setInterval(() => {
      // naive: try filling any WORKING orders against updated quotes
      const s = getState();
      s.orders
        .filter((o) => o.status === 'WORKING')
        .forEach((o) => {
          // Re-try with fresh quotes
          const { placeOrder } = require('./paperStore'); // or export a tryFillAll()
        });
    }, 1500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setState(getState()), 1000); // poll store
    return () => clearInterval(id);
  }, []);
  const view = computeView(state);

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
        <Card label="Equity" value={fmtUSD(view.equity)} />
        <Card label="Cash" value={fmtUSD(view.cash)} />
        <Card
          label="Today P/L"
          value={
            <span
              className={view.dayPL >= 0 ? 'text-green-400' : 'text-red-400'}
            >
              {view.dayPL >= 0 ? '+' : ''}
              {fmtUSD(view.dayPL)}
            </span>
          }
        />
      </div>

      {/* Ticket + Reset */}
      <div className="flex items-center justify-between mb-3">
        <OrderTicket
          onSubmit={(o) => {
            placeOrder(o);
            setState(getState());
          }}
        />
        <button
          onClick={() => {
            if (confirm('Reset virtual account?')) {
              resetAccount();
              setState(getState());
            }
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
              {view.positions.map((p) => (
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
              {view.positions.length === 0 && (
                <tr>
                  <td className="py-6 text-slate-400" colSpan={6}>
                    No positions yet.
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
              {state.orders
                .slice()
                .reverse()
                .map((o) => (
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
              {state.orders.length === 0 && (
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

function Card({ label, value }) {
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
