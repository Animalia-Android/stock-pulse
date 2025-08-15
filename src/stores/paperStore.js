'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// --- Helpers (pure) ---
const uid = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : 'tx_' + Math.random().toString(36).slice(2, 9);

const round2 = (x) => Math.round(x * 100) / 100;

// Aggregate positions from lots (FIFO inventory remains in lots)
function aggregatePositions(lots, priceMap = {}) {
  const bySym = new Map();
  for (const lot of lots) {
    if (lot.qty === 0) continue;
    const prev = bySym.get(lot.symbol) || { qty: 0, cost: 0 };
    prev.qty += lot.qty;
    prev.cost += lot.qty * lot.price;
    bySym.set(lot.symbol, prev);
  }
  return [...bySym.entries()]
    .filter(([, p]) => Math.abs(p.qty) > 1e-9)
    .map(([symbol, p]) => {
      const price = Number(priceMap[symbol]?.price ?? priceMap[symbol] ?? 0);
      const avgCost = p.qty ? p.cost / p.qty : 0;
      return {
        symbol,
        qty: p.qty,
        avgCost,
        price,
        value: price * p.qty,
        upl: (price - avgCost) * p.qty,
      };
    });
}

// Try to fill an order against a price (pass last or mid). Adds a tiny slippage.
function simulateFillPrice(side, refPrice) {
  const slipBps = 12; // 0.12%
  const mult = side === 'BUY' ? 1 + slipBps / 10000 : 1 - slipBps / 10000;
  return round2(refPrice * mult);
}

function fillFIFO(lots, symbol, sellQty) {
  // reduces lots in place, returns total shares actually removed
  let remaining = sellQty;
  for (const lot of lots) {
    if (remaining <= 0) break;
    if (lot.symbol !== symbol || lot.qty <= 0) continue;
    const take = Math.min(remaining, lot.qty);
    lot.qty -= take;
    remaining -= take;
  }
  return sellQty - remaining; // filled shares
}

// --- Store ---
const initial = {
  cash: 100_000,
  lots: /** @type {Array<{id:string,symbol:string,qty:number,price:number,ts:number}>} */ ([]),
  orders:
    /** @type {Array<{id:string,symbol:string,side:'BUY'|'SELL',qty:number,type:'MARKET'|'LIMIT',limitPrice:number|null,status:'NEW'|'WORKING'|'FILLED'|'CANCELLED',filledQty:number,avgFillPrice:number|null,createdAt:number,filledAt?:number} >} */ ([]),
  transactions:
    /** @type {Array<{id:string,ts:number,side:'BUY'|'SELL',symbol:string,qty:number,price:number}>} */ ([]),
};

export const usePaperStore = create()(
  persist(
    (set, get) => ({
      ...initial,

      reset: () => set(initial),

      // Derived: compute positions/equity given a quotes map {SYM: {price} | number}
      view: (quotesMap = {}) => {
        const s = get();
        const positions = aggregatePositions(s.lots, quotesMap);
        const value = positions.reduce((sum, p) => sum + p.value, 0);
        return { cash: s.cash, equity: s.cash + value, positions };
      },

      // Fast add/remove lots (used by fills)
      _addLot: (symbol, qty, price) =>
        set((s) => ({
          lots: [{ id: uid(), symbol, qty, price, ts: Date.now() }, ...s.lots],
        })),

      // Place order: pass currentPrice (from React Query)
      placeOrder: ({
        symbol,
        side,
        qty,
        type = 'MARKET',
        limitPrice = null,
        currentPrice,
      }) => {
        symbol = String(symbol).toUpperCase();
        qty = Number(qty);

        const order = {
          id: uid(),
          symbol,
          side, // 'BUY' | 'SELL'
          qty,
          type, // 'MARKET' | 'LIMIT'
          limitPrice: type === 'LIMIT' ? Number(limitPrice) : null,
          status: 'NEW',
          filledQty: 0,
          avgFillPrice: null,
          createdAt: Date.now(),
        };

        // Try immediate fill
        const price = Number(currentPrice ?? 0);
        if (type === 'MARKET' && price > 0) {
          get()._fillAll(order, price);
        } else if (type === 'LIMIT' && price > 0) {
          if (side === 'BUY' && price <= order.limitPrice)
            get()._fillAll(order, price);
          else if (side === 'SELL' && price >= order.limitPrice)
            get()._fillAll(order, price);
          else order.status = 'WORKING';
        } else {
          // No price available yet -> queue as WORKING
          order.status = 'WORKING';
        }

        set((s) => ({ orders: [order, ...s.orders] }));
        return order.id;
      },

      cancelOrder: (id) =>
        set((s) => ({
          orders: s.orders.map((o) =>
            o.id === id && o.status === 'WORKING'
              ? { ...o, status: 'CANCELLED' }
              : o
          ),
        })),

      // Re-evaluate WORKING orders against fresh prices map {SYM:{price}|number}
      reevaluateOrders: (quotesMap = {}) =>
        set((s) => {
          const next = { ...s };
          next.orders = s.orders.map((o) => {
            if (o.status !== 'WORKING') return o;
            const px = Number(
              quotesMap[o.symbol]?.price ?? quotesMap[o.symbol] ?? 0
            );
            if (!px) return o;
            if (o.type === 'LIMIT') {
              if (o.side === 'BUY' && px <= o.limitPrice)
                return get()._fillAll({ ...o }, px);
              if (o.side === 'SELL' && px >= o.limitPrice)
                return get()._fillAll({ ...o }, px);
              return o; // still working
            }
            // MARKET orders shouldn't linger, but in case:
            return get()._fillAll({ ...o }, px);
          });
          return next;
        }),

      // Internal: mutates cash/lots/transactions and returns updated order
      _fillAll: (order, refPrice) => {
        const fillPrice = simulateFillPrice(order.side, refPrice);

        set((s) => {
          const next = { ...s };
          order.filledQty = order.qty;
          order.avgFillPrice = fillPrice;
          order.status = 'FILLED';
          order.filledAt = Date.now();

          if (order.side === 'BUY') {
            next.cash = round2(next.cash - fillPrice * order.qty);
            next.lots = [
              {
                id: uid(),
                symbol: order.symbol,
                qty: order.qty,
                price: fillPrice,
                ts: Date.now(),
              },
              ...next.lots,
            ];
          } else {
            // SELL: reduce FIFO lots
            const removed = fillFIFO(next.lots, order.symbol, order.qty);
            next.cash = round2(next.cash + fillPrice * removed);
          }

          next.transactions = [
            {
              id: uid(),
              ts: Date.now(),
              side: order.side,
              symbol: order.symbol,
              qty: order.qty,
              price: fillPrice,
            },
            ...next.transactions,
          ];

          return next;
        });

        return { ...order };
      },
    }),
    {
      name: 'sp.paper',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        cash: s.cash,
        lots: s.lots,
        orders: s.orders,
        transactions: s.transactions,
      }),
    }
  )
);
