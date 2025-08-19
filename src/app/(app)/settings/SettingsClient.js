'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Moon,
  Sun,
  Bell,
  Shield,
  KeyRound,
  Upload,
  Download,
  LogOut,
  Trash2,
  Globe,
} from 'lucide-react';
import { Toggle } from '@/components/controls/Toggle'; // reuse your existing Toggle
import SectionCard from '@/components/ui/SectionCard';

export default function SettingsClient({ initial }) {
  // ---- State & persistence ----
  const [settings, setSettings] = useState(initial);
  const [loaded, setLoaded] = useState(false); // guards hydration & sticky bar
  const lastSavedRef = useRef(initial);

  // Load from localStorage (client-only, after mount)
  useEffect(() => {
    try {
      const raw = localStorage.getItem('sp:settings');
      if (raw) {
        const saved = JSON.parse(raw);
        // shallow trust; fallback to initial on parse errors
        setSettings((prev) => ({ ...prev, ...saved }));
        lastSavedRef.current = { ...initial, ...saved };
      } else {
        lastSavedRef.current = initial;
      }
    } catch {
      lastSavedRef.current = initial;
    } finally {
      setLoaded(true);
    }
  }, [initial]);

  const dirty = useMemo(
    () => JSON.stringify(settings) !== JSON.stringify(lastSavedRef.current),
    [settings]
  );

  // tiny path-setter util (immutable)
  const set = (path, value) => {
    setSettings((prev) => {
      const next = structuredClone(prev);
      const keys = path.split('.');
      let ref = next;
      for (let i = 0; i < keys.length - 1; i++) ref = ref[keys[i]];
      ref[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const save = () => {
    try {
      localStorage.setItem('sp:settings', JSON.stringify(settings));
      lastSavedRef.current = settings;
      alert('Settings saved (local)');
    } catch {
      alert('Failed to save settings');
    }
  };

  const discard = () => setSettings(lastSavedRef.current);

  // ---- UI ----
  return (
    <>
      {/* Appearance */}
      <SectionCard title="Appearance" icon={<Moon className="w-4 h-4" />}>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label>Theme</Label>
            <div className="flex gap-2">
              <RadioButton
                label="System"
                checked={settings.appearance.theme === 'system'}
                onChange={() => set('appearance.theme', 'system')}
              />
              <RadioButton
                label="Light"
                icon={<Sun className="w-3.5 h-3.5" />}
                checked={settings.appearance.theme === 'light'}
                onChange={() => set('appearance.theme', 'light')}
              />
              <RadioButton
                label="Dark"
                icon={<Moon className="w-3.5 h-3.5" />}
                checked={settings.appearance.theme === 'dark'}
                onChange={() => set('appearance.theme', 'dark')}
              />
            </div>
          </div>

          <div>
            <Label>Density</Label>
            <select
              className="w-full rounded-lg border border-gray-700 bg-gray-900/60 px-3 py-2 text-sm"
              value={settings.appearance.density}
              onChange={(e) => set('appearance.density', e.target.value)}
            >
              <option value="comfortable">Comfortable</option>
              <option value="compact">Compact</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <ToggleRow
              label="Colorblind-friendly mode"
              desc="Improved contrast and color cues for red/green color vision."
              checked={settings.appearance.colorblindMode}
              onChange={(v) => set('appearance.colorblindMode', v)}
            />
          </div>
        </div>
      </SectionCard>

      {/* Notifications */}
      <SectionCard title="Notifications" icon={<Bell className="w-4 h-4" />}>
        <div className="grid sm:grid-cols-2 gap-4">
          <ToggleRow
            label="Price alerts"
            desc="Notify when a symbol crosses a target price."
            checked={settings.notifications.priceAlerts}
            onChange={(v) => set('notifications.priceAlerts', v)}
          />
          <ToggleRow
            label="Daily market digest"
            desc="A brief summary of movers and your positions."
            checked={settings.notifications.dailyDigest}
            onChange={(v) => set('notifications.dailyDigest', v)}
          />

          <div>
            <Label>Digest time</Label>
            <input
              type="time"
              className="w-full rounded-lg border border-gray-700 bg-gray-900/60 px-3 py-2 text-sm"
              value={settings.notifications.digestTime}
              onChange={(e) => set('notifications.digestTime', e.target.value)}
            />
          </div>

          <div>
            <Label>Channels</Label>
            <div className="flex flex-wrap gap-2">
              <TagToggle
                label="In-app"
                checked={settings.notifications.channels.inApp}
                onChange={(v) => set('notifications.channels.inApp', v)}
              />
              <TagToggle
                label="Email"
                checked={settings.notifications.channels.email}
                onChange={(v) => set('notifications.channels.email', v)}
              />
              <TagToggle
                label="Push"
                checked={settings.notifications.channels.push}
                onChange={(v) => set('notifications.channels.push', v)}
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <ToggleRow
              label="Quiet hours"
              desc="Mute notifications during these hours."
              checked={settings.notifications.quietHours.enabled}
              onChange={(v) => set('notifications.quietHours.enabled', v)}
            />
            <div className="mt-2 grid grid-cols-2 gap-3">
              <input
                type="time"
                disabled={!settings.notifications.quietHours.enabled}
                className="rounded-lg border border-gray-700 bg-gray-900/60 px-3 py-2 text-sm disabled:opacity-50"
                value={settings.notifications.quietHours.from}
                onChange={(e) =>
                  set('notifications.quietHours.from', e.target.value)
                }
              />
              <input
                type="time"
                disabled={!settings.notifications.quietHours.enabled}
                className="rounded-lg border border-gray-700 bg-gray-900/60 px-3 py-2 text-sm disabled:opacity-50"
                value={settings.notifications.quietHours.to}
                onChange={(e) =>
                  set('notifications.quietHours.to', e.target.value)
                }
              />
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Market Preferences */}
      <SectionCard
        title="Market preferences"
        icon={<Globe className="w-4 h-4" />}
      >
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <Label>Currency</Label>
            <select
              className="w-full rounded-lg border border-gray-700 bg-gray-900/60 px-3 py-2 text-sm"
              value={settings.market.currency}
              onChange={(e) => set('market.currency', e.target.value)}
            >
              {['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <Label>Timezone</Label>
            <select
              className="w-full rounded-lg border border-gray-700 bg-gray-900/60 px-3 py-2 text-sm"
              value={settings.market.timezone}
              onChange={(e) => set('market.timezone', e.target.value)}
            >
              <option>America/New_York</option>
              <option>America/Los_Angeles</option>
              <option>Europe/London</option>
              <option>Europe/Berlin</option>
              <option>Asia/Tokyo</option>
            </select>
          </div>
          <div>
            <Label>Region</Label>
            <select
              className="w-full rounded-lg border border-gray-700 bg-gray-900/60 px-3 py-2 text-sm"
              value={settings.market.region}
              onChange={(e) => set('market.region', e.target.value)}
            >
              <option value="US">US</option>
              <option value="EU">EU</option>
              <option value="APAC">APAC</option>
              <option value="GLOBAL">Global</option>
            </select>
          </div>
        </div>
      </SectionCard>

      {/* Integrations */}
      <SectionCard title="Integrations" icon={<KeyRound className="w-4 h-4" />}>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label>Alpaca API Key</Label>
            <input
              placeholder="paste key…"
              className="w-full rounded-lg border border-gray-700 bg-gray-900/60 px-3 py-2 text-sm"
              value={settings.integrations.alpacaKey}
              onChange={(e) => set('integrations.alpacaKey', e.target.value)}
            />
          </div>
          <div>
            <Label>Alpha Vantage API Key</Label>
            <input
              placeholder="paste key…"
              className="w-full rounded-lg border border-gray-700 bg-gray-900/60 px-3 py-2 text-sm"
              value={settings.integrations.alphaVantageKey}
              onChange={(e) =>
                set('integrations.alphaVantageKey', e.target.value)
              }
            />
          </div>
          <div className="sm:col-span-2 flex flex-wrap gap-2">
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-900/60 px-3 py-2 text-sm hover:bg-gray-700">
              <Upload className="w-4 h-4" /> Import portfolio (CSV)
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-900/60 px-3 py-2 text-sm hover:bg-gray-700">
              <Download className="w-4 h-4" /> Export data
            </button>
          </div>
        </div>
      </SectionCard>

      {/* Security */}
      <SectionCard title="Security" icon={<Shield className="w-4 h-4" />}>
        <div className="grid sm:grid-cols-2 gap-4">
          <ToggleRow
            label="Two-factor authentication"
            desc="Require a one-time code when signing in."
            checked={settings.security.twoFA}
            onChange={(v) => set('security.twoFA', v)}
          />
          <div>
            <Label>Sessions</Label>
            <button
              className="w-full rounded-lg border border-gray-700 bg-gray-900/60 px-3 py-2 text-sm hover:bg-gray-700 inline-flex items-center justify-center gap-2"
              onClick={() => alert('Signed out of all devices (stub)')}
            >
              <LogOut className="w-4 h-4" /> Sign out of all devices
            </button>
          </div>
          <div className="sm:col-span-2">
            <DangerRow
              label="Delete account"
              desc="Permanently remove your account and data."
              actionLabel="Delete"
              onClick={() => {
                if (confirm('Are you sure? This cannot be undone.')) {
                  alert('Account deleted (stub)');
                }
              }}
            />
          </div>
        </div>
      </SectionCard>

      {/* Sticky Save Bar */}
      {loaded && dirty && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
          <div className="rounded-xl border border-gray-700 bg-gray-900/90 backdrop-blur px-4 py-3 shadow-lg flex items-center gap-3">
            <span className="text-sm text-slate-300">
              You have unsaved changes
            </span>
            <button
              onClick={discard}
              className="text-sm px-3 py-1 rounded-lg border border-gray-700 hover:bg-gray-700"
            >
              Discard
            </button>
            <button
              onClick={save}
              className="text-sm px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ---------- Small UI helpers (scoped here for now) ---------- */

function Label({ children }) {
  return <p className="mb-1 text-sm text-slate-300">{children}</p>;
}

function RadioButton({ label, icon, checked, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg border ${
        checked
          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300'
          : 'border-gray-700 bg-gray-900/60 text-slate-300'
      } hover:bg-gray-700`}
      aria-pressed={checked}
      type="button"
    >
      {icon}
      {label}
    </button>
  );
}

function ToggleRow({ label, desc, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-3 bg-gray-900/40 border border-gray-700 rounded-lg px-3 py-2">
      <div>
        <p className="text-sm font-medium">{label}</p>
        {desc && <p className="text-xs text-slate-400">{desc}</p>}
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );
}

function TagToggle({ label, checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`text-sm px-3 py-1 rounded-lg border ${
        checked
          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300'
          : 'border-gray-700 bg-gray-900/60 text-slate-300'
      } hover:bg-gray-700`}
      aria-pressed={checked}
    >
      {label}
    </button>
  );
}

function DangerRow({ label, desc, actionLabel, onClick }) {
  return (
    <div className="flex items-center justify-between gap-3 bg-gray-900/40 border border-red-700/40 rounded-lg px-3 py-2">
      <div>
        <p className="text-sm font-medium text-red-300">{label}</p>
        {desc && <p className="text-xs text-slate-400">{desc}</p>}
      </div>
      <button
        onClick={onClick}
        className="text-sm px-3 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white flex items-center gap-2"
      >
        <Trash2 className="w-4 h-4" /> {actionLabel}
      </button>
    </div>
  );
}
