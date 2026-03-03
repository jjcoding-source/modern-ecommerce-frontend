const features = [
  {
    title: "Fast & Free Delivery",
    desc: "Get your orders delivered quickly with reliable shipping partners across the country.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          d="M3 13h13l3 3v5H3v-8Zm13 0V6H3v7m13 0 3 3" />
      </svg>
    ),
  },
  {
    title: "Secure Payments",
    desc: "All transactions are protected with industry-grade encryption and trusted gateways.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          d="M12 11c1.105 0 2 .895 2 2m-2-6a4 4 0 0 0-4 4v2h8v-2a4 4 0 0 0-4-4Zm6 10H6" />
      </svg>
    ),
  },
  {
    title: "Easy Returns",
    desc: "Not satisfied? Enjoy hassle-free returns and instant replacement options.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          d="M3 10h13l-4-4m4 4-4 4M21 14H8l4 4m-4-4 4-4" />
      </svg>
    ),
  },
  {
    title: "24/7 Customer Support",
    desc: "Our support team is available anytime to help you with your shopping journey.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          d="M18 10a6 6 0 1 0-12 0v5a2 2 0 0 0 2 2h1v-7H7v7h1m8 0h1a2 2 0 0 0 2-2v-5Z" />
      </svg>
    ),
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why Choose Us
          </h2>
          <p className="mt-4 text-gray-500">
            We focus on quality, speed and customer satisfaction to give you the
            best shopping experience.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, i) => (
            <div
              key={i}
              className="group relative bg-white/70 backdrop-blur-xl
                         border border-gray-100 rounded-2xl p-6
                         shadow-sm hover:shadow-2xl
                         transition-all duration-300 hover:-translate-y-2"
            >
              {/* glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0
                              group-hover:opacity-100 transition
                              bg-gradient-to-r from-indigo-500/10
                              via-purple-500/10 to-pink-500/10" />

              <div className="relative z-10">

                <div className="w-14 h-14 flex items-center justify-center
                                rounded-xl mb-5
                                bg-gradient-to-br from-indigo-500 to-purple-600
                                text-white shadow-lg">
                  {item.icon}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.desc}
                </p>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}