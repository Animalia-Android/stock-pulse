import PageLayout from '@/components/layout/PageLayout';
import MarketClient from './MarketClient';
import { SAMPLE_MARKET_OVERVIEW } from '@/lib/market/fixtures/marketOverview';
import { getMarketSummary } from '@/lib/market/adapter';

export default async function Page() {
  // Later: fetch live data here (server) and pass to the client.
  const data = SAMPLE_MARKET_OVERVIEW;

  const summary = await getMarketSummary().catch(() => null);

  const indices = summary?.indices ?? [];

  const sectors = summary;

  const news = (summary?.news ?? []).map((n) => n.headline);

  console.log('Indices:', indices);
  console.log('Sectors:', sectors);
  // console.log('News:', news);

  return (
    <PageLayout
      title="Market Overview"
      description="Macro view of the markets: breadth, sectors, global indices, and more."
    >
      <MarketClient
        initial={data}
        indices={indices}
        news={news}
        sectors={sectors}
      />
    </PageLayout>
  );
}
