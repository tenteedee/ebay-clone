import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function OrderCompleted() {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="max-w-lg mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Order Completed!
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Thank you for your purchase! Your order has been successfully placed.
      </p>
      <button
        onClick={handleBackToHome}
        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
      >
        Back to Home
      </button>
    </div>
  );
}
