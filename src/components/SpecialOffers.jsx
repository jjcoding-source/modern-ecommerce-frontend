export default function SpecialOffers() {
  const offers = [
    {
      id: 1,
      title: "Up to 50% off Electronics",
      image: "https://images.unsplash.com/photo-1580894732444-7c9d2f2f3f1b?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "Fashion Sale - Limited Time",
      image: "https://images.unsplash.com/photo-1600181954034-4d29d77d0f70?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "Home Essentials - Best Deals",
      image: "https://images.unsplash.com/photo-1585386959984-a4155222b05e?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Special Offers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group"
          >
            <img
              src={offer.image}
              alt={offer.title}
              className="w-full h-56 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-white text-xl font-semibold px-4 text-center">
                {offer.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}