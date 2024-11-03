import React, { useState } from 'react';
import NavBar from './Header/NavBar';
import SearchPane from './Header/SearchPane';
import TopBar from './Header/TopBar';

export default function Header() {
  return (
    <header className="max-w-screen font-sans bg-white">
      <TopBar />
      <SearchPane />
      <NavBar />
    </header>
  );
}
