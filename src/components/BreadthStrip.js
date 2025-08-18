import Card from '@/components/ui/Card';

export default function BreadthStrip({ breadth }) {
  const { advancers = 0, decliners = 0, unchanged = 0 } = breadth || {};
  const total = Math.max(advancers + decliners + unchanged, 1);
  const aPct = Math.round((advancers / total) * 100);
  const dPct = Math.round((decliners / total) * 100);
  const uPct = 100 - aPct - dPct;

  return (
    <Card className="mb-6">
      <h2 className="text-xl font-semibold mb-2">🟩 Market Breadth</h2>
      <div className="h-3 w-full rounded bg-gray-700 overflow-hidden">
        <div
          className="h-3 bg-green-500 inline-block"
          style={{ width: `${aPct}%` }}
        />
        <div
          className="h-3 bg-gray-500 inline-block"
          style={{ width: `${uPct}%` }}
        />
        <div
          className="h-3 bg-red-500 inline-block"
          style={{ width: `${dPct}%` }}
        />
      </div>
      <div className="mt-2 text-sm text-slate-300 flex gap-4">
        <span>
          Advancers: <strong className="text-green-400">{advancers}</strong>
        </span>
        <span>
          Unchanged: <strong className="text-slate-200">{unchanged}</strong>
        </span>
        <span>
          Decliners: <strong className="text-red-400">{decliners}</strong>
        </span>
      </div>
    </Card>
  );
}
