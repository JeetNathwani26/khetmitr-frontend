import React, { useState, useEffect } from 'react';
import Viewprofile from './Viewprofile';
import Proposal from './proposal';
import logo from '../assets/photo/logo2.png';
import { SlEnvolope, SlPhone, SlLocationPin, SlUser } from 'react-icons/sl';
import { IoMdSend } from 'react-icons/io';
import {toast,Toaster } from 'react-hot-toast';
import Lottie from 'lottie-react';
import loder from '../assets/animation/a5haOnj6gP.json';
import { AnimatePresence, motion } from "framer-motion"

const API_URL = import.meta.env.VITE_BACKEND_URL;


const Landownerlist = () => {
  const [landowners, setLandowners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLandowner, setSelectedLandowner] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [email,setEmail]=useState(localStorage.getItem("userEmail"))
  const [profile,setProfile]=useState([]);
  const [location,setLocation]=useState(localStorage.getItem("location"));


  useEffect(() => {
    const fetchLandowners = async () => {
      try {
        const response = await fetch(`${API_URL}/get_data`,{
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();

        
        const selected = data.filter((user) => user.email === email);
        
        
          const  verifiedLandowners = data.filter(
            (user) => user.role === 'Landowner' && user.status === 'Verify By Admin' && user.email !== email && user.land_city && user.land_city.toUpperCase() === location.toUpperCase());
          
        
        setProfile(selected);
        setLandowners(verifiedLandowners);
      } catch (err) {
        setError(err.message);
        toast.error('Failed to load landowners');
      }
    };

    const minLoadingTime = () => new Promise(resolve => setTimeout(resolve, 5000));

    Promise.all([minLoadingTime(), fetchLandowners()]).then(() => {
      setLoading(false);
    });
  }, []);


  const handleViewDetail = (landowner) => {
    setSelectedLandowner(landowner);
    setShowModal(true);
  };

  const button=(landowner)=>{

        if(profile[0].status === "pendding"){
          toast.error("your request are pending");
          return;
        }
        if(profile[0].status === "Block"){
          toast.error("your account have been block by admin");
          return;
        }
    
        setSelectedLandowner(landowner);
        setShowModal1(true);


  }



  if (loading){
    return(
      <div className='p-3'>
        <div className="flex flex-col items-center text-center">
          <img src={logo} className='w-15 h-15 animate-pulse'/>
          <h3 className="text-3xl font-bold text-green-600 animate-pulse">Available Landowners</h3>
          <p>Find the best landowners according your city <span className='text-2xl text-green-600'>{location}</span></p>
        </div>
    
      <div className="fixed top-80 left-150">
        <div>
            <div>
              <Lottie animationData={loder} loop={true}  className='h-20 w-full'/>
            </div>
            <div className='text-center'>
              <p>Loding...</p>
            </div>
        </div>
        
      </div>
    </div>
      
    
    
  );
    
  }
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  if (landowners.length === 0) return( 
    <div className="text-center py-10">
        <div className="flex flex-col items-center text-center">
          <img src={logo} className='w-15 h-15'/>
          <h3 className="text-3xl font-bold text-green-600 animate-pulse">Available Landowner</h3>
          <p>Find the best Manager according your city <span className='text-2xl text-green-600'>{location}</span></p>
          <p className='absolute bottom-40'>User can not found</p>
        </div>
    </div>);

  return (
    
    <div className="p-3">
        
      <Toaster />
        <div className="flex flex-col items-center text-center">
          <img src={logo} className='w-15 h-15 animate-pulse'/>
          <h3 className="text-3xl font-bold text-green-600 ">Available Landowners</h3>
          <p>Find the best landowners according your city <span className='text-2xl text-green-600'>{location}</span></p>
        </div>

        <div className='w-full h-80 overflow-scroll scrollbar-hide'>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1.0, x: 0 }}
                  transition={{ duration: 1.0 }}
                  className="w-full"
                >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-5 ">
                {landowners.map((landowner) => (
                  <div
                    key={landowner._id}
                    className="bg-gray-100/40 rounded-lg shadow-md  hover:shadow-lg hover:scale-105 transition-shadow duration-300 p-4 border border-gray-200"
                  >
                    <div className="flex items-center mb-3 gap-4">
                                  <div className="w-15 h-15 bg-green-200 rounded-full flex items-center justify-center shadow-lg">
                                    <span className='text-lg'>{landowner.name.split(" ").map((n)=>n[0]).join("").toUpperCase()}</span>
                                  </div>
                      <h3 className="text-lg font-semibold text-gray-800">{landowner.name.toUpperCase()}</h3>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <SlLocationPin className="mr-2" />
                        {landowner.land_location}
                      </div>
                      <div className="flex items-center">
                        <SlPhone className="mr-2" />
                        {landowner.phone}
                      </div>
                      <div className="flex items-center">
                        <SlEnvolope className="mr-2" />
                        {landowner.email}
                      </div>
                      <p className="text-gray-500">{landowner.experience}</p>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => handleViewDetail(landowner)}
                        className="flex-1 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors duration-200"
                      >
                        View Detail
                      </button>
                      <button
                      onClick={()=>button(landowner)}
                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors duration-200 flex items-center justify-center"
                      >
                        <IoMdSend className="mr-1" />
                        Send Request
                      </button>
                    </div>
                  </div>
                ))}
            </div>
         </motion.div>
        </div>

      <AnimatePresence initial={false}>
        {showModal && selectedLandowner &&  (
          <motion.div 
            initial={{opacity:0,y:0}}
            animate={{opacity:1.0,y:0}}
            exit={{opacity:0,y:0}}
            transition={{duration:0.5}}
            
            >
           <Viewprofile name={selectedLandowner} onClose={() => setShowModal(false)} />
          </motion.div>
        )}
      </AnimatePresence>

     <AnimatePresence> 
        <motion.div 
          initial={{opacity:0,y:0}}
          animate={{opacity:1.0,y:0}}
          exit={{opacity:0,y:0}}
          transition={{duration:0.5}}
        >
        {showModal1  && selectedLandowner && (
          <Proposal name={selectedLandowner} onClose={() => setShowModal1(false)} />
        )}
        </motion.div>
      </AnimatePresence>  
    </div>
  );
};

export default Landownerlist;
