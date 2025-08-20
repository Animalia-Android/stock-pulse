import PageLayout from '@/components/layout/PageLayout';
import DashboardClient from './DashboardClient';
import { getMarketSummary } from '@/lib/market/adapter';
import { getInitialData } from '@/lib/market/fixtures/marketOverview';

export default async function Page() {
  const data = getInitialData();

  const summary = await getMarketSummary().catch(() => null);

  const indices = summary?.indices ?? [];

  console.log('Indices:', indices);

  const news = (summary?.news ?? []).map((n) => n.headline);

  return (
    <PageLayout
      title="Dashboard"
      description="View your stock portfolio and latest market trends here."
    >
      <DashboardClient
        {...data}
        indices={indices.length ? indices : []}
        news={news.length ? news : []}
      />
    </PageLayout>
  );
}
