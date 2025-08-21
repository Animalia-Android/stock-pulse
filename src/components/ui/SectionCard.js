export default function SectionCard({
  title,
  right,
  icon,
  children,
  className = '',
}) {
  return (
    <section className="bg-gray-800 p-4 rounded-lg shadow-md mb-6">
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      {children}
    </section>
  );
}

//original to mimic
// export default function SectionCard({
//   title,
//   right,
//   children,
//   className = '',
// }) {
//   return (
//     <Card className={className}>
//       <Section title={title} right={right}>
//         {children}
//       </Section>
//     </Card>
//   );
// }
