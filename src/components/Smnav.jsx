import React from 'react';
import { useNavigate } from 'react-router-dom';

function Smnav({links}) {
  const Navigate=useNavigate();
    return (
        <nav>
                    <ul className="grid grid-cols-2  cursor-pointer   items-center ">
                      
                      {links.map((link) => (
                        <li key={link.name} className={`text-lg font-medium hover:bg-black hover:text-white w-120 text-center rounded-full                
                        ${location.pathname === link.path ? "bg-gray-300" : "hover:bg-black hover:text-white"}`}
                            onClick={() => Navigate(link.path)}
                        >
                          {link.name}
                        </li>
                      ))}

                    </ul>
        </nav>
    );
}

export default Smnav;
