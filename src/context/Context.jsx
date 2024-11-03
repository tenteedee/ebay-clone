import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

// Tạo context
const EbayContext = createContext();

export const EbayProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [primaryCategories, setPrimaryCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const itemExists = prevCart.find((item) => item.id == product.id);
            if (itemExists) {
                return prevCart.map((item) =>
                    item.id == product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
        alert("Add cart success")
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id != productId));
    };

    const clearCart = () => {
        setCart([]);
    };

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

    return (
        <EbayContext.Provider
            value={{
                users,
                primaryCategories,
                categories,
                brands,
                products,
                cart,
                addToCart,
                removeFromCart,
                clearCart,
                setCart,
            }}
        >
            {children}
        </EbayContext.Provider>
    );
};

export const useDataContext = () => {
    return useContext(EbayContext);
};
