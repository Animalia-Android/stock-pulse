// import PageLayout from '@/components/layout/PageLayout';
// import TopTenStocks from '@/components/stock/TopPerformingStocks';
// import { deltaClass } from '@/lib/utils/converters/deltaClass';

// export default function MarketOverview() {
//   // ---------- Mock data (wire these to APIs later) ----------
//   const globalIndices = [
//     { name: 'S&P 500', symbol: '^GSPC', price: '5,567.4', change: '+0.67%' },
//     { name: 'Nasdaq', symbol: '^IXIC', price: '18,245.1', change: '+0.91%' },
//     { name: 'Dow', symbol: '^DJI', price: '40,112.3', change: '-0.12%' },
//     {
//       name: 'Russell 2000',
//       symbol: '^RUT',
//       price: '2,260.8',
//       change: '+0.35%',
//     },
//     { name: 'FTSE 100', symbol: '^FTSE', price: '8,190.2', change: '+0.21%' },
//     { name: 'DAX', symbol: '^GDAXI', price: '18,240.9', change: '-0.18%' },
//     {
//       name: 'Nikkei 225',
//       symbol: '^N225',
//       price: '41,320.6',
//       change: '+0.44%',
//     },
//     { name: 'Hang Seng', symbol: '^HSI', price: '17,980.3', change: '+0.12%' },
//   ];

//   const sectorPerf = [
//     { sector: 'Tech', change: '+1.2%' },
//     { sector: 'Consumer Disc.', change: '+0.8%' },
//     { sector: 'Health Care', change: '-0.3%' },
//     { sector: 'Financials', change: '+0.4%' },
//     { sector: 'Energy', change: '-0.6%' },
//     { sector: 'Industrials', change: '+0.2%' },
//     { sector: 'Utilities', change: '+0.1%' },
//     { sector: 'Real Estate', change: '-0.4%' },
//     { sector: 'Materials', change: '+0.5%' },
//     { sector: 'Comm. Services', change: '+1.0%' },
//     { sector: 'Staples', change: '-0.2%' },
//   ];

//   const breadth = {
//     advancers: 3472,
//     decliners: 2115,
//     unchanged: 412,
//     above50dma: '62%',
//     above200dma: '54%',
//     upVolVsDownVol: '1.3x',
//     putCall: '0.86',
//   };

//   const volRates = {
//     vix: '13.9',
//     us2y: '4.51%',
//     us10y: '4.18%',
//   };

//   const futures = [
//     { symbol: 'ES', name: 'S&P 500 Futures', change: '+0.3%' },
//     { symbol: 'NQ', name: 'Nasdaq Futures', change: '+0.5%' },
//     { symbol: 'YM', name: 'Dow Futures', change: '-0.1%' },
//   ];

//   const commodities = [
//     { symbol: 'CL', name: 'Crude Oil', change: '+0.7%' },
//     { symbol: 'GC', name: 'Gold', change: '-0.2%' },
//     { symbol: 'SI', name: 'Silver', change: '+0.4%' },
//     { symbol: 'HG', name: 'Copper', change: '+0.9%' },
//   ];

//   const crypto = [
//     { symbol: 'BTC', name: 'Bitcoin', price: '64,250', change: '+1.8%' },
//     { symbol: 'ETH', name: 'Ethereum', price: '3,120', change: '+1.1%' },
//     { symbol: 'SOL', name: 'Solana', price: '148.2', change: '-0.6%' },
//   ];

//   const econCalendar = [
//     {
//       date: 'Aug 15',
//       time: '8:30 AM ET',
//       event: 'Initial Jobless Claims',
//       impact: 'Med',
//     },
//     {
//       date: 'Aug 15',
//       time: '10:00 AM ET',
//       event: 'Existing Home Sales',
//       impact: 'Med',
//     },
//     {
//       date: 'Aug 16',
//       time: '8:30 AM ET',
//       event: 'CPI (EU YoY, flash)',
//       impact: 'High',
//     },
//     {
//       date: 'Aug 20',
//       time: '2:00 PM ET',
//       event: 'FOMC Minutes',
//       impact: 'High',
//     },
//   ];

