import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { SlPaperPlane } from "react-icons/sl";
import Update from "../../components/password";
import logo from "../../assets/photo/logo.png"
import logo1 from '../../assets/photo/logo2.png';
import { motion } from "motion/react";
const API_URL = import.meta.env.VITE_BACKEND_URL;

async function sendOtpEmail(userEmail, otp) {
  return fetch(`${API_URL}/sendmail`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to: userEmail,
      subject: "Your OTP Code",
      text: `
        <div style="font-family: Arial, sans-serif; color: #333; text-align: center;">
          <img src="https://raw.githubusercontent.com/JeetNathwani26/image/refs/heads/main/logo.png" alt="KhetMitra" width="200" style="margin-bottom: 20px;" />
          <h2>Hello,</h2>
          <p style="font-size: 16px;">Your One-Time Password (OTP) is:</p>
          <h1 style="color:#2e7d32; margin: 10px 0;">${otp}</h1>
          <p style="font-size: 16px;">This OTP will expire in 2 minutes.</p>
          <p style="margin-top: 20px; font-size: 14px; color: #666;">
            Best regards,<br/>🌿 The KhetMitra Team
          </p>
        </div>
      `,
    }),
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to send mail");
    return res.json();
  });
}

const Forget = () => {
  const [email, setEmail] = useState("");
  const [mview, setMview] = useState(false);
  const [generate, setGenerate] = useState(null);
  const [user, setUser] = useState([]);
  const [close,setClose]=useState(false);
  const [otp, setOtp] = useState("");
  const [up, setUp] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (timeLeft === 0) {
      setGenerate(null);
      toast.error("OTP expired. Please request a new one.");
    }
  }, [timeLeft]);
  // Fetch user data whenever email changes
  useEffect(() => {
    if (!email) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/get_data`);
        const data = await res.json();
        const mdata = data.filter((u) => u.email === email);
        setUser(mdata);
      } catch (err) {
        console.error(err);
        toast.error("User not found or cannot fetch data");
      }
    };

    fetchData();
  }, [email]);



  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email first.");
      return;
    }

    if (user.length === 0) {
      toast.error("Email not registered.");
      return;
    }

    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGenerate(newOtp);

    try {
      await toast.promise(sendOtpEmail(email, newOtp), {
        loading: "Sending OTP...",
        success: "OTP sent successfully!",
        error: "Failed to send OTP.",
      });
      setMview(true); // show OTP input after successful send
      setTimeLeft(120); // start 2-minute timer
    } catch (err) {
      console.error(err);
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error("Please enter OTP!");
      return;
    }

    if (otp.trim() === generate) {
      toast.success("✅ OTP verified successfully!",{
        duration:1000,
      });
        setTimeout(() => {
          setUp(true);
        }, 1000);
      setMview(false);
    } else {
      toast.error("❌ Invalid OTP. Please try again.");
    }
  };

  return (

<div className="fixed top-0 left-0 bg-gradient-to-t from-green-100/50 to-white w-screen min-h-screen pt-2 p-5">
  <Toaster />

  {/* Logo */}
  <div className="flex justify-center md:justify-start">
    <div className="pl-0 md:pl-7">
      <img 
        src={logo} 
        alt="Logo" 
        className="h-20 w-40 md:h-[120px] md:w-[200px]"
      />
    </div>
  </div>
  <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        >
  {/* Main Form */}
  <div className="flex justify-center w-full mt-6 ">
    <div className="flex flex-col gap-5 p-6 pb-14 bg-gray-100/70 drop-shadow-md backdrop-blur-lg rounded-2xl shadow-lg w-full max-w-md ">
        <div className="flex flex-col items-center text-center">
          <img src={logo1} className='w-15 h-15 animate-pulse'/>
          <h3 className="text-3xl font-bold text-green-600">Password Recovery</h3>
        </div>

      {/* Email + Send OTP */}
      <form  className="flex flex-col sm:flex-row gap-3 w-full">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 pl-3 p-2 rounded bg-gray-50/70 shadow-inner focus:outline-none"
        />
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-green-500 text-white px-5 py-2 rounded hover:bg-green-600 w-full sm:w-auto"
          onClick={handleSendOtp}
        >
          <SlPaperPlane />
          Send OTP
        </button>
      </form>

      {/* OTP Input */}
      {mview && (
        <>
          <form onSubmit={handleVerifyOtp} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="flex-1 pl-3 p-2 rounded bg-gray-50/70 shadow-inner focus:outline-none"
              disabled={timeLeft === 0}
            />
          {(timeLeft === 0) ? (
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-green-500 text-white px-5 py-2 rounded hover:bg-green-600 w-full sm:w-auto"
          onClick={handleSendOtp}
        >
          <SlPaperPlane />
          Send OTP
        </button>
          ):(
            <button
              type="submit"
              disabled={timeLeft === 0 || !otp}
              className={`px-5 py-2 rounded w-full sm:w-auto ${timeLeft === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
              onClick={handleVerifyOtp}
            >
              Verify
            </button>
          )}

          </form>
          {timeLeft !== null && (
            <div className="mt-2 text-center">
              <span className="text-red-500 font-bold">
                Time left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
            </div>
          )}

        </>
      )}

      {/* Password Update */}
      {up && <Update email={email} />}
    </div>
  </div>
  </motion.div>
</div>
    

  );
};

export default Forget;
