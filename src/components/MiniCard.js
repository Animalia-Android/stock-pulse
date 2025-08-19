export default function MiniCard({ s }) {
  const up = String(s.change).trim().startsWith('+');
  const pctOfRange = (() => {
    const low = s.low ?? s.price * 0.97;
    const high = s.high ?? s.price * 1.03;
    const span = Math.max(1e-9, high - low);
    return Math.max(0, Math.min(100, ((s.price - low) / span) * 100));
  })();

  return (
    <div className="rounded-lg border border-gray-700 bg-gray-900/50 p-3">
      <div className="flex items-baseline justify-between">
        <div className="min-w-0">
          <p className="text-sm font-semibold">{s.ticker}</p>
          <p className="text-xs text-slate-400 truncate max-w-[200px]">
            {s.name}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-sm font-semibold">${Number(s.price).toFixed(2)}</p>
          <p className={`text-xs ${up ? 'text-green-400' : 'text-red-400'}`}>
            {s.change}
          </p>
        </div>
      </div>

      <div className="mt-3">
        <div className="h-1.5 bg-gray-700 rounded">
          <div
            className={`h-1.5 rounded ${up ? 'bg-green-500' : 'bg-red-500'}`}
            style={{ width: `${pctOfRange}%` }}
          />
        </div>
      </div>
    </div>
  );
}
