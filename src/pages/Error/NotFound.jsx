import React from 'react';
import {Link} from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="h-[75vh] bg-white flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-6xl font-bold text-blue-600 mb-2">404</h1>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Oops! We couldn't find that page.
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <Link href="/" className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Go to Homepage
          </Link>
          
        </div>
        
      </div>
    </div>
  );
}