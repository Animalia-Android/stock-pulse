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
