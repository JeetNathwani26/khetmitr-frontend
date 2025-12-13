import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    text: "KhetMitra has transformed my farming practices, making them more efficient and profitable.",
    author: "Rajesh Kumar, Farmer",
  },
  {
    text: "The support team is incredibly responsive and knowledgeable. They helped me solve my crop issues instantly.",
    author: "Priya Sharma, Agriculture Student",
  },
  {
    text: "My crop yield has increased by 30% since I started using KhetMitra's services. Highly recommended!",
    author: "Anil Patel, Farm Owner",
  },
];

const slideVariants = {
  enter: { opacity: 0, x: 100 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl font-bold mb-10 text-black"
        >
          What Our Farmers Say
        </motion.h2>

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-2xl shadow-md text-black"
            >
              <p className="italic text-lg mb-6">
                "{testimonials[currentIndex].text}"
              </p>
              <p className="font-semibold text-right text-gray-700">
                - {testimonials[currentIndex].author}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-3 rounded-full shadow-md hover:bg-gray-800 transition"
            aria-label="Previous testimonial"
          >
            &#8592;
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-3 rounded-full shadow-md hover:bg-gray-800 transition"
            aria-label="Next testimonial"
          >
            &#8594;
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
