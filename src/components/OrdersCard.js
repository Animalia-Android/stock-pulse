import React from 'react';

export default function OrdersCard({ orders, isLoading }) {
  return (
    <>
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
                    {o.avgFillPrice ? formatUSD(o.avgFillPrice) : '—'}
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
    </>
  );
}
