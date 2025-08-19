'use client';

import { useEffect } from 'react';
import { useUIStore } from '@/stores/uiStore';

export default function SidebarWidthController() {
  const collapsed = useUIStore((s) => s.sidebarCollapsed);
  useEffect(() => {
    document.documentElement.classList.toggle('sidebar-collapsed', collapsed);
  }, [collapsed]);
  return null;
}
