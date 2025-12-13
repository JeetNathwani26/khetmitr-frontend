import React, { useState, useEffect } from "react";
import { IoMdClose, IoMdSend } from "react-icons/io";
import { SlEnvolope, SlPhone, SlLocationPin, SlCalender, SlUser, SlPaperPlane, SlEnvolopeLetter } from "react-icons/sl";
import {toast,Toaster } from 'react-hot-toast';


const API_URL = import.meta.env.VITE_BACKEND_URL;


const Viewprofile = ({ name,profile ,onClose }) => {
  const [view, setView] = useState(false);
  const [selectDo, setSelectDo] = useState(null);
  const [open,setOpen]=useState(false);
  const [reportText, setReportText] = useState("");

  const viewReportFrom=(e)=>{
    e.preventDefault();
    const email=name.email;
    const sendemail=localStorage.getItem("userEmail");
    const role=name.role;
    fetch(`${API_URL}/add_report`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email, sendemail:sendemail, report:reportText,role:role
        ,status:"Pending",})
        }).then((res) => {
          const data=res.json();
          if (!res.ok) throw new Error("Failed to send report");
          if(data.message === "Report already submitted"){
            toast("Report already submitted");
          }

          
        }).then((data) => {
          toast.success("Report sent successfully");
          setOpen(false);
          setReportText("");
        }).catch((err) => {
          toast.error(err.message);
        });
  }

  let statusElement;

  if (name.status === "Verify By Admin") {
    statusElement = <span className="text-green-600 font-semibold">✅ Verified by Admin</span>;
  } else if (name.status === "Block") {
    statusElement = <span className="text-red-600 font-semibold">🚫 Blocked</span>;
  } else {
    statusElement = <span className="text-yellow-600 font-semibold">⏳ Pending</span>;
  }

  const handleopen=()=>{
    
    
    if(profile[0].status === "pendding")
    {
      toast("Your request are pending ");
    }else if(profile[0].status === "Block"){
      toast("Your Profile has been block by admin");
    }
    else{
      setOpen(!open);
    }
   
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex justify-center items-center z-50">
      <Toaster/>
      <div className="bg-white w-full max-w-4xl h-[90vh] rounded-xl shadow-xl relative p-4 mx-4">
        <button
          className="absolute right-3 top-3 text-2xl text-red-400 cursor-pointer z-10"
          onClick={onClose}
        >
          <IoMdClose />
        </button>

        <div className=" w-full h-120 overflow-scroll scrollbar-hide p-6">
          <div className="border border-gray-100 shadow-sm p-4 mb-4 rounded-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{name.name.toUpperCase()}</h2>
            <p className="text-gray-600 mb-2">{name.experience}</p>
            <div>{statusElement}</div>
          </div>

          <div className="border border-gray-100 shadow-sm p-4 mb-4 rounded-lg">
            <h3 className="font-semibold mb-3 text-gray-700">Personal Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700">
              <div className="flex items-center gap-2">
                <SlEnvolope className="text-green-500" />
                {name.email}
              </div>
              <div className="flex items-center gap-2">
                <SlPhone className="text-green-500" />
                {name.phone}
              </div>
              <div className="flex items-center gap-2">
                <SlLocationPin className="text-green-500" />
                {name.location}
              </div>
              <div className="flex items-center gap-2">
                <SlCalender className="text-green-500" />
                Applied: {name.appliedDate}
              </div>
              <div className="flex items-center gap-2">
                <SlUser className="text-green-500" />
                Aadhar ID: {name.adhar}
              </div>
              <div className="flex items-center gap-2">
                <SlCalender className="text-green-500" />
                DOB: {name.DOB}
              </div>
            </div>
          </div>


          {/* Skills for Managers */}
          {name.role === "Manager" && name.skills && (
            <div className="border border-gray-100 shadow-sm p-4 mb-4 rounded-lg">
              <h3 className="font-semibold mb-3 text-gray-700">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {(Array.isArray(name.skills) ? name.skills : name.skills.split(',').map(s => s.trim()).filter(Boolean)).map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-full bg-gray-50"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Land Details if applicable */}
          {name.role !== "Manager" && (
            <div className="border border-gray-100 shadow-sm p-4 mb-4 rounded-lg">
              <h3 className="font-semibold mb-3 text-gray-700">Land Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p><strong>Survey Number:</strong> {name.land_number}</p>
                  <p><strong>Land Size:</strong> {name.landsize}</p>

                </div>
                <div>
                  <p><strong>Soil Type:</strong> {name.soil}</p>
                  <p><strong>Land Location:</strong> {name.land_location}</p>
                </div>
                <div>
                  <p><strong>land P:</strong> {name.p}</p>
                  <p><strong>land K:</strong> {name.k}</p>
                </div>
                <div>
                  <p><strong>pH:</strong> {name.ph}</p>
                  <p><strong>N:</strong> {name.N}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/*{showMessage && <Message name1={name} onCloseMessage={() => setShowMessage(false)} />}*/}
        <button

          className="w-70 absolute bottom-4 left-1/2 transform -translate-x-1/2
            bg-gray-900 text-white py-3 rounded hover:bg-gray-950 transition-colors cursor-pointer"
            onClick={()=>handleopen()}
        >
          Report
        </button>
        {open &&(
            <div>
              <form className="absolute bottom-10 right-1 flex flex-col gap-4 w-120 p-3">
                <textarea
                  className="w-full h-12 p-2 border border-gray-300 bg-white rounded"
                  placeholder="Eg : User is not trustworthy, spamming, fake profile etc..."
                  onChange={(e)=>setReportText(e.target.value)}
                ></textarea>
                <button
                  type="submit"
                  className="self-end px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors "
                  onClick={viewReportFrom}
                >
                  <IoMdSend className="inline-block mr-2" />
                  Send Report
                </button>
              </form>
            </div>
        )}
      </div>

    </div>
  );
};



export default Viewprofile;
