import PageLayout from '@/components/layout/PageLayout';
import MarketClient from './MarketClient';
import { SAMPLE_MARKET_OVERVIEW } from '@/lib/market/fixtures/marketOverview';
import { getMarketSummary } from '@/lib/market/adapter';

export default async function Page() {
  // Later: fetch live data here (server) and pass to the client.
  const sampleData = SAMPLE_MARKET_OVERVIEW;

  let summary = null;
  try {
    summary = await getMarketSummary();
  } catch (e) {
    // keep the page up even if upstream hiccups
    summary = { indices: [], sectors: [], news: [] };
  }

  return (
    <PageLayout
      title="Market Overview"
      description="Macro view of the markets: breadth, sectors, global indices, and more."
    >
      <MarketClient initial={sampleData} summary={summary} />
    </PageLayout>
  );
}
