// stores/useSettingsStore.ts
import { create } from 'zustand';

function getInitialUseMock() {
  // If the user has flipped it before, honor that
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('useMock');
    if (saved !== null) return saved === 'true';
  }
  // Otherwise fall back to the build-time default
  return process.env.NEXT_PUBLIC_USE_MOCK === 'true';
}

export const useSettingsStore = create((set, get) => ({
  useMock: getInitialUseMock(),
  setUseMock: (val) => {
    if (typeof window !== 'undefined') localStorage.setItem('useMock', val);
    set({ useMock: val });
  },
  toggleMock: () => {
    const next = !get().useMock;
    if (typeof window !== 'undefined') localStorage.setItem('useMock', next);
    set({ useMock: next });
  },
}));
