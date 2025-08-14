'use client';

export default function Error({ error, reset }) {
  // Optional: log error to a service here
  // console.error(error);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="mt-2 text-slate-400">
        {error?.message
          ? String(error.message)
          : 'An unexpected error occurred.'}
      </p>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => reset()}
          className="px-3 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-sm"
        >
          Try again
        </button>
        <button
          onClick={() => location.reload()}
          className="px-3 py-2 rounded border border-gray-700 hover:bg-gray-700 text-sm"
        >
          Reload page
        </button>
      </div>
    </div>
  );
}
