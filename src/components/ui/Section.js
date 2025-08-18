export default function Section({ title, right, children, className = '' }) {
  return (
    <div className={className}>
      {title && (
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold">{title}</h2>
          {right}
        </div>
      )}
      {children}
    </div>
  );
}
