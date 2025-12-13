import React, { useState, useEffect } from 'react';
import Viewprofile from './Viewprofile';
import Proposal from './proposal';
import logo from '../assets/photo/logo2.png';
import { SlEnvolope, SlPhone, SlLocationPin, SlUser } from 'react-icons/sl';
import { IoMdSend } from 'react-icons/io';
import { toast, Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from "framer-motion"
import Lottie from 'lottie-react';
import loder from '../assets/animation/a5haOnj6gP.json';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const Mangerlist = () => {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedManager, setSelectedManager] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [email, setEmail] = useState(localStorage.getItem("userEmail"))
  const [profile, setProfile] = useState([])
  const [location, setLocation] = useState(localStorage.getItem("location"))

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await fetch(`${API_URL}/get_data`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();

        // Filter for verified managers
        const selected = data.filter((user) => user.email === email);
        const verifiedManagers = data.filter(
          (user) => user.role === 'Manager' && user.status === 'Verify By Admin' && user.email !== email && user.manager_city.toUpperCase() === location.toUpperCase()
        );
        setProfile(selected);
        setManagers(verifiedManagers);
      } catch (err) {
        setError(err.message);
        toast.error('Failed to load managers');
      }
    };
    const minLoadingTime = () => new Promise(resolve => setTimeout(resolve, 5000));

    Promise.all([minLoadingTime(), fetchManagers()]).then(() => {
      setLoading(false);
    });
  }, []);


  const handleViewDetail = (manager) => {
    setSelectedManager(manager);
    setShowModal(true);
  };

  const button = (manager) => {
    if (!profile || profile.length === 0) {
      toast("Profile not loaded");
      return;
    }
    if (profile[0].status === "pendding") {
      toast("your request are pending");
      return;
    }
    if (profile[0].status === "Block") {
      toast("your account have been block by admin");
      return;
    }
    setSelectedManager(manager);
    setShowModal1(true);
  };




  if (loading) {
    return (
      <div className='p-3'>
        <div className="flex flex-col items-center text-center">
          <img src={logo} className='w-15 h-15 animate-pulse' />
          <h3 className="text-3xl font-bold text-green-600 animate-pulse">Available Manager</h3>
          <p>Find the best Manager according your city <span className='text-2xl text-green-600'>{location}</span></p>
        </div>

        <div className="flex justify-center items-center flex-col pt-35">
          <div>
            <div>
              <Lottie animationData={loder} loop={true} className='h-20 w-full' />
            </div>
            <div className='text-center'>
              <p>Loading...</p>
            </div>
          </div>

        </div>
      </div>




    );

  }
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  if (managers.length === 0) return (
    <div className="text-center py-10">
      <div className="flex flex-col items-center text-center">
        <img src={logo} className='w-15 h-15 animate-pulse' />
        <h3 className="text-3xl font-bold text-green-600 ">Available Manager</h3>
        <p>Find the best Manager according your city <span className='text-2xl text-green-600'>{location}</span></p>
        <p className='absolute bottom-40'>User can not found</p>
      </div>
    </div>
  );

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="p-6">
      <Toaster />
      <div className="flex flex-col items-center text-center">
        <img src={logo} className='w-15 h-15 animate-pulse' />
        <h3 className="text-3xl font-bold text-green-600 ">Availble Manager</h3>
        <p>Find the best Manager according your city <span className='text-2xl text-green-600'>{location}</span></p>
      </div>
      <div className='w-full h-130 md:h-80 overflow-scroll scrollbar-hide'>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1.0, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-5  ">
            {managers.map((manager, index) => (
              <motion.div
                key={index}
                initial="hidden"
                variants={cardVariants}
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div
                  key={manager._id}
                  className="bg-gray-100/40 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-shadow duration-300 p-4 border border-gray-200"
                >

                  <div className="flex items-center mb-3 gap-4">
                    <div className="w-15 h-15 bg-green-200 rounded-full flex items-center justify-center shadow-lg">
                      <span className='text-lg'>{manager.name.split(" ").map((n) => n[0]).join("").toUpperCase()}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">{manager.name.toUpperCase()}</h3>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <SlLocationPin className="mr-2" />
                      {manager.location}
                    </div>
                    <div className="flex items-center">
                      <SlPhone className="mr-2" />
                      {manager.phone}
                    </div>
                    <div className="flex items-center">
                      <SlEnvolope className="mr-2" />
                      {manager.email}
                    </div>
                    <p className="text-gray-500">{manager.experience}</p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleViewDetail(manager)}
                      className="flex-1 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors duration-200"
                    >
                      View Detail
                    </button>
                    <button
                      onClick={() => button(manager)}
                      className="flex-1 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors duration-200 flex items-center justify-center"
                    >
                      <IoMdSend className="mr-1" />
                      Send Proposal
                    </button>
                  </div>
                </div>
              </motion.div>

            ))}
          </div>
        </motion.div>
      </div>
      <AnimatePresence initial={false} >
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1.0, y: 0 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {showModal && selectedManager && (
            <Viewprofile name={selectedManager} profile={profile} onClose={() => setShowModal(false)} />
          )}
        </motion.div>

      </AnimatePresence>

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1.0, y: 0 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.5 }}>
          {showModal1 && selectedManager && (
            <Proposal name={selectedManager} onClose={() => setShowModal1(false)} />
          )}
        </motion.div>
      </AnimatePresence>

    </div>
  );
};

export default Mangerlist;
