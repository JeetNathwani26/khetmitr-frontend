import React, { useState,useEffect } from 'react';
import { SlPeople,SlCheck, SlClock,SlNote } from "react-icons/sl";
import AdminPieChart from './chart';
import { AnimatePresence, motion } from "motion/react"
const API_URL = import.meta.env.VITE_BACKEND_URL;

const Dashboard = () => {
    const [user,setUser]=useState([]);
    const [proposal,setProposal]=useState([]);
    
    useEffect(() => {
      const fetchdata = async () => {
        try {
          const res = await fetch(`${API_URL}/get_data`);
          const data = await res.json();
          if (!Array.isArray(data)) {
            console.error("Data is not an array", data);
            return;
          }
          setUser(data);
          console.log(data);
        } catch (err) {
          console.error("Error loading JSON:", err);
        }
      };
      const fetchprposal = async () => {
        try {
          const res = await fetch(`${API_URL}/get_proposal`);
          const data = await res.json();
          if (!Array.isArray(data)) {
            console.error("Data is not an array", data);
            return;
          }
          setProposal(data);
          console.log(data);
        } catch (err) {
          console.error("Error loading JSON:", err);
        }
      };
      Promise.all([fetchdata(), fetchprposal()]);
      const interval = setInterval(fetchdata, 1000);

      return () => clearInterval(interval);
    }, []);


    

    const Manager=user.filter((u) => u.role === "Manager"); 
    const Landowner=user.filter((u) => u.role === "Landowner"); 
    const verify=user.filter((u) =>  u.status !=="pendding");
    const Pendding=user.filter((u) =>  u.status ==="pendding"); 
    const Toatal=user.length 
    const Total_proposal=proposal.length
    const Accepted=proposal.filter((u)=> u.status === "Accepted");
    const Rejected=proposal.filter((u)=>u.status === "Rejected");
    const pending=proposal.filter((u)=>u.status === "pending");

    return (
        <div className='absolute left-60 top-15 p-5'>
                         <motion.div
                           initial={{ opacity: 0, y: -20 }}
                           animate={{ opacity: 1.0, y: -10 }}
                           transition={{ duration: 1.0 }}
                      
                         >
                          <div>

                              <div className='flex flex-row gap-10'>
                                  <div className=" p-7 bg-gray-100/50 drop-shadow-md backdrop-blur-lg
                                rounded-2xl flex-col gap-5 border-0 border-green-100 
                                shadow-2xl">
                                      <p className='pb-3 flex items-center gap-10'>Total Users <SlPeople size={25} /></p>
                                      <p className='pb-2 text-center'>{Toatal}</p>
                                      <span className='text-sm text-center'>Across both categories</span>
                                  </div>
                                  <div className=" p-7 bg-gray-100/50 drop-shadow-md backdrop-blur-lg
                                rounded-2xl flex-col gap-5 border-0 border-green-100 
                                shadow-2xl">
                                      <p className='pb-3 flex items-center gap-10'>Verify User <SlCheck size={25}  className='text-green-800'/></p>
                                      <p className='pb-2 text-center'>{verify.length}</p>
                                      <span className='text-sm text-center'>Across both categories</span>
                                  </div>
                                  <div className=" p-7 bg-gray-100/50 drop-shadow-md backdrop-blur-lg
                                rounded-2xl flex-col gap-5 border-0 border-green-100 
                                shadow-2xl">
                                      <p className='pb-3 flex items-center gap-10'>Pendding Users <SlClock size={25}  className='text-yellow-600'/></p>
                                      <p className=' pb-2 text-center'>{Pendding.length}</p>
                                      <span className='text-sm text-center'>Across both categories</span>
                                  </div>
                                  <div className=" p-7 bg-gray-100/50 drop-shadow-md backdrop-blur-lg
                                rounded-2xl flex-col gap-5 border-0 border-green-100 
                                shadow-2xl">
                                      <p className='pb-3 flex items-center gap-10'>Proposal <SlNote size={25} /> </p>
                                      <p className='pb-2 text-center'>{proposal.length}</p>
                                      <span className='text-sm text-center'>Across both categories</span>
                                  </div>
                              </div>

                              <div className='pt-5'>
                                <AdminPieChart manager={Manager.length} landowner={Landowner.length} proposal={Total_proposal} acc={Accepted.length} rej={Rejected.length} pen={pending.length}/>
                              </div>
              
                          </div>
                        </motion.div> 
                         
            
        </div>
    );
};

export default Dashboard;
