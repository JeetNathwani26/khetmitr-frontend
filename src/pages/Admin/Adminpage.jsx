import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Adminnav from "../../components/Adminnav";
import Dashboard from "./Dashboard";


const Adminpage = () => {
  const navigate = useNavigate();
  const [isAllowed, setIsAllowed] = useState(null); // null = checking

  const checkScreenSize = useCallback(() => {
    if (window.innerWidth <= 768) {
      alert("Admin panel is not available on mobile. Please use desktop.");
      setIsAllowed(false);
      navigate("/"); // redirect to home
    } else {
      setIsAllowed(true);
    }
  }, [navigate]);

  useEffect(() => {
    checkScreenSize(); // check once on mount
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, [checkScreenSize]);

  if (isAllowed === null) return null; 
  if (!isAllowed) return null; 

  return (
    <div className="bg-gradient-to-t from-green-100/80 to-white-100/30 h-screen w-screen">
      <Adminnav />
      <Dashboard />
    </div>
  );
};

export default Adminpage;
