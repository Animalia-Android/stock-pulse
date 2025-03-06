import Link from 'next/link';

const SideBar = () => {
  return (
    <div className="w-64 fixed h-screen bg-gray-800 p-4">
      <h2 className="text-xl font-bold mb-4">Stock Pulse</h2>
      <ul className="space-y-3">
        <li>
          <Link
            href="/dashboard"
            className="block p-2 rounded bg-gray-700 hover:bg-gray-600"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/market"
            className="block p-2 rounded bg-gray-700 hover:bg-gray-600"
          >
            Market Overview
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
