import React, { useState, useEffect } from 'react';
import Usernav from '../../components/Usernav';
import Viewpdf from '../../components/Viewpdf';
import Lottie from 'lottie-react';
import loder from '../../assets/animation/a5haOnj6gP.json';
import {motion} from "motion/react"
import { AiOutlineUser, AiOutlineMail, AiOutlineIdcard, AiOutlinePhone, AiOutlineEnvironment, AiOutlineCheckCircle, AiOutlineFileText, AiOutlineGlobal } from 'react-icons/ai';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [view, setView] = useState(false);
  const [selectDo, setSelectDo] = useState(null);
  
    const openPdf = (doc) => {
      setView(true);
      setSelectDo(doc);
    };

  useEffect(() => {
    const fetchUser = async () => {
      const email = localStorage.getItem('userEmail');
      if (!email) {
        setError('No user logged in');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('https://khetmitra-backend.onrender.com/get_data', {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        const currentUser = data.find((u) => u.email === email);
        if (currentUser) {
          setUser(currentUser);
        } else {
          setError('User not found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setTimeout(()=>setLoading(false),5000);
      }
    };
    fetchUser();
    const timer = setTimeout(() => setShow(false), 6000); 
    return () => clearTimeout(timer);
    
  }, []);

  if (loading) {
    return (
      <div className='fixed top-0 left-0  bg-gradient-to-t from-green-100/50 to-white-100  h-screen w-screen'>
        <Usernav />
        <div className="flex justify-center items-center flex-col pt-65 ">
          <div>
            <Lottie animationData={loder} loop={true} className='h-20 w-full' />
          </div>
          <p>Loding...</p>
          
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Usernav />
        <div className="flex justify-center items-center">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }
  const getStatusIcon = () => {
    if (user.status === "Verify By Admin") return <AiOutlineCheckCircle className="text-green-600" size={20} />;
    if (user.status === "Block") return <AiOutlineGlobal className="text-red-600" size={20} />;
    return <AiOutlineFileText className="text-yellow-600" size={20} />;
  };

  const getStatusText = () => {
    if (user.status === "Verify By Admin") return "Verified by Admin";
    if (user.status === "Block") return "Blocked";
    return "Pending";
  };

  return (

      <div className="fixed top-0 left-0  bg-gradient-to-t from-green-100/50 to-white-100  h-screen w-screen  ">
        <Usernav />
            <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1.0, y: 0 }}
                  transition={{ duration: 1.0 }}
                  className="w-full"
    >
        <div className="container mx-auto px-4 py-8  max-h-screen md:h-126 w-full overflow-y-auto scrollbar-hide ">
          {/* Profile Header */}
          <div className="bg-gray-100/50 shadow-lg rounded-2xl p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <div className="w-20 h-20 bg-green-200 rounded-full flex items-center justify-center shadow-lg">
                <span className='text-3xl'>{user.name.split(" ").map((n)=>n[0]).join("").toUpperCase()}</span>
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-2xl font-bold text-gray-800">{user.name.toUpperCase() || 'N/A'}</h1>
                <p className="text-green-700 text-lg font-medium">{user.role}</p>
                <div className="flex items-center justify-center md:justify-start mt-2 space-x-2">
                  {getStatusIcon()}
                  <span className="text-gray-700 font-medium">{getStatusText()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* User Details */}
          <div className="bg-gray-100/50 shadow-lg rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <AiOutlineMail className="text-gray-500" size={20} />
                <div>
                  <label className="block text-gray-700 font-medium text-sm">Email</label>
                  <p className="text-gray-900">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <AiOutlinePhone className="text-gray-500" size={20} />
                <div>
                  <label className="block text-gray-700 font-medium text-sm">Phone</label>
                  <p className="text-gray-900">{user.phone || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <AiOutlineEnvironment className="text-gray-500" size={20} />
                <div>
                  <label className="block text-gray-700 font-medium text-sm">Location</label>
                  <p className="text-gray-900">{user.location || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <AiOutlineIdcard className="text-gray-500" size={20} />
                <div>
                  <label className="block text-gray-700 font-medium text-sm">Role</label>
                  <p className="text-gray-900">{user.role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Role-specific Sections */}
          {user.role === 'Landowner' && (
            <div className="bg-gray-100/50 shadow-lg rounded-2xl p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Land Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Land Size</label>
                  <p className="text-gray-900">{user.landsize || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Land Location</label>
                  <p className="text-gray-900">{user.land_location || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Land ph</label>
                  <p className="text-gray-900">{user.ph || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Land ph</label>
                  <p className="text-gray-900">{user.ph || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Land N</label>
                  <p className="text-gray-900">{user.N || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Land K</label>
                  <p className="text-gray-900">{user.k || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Land P</label>
                  <p className="text-gray-900">{user.p || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Land Soil</label>
                  <p className="text-gray-900">{user.soil|| 'N/A'}</p>
                </div>
              </div>
            </div>
          )}

          {user.role === 'Manager' && (
            <div className="bg-gray-100/50 shadow-lg rounded-2xl p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Manager Skills</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {(Array.isArray(user.skills) ? user.skills : user.skills.split(',').map(s => s.trim()).filter(Boolean)).map((skill, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-gray-900">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Documents */}
          <div className="bg-gray-100/50 shadow-lg rounded-2xl p-6 mb-20">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Documents</h2>
            <div className="flex flex-wrap gap-3">
              {user.documents && user.documents.map((doc, idx) => (
                <button
                  key={idx}
                  onClick={() => openPdf(doc)}
                  className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-full hover:bg-green-50 transition-colors shadow-sm"
                >
                  <AiOutlineFileText size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-700">{doc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        </motion.div>

        {view && <Viewpdf name={selectDo} onClose={() => setView(false)} />}
      </div>
  );
};

export default Profile;
