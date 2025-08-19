import PortfolioClient from './PortfolioClient';
import {
  SAMPLE_PORTFOLIO_SERIES,
  SAMPLE_POSITIONS,
} from '@/lib/portfolio/sample';

export default function Page() {
  // Later: fetch real positions on the server and pass them in
  return (
    <PortfolioClient
      positions={SAMPLE_POSITIONS}
      portfolioSeries={SAMPLE_PORTFOLIO_SERIES}
    />
  );
}
