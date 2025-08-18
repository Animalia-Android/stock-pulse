import Card from '@/components/ui/Card';

export default function MarketSnapshot({ gainers, losers }) {
  return (
    <>
      <h2 className="text-xl font-semibold mb-2">📈 Market Snapshot</h2>
      <Card className="mb-6">
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <p className="text-green-400">Top Gainers: {gainers}</p>
            <p className="text-red-400">Top Losers: {losers}</p>
          </div>
          <div>
            <p className="text-slate-300">52W Highs: 218</p>
            <p className="text-slate-300">52W Lows: 47</p>
          </div>
          <div>
            <p className="text-slate-300">
              Sentiment: <span className="text-green-400">Bullish</span>
            </p>
            <p className="text-slate-300">
              Volume vs Avg: <span className="text-emerald-400">+8%</span>
            </p>
          </div>
        </div>
      </Card>
    </>
  );
}
