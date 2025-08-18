import { widthFromPct } from '@/lib/utils/converters/percent';

export default function MarketBreadth({ breadth }) {
  return (
    <>
      <div className="bg-gray-800 p-4 rounded-lg shadow-md md:col-span-2">
        <h3 className="text-lg font-semibold mb-2">🫶 Market Breadth</h3>
        <div className="grid sm:grid-cols-3 gap-3 text-sm">
          <div className="bg-gray-900/40 p-3 rounded">
            <p className="text-slate-400">Advancers</p>
            <p className="text-green-400 text-lg font-semibold">
              {breadth.advancers?.toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-900/40 p-3 rounded">
            <p className="text-slate-400">Decliners</p>
            <p className="text-red-400 text-lg font-semibold">
              {breadth.decliners?.toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-900/40 p-3 rounded">
            <p className="text-slate-400">Unchanged</p>
            <p className="text-slate-300 text-lg font-semibold">
              {breadth.unchanged?.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 mt-3 text-sm">
          <div>
            <p className="text-slate-400">Above 50DMA</p>
            <div className="mt-1 h-2 bg-gray-700 rounded">
              <div
                className="h-2 bg-emerald-500 rounded"
                style={{ width: widthFromPct(breadth.above50dma) }}
              />
            </div>
            <p className="mt-1">{breadth.above50dma}</p>
          </div>
          <div>
            <p className="text-slate-400">Above 200DMA</p>
            <div className="mt-1 h-2 bg-gray-700 rounded">
              <div
                className="h-2 bg-emerald-500 rounded"
                style={{ width: widthFromPct(breadth.above200dma) }}
              />
            </div>
            <p className="mt-1">{breadth.above200dma}</p>
          </div>
          <div>
            <p className="text-slate-400">Up Vol / Down Vol</p>
            <p className="mt-1 text-lg font-semibold text-emerald-400">
              {breadth.upVolVsDownVol}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
