export default function SpecialOffers() {
  const offers = [
    {
      id: 1,
      title: "Headphones & Audio",
      subtitle: "Up to 40% off",
      image:
        "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 2,
      title: "Smart Watches",
      subtitle: "Best deals today",
      image:
        "https://images.pexels.com/photos/2774062/pexels-photo-2774062.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 3,
      title: "Fashion Wear",
      subtitle: "New season sale",
      image:
        "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 4,
      title: "Gaming & Accessories",
      subtitle: "Limited time offers",
      image:
        "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ];

  return (
    <section className="w-full mt-14">
      {/* section header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          Special Offers
        </h2>

        <button className="text-sm font-medium text-blue-600 hover:underline">
          View all
        </button>
      </div>

      {/* offers grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="group relative h-[220px] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
          >
            {/* image */}
            <img
              src={offer.image}
              alt={offer.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* content */}
            <div className="absolute bottom-0 p-5 text-white w-full">
              <p className="text-xs uppercase tracking-wide opacity-90 mb-1">
                {offer.subtitle}
              </p>

              <h3 className="text-lg font-semibold leading-tight">
                {offer.title}
              </h3>

              <button className="mt-3 inline-block bg-white text-gray-900 text-sm font-semibold px-4 py-1.5 rounded-full hover:bg-gray-100 transition">
                Shop now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}