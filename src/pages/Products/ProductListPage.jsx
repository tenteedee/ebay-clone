import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const toSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[\s&]+/g, '-') // Replace spaces and "&" with hyphens
    .replace(/[^\w-]+/g, ''); // Remove special characters
};

export default function ProductListPage() {
  const { primaryCategoryId, categoryId } = useParams();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState({});
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9999/categories?primaryCategoryId=${primaryCategoryId}`
        );
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9999/products?categoryId=${categoryId}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchBrands = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/brands`);
        const brandData = response.data.reduce((acc, brand) => {
          acc[brand.id] = brand.name;
          return acc;
        }, {});
        setBrands(brandData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
    fetchProducts();
    fetchBrands();
  }, [primaryCategoryId, categoryId]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-1/4 p-4 border-r border-gray-300">
        <h2 className="font-semibold mb-4">Categories</h2>
        <ul>
          {categories.map((subCategory) => (
            <li key={subCategory.id}>
              <Link
                to={`/${primaryCategoryId}/${subCategory.id}`}
                className={`hover:underline ${
                  selectedCategoryId === subCategory.id ? 'underline' : ''
                }`}
                onClick={() => setSelectedCategoryId(subCategory.id)}
              >
                {subCategory.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="w-3/4 p-4 grid grid-cols-3 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="border p-2 hover:shadow-lg transition"
            >
              <div className="w-full h-40 flex items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-w-full max-h-full object-cover"
                />
              </div>
              <h3 className="text-center font-semibold mt-2">{product.name}</h3>
              <p className="text-center font-medium text-gray-700">
                ${product.price}
              </p>
              <p className="text-center text-sm text-gray-500">
                Brand: {brands[product.brandId] || 'Unknown'}
              </p>
            </div>
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </main>
    </div>
  );
}
