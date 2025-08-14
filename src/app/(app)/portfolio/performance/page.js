import React from 'react';

const periods = [
  { label: 'D', you: 0.6, spy: 0.4 },
  { label: 'W', you: 1.2, spy: 0.9 },
  { label: 'M', you: 3.1, spy: 2.4 },
  { label: 'YTD', you: 7.4, spy: 6.1 },
];
const delta = (n) => (n >= 0 ? 'text-green-400' : 'text-red-400');

export default function page() {
  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <div className="bg-gray-800 p-4 rounded-lg shadow-md lg:col-span-2">
        <h2 className="text-xl font-semibold mb-2">Equity Curve (mock)</h2>
        <div className="h-56 rounded bg-gray-900/40 grid place-items-center text-slate-500">
          Chart Placeholder
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Period Returns</h2>
        <ul className="text-sm space-y-1">
          {periods.map((p) => (
            <li key={p.label} className="flex justify-between">
              <span className="text-slate-300">{p.label}</span>
              <span className="text-slate-400">
                You:{' '}
                <b className={delta(p.you)}>
                  {p.you > 0 ? '+' : ''}
                  {p.you}%
                </b>{' '}
                • S&P:{' '}
                <b className={delta(p.spy)}>
                  {p.spy > 0 ? '+' : ''}
                  {p.spy}%
                </b>
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-3 text-sm">
          Max drawdown: <b className="text-red-400">-5.8%</b>
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Attribution (By Symbol)</h3>
        <ul className="text-sm space-y-1">
          <li className="flex justify-between">
            <span className="font-semibold">AMZN</span>
            <span className="text-green-400">+4.2%</span>
          </li>
          <li className="flex justify-between">
            <span className="font-semibold">MSFT</span>
            <span className="text-green-400">+2.7%</span>
          </li>
          <li className="flex justify-between">
            <span className="font-semibold">TSLA</span>
            <span className="text-red-400">-1.8%</span>
          </li>
        </ul>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Hit Rate</h3>
        <p className="text-3xl font-bold text-emerald-400">61%</p>
        <p className="text-slate-400 text-sm">Winning trades / total trades</p>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Risk (volatility)</h3>
        <p className="text-3xl font-bold text-slate-200">11.3%</p>
        <p className="text-slate-400 text-sm">30-day annualized (mock)</p>
      </div>
    </div>
  );
}
