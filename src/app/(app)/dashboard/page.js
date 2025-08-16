import StockPage from '../stocks/[symbol]/page';

export default function Dashboard() {
  // ---- Mock data (swap with API later) ----
  const marketSummary = {
    totalPortfolioValue: '$52,340.75',
    dailyChange: '+3.45%',
    gainers: 8,
    losers: 2,
  };

  const indices = [
    { name: 'S&P 500', symbol: '^GSPC', price: '5,567.42', change: '+0.67%' },
    { name: 'Nasdaq', symbol: '^IXIC', price: '18,245.10', change: '+0.91%' },
    { name: 'Dow', symbol: '^DJI', price: '40,112.33', change: '-0.12%' },
  ];

  const watchlist = [
    { symbol: 'AAPL', name: 'Apple', price: 224.31, change: '+1.12%' },
    { symbol: 'NVDA', name: 'NVIDIA', price: 128.77, change: '-0.84%' },
    { symbol: 'MSFT', name: 'Microsoft', price: 458.09, change: '+0.37%' },
    { symbol: 'TSLA', name: 'Tesla', price: 244.62, change: '+2.45%' },
  ];

  const movers = {
    gainers: [
      { symbol: 'PLTR', change: '+5.9%' },
      { symbol: 'COIN', change: '+4.1%' },
      { symbol: 'AMD', change: '+3.6%' },
    ],
    losers: [
      { symbol: 'SNOW', change: '-3.2%' },
      { symbol: 'RBLX', change: '-2.7%' },
      { symbol: 'DIS', change: '-1.8%' },
    ],
  };

  const upcomingEarnings = [
    { symbol: 'AAPL', date: 'Aug 22', session: 'AMC' },
    { symbol: 'NVDA', date: 'Aug 27', session: 'AMC' },
    { symbol: 'TSLA', date: 'Sep 03', session: 'AMC' },
  ];

  const alerts = [
    { symbol: 'NVDA', text: 'Crosses above 130.00', status: 'Armed' },
    { symbol: 'AAPL', text: 'Daily change > +2%', status: 'Triggered' },
    { symbol: 'MSFT', text: 'RSI < 30', status: 'Armed' },
  ];

  const news = [
    'Fed speakers hint at data-dependent path into Q4',
    'Chipmakers rally on strong datacenter demand',
    'Oil edges higher as inventories tighten',
  ];

  const deltaClass = (val) =>
    val?.toString().trim().startsWith('+')
      ? 'text-green-400'
      : val?.toString().trim().startsWith('-')
      ? 'text-red-400'
      : 'text-slate-300';

  // ---- UI ----
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mb-4 text-slate-300">
        View your stock portfolio and latest market trends here.
      </p>

      {/* Portfolio Summary */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold">📊 Portfolio Overview</h2>
        <p className="text-3xl font-bold text-green-400">
          {marketSummary.totalPortfolioValue}
        </p>
        <p className={`text-lg ${deltaClass(marketSummary.dailyChange)}`}>
          {marketSummary.dailyChange} Today
        </p>
      </div>

      {/* Key Indices */}
      <h2 className="text-xl font-semibold mb-2">🧭 Key Indices</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {indices.map((i) => (
          <div key={i.symbol} className="bg-gray-800 p-4 rounded-lg shadow-md">
            <div className="flex items-baseline justify-between">
              <div>
                <p className="text-sm text-slate-400">{i.name}</p>
                <p className="text-lg font-semibold">{i.price}</p>
              </div>
              <span className={`text-sm font-medium ${deltaClass(i.change)}`}>
                {i.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Market Snapshot */}
      <h2 className="text-xl font-semibold mb-2">📈 Market Snapshot</h2>
      <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6">
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <p className="text-green-400">
              Top Gainers: {marketSummary.gainers}
            </p>
            <p className="text-red-400">Top Losers: {marketSummary.losers}</p>
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
      </div>

      {/* Watchlist + Movers */}
      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        {/* Watchlist Preview */}
        <div className="lg:col-span-2 bg-gray-800 p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold">👀 Watchlist (Preview)</h2>
            <a
              href="/watchlist"
              className="text-sm text-emerald-400 hover:underline"
            >
              View all
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-400 border-b border-gray-700">
                  <th className="py-2">Symbol</th>
                  <th className="py-2">Name</th>
                  <th className="py-2">Price</th>
                  <th className="py-2">Change</th>
                </tr>
              </thead>
              <tbody>
                {watchlist.map((t) => (
                  <tr key={t.symbol} className="border-b border-gray-700/60">
                    <td className="py-2 font-semibold">{t.symbol}</td>
                    <td className="py-2 text-slate-300">{t.name}</td>
                    <td className="py-2">${t.price.toFixed(2)}</td>
                    <td className={`py-2 ${deltaClass(t.change)}`}>
                      {t.change}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Movers */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">🚀 Top Movers</h2>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-sm text-slate-400 mb-1">Gainers</p>
              <ul className="space-y-2">
                {movers.gainers.map((m) => (
                  <li
                    key={m.symbol}
                    className="flex items-center justify-between"
                  >
                    <span className="font-semibold">{m.symbol}</span>
                    <span className="text-green-400">{m.change}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm text-slate-400 mb-1">Losers</p>
              <ul className="space-y-2">
                {movers.losers.map((m) => (
                  <li
                    key={m.symbol}
                    className="flex items-center justify-between"
                  >
                    <span className="font-semibold">{m.symbol}</span>
                    <span className="text-red-400">{m.change}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Earnings + Alerts + News */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {/* Upcoming Earnings */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">📅 Upcoming Earnings</h2>
          <ul className="space-y-2">
            {upcomingEarnings.map((e) => (
              <li key={e.symbol} className="flex items-center justify-between">
                <span className="font-semibold">{e.symbol}</span>
                <span className="text-slate-300">
                  {e.date} {e.session}
                </span>
              </li>
            ))}
          </ul>
        </div>
        {/* Alerts Feed */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">🔔 Alerts</h2>
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
          <div className="mt-3">
            <a
              href="/alerts"
              className="text-sm text-emerald-400 hover:underline"
            >
              Manage alerts
            </a>
          </div>
        </div>
        {/* News */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">📰 News</h2>
          <ul className="space-y-2">
            {news.map((h, i) => (
              <li key={i} className="text-slate-300">
                • {h}
              </li>
            ))}
          </ul>
          <div className="mt-3">
            <a
              href="/news"
              className="text-sm text-emerald-400 hover:underline"
            >
              See more
            </a>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* Performance snapshot */}
          <a
            href="/portfolio/performance"
            className="block bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">Portfolio Performance</p>
              <span className="text-xs px-2 py-0.5 rounded bg-gray-700 text-slate-200">
                YTD
              </span>
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <p className="text-2xl font-bold text-green-400">+7.4%</p>
              <p className="text-slate-400 text-sm">vs S&P: +6.1%</p>
            </div>
            {/* tiny sparkline placeholder */}
            <div className="mt-3 h-2 rounded bg-gray-700">
              <div
                className="h-2 bg-emerald-500 rounded"
                style={{ width: '68%' }}
              />
            </div>
          </a>

          {/* Saved screeners */}
          <a
            href="/screener"
            className="block bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">Saved Screeners</p>
              <span className="text-xs px-2 py-0.5 rounded bg-gray-700 text-slate-200">
                3
              </span>
            </div>
            <ul className="mt-2 text-sm text-slate-300 space-y-1">
              {/* <li>• Tech, RSI < 30, Cap > $10B</li>
         <li>• 52-Week Breakouts, Vol > 1.5×</li>
         <li>• Value Picks: P/E < 15, Div > 2%</li> */}
            </ul>
          </a>
        </div>
      </div>

      {/* Existing deep-dive component */}
      <StockPage />
    </div>
  );
}
