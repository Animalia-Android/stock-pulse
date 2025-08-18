import { deltaClass } from '@/lib/utils/converters/deltaClass';

export default function WatchlistTable({ rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-slate-400 border-b border-gray-700">
            <th className="py-2">Symbol</th>
            <th className="py-2">Name</th>
            <th className="py-2">Price</th>
            <th className="py-2">Change</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((t) => (
            <tr key={t.symbol} className="border-b border-gray-700/60">
              <td className="py-2 font-semibold">{t.symbol}</td>
              <td className="py-2 text-slate-300">{t.name}</td>
              <td className="py-2">${t.price.toFixed(2)}</td>
              <td className={`py-2 ${deltaClass(t.change)}`}>{t.change}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
