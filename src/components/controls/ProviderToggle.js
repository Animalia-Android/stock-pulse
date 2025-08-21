'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const ORDER = ['mock', 'finnhub' /*, 'alpha', 'yahoo' */];

function readCookie(name) {
  const m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return m ? decodeURIComponent(m[1]) : null;
}

export default function ProviderToggle() {
  const router = useRouter();
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    setProvider(
      readCookie('sp_provider') ||
        process.env.NEXT_PUBLIC_DATA_PROVIDER ||
        'mock'
    );
  }, []);

  async function cycle() {
    const idx = ORDER.indexOf(provider);
    const next = ORDER[(idx + 1) % ORDER.length];
    setProvider(next);
    await fetch('/api/provider', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: next }),
    });
    router.refresh(); // so server reads the new cookie
  }

  if (!provider) return null;
  return (
    <button
      onClick={cycle}
      className="px-2 py-1 text-xs rounded bg-zinc-800 text-white mr-10.5"
    >
      Provider: {provider.toUpperCase()}
    </button>
  );
}
