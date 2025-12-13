import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Adminnav from "../../components/Adminnav";
import { motion } from "motion/react";
const API_URL = import.meta.env.VITE_BACKEND_URL;
const Report = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/get_reports`, {
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => setReports(data))
    .catch(err => toast.error('Failed to load reports'));
  }, []);

  const block = async (item) => {
    try{
      await toast.promise(
        fetch(`${API_URL}/sendmail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: item,
          subject: "Account Blocked",
          text: `
            <div style="font-family: Arial, sans-serif; color: #333; text-align: center;">
              <img src="https://raw.githubusercontent.com/JeetNathwani26/image/refs/heads/main/logo.png" alt="KhetMitra" width="200" style="margin-bottom: 20px;" />
              <h2>Dear ${item.name},</h2>
              <p style="font-size: 16px;">Your account has been <b style="color:red;">BLOCKED 🚫</b> by the admin due to multiple reports against you.<br/>You will no longer have access to the KhetMitra manager dashboard.</p
              <p style="font-size: 16px;">If you believe this is a mistake or have any questions, please contact support.<br/>Thank you for your understanding.</p
              <p style="margin-top: 20px; font-size: 14px; color: #666;">

                Best regards,<br/>🌿 The KhetMitra Team
              </p>
            </div>
          `,
        }),
      }),
      {
        loading: "Sending block notification...",
        success: "Block notification sent successfully!",
        error: "Failed to send block notification.",
      }
      );
    }catch(err){
      toast.error(err.message);
      return;
    }    
  };


const bloks=async (item)=>{
  const email= item.email;
  await fetch(`${API_URL}/block`,{
    method:"POST",
    headers: { "Content-Type": "application/json" },
    body:JSON.stringify({"email":item.email,"role":item.role,"status":"Block"})
  }).then((res) => {
      if (!res.ok) throw new Error("Failed to verify user");
      return res.json();
    });
    toast.success("User Blocked");

  };

  const handleClose = (id) => {
    fetch(`${API_URL}/close_report`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    .then(res => res.json())
    .then(() => {
      toast.success('Report closed');
      // Refetch reports to update the list
      fetch(`${API_URL}/get_reports`, {
        credentials: 'include'
      })
      .then(res => res.json())
      .then(data => setReports(data))
      .catch(err => toast.error('Failed to reload reports'));
    })
    .catch(err => toast.error('Failed to close report'));
  };

  return (
    <div className="bg-gradient-to-t from-green-100/80 to-white-100/30 h-screen w-screen">
      <Toaster />
      <Adminnav />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden"
      >      
     
      <div className='absolute left-70 top-15 p-5 overflow-y-auto h-[85vh] scrollbar-hide '>
        <h1 className="text-2xl font-bold mb-4 text-green-600 text-center">Reports</h1>
        {reports.length === 0 ? (
          <p className="text-gray-600">No reports available.</p>
        ) : (
          reports.map(report => (
            <div key={report._id} className="p-7 bg-gray-100/50 w-200  rounded-2xl flex-col gap-5 border-0 backdrop-blur-md  shadow-md  mb-4 ">
              <p className="pb-2"><strong className="text-green-600">Reported User:</strong> {report.email}</p>
              <p className="pb-2"><strong className="text-green-600">Reported By:</strong> {report.sendemail}</p>
              <p className="pb-4"><strong className="text-green-600">Report:</strong> {report.report}</p>
              <div className="flex gap-4">
                <button
                  onClick={() => {block(report);bloks(report);handleClose(report._id);}}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                >
                  Block User
                </button>
                <button
                  onClick={() => handleClose(report._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Close Report
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      </motion.div>
    </div>
  );
};

export default Report;
