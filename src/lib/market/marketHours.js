export function isMarketOpenET(d = new Date()) {
  const et = new Date(
    d.toLocaleString('en-US', { timeZone: 'America/New_York' })
  );
  const day = et.getDay(); // 0 Sun, 6 Sat
  if (day === 0 || day === 6) return false;
  const open = new Date(et);
  open.setHours(9, 30, 0, 0);
  const close = new Date(et);
  close.setHours(16, 0, 0, 0);
  return et >= open && et <= close;
}
