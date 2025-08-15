import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Page not found</h1>
      <p className="mt-2 text-slate-400">
        We couldn’t find what you’re looking for.
      </p>
      <div className="mt-4">
        <Link
          href="/dashboard"
          className="inline-block px-3 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-sm"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}
