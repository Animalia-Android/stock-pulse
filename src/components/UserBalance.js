'use client';

const UserBalance = ({ balance, currency = 'USD', locale = 'en-US' }) => {
  const formattedBalance = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(balance);

  return (
    <div className="p-4 bg-white shadow rounded-xl inline-block">
      <p className="text-sm text-gray-500">Current Balance</p>
      <p className="text-2xl font-semibold text-green-600">
        {formattedBalance}
      </p>
    </div>
  );
};

export default UserBalance;
