import React from "react";
import { motion } from "framer-motion";
import bgImage from "../assets/portfolio/farmer-bg.jpg"; // your uploaded image

const HeaderSection = () => {
  return (
    <section
      id="about"
      className="relative min-h-[90vh] flex items-center justify-center text-center"
    >
      {/* Background Image */}
      <img
        src={bgImage}
        alt="Farmer working in field"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Overlay using theme color */}
      <div className="absolute inset-0 bg-green-600/80"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-white">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-lg"
        >
          About Us
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-md sm:text-lg md:text-xl leading-relaxed drop-shadow-md"
        >
          KhetMitra is a digital platform that bridges the gap between landowners and skilled farmers or managers. Many landowners have land that remains uncultivated due to various reasons, while capable cultivators seek opportunities to farm. KhetMitra connects them to ensure that every piece of land is used productively, promoting transparency, efficiency, and growth in agriculture.

        </motion.p>
      </div>
    </section>
  );
};

export default HeaderSection;
