import SidebarFilter from "../components/SidebarFilter";
import ProductCard from "../components/ProductCard"; 
import SpecialOffers from "../components/SpecialOffers";
import Testimonials from "../components/Testimonials";

export default function Home({ filteredProducts }) {

  const productsToShow = filteredProducts && filteredProducts.length > 0 ? filteredProducts : [];

  return (
    <div className="container mx-auto mt-10 px-6">
      {/* Sidebar + Product Grid */}
      <div className="flex flex-col md:flex-row gap-6">
        <SidebarFilter />

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productsToShow.length > 0 ? (
            productsToShow.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No products match your search.
            </p>
          )}
        </div>
      </div>

      {/* Special Offers Section */}
      <div className="mt-12">
        <SpecialOffers />
      </div>

      {/* Testimonials Section */}
      <div className="mt-12">
        <Testimonials />
      </div>
    </div>
  );
}