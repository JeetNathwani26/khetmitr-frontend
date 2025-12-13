import { useEffect, useState } from 'react';
import Adminnav from "../../components/Adminnav";
import Viewpdf from '../../components/Viewpdf';
import Smnav from '../../components/Smnav';
import { toast, Toaster } from 'react-hot-toast';
import {motion,AnimatePresence} from "motion/react";
import { SlEnvolope, SlPhone, SlLocationPin, SlCalender, SlCheck, SlClose, SlClock } from "react-icons/sl";
const API_URL = import.meta.env.VITE_BACKEND_URL;

const sendmail = async(item) => {
    const mailsend=fetch(`${API_URL}/sendmail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            to: item.email,
            subject: "Manager Verification Successful",
            text: `
  <div style="font-family: Arial, sans-serif; color: #333; text-align: center;">
    <img src="https://raw.githubusercontent.com/JeetNathwani26/image/refs/heads/main/logo.png" alt="Welcome" width="200" style="margin-bottom: 20px;" />
    <h2>Hey ${item.name}! 👔</h2>
    <p style="font-size: 16px;">
      Great news — your manager application has been <b style="color:green;">VERIFIED ✅</b><br/>
      Welcome aboard the <b>KhetMitra</b> team! 🌾
    </p>
    <p style="font-size: 16px;">
      We look forward to your contributions and leadership.<br/>
      <b>Exciting journey ahead!</b>
    </p>
    <a href="https://9732c7l9-5173.inc1.devtunnels.ms/" 
       style="display:inline-block; margin-top:20px; padding:10px 20px; background:#16a34a; color:white; text-decoration:none; border-radius:8px;">
      Go to Dashboard
    </a>
    <p style="margin-top: 20px; font-size: 14px; color: #666;">
      Cheers,<br/>🌿 The KhetMitra Team
    </p>
  </div>
            `
        }),
    })
    .then((res) => {
        if(!res.ok) throw new Error("Failed to send mail") 
            return res.json()
    });

    toast.promise(
        mailsend,{
            loading: "Sending message...",
            success: "Message sent successfully!",
            error: "Failed to send message.",
        }
    );
};

const rejectmail = async (item) => {
   const mailsend= fetch(`${API_URL}/sendmail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            to: item.email,
            subject: "Manager Application Rejected",
            text: `
  <div style="font-family: Arial, sans-serif; color: #333; text-align: center;">
    <img src="https://raw.githubusercontent.com/JeetNathwani26/image/refs/heads/main/logo.png" alt="Welcome" width="200" style="margin-bottom: 20px;" />
    <h2>Dear ${item.name},</h2>
    <p style="font-size: 16px;">
      We regret to inform you that your manager application has been <b style="color:red;">REJECTED ❌</b>.<br/>
      Thank you for your interest in joining <b>KhetMitra</b>.
    </p>
    <p style="font-size: 16px;">
      If you’d like feedback, feel free to reach out. You’re welcome to reapply in the future.
    </p>
    <p style="margin-top: 20px; font-size: 14px; color: #666;">
      Best regards,<br/>🌿 The KhetMitra Team
    </p>
  </div>
            `
        }),
    })
    .then((res) => {
        if(!res.ok) throw new Error("Failed to send mail") 
            return res.json()
    });

    toast.promise(
        mailsend,{
            loading: "Sending message...",
            success: "Message sent successfully!",
            error: "Failed to send message.",
        }
    );
};

const remove_data = (item) => {
    fetch(`${API_URL}/block`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: item.email,role:item.role,status:"Verify By Admin"}),
    }).then((res) => {
      if (!res.ok) throw new Error("Failed to verify user");
      return res.json();
    });
};

const remove = (item) => {
    fetch(`${API_URL}/block`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: item.email,role:item.role,status:"Reject"}),
    }).then((res) => {
      if (!res.ok) throw new Error("Failed to verify user");
      return res.json();
    });
};

