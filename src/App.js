import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import NotFound from './pages/Error/NotFound.jsx';
import Home from './pages/Home/Home.jsx';

function App() {
  return (
    <>
      <Header />
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<div>Search</div>} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
      <Footer />
    </>
  );
}

export default App;
