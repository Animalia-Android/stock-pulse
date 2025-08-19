import PageLayout from '@/components/layout/PageLayout';
import TabNav from '@/components/TabNav';

export default function PortfolioLayout({ children }) {
  return (
    <PageLayout
      title="Your Portfolio"
      description="Holdings you own: positions, performance, and activity."
    >
      {/* Tabs */}
      <TabNav
        tabs={[
          { label: 'Positions', href: '/portfolio' },
          { label: 'Performance', href: '/portfolio/performance' },
          { label: 'Transactions', href: '/portfolio/transactions' },
          { label: 'Income', href: '/portfolio/income' },
        ]}
      />

      {/* Active tab content */}
      <div className="mt-4">{children}</div>
    </PageLayout>
  );
}
