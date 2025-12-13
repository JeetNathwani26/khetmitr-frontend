import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/portfolio/photo/hero-bg.jpg"; // Ensure this exists
import Loginpages from '../pages/Loginpages';



const HeroSection = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  return (
    <section className="relative w-full min-h-screen bg-white flex items-center">
      {/* Background Image */}
      <img
        src={heroImage}
        alt="KhetMitra Background"
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gray-700/40 bg-opacity-40"></div>

      {/* Main Content */}
      <div className="relative container mx-auto px-6 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 min-h-screen">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-white text-center lg:text-left"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold leading-tight mb-6">
            Connect Your Land with{" "}
            <span className="text-green-400">Expert Farmers</span>
          </h1>
          <p className="text-md sm:text-lg md:text-xl mb-8">
            Join our platform to manage your land or become a professional farmer. KhetMitra brings together landowners, farmers, and managers for optimal agricultural success.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowLogin(true)}
              className="px-5 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 transition"
            >
              Join as Landowner
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowLogin(true)}
              className="px-5 py-3 bg-white text-green-500 font-semibold rounded-lg shadow-lg border border-green-500 hover:bg-green-50 transition"
            >
              Become a Manager
            </motion.button>
          </div>
        </motion.div>

        {/* (Optional) You can add a right content / image / illustration here */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex-1 flex justify-center lg:justify-end"
        >
                {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 "   onClick={() => setShowLogin(false)}>
    
          <Loginpages />
        </div>
      )}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
