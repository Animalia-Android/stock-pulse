import { deltaClass } from '@/lib/utils/converters/deltaClass';

export default function QuotesTable({ rows = [] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-slate-400 border-b border-gray-700">
            <th className="py-2">Symbol</th>
            <th className="py-2">Name</th>
            <th className="py-2">Price</th>
            <th className="py-2">Δ</th>
            <th className="py-2">%Δ</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.symbol} className="border-b border-gray-700/60">
              <td className="py-2 font-semibold">{r.symbol}</td>
              <td className="py-2 text-slate-300">{r.name}</td>
              <td className="py-2">${Number(r.price).toFixed(2)}</td>
              <td className={`py-2 ${deltaClass(r.changeStr ?? r.change)}`}>
                {r.changeStr ?? r.change}
              </td>
              <td className={`py-2 ${deltaClass(r.percentStr ?? r.percent)}`}>
                {r.percentStr ?? r.percent}
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td className="py-8 text-center text-slate-400" colSpan={5}>
                No symbols match your filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
