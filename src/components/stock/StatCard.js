export function StatCard({ label, value }) {
  return (
    <div className="rounded-lg border border-gray-700 bg-gray-800 p-3 text-center">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}