//   const topGainers = [
//     {
//       ticker: 'AAPL',
//       name: 'Apple Inc.',
//       price: 185.65,
//       change: '+3.21%',
//       color: 'text-green-500',
//     },
//     {
//       ticker: 'TSLA',
//       name: 'Tesla Inc.',
//       price: 230.98,
//       change: '+5.12%',
//       color: 'text-green-500',
//     },
//     {
//       ticker: 'NVDA',
//       name: 'Nvidia Corp.',
//       price: 820.45,
//       change: '+4.87%',
//       color: 'text-green-500',
//     },
//     {
//       ticker: 'AMZN',
//       name: 'Amazon.com Inc.',
//       price: 165.78,
//       change: '+2.94%',
//       color: 'text-green-500',
//     },
//     {
//       ticker: 'GOOGL',
//       name: 'Alphabet Inc.',
//       price: 135.6,
//       change: '+3.88%',
//       color: 'text-green-500',
//     },
//     {
//       ticker: 'MSFT',
//       name: 'Microsoft Corp.',
//       price: 399.8,
//       change: '+2.45%',
//       color: 'text-green-500',
//     },
//     {
//       ticker: 'NFLX',
//       name: 'Netflix Inc.',
//       price: 490.15,
//       change: '+4.32%',
//       color: 'text-green-500',
//     },
//     {
//       ticker: 'META',
//       name: 'Meta Platforms Inc.',
//       price: 320.25,
//       change: '+3.67%',
//       color: 'text-green-500',
//     },
//     {
//       ticker: 'AMD',
//       name: 'Advanced Micro Devices Inc.',
//       price: 112.4,
//       change: '+5.55%',
//       color: 'text-green-500',
//     },
//     {
//       ticker: 'BA',
//       name: 'Boeing Co.',
//       price: 210.5,
//       change: '+2.89%',
//       color: 'text-green-500',
//     },
//   ];

//   const topLosers = [
//     {
//       ticker: 'NFLX',
//       name: 'Netflix Inc.',
//       price: 475.32,
//       change: '-4.15%',
//       color: 'text-red-500',
//     },
//     {
//       ticker: 'DIS',
//       name: 'Walt Disney Co.',
//       price: 89.5,
//       change: '-3.72%',
//       color: 'text-red-500',
//     },
//     {
//       ticker: 'BA',
//       name: 'Boeing Co.',
//       price: 205.1,
//       change: '-2.94%',
//       color: 'text-red-500',
//     },
//     {
//       ticker: 'PYPL',
//       name: 'PayPal Holdings Inc.',
//       price: 58.45,
//       change: '-5.10%',
//       color: 'text-red-500',
//     },
//     {
//       ticker: 'SQ',
//       name: 'Block Inc. (Square)',
//       price: 67.89,
//       change: '-4.63%',
//       color: 'text-red-500',
//     },
//     {
//       ticker: 'INTC',
//       name: 'Intel Corp.',
//       price: 35.28,
//       change: '-2.41%',
//       color: 'text-red-500',
//     },
//     {
//       ticker: 'WBD',
//       name: 'Warner Bros Discovery Inc.',
//       price: 11.2,
//       change: '-6.05%',
//       color: 'text-red-500',
//     },
//     {
//       ticker: 'RIVN',
//       name: 'Rivian Automotive Inc.',
//       price: 15.75,
//       change: '-4.88%',
//       color: 'text-red-500',
//     },
//     {
//       ticker: 'F',
//       name: 'Ford Motor Co.',
//       price: 12.6,
//       change: '-3.11%',
//       color: 'text-red-500',
//     },
//     {
//       ticker: 'COIN',
//       name: 'Coinbase Global Inc.',
//       price: 88.95,
//       change: '-5.89%',
//       color: 'text-red-500',
//     },
//   ];

//   /* ---------- BREAK OFF INTO SEPARATE COMPONENTS ---------- */
//   // ---------- Helpers ----------

//   const widthFromPct = (pctStr) => {
//     const n = parseFloat(pctStr.replace('%', ''));
//     const pct = isNaN(n) ? 0 : Math.max(0, Math.min(100, n));
//     return `${pct}%`;
//   };

