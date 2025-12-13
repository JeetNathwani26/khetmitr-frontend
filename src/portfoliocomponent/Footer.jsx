import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6 md:px-12">

        {/* Footer Logo & Info */}
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h2 className="text-2xl font-bold text-[#111827]">KhetMitra</h2>
          <p className="mt-2 text-gray-600">
            Connecting farmers and landowners easily.
          </p>
        </div>

        {/* Footer Links */}
        <div className="flex flex-col sm:flex-row gap-4 text-center md:text-left text-gray-700">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/#about" className="hover:underline">
            About
          </Link>
          <Link to="/#policy" className="hover:underline">
            Policy
          </Link>
          <Link to="/#work" className="hover:underline">
            Work
          </Link>
        </div>

        {/* Social Icons */}
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <FaFacebook className="text-green-600 hover:text-green-700 transition-colors" size={20} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <FaTwitter className="text-green-600 hover:text-green-700 transition-colors" size={20} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <FaInstagram className="text-green-600 hover:text-green-700 transition-colors" size={20} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <FaLinkedin className="text-green-600 hover:text-green-700 transition-colors" size={20} />
          </a>
        </div>
      </div>

      {/* Footer Copyright */}
      <div className="mt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} KhetMitra. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
