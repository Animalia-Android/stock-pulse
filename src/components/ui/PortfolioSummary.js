import Card from '@/components/ui/Card';

import { deltaClass } from '@/lib/utils/converters/deltaClass';

export default function PortfolioSummary({ total, dailyChange }) {
  return (
    <Card className="mb-6">
      <h2 className="text-xl font-semibold">📊 Portfolio Overview</h2>
      <p className="text-3xl font-bold text-green-400">{total}</p>
      <p className={`text-lg ${deltaClass(dailyChange)}`}>
        {dailyChange} Today
      </p>
    </Card>
  );
}
