import React, { useState, useEffect } from 'react';

export default function TopBar() {
  return (
    <div className="bg-gray-100 border-b border-gray-300 ">
      <div className="py-2 flex items-center justify-between text-sm max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <span>
            Hi!{' '}
            <a href="/signin" className="text-blue-600 hover:underline">
              Sign in
            </a>{' '}
            or{' '}
            <a href="/register" className="text-blue-600 hover:underline">
              register
            </a>
          </span>
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
          <div className="relative group">
            <button className="hover:underline">Watchlist ▼</button>
            <div
              className="absolute hidden group-hover:block right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-50"
              style={{ zIndex: 1 }}
            >
              <a
                href="/watchlist"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                View Watchlist
              </a>
            </div>
          </div>
          <div className="relative group">
            <button className="hover:underline">My eBay ▼</button>
            <div
              className="absolute hidden group-hover:block right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg"
              style={{ zIndex: 1 }}
            >
              <a href="/my-ebay" className="block px-4 py-2 hover:bg-gray-100">
                Summary
              </a>
              <a
                href="/my-ebay/bids"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Bids/Offers
              </a>
            </div>
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
