import SectionCard from '@/components/ui/SectionCard';

export default function EarningsList({ upcoming }) {
  return (
    <SectionCard title="📅 Upcoming Earnings">
      <ul className="space-y-2">
        {upcoming.map((e) => (
          <li key={e.symbol} className="flex items-center justify-between">
            <span className="font-semibold">{e.symbol}</span>
            <span className="text-slate-300">
              {e.date} {e.session}
            </span>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
