export default function Loading() {
  return (
    <div className="p-6">
      <div className="mb-3 h-6 w-40 rounded bg-gray-700 animate-pulse" />
      <div className="mb-6 h-4 w-64 rounded bg-gray-700/80 animate-pulse" />

      <div className="grid md:grid-cols-3 gap-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="rounded-lg border border-gray-700 bg-gray-800 p-4"
          >
            <div className="h-4 w-24 rounded bg-gray-700 animate-pulse mb-3" />
            <div className="h-7 w-32 rounded bg-gray-700 animate-pulse" />
            <div className="mt-4 h-24 rounded bg-gray-900/40 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
