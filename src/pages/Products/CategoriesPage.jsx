import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDataContext } from './../../context/Context.jsx';
import CategoriesFilter from './CategoriesFilter';

export default function CategoriesPage() {
  const { primaryCategoryId } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { primaryCategories, categories } = useDataContext();

  const primaryCategory = primaryCategories.find(
    (category) => category.id === parseInt(primaryCategoryId)
  );

  if (!primaryCategory) return <p>Loading...</p>;

  return (
    <div className="flex">
      {/* Left Sidebar */}
      <CategoriesFilter
        primaryCategoryId={primaryCategoryId}
        selectedCategoryId={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      {/* Main Content */}
      <main className="w-3/4 p-4 grid grid-cols-2 gap-4">
        {categories
          .filter(
            (cat) => cat.primaryCategoryId === parseInt(primaryCategoryId)
          )
          .map((subCategory) => (
            <Link
              key={subCategory.id}
              to={`/${primaryCategoryId}/${subCategory.id}`}
              className="border p-4 hover:shadow-lg transition"
            >
              <div className="w-full h-60 flex items-center justify-center overflow-hidden">
                <img
                  src={subCategory.image}
                  alt={subCategory.name}
                  className="max-w-full max-h-full object-cover"
                />
              </div>
              <h3 className="text-center font-semibold mt-2">
                {subCategory.name}
              </h3>
            </Link>
          ))}
      </main>
    </div>
  );
}
