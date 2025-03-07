export default function Settings() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      <p className="mb-4">Customize your experience</p>

      <div className="bg-gray-800 p-4 rounded-lg shadow-md space-y-4">
        {/* Theme Toggle */}
        <div className="flex justify-between items-center">
          <span className="text-lg">Dark Mode</span>
          <button className="bg-gray-700 p-2 rounded-lg">Toggle</button>
        </div>

        {/* Notifications */}
        <div className="flex justify-between items-center">
          <span className="text-lg">Stock Alerts</span>
          <button className="bg-gray-700 p-2 rounded-lg">Enable</button>
        </div>

        {/* Currency Selection */}
        <div className="flex justify-between items-center">
          <span className="text-lg">Currency</span>
          <select className="bg-gray-700 p-2 rounded-lg">
            <option>USD</option>
            <option>EUR</option>
            <option>GBP</option>
          </select>
        </div>

        {/* Account Info */}
        <div className="flex justify-between items-center">
          <span className="text-lg">Manage Account</span>
          <button className="bg-green-500 text-white p-2 rounded-lg">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
