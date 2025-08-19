export function Stat({ label, value }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
