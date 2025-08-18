export default function HeatMap() {
  return (
    <div className="lg:col-span-12">
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-3">
          🧱 S&P 100 Heatmap (placeholder)
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-1">
          {Array.from({ length: 36 }).map((_, i) => {
            const up = i % 3 !== 0;
            return (
              <div
                key={i}
                className={`h-10 rounded ${
                  up ? 'bg-green-600/70' : 'bg-red-600/70'
                }`}
                title={up ? 'Up' : 'Down'}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
