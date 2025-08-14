// app/paper/ticket.jsx
'use client';
import { useState } from 'react';

export default function OrderTicket({ symbol: initial = 'AAPL', onSubmit }) {
  const [symbol, setSymbol] = useState(initial);
  const [side, setSide] = useState('BUY'); // BUY | SELL
  const [qty, setQty] = useState(1);
  const [type, setType] = useState('MARKET'); // MARKET | LIMIT
  const [limitPrice, setLimitPrice] = useState('');

  return (
    <div className="bg-gray-800 p-3 rounded-lg border border-gray-700 w-full max-w-md">
      <div className="flex items-center gap-2 mb-2">
        <input
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          className="flex-1 rounded border border-gray-700 bg-gray-900/60 px-3 py-2 text-sm"
          placeholder="Symbol"
        />
        <select
          value={side}
          onChange={(e) => setSide(e.target.value)}
          className="rounded border border-gray-700 bg-gray-900/60 px-3 py-2 text-sm"
        >
          <option>BUY</option>
          <option>SELL</option>
        </select>
        <input
          type="number"
          min="0"
          step="0.0001"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          className="w-28 rounded border border-gray-700 bg-gray-900/60 px-3 py-2 text-sm"
          placeholder="Qty"
        />
      </div>

      <div className="flex items-center gap-2 mb-3">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded border border-gray-700 bg-gray-900/60 px-3 py-2 text-sm"
        >
          <option>MARKET</option>
          <option>LIMIT</option>
        </select>
        <input
          type="number"
          step="0.01"
          value={limitPrice}
          onChange={(e) => setLimitPrice(e.target.value)}
          disabled={type !== 'LIMIT'}
          className="flex-1 rounded border border-gray-700 bg-gray-900/60 px-3 py-2 text-sm disabled:opacity-50"
          placeholder="Limit price"
        />
        <button
          onClick={() =>
            onSubmit({
              symbol,
              side,
              qty: Number(qty),
              type,
              limitPrice: type === 'LIMIT' ? Number(limitPrice) : undefined,
            })
          }
          className="px-3 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-sm"
        >
          Place
        </button>
      </div>

      <p className="text-[11px] text-slate-400">
        Simulated fills. No real orders are sent.
      </p>
    </div>
  );
}
