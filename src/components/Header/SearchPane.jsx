import React, { useState, useEffect, useRef } from 'react';
import { useDataContext } from '../../context/Context';

export default function SearchPane() {
  const [category, setCategory] = useState('All Categories');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { primaryCategories, categories } = useDataContext();
  const dropdownRef = useRef(null);

  const getCategoriesForPrimary = (primaryCategoryId) => {
    return categories.filter(
        (cat) => cat.primaryCategoryId == primaryCategoryId
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
      <div className="bg-white py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-8">
            <a href="/" className="text-3xl font-bold text-blue-600">
              eBay
            </a>
            <div className="relative" ref={dropdownRef}>
              <button
                  onClick={() => setDropdownVisible((prev) => !prev)}
                  className="flex items-center text-sm font-semibold text-gray-700 px-4 py-2"
              >
                Shop by category
                <span className="ml-1">▼</span>
              </button>
              {isDropdownVisible && (
                  <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-300 rounded shadow-lg z-50 p-4">
                    {primaryCategories.map((primaryCategory) => (
                        <div key={primaryCategory.id} className="mb-4">
                          {/*{getCategoriesForPrimary(primaryCategory.id).map(*/}
                          {/*    (category) => (*/}
                          {/*        <a*/}
                          {/*            key={category.id}*/}
                          {/*            href={`/${primaryCategory.id}/${category.id}`}*/}
                          {/*            className="block px-4 py-2 hover:bg-gray-100"*/}
                          {/*        >*/}
                          {/*          {category.name}*/}
                          {/*        </a>*/}
                          {/*    )*/}
                          {/*)}*/}
                          <a
                              href={`/${primaryCategory.id}`}
                              className="font-bold mb-2"
                          >
                            {primaryCategory.name}
                          </a>
                        </div>
                    ))}
                  </div>
              )}
            </div>
          </div>
          <div className="flex-1 max-w-3xl mx-8">
            <div className="relative">
              <input
                  type="text"
                  placeholder="Search for anything"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-2 px-4 pr-20 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="absolute right-0 top-0 bottom-0 w-48 border-l border-gray-300 bg-gray-100 rounded-r-full px-2 focus:outline-none"
              >
                <option>All Categories</option>
                {primaryCategories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                ))}
              </select>
            </div>
          </div>
          <button
              onClick={() => alert(`Searching for "${searchTerm}" in ${category}`)}
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300"
          >
            Search
          </button>
          <a
              href="/advanced-search"
              className="text-sm text-blue-600 hover:underline ml-4"
          >
            Advanced
          </a>
        </div>
      </div>
  );
}
