import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Loginpages from '../pages/Loginpages';

import logo from "../assets/photo/logo.png"; // your uploaded logo

const navLinks = [
  { name: "welcome", href: "/" },
  { name: "about", href: "#about" },
  { name: "gallery", href: "#gallery" },
  { name: "policy", href: "#policy" },
  { name: "work", href: "#work" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  return (
    <motion.nav
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120 }}
      className="fixed top-0 w-full z-50 bg-white 
                   rounded-b-lg flex-col gap-5 border-0 border-green-100 
                   shadow-2xl"
    >
      <div className="container mx-auto flex justify-between items-center py-3 px-6 md:px-12">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <motion.img
            src={logo}
            alt="KhetMitra Logo"
            className="h-12 w-auto"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 font-medium text-gray-800 text-lg">
          {navLinks.map((link) =>
            link.href.startsWith("#") ? (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-green-600 transition-colors duration-300"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                className="hover:text-green-600 transition-colors duration-300"
              >
                {link.name}
              </Link>
            )
          )}

          {/* Buttons from uploaded design */}
          <div className="flex space-x-4">
            
            <button
              className="px-5 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition font-semibold shadow-md"
              onClick={()=>setShowLogin(true)}
            >
              Sign In
            </button>
          </div>

        </div>
      

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-800"
          aria-label="Toggle Menu"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white shadow-lg rounded-b-lg py-4 space-y-4 text-center"
        >
          {navLinks.map((link) =>
            link.href.startsWith("#") ? (
              <a
                key={link.name}
                href={link.href}
                className="block py-2 text-gray-800 hover:text-green-600 transition-colors duration-300 font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                className="block py-2 text-gray-800 hover:text-green-600 transition-colors duration-300 font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            )
          )}

          {/* Mobile Buttons */}
          <button
            className="block w-11/12 mx-auto bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition shadow-md"
            onClick={()=>setShowLogin(true)}
          >
            Sign In
          </button>



        </motion.div>
      )}

                      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50  "}>
    
          <Loginpages />
        </div>
      )}
      
    </motion.nav>

    
  );
};

export default Navbar;
