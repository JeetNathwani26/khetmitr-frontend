import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MdAdminPanelSettings } from "react-icons/md";
import logo from "../assets/photo/logo.png";



function Adminnav() {
  const navigate = useNavigate(); // ✅ lowercase for clarity
  const location = useLocation(); // ✅ get current route
 

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth <= 768) {
        
        alert("Admin panel is not available on mobile. Please use desktop.");
        navigate("/"); // ✅ navigate works fine
      } 
    };

    checkScreenSize(); // ✅ check once on mount
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, [navigate]);

 const logout=()=>{
    localStorage.removeItem('userEmail');
    navigate("/")
 };

  const links = [
    { name: "Home", path: ["/admin"] },
    { name: "Landowner", path: ["/lpendding","/landowner"] },
    { name: "Manager", path: ["/mpending","/manager"] },
    { name: "Proposal", path: ["/proposal_admin"] },
    { name: "Reports", path: ["/reports"] },
  ];

  return (
    <div className="fixed flex flex-row w-full">
      <div
        className="w-50 h-screen flex p-7 bg-gray-100/50 drop-shadow-md backdrop-blur-lg
                   rounded-2xl flex-col gap-5 border-0 border-green-100 
                   shadow-2xl"
      >
        <div className="relative flex flex-col items-center ">
          <MdAdminPanelSettings size={70} />
          <h1 className="text-2xl font-bold text-green-600">Admin Panel</h1>
          <nav className="w-full">
            <ul className="flex flex-col cursor-pointer p-3 gap-5 items-center">
                {links.map((link) => {
                  // normalize path into an array
                  const paths = Array.isArray(link.path) ? link.path : [link.path];
                  const isActive = paths.includes(location.pathname);

                  return (
                    <li
                      key={link.name}
                      className={`text-lg font-medium w-45 text-center rounded-md p-1
                        ${isActive ? "bg-gray-300 hover:bg-black hover:text-white" : "hover:bg-black hover:text-white"}`}
                      onClick={() => navigate(paths[0])} // always navigate to first path
                    >
                      {link.name}
                    </li>
                  );
                })}
            </ul>
          </nav>
          <div>
            <p className="bg-gray-800 text-white p-2 w-40 text-center rounded-lg cursor-pointer hover:bg-gray-900" onClick={()=>logout()}>Logout</p>
          </div>
        </div>
      </div>

      <div className="w-25 h-25 absolute top-5 right-5">
        <img src={logo} alt="Logo" />
      </div>
    </div>
  );
}

export default Adminnav;
