export const SETTINGS_DEFAULTS = {
  appearance: {
    theme: 'system',
    density: 'comfortable',
    colorblindMode: false,
  },
  notifications: {
    priceAlerts: true,
    dailyDigest: true,
    digestTime: '09:00',
    channels: { inApp: true, email: false, push: false },
    quietHours: { enabled: false, from: '22:00', to: '07:00' },
  },
  market: { currency: 'USD', timezone: 'America/New_York', region: 'US' },
  integrations: { alpacaKey: '', alphaVantageKey: '' },
  security: { twoFA: false },
};
