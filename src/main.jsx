import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext"; 
import { ReviewsProvider } from "./context/ReviewsContext";
import { UserProvider } from "./context/UserContext";
import { ProductsProvider } from "./context/ProductsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
     <UserProvider>
      <ProductsProvider>
      <CartProvider>
        <WishlistProvider> 
          <ReviewsProvider>
          <App />
          </ReviewsProvider>
        </WishlistProvider>
      </CartProvider>
      </ProductsProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);