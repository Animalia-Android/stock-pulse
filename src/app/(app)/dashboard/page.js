import PageLayout from '@/components/layout/PageLayout';
import DashboardClient from './DashboardClient';

function getInitialData() {
  // ---- Mock data (server-side; swap with real API later) ----
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

  return {
    marketSummary,
    indices,
    watchlist,
    movers,
    upcomingEarnings,
    alerts,
    news,
  };
}

export default function Page() {
  const data = getInitialData();

  return (
    <PageLayout
      title="Dashboard"
      description="View your stock portfolio and latest market trends here."
    >
      <DashboardClient {...data} />
    </PageLayout>
  );
}
