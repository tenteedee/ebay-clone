import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function NavBar() {
  const [primaryCategories, setPrimaryCategories] = useState([]);

  // Gọi API để lấy danh sách primaryCategories
  useEffect(() => {
    const fetchPrimaryCategories = async () => {
      try {
        const response = await axios.get(
          'http://localhost:9999/primaryCategories'
        );
        setPrimaryCategories(response.data); // Lưu dữ liệu từ API vào state
      } catch (error) {
        console.error('Error fetching primary categories:', error);
      }
    };
    fetchPrimaryCategories();
  }, []);

  return (
    <nav className="bg-white border-b border-gray-300">
      <ul className="flex space-x-6 text-sm overflow-x-auto py-2 max-w-7xl mx-auto">
        <li className="whitespace-nowrap">
          <a href="#" className="hover:text-blue-600 hover:underline">
            Explore (NEW!)
          </a>
        </li>
        <li className="whitespace-nowrap">
          <a href="#" className="hover:text-blue-600 hover:underline">
            Saved
          </a>
        </li>
        {primaryCategories.map((category) => (
          <li key={category.id} className="whitespace-nowrap">
            <a
              href={`/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="hover:text-blue-600 hover:underline"
            >
              {category.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
