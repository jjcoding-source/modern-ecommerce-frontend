import Navbar from "./components/Navbar";
import HeroBanner from "./components/HeroBanner";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import CategorySection from "./components/CategorySection";
import BrandsSection from "./components/BrandsSection";

function App() {
  return (
    <div className="App">
      <Navbar />
      <HeroBanner />
      <CategorySection />
      <Home /> 
      <BrandsSection /> 
      <Footer />
    </div>
  );
}

export default App;