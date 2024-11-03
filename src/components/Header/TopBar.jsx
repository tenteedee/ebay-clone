import React, { useState, useEffect } from 'react';
import WatchlistDropdown from './WatchlistDropdown';

export default function TopBar() {
  const [user, setUser] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);

  // Load user info and watchlist from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('token');
    const storedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setWatchlist(storedWatchlist);
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Toggle watchlist display
  const toggleWatchlist = () => {
    setIsWatchlistOpen(!isWatchlistOpen);
  };

  // Remove item from watchlist
  const handleRemoveFromWatchlist = (id) => {
    const updatedWatchlist = watchlist.filter((item) => item.id !== id);
    setWatchlist(updatedWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
  };

  return (
    <div className="bg-gray-100 border-b border-gray-300 ">
      <div className="py-2 flex items-center justify-between text-sm max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span>
                Hi,{' '}
                <span className="text-blue-600 underline">{user.fullname}</span>
                !
              </span>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:underline"
              >
                Log out
              </button>
            </>
          ) : (
            <span>
              Hi!{' '}
              <a href="/login" className="text-blue-600 hover:underline">
                Log in
              </a>{' '}
              or{' '}
              <a href="/register" className="text-blue-600 hover:underline">
                Register
              </a>
            </span>
          )}
          <a href="/daily-deals" className="hover:underline">
            Daily Deals
          </a>
          <a href="/help" className="hover:underline">
            Help & Contact
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <a href="/ship" className="hover:underline">
            Ship to
          </a>
          <a href="/sell" className="hover:underline">
            Sell
          </a>
          <div className="relative">
            <button onClick={toggleWatchlist} className="hover:underline">
              Watchlist ▼
            </button>
            {isWatchlistOpen && (
              <WatchlistDropdown
                watchlist={watchlist}
                onRemove={handleRemoveFromWatchlist}
              />
            )}
          </div>
          <button aria-label="Notifications" className="hover:text-blue-600">
            🔔
          </button>
          <button aria-label="Cart" className="hover:text-blue-600">
            🛒
          </button>
        </div>
      </div>
    </div>
  );
}
