import { deltaClass } from '@/lib/utils/converters/deltaClass';

export default function SnapshotCard({ title, data = [] }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <ul className="space-y-2 text-sm">
        {data.map((d) => (
          <li key={d.symbol} className="flex items-center justify-between">
            <span className="font-semibold">{d.symbol}</span>
            <span className={deltaClass(d.change)}>{d.change}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
