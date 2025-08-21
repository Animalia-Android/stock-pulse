import { useEffect, useMemo, useState } from 'react';

export function MarketStatus() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const { isOpen, timeET } = useMemo(() => {
    const et = new Date(
      now.toLocaleString('en-US', { timeZone: 'America/New_York' })
    );
    const day = et.getDay(); // 0 Sun, 6 Sat
    const open = new Date(et);
    open.setHours(9, 30, 0, 0);
    const close = new Date(et);
    close.setHours(16, 0, 0, 0);
    const openNow = day >= 1 && day <= 5 && et >= open && et <= close;
    const timeStr = et.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
    return { isOpen: openNow, timeET: timeStr + ' ET' };
  }, [now]);

  return (
    <div className="flex items-center gap-2 text-xs">
      <span
        className={`inline-block h-2 w-2 rounded-full ${
          isOpen ? 'bg-emerald-400' : 'bg-red-400'
        }`}
        aria-hidden
      />
      <span className="text-slate-300">
        {isOpen ? 'US Market Open' : 'US Market Closed'}
      </span>
      <span className="text-slate-500">•</span>
      <span className="text-slate-400">{timeET}</span>
    </div>
  );
}
