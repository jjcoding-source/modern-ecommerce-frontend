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

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroBanner />
              <CategorySection />
              <Home />
              <BrandsSection />
              <WhyChooseUs />
            </>
          }
        />

        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;