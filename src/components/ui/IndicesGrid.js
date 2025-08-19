import Card from '@/components/ui/Card';
import { deltaClass } from '@/lib/utils/converters/deltaClass';

export default function IndicesGrid({ type = '🧭 Key Indices', indices }) {
  const lgCols =
    (indices.length ?? 0) % 2 === 0 ? 'lg:grid-cols-4' : 'lg:grid-cols-3';

  return (
    <>
      <h2 className="text-xl font-semibold mb-2">{type}</h2>
      <div className={`grid grid-cols-1 sm:grid-cols-2 ${lgCols} gap-4 mb-6`}>
        {indices.map((i) => (
          <Card key={i.symbol}>
            <div className="flex items-baseline justify-between">
              <div>
                <p className="text-sm text-slate-400">{i.name}</p>
                <p className="text-lg font-semibold">{i.price}</p>
              </div>
              <span className={`text-sm font-medium ${deltaClass(i.change)}`}>
                {i.change}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
