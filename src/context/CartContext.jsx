import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();
const CART_STORAGE_KEY = 'byt_cart_v1';

// Safely read the cart from localStorage. Returns [] on any error/parse failure
// or if storage is unavailable (private mode).
function loadStoredCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  // Initialize from localStorage so a refresh (e.g. on /checkout) keeps the
  // cart intact instead of wiping it back to an empty array.
  const [cartItems, setCartItems] = useState(() => loadStoredCart());

  // Persist the cart whenever it changes.
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Storage may be full or unavailable — fail silently; cart still works
      // in-session.
    }
  }, [cartItems]);

  // Keep cart in sync across tabs (e.g. if a booking is opened in two tabs).
  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === CART_STORAGE_KEY) {
        try {
          const parsed = event.newValue ? JSON.parse(event.newValue) : [];
          if (Array.isArray(parsed)) setCartItems(parsed);
        } catch {
          /* ignore malformed */
        }
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const addToCart = (item) => {
    // Assign a unique ID based on timestamp to allow multiple identical services if needed
    setCartItems((current) => [...current, { ...item, cartId: Date.now() }]);
  };

  const removeFromCart = (cartId) => {
    setCartItems((current) => current.filter((item) => item.cartId !== cartId));
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