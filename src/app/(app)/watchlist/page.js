import PageLayout from '@/components/layout/PageLayout';
import WatchlistClient from './WatchlistClient';
import { SAMPLE_WATCHLIST } from '@/lib/market/fixtures/quotes';

export default function Page() {
  // Later: fetch real watchlist from DB/session here and pass as props
  return (
    <PageLayout
      title="Your Watchlist"
      description="A collection of stocks you want to watch."
    >
      <WatchlistClient initial={SAMPLE_WATCHLIST} />
    </PageLayout>
  );
}
