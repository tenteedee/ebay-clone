import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEbayContext } from '../../context/Context';

export default function Slider() {
  const { products } = useEbayContext(); // Use products from the context
  const [trendingItems, setTrendingItems] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const itemsToShow = 4;

  useEffect(() => {
    if (products.length > 0) {
      const shuffledProducts = products.sort(() => 0.5 - Math.random());
      const selectedProducts = shuffledProducts.slice(0, 8);
      setTrendingItems(selectedProducts);
    }
  }, [products]);

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
                  <Link to={`/product/${item.id}`}>
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-full h-48 object-cover mb-4"
                    />
                  </Link>
                  <Link to={`/product/${item.id}`}>
                    <h3 className="font-semibold mb-2">{item.name}</h3>
                  </Link>
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
