import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import NotFound from './pages/Error/NotFound.jsx';
import Home from './pages/Home/Home.jsx';
import Register from './pages/Auth/Register.jsx';
import Login from './pages/Auth/Login.jsx';

function App() {
  const location = useLocation();

  // Các path không cần Header và Footer
  const noHeaderFooterPaths = ['/login', '/register'];

  return (
    <>
      {!noHeaderFooterPaths.includes(location.pathname) && <Header />}

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>

      {!noHeaderFooterPaths.includes(location.pathname) && <Footer />}
    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
