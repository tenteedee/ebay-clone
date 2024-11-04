import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDataContext } from '../../context/Context';

export default function ConfirmOrder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useDataContext();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Retrieve selected product and quantity from localStorage or state
    const savedOrder = JSON.parse(localStorage.getItem('selectedOrder'));
    if (savedOrder && savedOrder.productId === parseInt(id)) {
      setProduct(savedOrder.product);
      setQuantity(savedOrder.quantity);
    } else {
      // Fetch product from context if not in localStorage
      const selectedProduct = products.find((item) => item.id == id);
      if (selectedProduct) {
        setProduct(selectedProduct);
      }
    }
  }, [id, products]);

  if (!product) return <p>Loading...</p>;

  const handleConfirmOrder = () => {
    // alert('Your order has been confirmed!');
    localStorage.removeItem('selectedOrder');
    navigate('/order-completed');
  };

  const handleBackToProduct = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Confirm Your Order</h1>
      <div className="flex space-x-4">
        {/* Product Image */}
        <div className="w-1/3">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover rounded"
          />
        </div>

        {/* Order Summary */}
        <div className="w-2/3">
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p className="text-gray-600">
            Price: ${product.price.toLocaleString()}
          </p>
          <p className="text-gray-600">Quantity: {quantity}</p>
          <p className="text-xl font-semibold mt-4">
            Total: ${(product.price * quantity).toLocaleString()}
          </p>

          {/* Action Buttons */}
          <div className="mt-6 space-y-2">
            <button
              onClick={handleConfirmOrder}
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
            >
              Confirm Order
            </button>
            <button
              onClick={handleBackToProduct}
              className="w-full py-2 border border-gray-400 text-gray-600 font-semibold rounded hover:bg-gray-50"
            >
              Back to Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
