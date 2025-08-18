import Link from 'next/link';
import SectionCard from '@/components/ui/SectionCard';

export default function AlertsList({ alerts }) {
  return (
    <SectionCard
      title="🔔 Alerts"
      right={
        <Link
          href="/alerts"
          className="text-sm text-emerald-400 hover:underline"
        >
          Manage alerts
        </Link>
      }
    >
      <ul className="space-y-2">
        {alerts.map((a, idx) => (
          <li key={idx} className="flex items-center justify-between">
            <div>
              <span className="font-semibold">{a.symbol}</span>
              <span className="text-slate-300"> — {a.text}</span>
            </div>
            <span
              className={`text-xs px-2 py-0.5 rounded ${
                a.status === 'Triggered'
                  ? 'bg-red-500/20 text-red-300'
                  : 'bg-emerald-500/20 text-emerald-300'
              }`}
            >
              {a.status}
            </span>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
