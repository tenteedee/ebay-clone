import React from 'react';
import { Link } from 'react-router-dom';

export default function WatchlistDropdown({ watchlist, onRemove }) {
  return (
    <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded shadow-lg z-50 p-4">
      <h3 className="text-lg font-semibold mb-2">Your Watchlist</h3>
      {watchlist.length > 0 ? (
        <div className="space-y-2">
          {watchlist.map((item) => (
            <div key={item.id} className="flex items-center space-x-2">
              <Link
                to={`/product/${item.id}`}
                className="flex-1 flex items-center space-x-2"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-600">
                    {item.price.toLocaleString()} VND
                  </p>
                </div>
              </Link>
              <button
                onClick={() => onRemove(item.id)}
                className="text-red-500 hover:text-red-700"
                aria-label="Remove from watchlist"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No items in your watchlist.</p>
      )}
      {/* <Link
        to="/watchlist"
        className="block mt-2 text-blue-600 hover:underline"
      >
        View all items you are watching
      </Link> */}
    </div>
  );
}