//   // ---------- UI ----------
//   return (
//     <PageLayout
//       title="Market Overview"
//       description="Macro view of the markets: breadth, sectors, global indices, and more."
//     >
//       {/* Global Indices */}
//       <h2 className="text-xl font-semibold mb-2">🌍 Global Indices</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//         {globalIndices.map((i) => (
//           <div key={i.symbol} className="bg-gray-800 p-4 rounded-lg shadow-md">
//             <p className="text-sm text-slate-400">{i.name}</p>
//             <div className="mt-1 flex items-baseline justify-between">
//               <span className="text-lg font-semibold">{i.price}</span>
//               <span className={`text-sm font-medium ${deltaClass(i.change)}`}>
//                 {i.change}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Volatility & Rates + Breadth */}
//       <div className="grid md:grid-cols-3 gap-4 mb-6">
//         {/* Vol & Rates */}
//         <div className="bg-gray-800 p-4 rounded-lg shadow-md">
//           <h3 className="text-lg font-semibold mb-2">⚖️ Volatility & Rates</h3>
//           <div className="grid grid-cols-2 gap-3 text-sm">
//             <div>
//               <p className="text-slate-400">VIX</p>
//               <p className="text-xl font-semibold">{volRates.vix}</p>
//             </div>
//             <div>
//               <p className="text-slate-400">Put/Call</p>
//               <p className="text-xl font-semibold">{breadth.putCall}</p>
//             </div>
//             <div>
//               <p className="text-slate-400">US 2Y</p>
//               <p className="text-xl font-semibold">{volRates.us2y}</p>
//             </div>
//             <div>
//               <p className="text-slate-400">US 10Y</p>
//               <p className="text-xl font-semibold">{volRates.us10y}</p>
//             </div>
//           </div>
//         </div>

//         {/* Market Breadth */}
//         <div className="bg-gray-800 p-4 rounded-lg shadow-md md:col-span-2">
//           <h3 className="text-lg font-semibold mb-2">🫶 Market Breadth</h3>
//           <div className="grid sm:grid-cols-3 gap-3 text-sm">
//             <div className="bg-gray-900/40 p-3 rounded">
//               <p className="text-slate-400">Advancers</p>
//               <p className="text-green-400 text-lg font-semibold">
//                 {breadth.advancers.toLocaleString()}
//               </p>
//             </div>
//             <div className="bg-gray-900/40 p-3 rounded">
//               <p className="text-slate-400">Decliners</p>
//               <p className="text-red-400 text-lg font-semibold">
//                 {breadth.decliners.toLocaleString()}
//               </p>
//             </div>
//             <div className="bg-gray-900/40 p-3 rounded">
//               <p className="text-slate-400">Unchanged</p>
//               <p className="text-slate-300 text-lg font-semibold">
//                 {breadth.unchanged.toLocaleString()}
//               </p>
//             </div>
//           </div>

