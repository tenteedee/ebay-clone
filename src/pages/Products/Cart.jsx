import React, { useState, useEffect } from 'react';
import { useDataContext } from "../../context/Context";

function Cart() {
    const [user, setUser] = useState(null);
    const { cart, setCart, removeFromCart } = useDataContext();

    useEffect(() => {
        const storedUser = localStorage.getItem('token');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const subtotal = cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0).toFixed(2);

    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(id);
        } else {
            setCart((prevCart) =>
                prevCart.map((item) =>
                    item.id === id ? { ...item, quantity: newQuantity } : item
                )
            );
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-4 flex flex-col md:flex-row gap-6">
            {/* Product List Section */}
            <div className="flex-1 bg-white p-6 shadow-lg rounded-md">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">Your Cart</h2>
                {cart.length > 0 ? (
                    cart.map((item) => (
                        <div key={item.id} className="flex py-4 border-b border-gray-300 last:border-b-0">
                            <img src={item.images[0]} alt={item.name} className="w-28 h-28 rounded-md object-cover" />
                            <div className="ml-4 flex-grow">
                                <p className="text-sm text-gray-500">Seller: ebay-mall</p>
                                <p className="text-gray-500 text-xs">100% positive feedback</p>
                                <h3 className="text-lg font-semibold mt-1">{item.name}</h3>
                                <p className="text-gray-500 text-sm truncate">{item.description}</p>
                                <p className="mt-2 text-green-600 text-sm">Free 1-2 day shipping</p>
                                <p className="text-gray-500 text-sm">Free returns</p>
                                <div className="mt-2">
                                    <button
                                        className="text-blue-600 hover:underline text-sm"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                            <div className="ml-4 text-right">
                                <div className="flex items-center mb-2">
                                    <label htmlFor={`qty-${item.id}`} className="mr-2 text-sm">Qty</label>
                                    <select
                                        id={`qty-${item.id}`}
                                        value={item.quantity || 1}
                                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                        className="border rounded px-2 py-1 text-sm"
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        {/* Add more options as needed */}
                                    </select>
                                </div>
                                <p className="text-lg font-semibold">${(item.price * (item.quantity || 1)).toFixed(2)}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 py-8">Your cart is currently empty.</p>
                )}
            </div>

            {/* Summary Section */}
            <div className="w-full md:w-1/3 bg-white p-6 shadow-lg rounded-md">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">Summary</h2>
                <div className="flex justify-between text-sm mb-2">
                    <p>Items ({cart.reduce((total, item) => total + (item.quantity || 1), 0)})</p>
                    <p>${subtotal}</p>
                </div>
                <div className="flex justify-between mt-4 text-lg font-semibold border-t pt-2">
                    <p>Subtotal</p>
                    <p>${subtotal}</p>
                </div>
                <button className="mt-4 bg-blue-600 text-white w-full py-2 rounded-md hover:bg-blue-700 transition duration-200">
                    Go to checkout
                </button>
                <p className="text-center text-xs text-gray-500 mt-2">
                    Purchases protected by <span className="text-blue-600 hover:underline">eBay Money Back Guarantee</span>
                </p>
            </div>
        </div>
    );
}

export default Cart;
