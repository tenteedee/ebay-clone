import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

// Tạo context
const DataContext = createContext();

// Tạo provider component để cung cấp dữ liệu
export const DataProvider = ({ children }) => {
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
        const primaryCategoriesResponse = await axios.get('http://localhost:9999/primaryCategories');
        const categoriesResponse = await axios.get('http://localhost:9999/categories');
        const brandsResponse = await axios.get('http://localhost:9999/brands');
        const productsResponse = await axios.get('http://localhost:9999/products');

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
    <DataContext.Provider
      value={{
        users,
        primaryCategories,
        categories,
        brands,
        products,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Custom hook để sử dụng context trong các component
export const useDataContext = () => {
  return useContext(DataContext);
};
