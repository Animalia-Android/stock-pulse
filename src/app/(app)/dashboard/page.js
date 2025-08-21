import 'server-only';

import PageLayout from '@/components/layout/PageLayout';
import DashboardClient from './DashboardClient';
import { getMarketSummary } from '@/lib/market/adapter';
import { getInitialData } from '@/lib/market/fixtures/marketOverview';

export default async function Page() {
  let summary = null;
  try {
    summary = await getMarketSummary();
  } catch (e) {
    // keep the page up even if upstream hiccups
    summary = { indices: [], sectors: [], news: [] };
  }

  const initialData = getInitialData();

  return (
    <PageLayout
      title="Dashboard"
      description="View your stock portfolio and latest market trends here."
    >
      <DashboardClient data={summary} mockData={initialData} />
    </PageLayout>
  );
}
