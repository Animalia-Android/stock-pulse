import PageLayout from '@/components/layout/PageLayout';
import PaperClient from './PaperClient';

export default function Page() {
  // Later: fetch real data on the server and pass down
  return (
    <PageLayout
      title="Paper Trading"
      description="Practice with simulated cash. Results are hypothetical."
      virtual={true}
    >
      <PaperClient />
    </PageLayout>
  );
}
