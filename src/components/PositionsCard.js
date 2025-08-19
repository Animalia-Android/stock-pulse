export default function PositionsCard({ positions, isLoading }) {
  return (
    <>
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
                  <td className="text-right">{formatUSD(p.avgCost)}</td>
                  <td className="text-right">{formatUSD(p.price)}</td>
                  <td className="text-right">{formatUSD(p.value)}</td>
                  <td
                    className={`text-right ${
                      p.upl >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {p.upl >= 0 ? '+' : ''}
                    {formatUSD(p.upl)}
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
    </>
  );
}
