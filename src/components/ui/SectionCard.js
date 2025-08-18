import Card from './Card';
import Section from './Section';

export default function SectionCard({
  title,
  right,
  children,
  className = '',
}) {
  return (
    <Card className={className}>
      <Section title={title} right={right}>
        {children}
      </Section>
    </Card>
  );
}
