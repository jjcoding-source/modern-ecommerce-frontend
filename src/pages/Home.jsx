import SidebarFilter from "../components/SidebarFilter";
import ProductCard from "../components/ProductCard"; 
import products from "../data/products"; 

export default function Home() {
  return (
    <div className="container mx-auto mt-10 flex flex-col md:flex-row gap-6">
      {/* Sidebar Filter */}
      <SidebarFilter />

      {/* Product Grid */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}