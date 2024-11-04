import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useEbayContext } from '../../context/Context';
import CategoriesFilter from './CategoriesFilter';

export default function ProductListPage() {
  const { primaryCategoryId, categoryId } = useParams();
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    parseInt(categoryId)
  );
  const { products, brands } = useEbayContext();

  const filteredProducts = products.filter(
    (product) => product.categoryId == selectedCategoryId
  );

  return (
    <div className="flex">
      {/* Sidebar */}
      <CategoriesFilter
        primaryCategoryId={primaryCategoryId}
        selectedCategoryId={selectedCategoryId}
        onCategorySelect={setSelectedCategoryId}
      />

      {/* Main Content */}
      <main className="w-3/4 p-4 grid grid-cols-3 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`} // Link to ProductDetail page
              className="border p-2 hover:shadow-lg transition"
            >
              <div className="w-full h-40 flex items-center justify-center overflow-hidden">
                <img
                  src={product.images[0]} // Display first image from images array
                  alt={product.name}
                  className="max-w-full max-h-full object-cover"
                />
              </div>
              <h3 className="text-center font-semibold mt-2">{product.name}</h3>
              <p className="text-center font-medium text-gray-700">
                ${product.price}
              </p>
              <p className="text-center text-sm text-gray-500">
                Brand:{' '}
                {brands.find((b) => b.id === product.brandId)?.name ||
                  'Unknown'}
              </p>
            </Link>
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </main>
    </div>
  );
}
