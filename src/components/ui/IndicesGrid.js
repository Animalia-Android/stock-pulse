// src/components/IndicesGrid.jsx
import { deltaClass } from '@/lib/utils/converters/deltaClass';
import { filterIndices } from '@/lib/market/indicesPresets';
import Card from './Card';

export default function IndicesGrid({
  type = 'all',
  indices = [],
  layout = 'flat',
}) {
  console.log('Rendering IndicesGrid', { type, indices, layout });
  const filtered = filterIndices(indices, type);
  const lgCols =
    filtered.length % 2 === 0 ? 'lg:grid-cols-4' : 'lg:grid-cols-3';

  const renderCard = (i) => {
    const raw = i.change ?? i.changePct ?? 0;
    const num =
      typeof raw === 'number' ? raw : Number(String(raw).replace('%', '')) || 0;
    const pctLabel = `${num >= 0 ? '+' : ''}${num.toFixed(2)}%`;

    return (
      <Card key={i.symbol}>
        <div className="flex items-baseline justify-between">
          <div>
            <p className="text-sm text-slate-400">{i.name}</p>
            <p className="text-lg font-semibold">{i.price}</p>
          </div>
          <span className={`text-sm font-medium ${deltaClass(num)}`}>
            {pctLabel}
          </span>
        </div>
      </Card>
    );
  };

  if (layout === 'grouped') {
    const groups = filtered.reduce((acc, x) => {
      (acc[x.group || 'Other'] ||= []).push(x);
      return acc;
    }, {});
    return (
      <>
        <h2 className="text-xl font-semibold mb-2">{titleFromType(type)}</h2>
        {Object.entries(groups).map(([group, items]) => {
          const cols =
            items.length % 2 === 0 ? 'lg:grid-cols-4' : 'lg:grid-cols-3';
          return (
            <section key={group} className="mb-6">
              <h3 className="text-sm text-slate-400 mb-2">{group}</h3>
              <div className={`grid grid-cols-1 sm:grid-cols-2 ${cols} gap-4`}>
                {items.map(renderCard)}
              </div>
            </section>
          );
        })}
      </>
    );
  }

  return (
    <>
      <h2 className="text-xl font-semibold mb-2">{titleFromType(type)}</h2>
      <div className={`grid grid-cols-1 sm:grid-cols-2 ${lgCols} gap-4 mb-6`}>
        {filtered.map(renderCard)}
      </div>
    </>
  );
}

function titleFromType(t) {
  const map = {
    dashboard: '⚿ Key Indices',
    us: '🇺🇸 US Equities',
    global: '🌎 Global Equities',
    sectors: 'Sectors',
    rates: 'Rates/Credit/REITs',
    commodities: 'Commodities',
    fx: 'FX',
    crypto: 'Crypto',
    all: 'All Markets',
  };
  return map[t] || t;
}

function formatNumber(n) {
  const v = Number(n);
  return Number.isFinite(v)
    ? v.toLocaleString(undefined, { maximumFractionDigits: 2 })
    : '—';
}
