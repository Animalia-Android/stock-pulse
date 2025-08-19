import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUIStore = create()(
  persist(
    (set, get) => ({
      sidebarCollapsed: false,
      setSidebarCollapsed: (v) => set({ sidebarCollapsed: v }),
      toggleSidebar: () =>
        set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      theme: 'dark',
      setTheme: (t) => set({ theme: t }),
    }),
    { name: 'sp.ui' }
  )
);
