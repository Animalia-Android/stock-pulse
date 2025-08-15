import TabNav from '@/components/TabNav';

export default function PortfolioLayout({ children }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Your Portfolio</h1>
      <p className="mb-4 text-slate-300">
        Holdings you own: positions, performance, and activity.
      </p>

      {/* Tabs */}
      <TabNav
        tabs={[
          { label: 'Positions', href: '/portfolio' },
          { label: 'Performance', href: '/portfolio/performance' },
          { label: 'Transactions', href: '/portfolio/transactions' }, // optional
          { label: 'Income', href: '/portfolio/income' }, // optional
        ]}
      />

      {/* Active tab content */}
      <div className="mt-4">{children}</div>
    </div>
  );
}
