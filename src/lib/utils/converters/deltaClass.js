export const deltaClass = (val) => {
  // Normalize to number if possible (handles "1.2%", "$3.40", etc.)
  const n =
    typeof val === 'number'
      ? val
      : parseFloat(String(val).replace(/[%,$\s]/g, ''));

  if (!Number.isFinite(n)) return 'text-slate-300';
  if (n > 0) return 'text-green-400';
  if (n < 0) return 'text-red-400';
  return 'text-slate-300';
};
