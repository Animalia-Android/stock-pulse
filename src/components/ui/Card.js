export default function Card({ className = '', children, as: Tag = 'div' }) {
  return (
    <Tag className={`bg-gray-800 p-4 rounded-lg shadow-md ${className}`}>
      {children}
    </Tag>
  );
}
