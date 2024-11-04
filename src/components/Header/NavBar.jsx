import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useEbayContext } from '../../context/Context';

export default function NavBar() {
  const { primaryCategories, setPrimaryCategories } = useEbayContext();

  return (
    <nav className="bg-white border-b border-gray-300">
      <ul className="flex space-x-6 text-sm overflow-x-auto py-2 max-w-7xl mx-auto">
        <li className="whitespace-nowrap">
          <a href="#" className="hover:text-blue-600 hover:underline">
            Explore (NEW!)
          </a>
        </li>

        {primaryCategories.map((primaryCategory) => (
          <li key={primaryCategory.id} className="whitespace-nowrap">
            <a
              href={`/${primaryCategory.id}`}
              className="hover:text-blue-600 hover:underline"
            >
              {primaryCategory.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
