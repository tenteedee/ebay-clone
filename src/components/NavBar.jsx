import React, { useState } from 'react';

export default function NavBar() {
  const [category, setCategory] = useState('All Categories');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    'Explore (New!)',
    'Saved',
    'Electronics',
    'Motors',
    'Fashion',
    'Collectibles and Art',
    'Sports',
    'Health & Beauty',
    'Industrial equipment',
    'Home & Garden',
    'Deals',
    'Sell',
  ];

  return (
    <nav className="bg-white border-b border-gray-300">
      <ul className="flex space-x-6 text-sm overflow-x-auto py-2 max-w-7xl mx-auto">
        {categories.map((category, index) => (
          <li key={index} className="whitespace-nowrap">
            <a
              href={`/${category.toLowerCase().replace(/\s+/g, '-')}`}
              className="hover:text-blue-600"
            >
              {category}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
