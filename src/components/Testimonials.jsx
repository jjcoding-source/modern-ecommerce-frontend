export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Alice Johnson",
      role: "Verified Buyer",
      comment:
        "Amazing products and fast delivery! Highly recommend this store to everyone.",
      image:
        "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 2,
      name: "Mark Smith",
      role: "Verified Buyer",
      comment:
        "Customer service is top-notch. I got exactly what I ordered and more!",
      image:
        "https://randomuser.me/api/portraits/men/34.jpg",
    },
    {
      id: 3,
      name: "Sofia Lee",
      role: "Verified Buyer",
      comment:
        "The product quality is amazing. I love shopping here regularly.",
      image:
        "https://randomuser.me/api/portraits/women/65.jpg",
    },
  ];

  return (
    <section className="container mx-auto mt-16 px-4 py-10 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold mb-8 text-center">What Our Customers Say</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="flex items-center mb-4">
              <img
                src={t.image}
                alt={t.name}
                className="w-12 h-12 rounded-full mr-4 object-cover"
              />
              <div>
                <h3 className="font-semibold">{t.name}</h3>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </div>
            <p className="text-gray-700">{t.comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
}