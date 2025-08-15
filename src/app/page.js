import Link from 'next/link';
import { LineChart, Bell, Trophy, ShieldCheck, Rocket } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-900 text-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* HERO /* ---------- BREAK OFF INTO SEPARATE COMPONENTS ---------- */}
        <section className="text-center">
          <span className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full border border-gray-700 bg-gray-800 text-slate-300">
            <Rocket className="w-3.5 h-3.5" />
            Real-time tracking • Paper trading • Clean UI
          </span>

          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight">
            Stock{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-300">
              Pulse
            </span>
          </h1>
          <p className="mt-3 text-slate-300 max-w-2xl mx-auto">
            A modern market dashboard that’s fast, focused, and friendly. Track
            tickers, learn strategies, and practice with virtual trades — all in
            one place.
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium shadow-sm border border-emerald-500/20 bg-emerald-500 text-white hover:bg-emerald-600 transition"
            >
              Open Dashboard
            </Link>
            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium border border-gray-700 bg-gray-800 hover:bg-gray-700 transition text-slate-100"
            >
              View Features
            </a>
          </div>

          {/* Static ticker strip (generic) */}
          <div className="mt-10 overflow-hidden rounded-xl border border-gray-700 bg-gray-800 px-6 py-3 text-sm">
            <div className="flex gap-8 flex-wrap justify-center">
              {[
                { s: 'AAPL', p: '224.31', c: '+1.1%' },
                { s: 'NVDA', p: '128.77', c: '-0.8%' },
                { s: 'MSFT', p: '458.09', c: '+0.4%' },
                { s: 'TSLA', p: '244.62', c: '+2.5%' },
                { s: 'AMZN', p: '191.12', c: '-0.3%' },
                { s: 'GOOG', p: '178.45', c: '+0.9%' },
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="font-semibold">{t.s}</span>
                  <span className="text-slate-400">${t.p}</span>
                  <span
                    className={
                      t.c.startsWith('+') ? 'text-green-400' : 'text-red-400'
                    }
                  >
                    {t.c}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- BREAK OFF INTO SEPARATE COMPONENTS ---------- */}
        {/* FEATURE GRID (matches dashboard card style) */}
        <section id="features" className="mt-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <FeatureCard
              icon={<LineChart className="w-5 h-5" />}
              title="Live Market View"
              body="Snappy quotes and clean charts designed for focus."
            />
            <FeatureCard
              icon={<Bell className="w-5 h-5" />}
              title="Smart Alerts"
              body="Price, % change, and technical triggers without the noise."
            />
            <FeatureCard
              icon={<Trophy className="w-5 h-5" />}
              title="Paper Trading"
              body="Practice strategies with virtual money — risk-free."
            />
            <FeatureCard
              icon={<ShieldCheck className="w-5 h-5" />}
              title="Private by Default"
              body="No personal data on the landing page; your data stays yours."
            />
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="mt-16">
          <h2 className="text-xl font-semibold">How it works</h2>
          <ol className="mt-4 grid md:grid-cols-3 gap-4">
            {[
              {
                n: '1',
                t: 'Explore',
                b: 'Browse tickers and features — no account needed to look around.',
              },
              {
                n: '2',
                t: 'Customize',
                b: 'Add watchlists and set alerts when you’re ready.',
              },
              {
                n: '3',
                t: 'Practice',
                b: 'Try paper trades to build confidence before committing real money.',
              },
            ].map((s) => (
              <li
                key={s.n}
                className="rounded-2xl border border-gray-700 bg-gray-800 p-5"
              >
                <div className="flex items-start gap-3">
                  <span className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500 text-white text-sm font-bold">
                    {s.n}
                  </span>
                  <div>
                    <p className="font-medium">{s.t}</p>
                    <p className="text-sm text-slate-300">{s.b}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* SCREENSHOT PLACEHOLDERS */}
        <section className="mt-16">
          <h2 className="text-xl font-semibold">Inside the app</h2>
          <div className="mt-4 grid lg:grid-cols-2 gap-4">
            <ScreenshotCard label="Dashboard Preview" />
            <ScreenshotCard label="Watchlist & Alerts" />
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 rounded-3xl border border-gray-700 bg-gray-800 p-8 text-center">
          <h3 className="text-2xl font-bold">Ready to track smarter?</h3>
          <p className="mt-2 text-slate-300">
            Jump into the dashboard or read the docs to see what Stock Pulse can
            do.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium shadow-sm border border-emerald-500/20 bg-emerald-500 text-white hover:bg-emerald-600 transition"
            >
              Open Dashboard
            </Link>
            <Link
              href="/learn"
              className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium border border-gray-700 bg-gray-800 hover:bg-gray-700 transition text-slate-100"
            >
              Learn More
            </Link>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-12 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Stock Pulse. All rights reserved.
        </footer>
      </div>
    </main>
  );
}

/* ---------- BREAK OFF INTO SEPARATE COMPONENTS ---------- */

function FeatureCard({ icon, title, body }) {
  return (
    <div className="rounded-2xl border border-gray-700 bg-gray-800 p-5">
      <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 mb-3">
        {icon}
      </div>
      <p className="font-semibold">{title}</p>
      <p className="text-sm text-slate-300">{body}</p>
    </div>
  );
}

function ScreenshotCard({ label }) {
  return (
    <div className="rounded-2xl border border-gray-700 bg-gray-800 p-4">
      <div className="h-56 rounded-xl border border-dashed border-gray-600 grid place-items-center text-slate-400">
        {/* Replace with real <Image /> later */}
        <span>{label} (placeholder)</span>
      </div>
    </div>
  );
}
