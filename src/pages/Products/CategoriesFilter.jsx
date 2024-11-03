// LeftSidebar.jsx (CategoriesFilter.jsx)
import React from 'react';
import { Link } from 'react-router-dom';
import { useDataContext } from './../../context/Context.jsx';

export default function CategoriesFilter({
  primaryCategoryId,
  selectedCategoryId,
  onCategorySelect,
}) {
  const { primaryCategories, categories } = useDataContext();

  // Find the primary category by primaryCategoryId
  const primaryCategory = primaryCategories.find(
    (category) => category.id === parseInt(primaryCategoryId)
  );

  // Filter categories based on primaryCategoryId
  const filteredCategories = categories.filter(
    (category) => category.primaryCategoryId === parseInt(primaryCategoryId)
  );

  return (
    <aside className="w-1/4 p-4 border-r border-gray-300">
      {/* Display the primary category name */}
      {primaryCategory && (
        <h2 className="font-semibold mb-4">{primaryCategory.name}</h2>
      )}
      <ul>
        {filteredCategories.map((category) => (
          <li key={category.id}>
            <Link
              to={`/${primaryCategoryId}/${category.id}`}
              className={`hover:underline ${
                selectedCategoryId === category.id
                  ? 'underline font-semibold'
                  : ''
              }`}
              onClick={() => onCategorySelect(category.id)}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
