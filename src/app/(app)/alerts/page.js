// app/alerts/page.js
import PageLayout from '@/components/layout/PageLayout';
import AlertsClient from './AlertsClient';

// (Server) seed initial data — same as your current mock data
function getInitialData() {
  const rules = [
    {
      id: 1,
      symbol: 'AAPL',
      type: 'price',
      text: 'Crosses above 190.00',
      timeframe: 'intraday',
      channels: ['in-app'],
      status: 'armed',
      last: '—',
      cooldown: '15m',
    },
    {
      id: 2,
      symbol: 'NVDA',
      type: 'percent',
      text: 'Day change ≤ -3%',
      timeframe: 'daily',
      channels: ['in-app', 'email'],
      status: 'armed',
      last: 'Aug 12 • 10:42',
      cooldown: '30m',
    },
    {
      id: 3,
      symbol: 'TSLA',
      type: 'rsi',
      text: 'RSI(14) < 30',
      timeframe: 'intraday',
      channels: ['in-app'],
      status: 'paused',
      last: '—',
      cooldown: '15m',
    },
    {
      id: 4,
      symbol: 'MSFT',
      type: 'earnings',
      text: 'Earnings in 2 days',
      timeframe: 'daily',
      channels: ['in-app', 'push'],
      status: 'armed',
      last: 'Aug 09 • 09:01',
      cooldown: '1d',
    },
  ];

  const events = [
    {
      id: 'e5',
      symbol: 'NVDA',
      when: '10:42 AM',
      summary: 'Day change -3.1% (≤ -3%)',
      type: 'percent',
    },
    {
      id: 'e4',
      symbol: 'AMZN',
      when: '10:21 AM',
      summary: 'Volume 1.7× 30-day avg',
      type: 'volume',
    },
    {
      id: 'e3',
      symbol: 'AAPL',
      when: '9:58 AM',
      summary: 'Crossed above 190.00',
      type: 'price',
    },
  ];

  return { rules, events };
}

export default function AlertsPage() {
  const { rules, events } = getInitialData();

  return (
    <PageLayout
      title="Alerts"
      description="Create rules, manage channels, and review recent triggers."
    >
      {/* Hydrate the client with initial data */}
      <AlertsClient initialRules={rules} initialEvents={events} />
    </PageLayout>
  );
}
