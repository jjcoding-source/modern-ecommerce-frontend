import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "./UserContext"; 

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { currentUser } = useUser(); 
  const [wishlistItems, setWishlistItems] = useState([]);

  // Load wishlist for the current user
  useEffect(() => {
    if (currentUser) {
      const stored = localStorage.getItem(`wishlist_${currentUser.email}`);
      setWishlistItems(stored ? JSON.parse(stored) : []);
    } else {
      setWishlistItems([]);
    }
  }, [currentUser]);

  // Save wishlist for the current user
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`wishlist_${currentUser.email}`, JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, currentUser]);

  const addToWishlist = (product) => {
    setWishlistItems((prev) => {
      if (!prev.find((item) => item.id === product.id)) {
        return [...prev, product];
      }
      return prev;
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const toggleWishlist = (product) => {
    const exists = wishlistItems.find((item) => item.id === product.id);
    if (exists) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, addToWishlist, removeFromWishlist, toggleWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);