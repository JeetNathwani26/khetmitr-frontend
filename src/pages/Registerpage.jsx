import React from 'react';
import logo from '../assets/photo/logo.png';
import Register from './Register';


function Registerpage() {
  return (
    <div className="fixed top-0 left-0 bg-gradient-to-t from-green-100/50  to-white-100 ">
      <div className=" w-screen h-screen flex flex-col gap-4 pt-2 md:pt-0">

        {/* Logo */}
        <div className="flex justify-center items-center md:justify-start">
          <div className="pl-0 md:pl-7">
            <img
              src={logo}
              alt="Logo"
              className="h-20 w-40 md:h-[120px] md:w-[200px]"
            />
          </div>
        </div>

        <Register />
      </div>
    </div>
  );
}

export default Registerpage;
