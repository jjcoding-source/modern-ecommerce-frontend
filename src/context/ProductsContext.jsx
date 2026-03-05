import { createContext, useContext, useEffect, useState } from "react";
import productsData from "../data/products";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("admin_products");

    if (stored) {
      setProducts(JSON.parse(stored));
    } else {
      setProducts(productsData);
    }
  }, []);

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);