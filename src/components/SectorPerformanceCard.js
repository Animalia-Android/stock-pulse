import { deltaClass } from '@/lib/utils/converters/deltaClass';
import { widthFromPct } from '@/lib/utils/converters/percent';

export default function SectorPerformanceCard({ sectorPerf = [] }) {
  return (
    <div className="bg-gray-800/30 backdrop-blur-lg p-4 rounded-lg shadow-md h-full w-full min-w-0">
      <h2 className=" text-xl font-semibold mb-2">🧩 Sector Performance</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
        {sectorPerf.map((s) => (
          <div key={s.sector} className="bg-gray-800 p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <p className="font-medium">{s.sector}</p>
              <span className={`text-sm ${deltaClass(s.change)}`}>
                {s.change}
              </span>
            </div>
            <div className="mt-2 h-2 bg-gray-700 rounded">
              <div
                className={`h-2 rounded ${
                  s.change.startsWith('+') ? 'bg-green-500' : 'bg-red-500'
                }`}
                style={{
                  width: widthFromPct(
                    s.change.replace('+', '').replace('-', '')
                  ),
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
