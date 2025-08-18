export const deltaClass = (val) =>
  val?.toString().trim().startsWith('+')
    ? 'text-green-400'
    : val?.toString().trim().startsWith('-')
    ? 'text-red-400'
    : 'text-slate-300';
