import React from 'react';
import logo from '../assets/photo/logo.png';
import Login from '../components/Login'; 
import { motion } from "motion/react";


function Loginpage() {
  return (
    <div className="">
      <div className=" w-screen h-screen flex flex-col gap-4 pt-2">
        
        <Login />
      </div>
    </div>
  );
}

export default Loginpage;
