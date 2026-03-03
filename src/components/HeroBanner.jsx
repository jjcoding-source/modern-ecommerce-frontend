import { FaTruck, FaShieldAlt, FaUndo } from "react-icons/fa";

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600">
      {/* decorative blur */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-300/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left content */}
        <div className="text-white">
          <span className="inline-block mb-4 bg-white/20 backdrop-blur px-4 py-1.5 rounded-full text-sm font-medium">
            New season • Big savings
          </span>

          <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight mb-6">
            Discover quality products for your
            <span className="block text-yellow-300">
              everyday lifestyle
            </span>
          </h1>

          <p className="text-white/90 text-lg max-w-xl mb-8">
            Shop premium electronics, fashion and home essentials with fast
            delivery and easy returns. Experience a modern and seamless
            shopping journey.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button className="bg-white text-blue-600 font-semibold px-7 py-3 rounded-full hover:bg-gray-100 transition shadow-lg">
              Shop now
            </button>

            <button className="border border-white/60 text-white font-semibold px-7 py-3 rounded-full hover:bg-white/10 transition">
              View deals
            </button>
          </div>

          {/* feature badges */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-xl">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-xl px-4 py-3">
              <FaTruck className="text-xl text-yellow-300" />
              <div>
                <p className="text-sm font-semibold">Free delivery</p>
                <span className="text-xs text-white/80">On orders above $50</span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-xl px-4 py-3">
              <FaShieldAlt className="text-xl text-yellow-300" />
              <div>
                <p className="text-sm font-semibold">Secure payment</p>
                <span className="text-xs text-white/80">100% protected</span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-xl px-4 py-3">
              <FaUndo className="text-xl text-yellow-300" />
              <div>
                <p className="text-sm font-semibold">Easy returns</p>
                <span className="text-xs text-white/80">7-day return policy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right image */}
        <div className="relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Modern shopping"
              className="w-full h-[420px] object-cover"
            />

            {/* glass card overlay */}
            <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur rounded-xl px-5 py-3 shadow-lg">
              <p className="text-sm font-semibold text-gray-800">
                Trending today
              </p>
              <span className="text-xs text-gray-500">
                Best deals across categories
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}