import React, { useState } from 'react';
import NavBar from './NavBar';
import SearchPane from './SearchPane';
import TopBar from './TopBar';

export default function Header() {
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
    <header className="max-w-screen font-sans bg-white">
      <TopBar />
      <SearchPane />
      <NavBar />
    </header>
  );
}
