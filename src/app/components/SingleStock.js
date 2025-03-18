import React from 'react';
import Link from 'next/link';

function SingleStock({ stock }) {
  return (
    <Link href={`/stocks/${stock.ticker}`} passHref>
      <div
        key={stock.ticker}
        className="flex justify-between p-2 border-b border-gray-700"
      >
        <span className="font-medium">
          {stock.name} ({stock.ticker})
        </span>

        <div className="text-right">
          <p className="font-medium">{stock.price}</p>
          <p
            className={
              stock.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
            }
          >
            {stock.change}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default SingleStock;
