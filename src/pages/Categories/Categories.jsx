import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function CategoriesPage() {
  const { primaryCategoryId } = useParams();
  const [categories, setCategories] = useState([]);
  const [primaryCategories, setPrimaryCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchPrimaryCategories = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9999/primaryCategories?id=${primaryCategoryId}`
        );
        setPrimaryCategories(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    };
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

    fetchPrimaryCategories();
    fetchCategories();
  }, [primaryCategoryId]);

  if (!primaryCategories) return <p>Loading...</p>;

  return (
    <div className="flex">
      {/* Left Sidebar */}
      <aside className="w-1/4 p-4 border-r border-gray-300">
        <h2 className="font-semibold mb-4">{primaryCategories.name}</h2>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                to={`/${primaryCategoryId}/${category.id}`}
                className={`hover:underline ${
                  selectedCategory === category.id ? 'underline' : ''
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="w-3/4 p-4 grid grid-cols-2 gap-4">
        {categories.map((subCategory) => (
          <Link
            key={subCategory.id}
            to={`/${primaryCategoryId}/${subCategory.id}`}
            className="border p-4 hover:shadow-lg transition"
          >
            <div className="w-full h-72 flex items-center justify-center overflow-hidden">
              <img
                src={subCategory.image}
                alt={subCategory.name}
                className="max-w-full max-h-full object-cover"
              />
            </div>
            <h3 className="text-center font-semibold">{subCategory.name}</h3>
          </Link>
        ))}
      </main>
    </div>
  );
}
