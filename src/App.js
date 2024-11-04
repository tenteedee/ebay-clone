import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { EbayProvider } from './context/Context.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import NotFound from './pages/Error/NotFound.jsx';
import Home from './pages/Home/Home.jsx';
import Register from './pages/Auth/Register.jsx';
import Login from './pages/Auth/Login.jsx';
import CategoriesPage from './pages/Products/CategoriesPage.jsx';
import ProductsListPage from './pages/Products/ProductsListPage.jsx';
import ProductDetail from './pages/Products/ProductDetail.jsx';
import Cart from './pages/Products/Cart';
import ConfirmOrder from './pages/Products/ConfirmOrder';
import OrderCompleted from './pages/Products/OrderCompleted';

function App() {
  const location = useLocation();
  const token = localStorage.getItem('token');

  // Các path không cần Header và Footer
  const noHeaderFooterPaths = ['/login', '/register'];

  return (
    <EbayProvider>
      {!noHeaderFooterPaths.includes(location.pathname) && <Header />}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/:primaryCategoryId" element={<CategoriesPage />} />
          <Route
            path="/:primaryCategoryId/:categoryId"
            element={<ProductsListPage />}
          />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={token ? <Cart /> : <Login />} />
          <Route
            path="/product/:id/confirm-order"
            element={token ? <ConfirmOrder /> : <Login />}
          />

          <Route path="/order-completed" element={<OrderCompleted />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>

      {!noHeaderFooterPaths.includes(location.pathname) && <Footer />}
    </EbayProvider>
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