//           <div className="grid sm:grid-cols-3 gap-3 mt-3 text-sm">
//             <div>
//               <p className="text-slate-400">Above 50DMA</p>
//               <div className="mt-1 h-2 bg-gray-700 rounded">
//                 <div
//                   className="h-2 bg-emerald-500 rounded"
//                   style={{ width: widthFromPct(breadth.above50dma) }}
//                 />
//               </div>
//               <p className="mt-1">{breadth.above50dma}</p>
//             </div>
//             <div>
//               <p className="text-slate-400">Above 200DMA</p>
//               <div className="mt-1 h-2 bg-gray-700 rounded">
//                 <div
//                   className="h-2 bg-emerald-500 rounded"
//                   style={{ width: widthFromPct(breadth.above200dma) }}
//                 />
//               </div>
//               <p className="mt-1">{breadth.above200dma}</p>
//             </div>
//             <div>
//               <p className="text-slate-400">Up Vol / Down Vol</p>
//               <p className="mt-1 text-lg font-semibold text-emerald-400">
//                 {breadth.upVolVsDownVol}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Sector Performance */}
//       <h2 className="text-xl font-semibold mb-2">🧩 Sector Performance</h2>
//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
//         {sectorPerf.map((s) => (
//           <div key={s.sector} className="bg-gray-800 p-4 rounded-lg shadow-md">
//             <div className="flex items-center justify-between">
//               <p className="font-medium">{s.sector}</p>
//               <span className={`text-sm ${deltaClass(s.change)}`}>
//                 {s.change}
//               </span>
//             </div>
//             <div className="mt-2 h-2 bg-gray-700 rounded">
//               <div
//                 className={`h-2 rounded ${
//                   s.change.startsWith('+') ? 'bg-green-500' : 'bg-red-500'
//                 }`}
//                 style={{
//                   width: widthFromPct(
//                     s.change.replace('+', '').replace('-', '')
//                   ),
//                 }}
//               />
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Futures / Commodities / Crypto / Calendar */}
//       <div className="grid lg:grid-cols-4 gap-4 mb-6">
//         {/* Futures */}
//         <div className="bg-gray-800 p-4 rounded-lg shadow-md">
//           <h3 className="text-lg font-semibold mb-2">🧾 Equity Futures</h3>
//           <ul className="space-y-2 text-sm">
//             {futures.map((f) => (
//               <li key={f.symbol} className="flex items-center justify-between">
//                 <span className="font-semibold">{f.symbol}</span>
//                 <span className={deltaClass(f.change)}>{f.change}</span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Commodities */}
//         <div className="bg-gray-800 p-4 rounded-lg shadow-md">
//           <h3 className="text-lg font-semibold mb-2">⛽ Commodities</h3>
//           <ul className="space-y-2 text-sm">
//             {commodities.map((c) => (
//               <li key={c.symbol} className="flex items-center justify-between">
//                 <span className="font-semibold">{c.symbol}</span>
//                 <span className={deltaClass(c.change)}>{c.change}</span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Crypto */}
//         <div className="bg-gray-800 p-4 rounded-lg shadow-md">
//           <h3 className="text-lg font-semibold mb-2">₿ Crypto Snapshot</h3>
//           <ul className="space-y-2 text-sm">
//             {crypto.map((c) => (
//               <li key={c.symbol} className="flex items-center justify-between">
//                 <div>
//                   <span className="font-semibold">{c.symbol}</span>
//                   <span className="text-slate-400"> — {c.name}</span>
//                 </div>
//                 <div className="text-right">
//                   <p>${c.price}</p>
//                   <p className={`text-xs ${deltaClass(c.change)}`}>
//                     {c.change}
//                   </p>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Economic Calendar */}
//         <div className="bg-gray-800 p-4 rounded-lg shadow-md">
//           <h3 className="text-lg font-semibold mb-2">📅 Economic Calendar</h3>
//           <ul className="space-y-2 text-sm">
//             {econCalendar.map((e, idx) => (
//               <li key={idx} className="flex items-center justify-between">
//                 <div>
//                   <p className="font-medium">{e.event}</p>
//                   <p className="text-slate-400">
//                     {e.date} • {e.time}
//                   </p>
//                 </div>
//                 <span
//                   className={`text-xs px-2 py-0.5 rounded ${
//                     e.impact === 'High'
//                       ? 'bg-red-500/20 text-red-300'
//                       : 'bg-emerald-500/20 text-emerald-300'
//                   }`}
//                 >
//                   {e.impact}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* Heatmap (placeholder) + Gainers/Losers */}
//       <div className="grid lg:grid-cols-3 gap-4">
//         {/* Heatmap placeholder */}
//         <div className="lg:col-span-1 bg-gray-800 p-4 rounded-lg shadow-md">
//           <h3 className="text-lg font-semibold mb-3">
//             🧱 S&P 100 Heatmap (placeholder)
//           </h3>
//           <div className="grid grid-cols-6 gap-1">
//             {Array.from({ length: 36 }).map((_, i) => {
//               const up = i % 3 !== 0; // random-ish
//               return (
//                 <div
//                   key={i}
//                   className={`h-10 rounded ${
//                     up ? 'bg-green-600/70' : 'bg-red-600/70'
//                   }`}
//                   title={up ? 'Up' : 'Down'}
//                 />
//               );
//             })}
//           </div>
//         </div>

//         {/* Top 10 lists */}
//         <div className="lg:col-span-2">
//           <div className="flex flex-col lg:flex-row gap-4">
//             <TopTenStocks stocks={topGainers} category={'Gainers'} />
//             <TopTenStocks stocks={topLosers} category={'Losers'} />
//           </div>
//         </div>
//       </div>
//     </PageLayout>
//   );
// }

import PageLayout from '@/components/layout/PageLayout';
import MarketClient from './MarketClient';
import { SAMPLE_MARKET_OVERVIEW } from '@/lib/market/fixtures/marketOverview';

export default function Page() {
  // Later: fetch live data here (server) and pass to the client.
  const data = SAMPLE_MARKET_OVERVIEW;

  return (
    <PageLayout
      title="Market Overview"
      description="Macro view of the markets: breadth, sectors, global indices, and more."
    >
      <MarketClient initial={data} />
    </PageLayout>
  );
}
