import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDataContext } from './../../context/Context.jsx';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { brands, categories } = useDataContext();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9999/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const addToWatchlist = (product) => {
    const updatedWatchlist =
      JSON.parse(localStorage.getItem('watchlist')) || [];
    const isAlreadyInWatchlist = updatedWatchlist.some(
      (item) => item.id === product.id
    );

    if (!isAlreadyInWatchlist) {
      updatedWatchlist.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
      });
      localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
      alert(`${product.name} has been added to your watchlist.`);
    } else {
      alert(`${product.name} is already in your watchlist.`);
    }
  };

  const brandName =
    brands.find((brand) => brand.id === product.brandId)?.name || 'Unknown';
  const categoryName =
    categories.find((category) => category.id === product.categoryId)?.name ||
    'Unknown';

  return (
    <div className="max-w-5xl mx-auto p-4 flex space-x-4">
      {/* Image Gallery with Thumbnails on the Left */}
      <div className="w-3/5 flex">
        {/* Thumbnails */}
        <div className="flex flex-col items-center space-y-2 mr-4">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-16 h-16 object-cover cursor-pointer border ${
                index === currentImageIndex
                  ? 'border-blue-500'
                  : 'border-gray-300'
              } rounded`}
            />
          ))}
        </div>

        {/* Main Image */}
        <div className="relative w-full h-96 flex items-center justify-center border">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={product.name}
              className={`object-contain max-h-full transition-opacity duration-300 ${
                index === currentImageIndex
                  ? 'opacity-100'
                  : 'opacity-0 absolute'
              }`}
            />
          ))}
          <button
            onClick={handlePreviousImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
          >
            &lt;
          </button>
          <button
            onClick={handleNextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="w-2/5 pl-4">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-xl font-semibold mt-2 text-blue-600">
          $ {(product.price * quantity).toLocaleString()}
        </p>
        <p className="text-gray-600">Brand: {brandName}</p>
        <p className="text-gray-600">Category: {categoryName}</p>
        <p className="text-gray-700 mt-4">{product.description}</p>

        {/* Quantity Selector */}
        <div className="mt-4 flex items-center">
          <span className="text-gray-600 mr-2">Quantity:</span>
          <button
            onClick={decreaseQuantity}
            className="px-2 py-1 border border-gray-300 rounded-l hover:bg-gray-200"
          >
            -
          </button>
          <span className="px-4 py-1 border-t border-b border-gray-300">
            {quantity}
          </span>
          <button
            onClick={increaseQuantity}
            className="px-2 py-1 border border-gray-300 rounded-r hover:bg-gray-200"
          >
            +
          </button>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-2">
          <button className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700">
            Buy It Now
          </button>
          <button className="w-full py-2 border border-blue-600 text-blue-600 font-semibold rounded hover:bg-blue-50">
            Add to Cart
          </button>
          <button
            onClick={() => addToWatchlist(product)}
            className="w-full py-2 border border-blue-600 text-blue-600 font-semibold rounded hover:bg-blue-50"
          >
            Add to Watchlist
          </button>
        </div>
      </div>
    </div>
  );
}
