import { NextResponse } from 'next/server';

// Keep validation local to avoid circular imports
const ALLOWED_PROVIDER_IDS = ['mock', 'finnhub' /*, 'alpha', 'yahoo' */];

export async function POST(req) {
  const { id } = await req.json(); // "mock" | "finnhub" | ...
  if (!ALLOWED_PROVIDER_IDS.includes(id)) {
    return NextResponse.json(
      { ok: false, error: 'Unknown provider id' },
      { status: 400 }
    );
  }

  const res = NextResponse.json({ ok: true, provider: id });
  res.cookies.set('sp_provider', id, {
    path: '/',
    sameSite: 'lax',
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return res;
}

// Ensure no caching weirdness in dev
export const dynamic = 'force-dynamic';
