import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

// Tạo context
const EbayContext = createContext();

// Tạo provider component để cung cấp dữ liệu
export const EbayProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [primaryCategories, setPrimaryCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);

  // Gọi API để lấy dữ liệu từ json-server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get('http://localhost:9999/user');
        const primaryCategoriesResponse = await axios.get(
          'http://localhost:9999/primaryCategories'
        );
        const categoriesResponse = await axios.get(
          'http://localhost:9999/categories'
        );
        const brandsResponse = await axios.get('http://localhost:9999/brands');
        const productsResponse = await axios.get(
          'http://localhost:9999/products'
        );

        setUsers(userResponse.data);
        setPrimaryCategories(primaryCategoriesResponse.data);
        setCategories(categoriesResponse.data);
        setBrands(brandsResponse.data);
        setProducts(productsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Dữ liệu sẽ được cung cấp cho toàn bộ ứng dụng
  return (
    <EbayContext.Provider
      value={{
        users,
        primaryCategories,
        categories,
        brands,
        products,
      }}
    >
      {children}
    </EbayContext.Provider>
  );
};

// Custom hook để sử dụng context trong các component
export const useDataContext = () => {
  return useContext(EbayContext);
};
