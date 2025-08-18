import SectionCard from '@/components/ui/SectionCard';

export default function MoversCard({ movers }) {
  const { gainers = [], losers = [] } = movers || {};
  return (
    <SectionCard title="🚀 Top Movers">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-sm text-slate-400 mb-1">Gainers</p>
          <ul className="space-y-2">
            {gainers.map((m) => (
              <li key={m.symbol} className="flex items-center justify-between">
                <span className="font-semibold">{m.symbol}</span>
                <span className="text-green-400">{m.change}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm text-slate-400 mb-1">Losers</p>
          <ul className="space-y-2">
            {losers.map((m) => (
              <li key={m.symbol} className="flex items-center justify-between">
                <span className="font-semibold">{m.symbol}</span>
                <span className="text-red-400">{m.change}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionCard>
  );
}
