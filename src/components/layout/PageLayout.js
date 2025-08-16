export default function PageLayout({
  title,
  description,
  virtual = false,
  children,
}) {
  let isVirtual = (
    <span className="text-xs px-2 py-0.5 rounded bg-emerald-600/20 text-emerald-300">
      Virtual
    </span>
  );

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        {virtual && (
          <span className="text-xs px-2 py-0.5 rounded bg-emerald-600/20 text-emerald-300">
            Virtual
          </span>
        )}
      </div>
      <p className="mb-4 text-slate-300">{description}</p>

      {children}
    </div>
  );
}
