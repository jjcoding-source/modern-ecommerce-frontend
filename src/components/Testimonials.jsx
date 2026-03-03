import { useEffect, useState } from "react";
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Anita Sharma",
    role: "Verified Buyer",
    image:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200",
    text:
      "The product quality is amazing and delivery was super fast. This store feels very professional and reliable.",
  },
  {
    id: 2,
    name: "Rahul Verma",
    role: "Regular Customer",
    image:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200",
    text:
      "Great pricing and clean UI. I really liked how smooth the shopping experience is on this website.",
  },
  {
    id: 3,
    name: "Neha Patel",
    role: "Fashion Buyer",
    image:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200",
    text:
      "Customer support was very helpful and the products matched exactly what I saw online.",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  // auto slide
  useEffect(() => {
    const timer = setInterval(next, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="mt-20">

      {/* header */}
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-gray-800">
          What our customers say
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Real feedback from real buyers
        </p>
      </div>

      <div className="relative max-w-3xl mx-auto">

        {/* card */}
        <div className="relative bg-white rounded-2xl shadow-xl p-8 md:p-10 overflow-hidden">

          <FaQuoteLeft className="absolute top-6 left-6 text-blue-100 text-5xl" />

          <div className="flex flex-col items-center text-center gap-5 transition-all duration-500">

            <img
              src={testimonials[index].image}
              alt={testimonials[index].name}
              className="w-20 h-20 rounded-full object-cover border-4 border-blue-600"
            />

            <p className="text-gray-600 leading-relaxed max-w-xl">
              {testimonials[index].text}
            </p>

            <div>
              <h4 className="font-semibold text-gray-800">
                {testimonials[index].name}
              </h4>
              <span className="text-sm text-gray-500">
                {testimonials[index].role}
              </span>
            </div>
          </div>
        </div>

        {/* arrows */}
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white p-3 rounded-full shadow hover:bg-gray-100 transition"
        >
          <FaChevronLeft />
        </button>

        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white p-3 rounded-full shadow hover:bg-gray-100 transition"
        >
          <FaChevronRight />
        </button>

        {/* dots */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === i
                  ? "w-6 bg-blue-600"
                  : "w-2.5 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}