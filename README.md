# Stock Pulse

A modern, dark-themed stock research app built on **Next.js (App Router)**. Track markets, monitor a personalized watchlist, analyze your portfolio, and (soon) practice with **virtual paper trading**—all in one streamlined UI.

> ⚠️ Stock Pulse is for **education and research**. It does not provide investment advice or execute real trades.

---

## ✨ Features

- **Landing / Marketing page** – lightweight “storefront” entry.
- **Dashboard** – quick snapshot: portfolio overview, indices, movers, earnings/alerts/news previews.
- **Portfolio** – ownership-focused: positions, P/L, allocation (by holding & sector), income (dividends), transactions.
- **Paper Trading (stub)** – planned: virtual orders, fills, P/L, reset & multiple virtual accounts.
- **Market Overview** – top gainers/losers, compact market stats.
- **Watchlist** – glanceable rows with inline **sparklines**, range bars, search/sort, compact mode, and quick actions.
- **Alerts (stub)** – planned: rules, triggers feed, global pause/quiet hours.
- **Settings** – theme/density, notifications & quiet hours (mock), market prefs (currency/timezone/region), API keys.

---

## 🧱 Tech Stack

- **Next.js** (App Router), React 18
- **Tailwind CSS** for styling
- **lucide-react** for icons
- **framer-motion** for subtle motion
- **Zustand** for store
- JavaScript (no TypeScript yet)

---

## 🚀 Quick Start

### Requirements

- **Node** ≥ 18
- **npm**/**pnpm**/**yarn** (examples use `npm`)

### 1) Install

```bash
npm install
```

### 2) Configure environment (optional for now)

Create `.env.local` (values are placeholders—you can wire APIs later):

```bash
# Market data providers (optional placeholders)
NEXT_PUBLIC_ALPHA_VANTAGE_KEY=
NEXT_PUBLIC_ALPACA_KEY=
NEXT_PUBLIC_DEFAULT_CURRENCY=USD
NEXT_PUBLIC_TIMEZONE=America/New_York
```

### 3) Run dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4) Build & start

```bash
npm run build
npm start
```

---

## 🗂️ Project Structure (high level)

```
app/
  layout.jsx
  page.jsx                 # Landing / storefront
  dashboard/
    page.jsx
  market/
    page.jsx               # Market Overview
  watchlist/
    page.jsx
  portfolio/
    layout.jsx             # Renders portfolio tabs
    page.jsx               # Positions (default tab)
    performance/
      page.jsx
    transactions/
      page.jsx
    income/
      page.jsx
  settings/
    page.jsx
  alerts/
    page.jsx               # Stub (coming soon)
  paper/
    page.jsx               # Stub (coming soon)
components/
  SingleStock.jsx
  TopPerformingStocks.jsx
  ...                     # shared UI
public/
  stockPulseIcon.png
```

---

## 🔧 Scripts

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

> Linting/formatting can be added (ESLint/Prettier). TypeScript can be introduced later with gradual migration.

---

## 🧭 Navigation & IA

- **Sidebar** items: Dashboard, Market Overview, Watchlist, Portfolio, (Paper Trading), Settings.
- **Portfolio** uses **nested routes** for tabs; the active tab is URL-driven via `usePathname()`—deep links and refresh work correctly.
- Optional pages to consider: **Screener** (top-level discovery), **News**, **Journal**.

---

## 🧪 Roadmap (short)

- **Paper Trading MVP:** virtual orders (market/limit), fills, cash/positions/P\&L, local persistence.
- Alerts v1: templates (price, % change, RSI, volume, earnings), rules table, triggers feed, quiet hours.
- Performance deep-dive charts & benchmark comparison.
- Optional **Screener** page (filters + saved screens).
- TypeScript adoption & testing harness.

---

## ♿ Accessibility & UX

- Keyboard-navigable sidebar and tabs (`aria-current="page"`).
- Color contrasts tuned for dark UI (colorblind-friendly toggle planned).
- Compact/comfortable density options.

---

## 🔒 Security & Privacy

- Client-side only right now; no sensitive data stored.
- When adding APIs/keys, keep them on the server when possible and never commit secrets.
- Add rate limiting & input validation before enabling public write endpoints.

---

## 📦 Deployment

Easiest path: **Vercel** (zero-config for Next.js).

1. Push to GitHub
2. Import the repo in Vercel
3. Set environment variables in Vercel → Project Settings → Environment Variables

---

## 🤝 Contributing (internal)

1. Create a feature branch (`feat/paper-trading-mvp`)
2. Commit with conventional prefix (`feat:`, `fix:`, `chore:`)
3. PR with a short demo video/screenshot

---

## 📝 License

Proprietary – all rights reserved.
_(Change to MIT/Apache-2.0 if you intend to open source.)_

---

## 🙏 Acknowledgements

- Next.js team & community
- Icons by [lucide](https://lucide.dev)
