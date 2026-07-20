import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    // Assign a unique ID based on timestamp to allow multiple identical services if needed
    setCartItems([...cartItems, { ...item, cartId: Date.now() }]);
  };

  const removeFromCart = (cartId) => {
    setCartItems(cartItems.filter((item) => item.cartId !== cartId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  
const cartTotal = cartItems.reduce((total, item) => total + (item.isCustom ? 0 : item.totalAmount), 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the cart easily
export function useCart() {
  return useContext(CartContext);
}