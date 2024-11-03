import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';

export default function Slider() {
  const [trendingItems, setTrendingItems] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const itemsToShow = 4;

  // Fetch products from the API and select random items
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:9999/products');
        const allProducts = response.data;

        // Shuffle products and select random items
        const shuffledProducts = allProducts.sort(() => 0.5 - Math.random());
        const selectedProducts = shuffledProducts.slice(0, 8); // Select 8 random products
        setTrendingItems(selectedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const nextSlide = () => {
    setStartIndex((prevIndex) =>
      prevIndex + itemsToShow >= trendingItems.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setStartIndex((prevIndex) =>
      prevIndex === 0 ? trendingItems.length - itemsToShow : prevIndex - 1
    );
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <h2 className="text-2xl font-bold mb-4">Trending on eBay</h2>
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${startIndex * (100 / itemsToShow)}%)`,
            }}
          >
            {trendingItems.map((item) => (
              <div key={item.id} className="w-1/4 flex-shrink-0 px-2">
                <div className="border rounded-lg p-4 h-full flex flex-col">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover mb-4"
                  />
                  <h3 className="font-semibold mb-2">{item.name}</h3>
                  <p className="text-blue-600 font-bold mt-auto">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white border rounded-full p-2 shadow-md"
          aria-label="Previous item"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white border rounded-full p-2 shadow-md"
          aria-label="Next item"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
