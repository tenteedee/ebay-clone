import React, {useState, useEffect} from 'react';
import WatchlistDropdown from './WatchlistDropdown';
import {Link} from "react-router-dom";
import {useDataContext} from "../../context/Context";

export default function TopBar() {
    const [user, setUser] = useState(null);
    const [watchlist, setWatchlist] = useState([]);
    const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);
    const {cart} = useDataContext();

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
        const updatedWatchlist = watchlist.filter((item) => item.id != id);
        setWatchlist(updatedWatchlist);
        localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
    };
    const countTotalItems = () => {
        return cart.reduce((total, item) => total + 1, 0);
    }
    const totalItems = countTotalItems(cart);

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
                    <div className="cart-container">
                        <a
                            href="/cart"
                            aria-label={`Your shopping cart contains ${totalItems} items`}
                            className="cart-button"
                        >
                            {/* SVG icon for the cart */}
                            <svg
                                focusable="false"
                                className="cart-icon"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5H19m-6 14a2 2 0 100-4 2 2 0 000 4zm-6 0a2 2 0 100-4 2 2 0 000 4z"
                                />
                            </svg>
                            {/* Item count */}
                            {totalItems > 0 && (
                                <i
                                    id="gh-cart-n"
                                    aria-hidden="true"
                                    className="cart-badge"
                                >
                                    {totalItems}
                                </i>
                            )}
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
}
