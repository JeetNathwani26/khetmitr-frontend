import { useState, useEffect } from "react";
import Adminnav from "../../components/Adminnav";
import Smnav from "../../components/Smnav";
import Viewdetail from "../../components/Viewdetail";
import { SlEye, SlMagnifier, SlBan,SlLockOpen } from "react-icons/sl";
import{toast,Toaster} from 'react-hot-toast';
import { AnimatePresence, motion } from "motion/react"
const API_URL = import.meta.env.VITE_BACKEND_URL;

const block = async (item,text) => {
  const mailsend=fetch(`${API_URL}/sendmail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: item.email,
      subject: "Manager Account Blocked",
      text: text,
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


const bloks=(item,status)=>{
  fetch("/api/block",{
    method:"POST",
    headers: { "Content-Type": "application/json" },
    body:JSON.stringify({"email":item.email,"role":item.role,"status":status})
  }).then((res) => {
      if (!res.ok) throw new Error("Failed to verify user");
      return res.json();
    });
   const  text=`
        <div style="font-family: Arial, sans-serif; color: #333; text-align: center;">
          <img src="https://raw.githubusercontent.com/JeetNathwani26/image/refs/heads/main/logo.png" alt="KhetMitra" width="200" style="margin-bottom: 20px;" />
          <h2>Dear ${item.name},</h2>
          <p style="font-size: 16px;">
            Your Landowner account has been <b style="color:red;">BLOCKED 🚫</b> by the admin.<br/>
            You will no longer have access to the KhetMitra manager dashboard.
          </p>
          <p style="font-size: 16px;">
            If you believe this is a mistake or have any questions, please contact support.<br/>
            Thank you for your understanding.
          </p>
          <p style="margin-top: 20px; font-size: 14px; color: #666;">
            Best regards,<br/>🌿 The KhetMitra Team
          </p>
        </div>
      `;
    const    text1=`
        <div style="font-family: Arial, sans-serif; color: #333; text-align: center;">
          <img src="https://raw.githubusercontent.com/JeetNathwani26/image/refs/heads/main/logo.png" alt="KhetMitra" width="200" style="margin-bottom: 20px;" />
          <h2>Dear ${item.name},</h2>
          <p style="font-size: 16px;">
            ✅ Your account has been UNBLOCKED. You can now access the system.<br/>
            You will no longer have access to the KhetMitra manager dashboard.
          </p>
          <p style="font-size: 16px;">
            If you believe this is a mistake or have any questions, please contact support.<br/>
            Thank you for your understanding.
          </p>
          <p style="margin-top: 20px; font-size: 14px; color: #666;">
            Best regards,<br/>🌿 The KhetMitra Team
          </p>
        </div>
      `;  
  if(status=="Block"){
      block(item,text)
  }else{
    block(item,text1)
  }    
  
};


const Landhomes = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [users, setUsers] = useState([]);
  const [isopen,setIsopen]=useState(false);
  const [view,setView]=useState([]);
  const [fdata,setFdata]=useState([]);
  // fetch JSON once
useEffect(() => {
  const fetchdata=()=>{fetch(`${API_URL}/get_data`) 
    .then((res) => res.json())           
    .then((data) => {
      setFdata(data);
      const mdata = data.filter((u) => u.role === "Landowner" && u.status !=="pendding"); 
      setUsers(mdata); 
    })
    .catch((err) => console.error("Error loading JSON:", err));
   }; 

    fetchdata();
    const interval = setInterval(fetchdata, 2000);

    return () => clearInterval(interval); 
}, []); 


  // filter suggestions when query changes
  useEffect(() => {
    if (query.length > 0) {
      const filtered = users.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [query, users]);

  const pdata=fdata.filter((u) => u.role === "Landowner" && u.status ==="pendding"); 
  const links = [
    { name: `Landowner(${users.length})`, path: "/landowner" },
    { name: `Pending(${pdata.length})`, path: "/lpendding" },
  ];

  // pick list: suggestions if available, else full users
  const displayList = suggestions.length > 0 ? suggestions : users;
   const event=(item)=>{
    setIsopen(!isopen);
    setView(item);

    
  }

  return (


    <div className="bg-gradient-to-t from-green-100/80 to-white/30 h-screen w-screen">
       <Toaster position="bottom-center"/>
      <Adminnav />

      <div className="absolute top-25 left-65 p-2 w-245 h-10 rounded-full bg-gray-50/70 drop-shadow-md backdrop-blur-lg shadow-2xl text-center">
        <Smnav links={links} />
      </div>

<div className="relative  top-50 left-60 w-245">
  {/* Search Input */}
  <input
    type="text"
    placeholder="Search landowner..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    className="pl-10 p-2 rounded bg-gray-50/70 shadow-2xl drop-shadow-md backdrop-blur-lg w-full focus:outline-none"
  />

  {/* Search Icon (inside input) */}
  <SlMagnifier className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500 pointer-events-none" />
</div>



        {/* single table for both cases */}
        <div className="fixed w-245 p-5 bottom-5 left-60">
          <div className="rounded-sm bg-gray-100/70 drop-shadow-md backdrop-blur-lg shadow-2xl ">
            <table className="w-full ">
              <thead className="sticky top-0 bg-gray-300/70 z-10 ">
                <tr >
                  <th className="text-center p-2">Name</th>
                  <th className="text-center p-2">Actions</th>
                </tr>
              </thead>
            </table>

            {/* Scrollable body */}
            <div className="h-80 md:h-60 overflow-y-scroll scrollbar-hide">
              <table className="w-full ">
                <tbody>
                  {displayList.map((s, index) => (
                    <tr key={index} className="border-0 shadow-sm  hover:bg-gray-100 ">
                      <td className="p-4">{s.name}</td>
                      <td className="p-4 flex justify-center gap-2">
                        <button
                          type="button"
                          className="flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                          onClick={()=>event(s)}
                        >
                          <SlEye className="text-lg" />
                          <span>View</span>
                        </button>

                       {s.status==="Block"?(
                        <button
                          type="button"
                          className="bg-yellow-500 flex items-center gap-2 text-white cursor-pointer px-3 py-1 rounded hover:bg-yellow-600"
                          onClick={()=>bloks(s,"Verify By Admin")}
                        >
                          <SlLockOpen className="text-lg"/>
                          Unblock
                        </button>
                       ):(
                        <button
                          type="button"
                          className="bg-red-500 flex items-center gap-2 text-white cursor-pointer px-3 py-1 rounded hover:bg-red-600"
                          onClick={()=>bloks(s,"Block")}
                        >
                          <SlBan/>
                          Block
                        </button>
                       )}
                      </td>
                    </tr>
                  ))}
                  {displayList.length === 0 && (
                    <tr>
                      <td colSpan="2" className="p-4 text-center text-gray-500">
                        No results found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {isopen && <Viewdetail name={view} onClose={()=>setIsopen(false)}/>}
      </div>   
  );
};

export default Landhomes;
