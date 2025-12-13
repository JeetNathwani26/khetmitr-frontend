import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AiOutlineHome,
  AiOutlineFileText,
  AiOutlineBulb,
  AiOutlineUser,
  AiOutlineMenu,
  AiOutlineLogout
} from 'react-icons/ai';
import logo from '../assets/photo/logo.png';
import { motion } from 'motion/react';

function Usernav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const userRole = localStorage.getItem('userRole');

  const homePath = userRole === 'Manager' ? "/manager_view" : "/landowner_home" ;

  const links = [
    { name: "Home", path: homePath, icon: AiOutlineHome },
    { name: "Proposal", path: "/Proposal_home", icon: AiOutlineBulb },
    { name: "Profile", path: "/profile", icon: AiOutlineUser },
    { name: "Logout", path: null, icon: AiOutlineLogout, action: 'logout' },
  ];

  return (
    <div className="w-screen flex p-7 bg-gray-100/50 drop-shadow-md backdrop-blur-lg rounded-2xl flex-col gap-5 border-0 border-green-100 shadow-2xl">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="w-25 h-25 absolute top-5 left-5">
          <img src={logo} alt="Logo" />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex ml-auto">
          <ul className="flex space-x-6">
            {links.map((link) => {
              const Icon = link.icon;

              // Handle array paths correctly (though now homePath is string)
              const isActive = Array.isArray(link.path)
                ? link.path.includes(location.pathname)
                : location.pathname === link.path;

              return (
                <li
                  key={link.name}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg cursor-pointer transition-colors duration-200 ${
                    link.name === "Logout"
                      ? "bg-gray-700 text-white hover:bg-gray-800"
                      : isActive
                      ? "bg-gray-300 hover:bg-black hover:text-white"
                      : "hover:bg-black hover:text-white"
                  }`}
                  onClick={() => {
                    if (link.action === 'logout') {
                      localStorage.clear();
                      navigate('/');
                    } else {
                      navigate(Array.isArray(link.path) ? link.path[0] : link.path);
                    }
                  }}
                >
                  <Icon size={20} />
                  <span>{link.name}</span>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden ml-auto">
          <button
            className="text-gray-700 hover:text-green-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <AiOutlineMenu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <nav className={`md:hidden mt-4 ${isMenuOpen ? 'block' : 'hidden'}`}>
        <ul className="flex flex-col space-y-2 pt-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = Array.isArray(link.path)
              ? link.path.includes(location.pathname)
              : location.pathname === link.path;

            return (
              <li
                key={link.name}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg cursor-pointer transition-colors duration-200 ${
                  link.name === "Logout"
                    ? "bg-gray-700 text-white hover:bg-gray-800"
                    : isActive
                    ? 'bg-green-100 text-green-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-green-600'
                }`}
                onClick={() => {
                  if (link.action === 'logout') {
                    localStorage.clear();
                    navigate('/');
                  } else {
                    navigate(Array.isArray(link.path) ? link.path[0] : link.path);
                  }
                  setIsMenuOpen(false);
                }}
              >
                <Icon size={20} />
                <span>{link.name}</span>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default Usernav;
