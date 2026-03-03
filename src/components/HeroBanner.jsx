export default function HeroBanner() {
  return (
    <section className="bg-blue-600 text-white">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-16">
        {}
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover the Latest Trends
          </h1>
          <p className="text-lg mb-6">
            Shop top-quality products with amazing deals. Free shipping and easy returns!
          </p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100">
            Shop Now
          </button>
        </div>

        {}
        <div className="md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1606813902586-d63591a1c8b0?auto=format&fit=crop&w=800&q=80"
            alt="Promotional"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}