let S;
const KEY = 'sp.paper.v1';

function load() {
  if (typeof window === 'undefined') return defaultState();
  try {
    return JSON.parse(localStorage.getItem(KEY)) || defaultState();
  } catch {
    return defaultState();
  }
}
function save() {
  localStorage.setItem(KEY, JSON.stringify(S));
}
function defaultState() {
  return { cash: 10000, lots: [], orders: [], snapshots: [], quotes: {} };
}

export function getState() {
  S = S || load();
  return S;
}
export function resetAccount() {
  S = defaultState();
  save();
}

export function placeOrder({ symbol, side, qty, type, limitPrice }) {
  S = getState();
  const id = crypto.randomUUID?.() || Math.random().toString(36).slice(2);
  const o = {
    id,
    symbol: symbol.toUpperCase(),
    side,
    qty: Number(qty),
    type,
    limitPrice: type === 'LIMIT' ? Number(limitPrice) : null,
    status: 'NEW',
    filledQty: 0,
    avgFillPrice: null,
    createdAt: Date.now(),
  };
  S.orders.push(o);
  tryFill(o);
  save();
}

export function computeView(s) {
  const quotes = s.quotes;
  const positions = aggregatePositions(s, quotes);
  const value = positions.reduce((a, p) => a + p.value, 0);
  const equity = s.cash + value;
  const dayPL = 0; // keep zero for MVP; compute later if you store prev close
  return { cash: s.cash, equity, positions, dayPL };
}

function aggregatePositions(s, quotes) {
  const bySym = {};
  s.lots.forEach((l) => {
    bySym[l.symbol] = bySym[l.symbol] || { qty: 0, cost: 0 };
    bySym[l.symbol].qty += l.qty;
    bySym[l.symbol].cost += l.qty * l.price;
  });
  return Object.entries(bySym)
    .filter(([, p]) => Math.abs(p.qty) > 1e-9)
    .map(([symbol, p]) => {
      const price = getQuote(symbol, s);
      const avgCost = p.cost / p.qty;
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

/* ---------- execution ---------- */
function tryFill(order) {
  const px = getQuote(order.symbol, S);
  const { bid, ask, last } = toBidAsk(px);
  const slipBps = 12;
  const slip = (side) => 1 + (slipBps / 10000) * (side === 'BUY' ? +1 : -1);

  if (order.type === 'MARKET') {
    const ref = last ?? (order.side === 'BUY' ? ask : bid);
    return fillAll(order, ref * slip(order.side));
  }
  if (order.type === 'LIMIT') {
    if (order.side === 'BUY' && ask <= order.limitPrice)
      return fillAll(order, Math.min(order.limitPrice, ask) * slip('BUY'));
    if (order.side === 'SELL' && bid >= order.limitPrice)
      return fillAll(order, Math.max(order.limitPrice, bid) * slip('SELL'));
    order.status = 'WORKING';
    return;
  }
}

function fillAll(order, price) {
  price = round(price);
  order.filledQty = order.qty;
  order.avgFillPrice = price;
  order.status = 'FILLED';
  // cash & lots
  if (order.side === 'BUY') {
    S.cash -= price * order.qty;
    S.lots.push({
      id: crypto.randomUUID?.() || Math.random(),
      symbol: order.symbol,
      qty: order.qty,
      price,
      ts: Date.now(),
    });
  } else {
    // FIFO close
    let remaining = order.qty;
    const same = S.lots.filter((l) => l.symbol === order.symbol && l.qty > 0);
    for (const lot of same) {
      if (remaining <= 0) break;
      const take = Math.min(remaining, lot.qty);
      lot.qty -= take;
      S.cash += price * take;
      remaining -= take;
    }
  }
}

function toBidAsk(last) {
  // MVP: synthesize a tiny spread
  const spr = Math.max(0.01, last * 0.0005);
  return { bid: last - spr / 2, ask: last + spr / 2, last };
}

function getQuote(symbol, s) {
  // MVP: soft mock. If you already have live prices, replace this.
  const base = s.quotes[symbol] ?? 100 + Math.random() * 50;
  const drift = (Math.random() - 0.5) * 0.2; // jiggle
  const next = Math.max(1, base + drift);
  s.quotes[symbol] = next;
  return next;
}

const round = (x) => Math.round(x * 100) / 100;
