export default function VolatilityRatesCard({ volRates, breadth }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">⚖️ Volatility & Rates</h3>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-slate-400">VIX</p>
          <p className="text-xl font-semibold">{volRates.vix}</p>
        </div>
        <div>
          <p className="text-slate-400">Put/Call</p>
          <p className="text-xl font-semibold">{breadth.putCall}</p>
        </div>
        <div>
          <p className="text-slate-400">US 2Y</p>
          <p className="text-xl font-semibold">{volRates.us2y}</p>
        </div>
        <div>
          <p className="text-slate-400">US 10Y</p>
          <p className="text-xl font-semibold">{volRates.us10y}</p>
        </div>
      </div>
    </div>
  );
}
