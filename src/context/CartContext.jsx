import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext"; 

const CartContext = createContext();

export function CartProvider({ children }) {
  const { currentUser } = useUser(); 
  const [cartItems, setCartItems] = useState([]);

  // Load cart for the current user whenever user changes
  useEffect(() => {
    if (currentUser) {
      const stored = localStorage.getItem(`cart_${currentUser.email}`);
      setCartItems(stored ? JSON.parse(stored) : []);
    } else {
      setCartItems([]);
    }
  }, [currentUser]);

  // Save cart for the current user whenever cartItems change
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`cart_${currentUser.email}`, JSON.stringify(cartItems));
    }
  }, [cartItems, currentUser]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const incrementQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decrementQty = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

 const clearCart = () => {
  setCartItems([]);
  localStorage.removeItem("cart");
 };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        incrementQty,
        decrementQty,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);