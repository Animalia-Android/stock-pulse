import Link from 'next/link';
import SectionCard from '@/components/ui/SectionCard';

export default function NewsList({ headlines = [] }) {
  if (!headlines.length) return null;
  return (
    <SectionCard
      title="📰 News"
      right={
        <Link href="/news" className="text-sm text-emerald-400 hover:underline">
          See more
        </Link>
      }
    >
      <ul className="space-y-2">
        {headlines.map((h, i) => (
          <li key={i} className="text-slate-300">
            • {h}
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