const ManagerPending = () => {
    const [user, setUser] = useState([]);
    const [managers, setManagers] = useState([]);
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [viewedDocs, setViewedDocs] = useState([]);


useEffect(() => {
  const fetchdata=()=>{fetch(`${API_URL}/get_data`) 
    .then((res) => res.json())           
    .then((data) => {
      setUser(data);  
      const mdata = data.filter((u) => u.role === "Manager" && u.status ==="pendding"); 
      setManagers(mdata); 
    })
    .catch((err) => console.error("Error loading JSON:", err));
   }; 

    fetchdata();
    const interval = setInterval(fetchdata, 2000);

    return () => clearInterval(interval); 
}, []); 

const pdata=user.filter((u) => u.role === "Manager" && u.status !=="pendding"); 
  const links = [
    { name: `Manager(${pdata.length})`, path: "/manager" },
    { name: `Pendding(${managers.length})`, path: "/mpending" },
  ];

    const handleDocClick = (doc) => {
        if (viewedDocs.length >= 3 && !viewedDocs.includes(doc)) {
            toast.error("You have already viewed all required documents.", { duration: 1500 });
            return;
        }
        setSelectedDoc(doc);

        if (!viewedDocs.includes(doc)) {
            setViewedDocs((prev) => [...prev, doc]);
        }
    };



    const verify = (item) => {
        if (viewedDocs.length === 1) {
            toast.success("Manager verified successfully!", { duration: 1000 });
            sendmail(item);
            remove_data(item)
            setViewedDocs([]);
            
        } else {
            toast.error("Please view all documents before verification.", { duration: 1000 });
        }
    };

        const reject = (item) => {
           if(viewedDocs.length===1){
            toast.success("Landowner rejected successfully!",{duration:1000});
            rejectmail(item);
            remove(item);
            setViewedDocs([]); 
            return;
            }else{
                    toast.error("Please view all documents before verification.",{duration:1000});
                    return;
            }
        };



    return (
        <div className='bg-gradient-to-t from-green-100/80 to-white-100/30 h-screen w-screen'>
            <Toaster position="bottom-center" />
            <Adminnav />

            <div className='absolute top-25 left-65 p-2 w-245 h-10 rounded-full bg-gray-50/70 drop-shadow-md backdrop-blur-lg shadow-2xl text-center'>
                <Smnav links={links} />
            </div>

            <div className="absolute top-40 left-60 w-[80%] h-[70%] overflow-y-auto p-5 scrollbar-hide">
                {managers.map((item, index) => (
                    <div key={index} className="w-full h-[75%] mb-5 bg-gray-100/30 drop-shadow-md backdrop-blur-lg rounded-2xl shadow-lg">
                        <div className='p-5 flex flex-row gap-5 items-center'>
                            <div className='w-13 h-13 rounded-full bg-gray-50/70 drop-shadow-md backdrop-blur-lg shadow-lg'>
                                <p className='p-3 text-center text-lg text-green-600'>
                                    {item.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
                                </p>
                            </div>
                            <div>
                                <h1 className='text-2xl'>{item.name}</h1>
                                <p className='text-sm text-center'>{item.experience}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-10 pl-10 pb-5">
                            <div className='flex flex-col gap-4'>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <SlEnvolope /> {item.email}
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <SlPhone /> {item.phone}
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <SlLocationPin /> {item.location}
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <SlCalender /> Applied: {item.appliedDate}
                                </div>
                            </div>

                            <div>
                                            <div>
                                                            <p className="text-gray-800">
                                                                    <span className="font-semibold">Manager Skills:</span>
                                                                    {item.skills}
                                                            </p>
                                            </div>
                                <p className="font-semibold text-gray-800">Documents:</p>
                                <div className="flex flex-col gap-2">
                                    {item.documents &&
                                        item.documents.map((doc, idx) => (
                                            <span
                                                key={idx}
                                                onClick={() => handleDocClick(doc)}
                                                className={`px-3 py-1 text-sm border w-40 border-gray-300 rounded-full cursor-pointer 
                                                    ${viewedDocs.includes(doc)
                                                        ? "bg-green-500/30"
                                                        : "bg-gray-50 hover:bg-gray-500/30"
                                                    }`}>
                                                {doc}
                                            </span>
                                        ))}
                                </div>
                            </div>

                            <div>
                                <div className="flex flex-col gap-6">
                                    <button
                                        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-green-700 w-30" onClick={()=>verify(item)}
                                    >
                                        <SlCheck /> Verify
                                    </button>
                                    <button
                                        className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 w-30 cursor-pointer" 
                                        onClick={() => reject(item)}
                                    >
                                        <SlClose /> Reject
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <AnimatePresence >
                    <motion.div
                      initial={{ opacity: 0, y: 0 }}
                      animate={{ opacity: 1.0, y: 0 }}
                      exit={{ opacity: 0, y: 0 }}
                      transition={{ duration: 0.5 }}
                    > 
                 <Viewpdf name={selectedDoc} onClose={() => setSelectedDoc(null)} />
                   </motion.div>
            </AnimatePresence>      
        </div>
    );
};

export default ManagerPending;
