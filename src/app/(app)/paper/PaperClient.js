'use client';

import { useEffect, useMemo } from 'react';

import { usePaperStore } from '@/stores/paperStore';
import { formatUSD } from '@/lib/utils/converters/numbers';
import OrderTicket from '@/components/paper/orderTicket';
import { useBatchQuotes } from '@/lib/market/queries';

import OrdersCard from '@/components/OrdersCard';
import PositionsCard from '@/components/PositionsCard';
import { Stat } from '@/components/Stat';

export default function PaperClient({ initial }) {
  // read store
  const lots = usePaperStore((s) => s.lots);
  const orders = usePaperStore((s) => s.orders);
  const reset = usePaperStore((s) => s.reset);
  const view = usePaperStore((s) => s.view);
  const reevaluateOrders = usePaperStore((s) => s.reevaluateOrders);

  // which symbols to fetch quotes for (open positions + a default)
  const symbols = useMemo(() => {
    const set = new Set(lots.map((l) => l.symbol));
    if (set.size === 0) set.add('AAPL');
    return Array.from(set);
  }, [lots]);

  const { data, isLoading } = useBatchQuotes(symbols);
  const quotesMap = data?.map || {};

  // Re-check any WORKING orders whenever quotes refresh
  useEffect(() => {
    if (data) reevaluateOrders(quotesMap);
  }, [data, quotesMap, reevaluateOrders]);

  const { cash, equity, positions } = view(quotesMap);
  const { stats = [] } = initial || {};

  return (
    <>
      {/* Top cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <Stat label="Equity" value={formatUSD(equity)} />
        <Stat label="Cash" value={formatUSD(cash)} />
        <Stat
          label="Day Change P/L"
          value={
            <span className={0 >= 0 ? 'text-green-400' : 'text-red-400'}>
              +{formatUSD(0)}
            </span>
          }
        />
      </div>

      {/* Ticket + Reset */}
      <div className="flex items-center justify-between mb-3">
        <OrderTicket initialSymbol="AAPL" />
        <button
          onClick={() => {
            if (confirm('Reset virtual account?')) reset();
          }}
          className="text-sm px-3 py-2 rounded border border-gray-700 hover:bg-gray-700"
        >
          Reset
        </button>
      </div>

      {/* Positions */}
      <PositionsCard positions={positions} isLoading={isLoading} />

      {/* Orders */}
      <OrdersCard orders={orders} isLoading={isLoading} />
    </>
  );
}
