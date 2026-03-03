import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HeroBanner from "./components/HeroBanner";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import CategorySection from "./components/CategorySection";
import BrandsSection from "./components/BrandsSection";
import WhyChooseUs from "./components/WhyChooseUs";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import ProductDetails from "./pages/ProductDetails";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";
import Wishlist from "./pages/Wishlist";

import productsData from "./data/products"; 

function App() {
  
  const [filteredProducts, setFilteredProducts] = useState(productsData);

  return (
    <>
    
      <Navbar setFilteredProducts={setFilteredProducts} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroBanner />
              <CategorySection />
              
              <Home filteredProducts={filteredProducts} />
              <BrandsSection />
              <WhyChooseUs />
            </>
          }
        />

        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;