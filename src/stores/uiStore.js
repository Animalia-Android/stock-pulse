'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUIStore = create()(
  persist(
    (set, get) => ({
      sidebarCollapsed: false,
      setSidebarCollapsed: (v) => {
        set({ sidebarCollapsed: v });
        if (typeof document !== 'undefined') {
          document.documentElement.style.setProperty(
            '--sp-sidebar-width',
            v ? '4rem' : '16rem'
          );
        }
      },
      toggleSidebar: () => {
        const v = !get().sidebarCollapsed;
        get().setSidebarCollapsed(v);
      },

      // optional theme slot (wire later if you like)
      theme: 'dark',
      setTheme: (t) => set({ theme: t }),
    }),
    { name: 'sp.ui' }
  )
);

// Ensure CSS var is correct on first import (client only)
if (typeof document !== 'undefined') {
  const v = useUIStore.getState().sidebarCollapsed;
  document.documentElement.style.setProperty(
    '--sp-sidebar-width',
    v ? '4rem' : '16rem'
  );
}
