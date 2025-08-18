export default function MarketFilters({
  query,
  onQueryChange,
  universe,
  onUniverseChange,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
      <input
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search symbols or names…"
        className="w-full md:w-80 rounded-lg border border-gray-700 bg-gray-900/60 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <select
        value={universe}
        onChange={(e) => onUniverseChange(e.target.value)}
        className="rounded-lg border border-gray-700 bg-gray-900/60 px-3 py-2 text-sm md:w-48"
      >
        <option value="all">All symbols</option>
        <option value="watchlist">My Watchlist</option>
        <option value="indices">Major Indices</option>
        <option value="tech">Tech</option>
        <option value="finance">Finance</option>
      </select>
    </div>
  );
}
