const brands = [
  {
    name: "Apple",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  },
  {
    name: "Nike",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
  },
  {
    name: "Samsung",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
  },
  {
    name: "Adidas",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
  },
  {
    name: "Sony",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg",
  },
  {
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  },
];

export default function BrandsSection() {
  return (
    <section className="relative py-16 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Trusted by Top Brands
          </h2>
          <p className="text-gray-500 mt-2">
            We partner with leading global brands to bring you the best products
          </p>
        </div>

        {/* Logo strip */}
        <div className="relative">
          <div className="flex items-center gap-12 animate-brand-scroll">
            {[...brands, ...brands].map((brand, index) => (
              <div
                key={index}
                className="flex items-center justify-center min-w-[160px]"
              >
                <div className="group bg-white/70 backdrop-blur-md rounded-xl px-6 py-4 shadow-sm hover:shadow-lg transition">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-8 md:h-10 object-contain 
                               grayscale opacity-70 
                               group-hover:grayscale-0 
                               group-hover:opacity-100 
                               transition duration-300"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-white to-transparent" />
        </div>
      </div>

      {/* animation style */}
      <style>
        {`
          @keyframes brand-scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-brand-scroll {
            animation: brand-scroll 25s linear infinite;
            width: max-content;
          }
        `}
      </style>
    </section>
  );
}