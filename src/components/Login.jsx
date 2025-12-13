import React, { useState,useEffect } from 'react';
import { MdEmail,MdOutlinePassword} from "react-icons/md";
import logo from '../assets/photo/logo2.png';
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import{toast,Toaster} from 'react-hot-toast';
import ReCAPTCHA from "react-google-recaptcha";
import {motion} from "motion/react";
const API_URL = import.meta.env.VITE_BACKEND_URL;




const Login = () => {
  const [userToken, setUserToken] = useState(null);
  const navigate = useNavigate();
  const [admin,setadmin]=useState(null);
  const [email,setEmail]=useState("");
  const [user,setUser]=useState("");
  const [password, setpassword]=useState(null);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);



  useEffect(() => {
    // Load email from localStorage on mount
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    if (!email) return; // only run when email is set

    if (email === "admin") {
      navigate("/admin");
      return;
    }

    const fetchdata = async () => {
      try {
        const res = await fetch(`${API_URL}/get_data`);
        const data = await res.json();
        if (!Array.isArray(data)) {
          console.error("Data is not an array", data);
          return;
        }
        const mdata = data.filter((u) => u.email.toLowerCase() === email.toLowerCase());
        console.log("Matched data:", mdata);
        setUser(mdata);

        // ✅ Use mdata.length directly
        if (mdata.length === 0) {
          navigate("/Register");
        } else {
          localStorage.setItem('userRole', mdata[0].role);
          if (mdata[0].role === 'Landowner') {
           localStorage.setItem('location', mdata[0].land_city);
            navigate("/landowner_home");
          } else {
            localStorage.setItem('location', mdata[0].manager_city);

             navigate("/manager_view");
          }
        }
      } catch (err) {
        console.error("Error loading JSON:", err);
      }
    };

    fetchdata();
  }, [email, navigate]);




  const handleCaptcha = (value) => {
    setCaptchaValue(value);
    setCaptchaVerified(!!value);
  };
  const verifyAndLogin = async (response) => {
  console.log("Encoded JWT ID token:", response.credential);
  setUserToken(response.credential);

  const verifyRes = await fetch(
    `${API_URL}/verify`,
    {
      method: "POST",
      credentials: "include", // ✅ send cookie
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: response.credential }),
    }
  );

  if (!verifyRes.ok) {
    const errorData = await verifyRes.json();
    throw new Error(errorData.error || "Verification failed");
  }

  const data = await verifyRes.json();
  console.log("Backend response:", data);

  const userEmail = data.user;
  setEmail(userEmail);

  const getDataRes = await fetch(
    `${API_URL}/get_data`
  );
  const users = await getDataRes.json();

  if (!Array.isArray(users)) {
    throw new Error("Invalid user data");
  }

  const matchedUsers = users.filter(
    (u) => u.email.toLowerCase() === userEmail.toLowerCase()
  );

  // ⬅️ Return matchedUsers so toast.promise can use it
  return matchedUsers;
};

async function handl(response) {
    console.log("Encoded JWT ID token:", response.credential);
    setUserToken(response.credential);
  toast.promise(
    verifyAndLogin(response),
    {
      loading: "Verifying Google login...",
      success: (matchedUsers) => {
        if (matchedUsers.length === 0) {
          navigate("/Register");
          return "Account not found. Redirecting to register…";
        }

        localStorage.setItem("userEmail", matchedUsers[0].email);
        localStorage.setItem("userRole", matchedUsers[0].role);

        if (matchedUsers[0].role === "Landowner") {
          localStorage.setItem("location", matchedUsers[0].land_city);
          navigate("/manager_view");
          return "Welcome, Landowner 🌱";
        }

        if (matchedUsers[0].role === "Manager") {
          localStorage.setItem("location", matchedUsers[0].manager_city);
          navigate("/landowner_home");
          return "Welcome, Manager 🚜";
        }

        navigate("/login");
        return "Login completed";
      },
      error: (err) => err.message || "Login failed",
    }
  );
}


const sign = async (e) => {
  e.preventDefault();

  if (!captchaVerified) {
    toast.error("Please verify the captcha");
    return;
  }

  try {
    const fetchPromise = fetch("https://khetmitra-backend.onrender.com/gets_data", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ admin, password, captcha: captchaValue }),
    });

    // Toast promise
    const res = await toast.promise(
      fetchPromise,
      {
        loading: "Signing in...",
        success: "Login successful!",
        error: "Failed to connect to backend",
      }
    );

    const data = await res.json();
    if (!Array.isArray(data)) throw new Error("Data is not an array");

    console.log("Backend response:", data);
    setUser(data);

    if (admin === "admin" && password === "admin@123") {
      const userEmail = "admin";
      setEmail(userEmail);
    } else if (data.length === 0) {
      toast.error("Please enter valid data");
    } else {
      const userEmail = admin;
      setEmail(userEmail);
      localStorage.setItem("userEmail", userEmail);
      localStorage.setItem("userRole", data[0].role);

      if (data[0].role === "Landowner") {
        localStorage.setItem("location", data[0].land_city);
      } else {
        localStorage.setItem("location", data[0].manager_city);
      }
    }

  } catch (err) {
    console.error("Error:", err);
    toast.error("Something went wrong");
  }
};


  return (
    <div className="fixed w-full  h-full flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 0  }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        
      <div className="h-[7-vh] md:h-[90vh] w-full flex justify-center items-center p-2 ">
        <Toaster/>
        <form
          className=" absolute bottom-2 flex md:w-100 p-10 bg-white drop-shadow-md backdrop-blur-lg
                    rounded-2xl m-10 flex-col gap-3 border-0 border-black 
                    shadow-lg md:m-3 md:p-9 md:top-0 md:bottom-0 "
        >
          {/* Title */}
          <div className="flex flex-col items-center text-center">
            <img src={logo} className='w-15 h-15 animate-pulse'/>
            <h3 className="text-3xl font-bold text-green-600">Sign In</h3>
          </div>

          {/* User ID */}
          <div className="relative flex flex-row ">
            <MdEmail size={20} className="absolute top-3 left-2" />
            <input 
              type="text"
              id='user' 
              placeholder="Mail ID" 
              onChange={(e) => setadmin(e.target.value)}
              className="border p-2 pl-11 rounded-md w-full  bg-white" 
            />
          </div>

          {/* Password */}
          <div className="relative flex flex-row">
            <MdOutlinePassword size={20} className="absolute top-3 left-2" />
            <input 
              type="password" 
              id='pass'
              placeholder="Password" 
              onChange={(e) => setpassword(e.target.value)}
              className="border p-2 pl-11 rounded-md w-full  bg-white" 
            />
          </div>
          <div className=" w-30 scale-73 md:w-40 md:scale-90 p-2 origin-top-left ">
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={handleCaptcha}
            />
          </div>

          {/* Manual Sign In */}
          <div className="items-center text-center">
            <p onClick={sign}
              className="border-2 border-black p-2 rounded-md bg-black 
                        text-white hover:bg-gray-800 cursor-pointer"
            >
              Sign In
            </p>
          </div>

          {/* Forget Password */}
          <div className="text-end">
            <p className="text-sm text-blue-300 underline cursor-pointer" onClick={()=>navigate("/Forget")}>
              Forget Password
            </p>
          </div>

  

          {/* Google Login */}
          <div className="items-center text-center">
            <p className="p-2">OR login with</p>
            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
              <GoogleLogin 
                onSuccess={handl} 
                onError={() => console.log("Google login failed")} 
                
              />
            </GoogleOAuthProvider>
          </div>

          {/* Sign Up */}
          <div className="text-center">
            <p className="text-sm">
              Don't have an account? 
              <span className="underline cursor-pointer" onClick={()=>navigate("/Register")}> Sign up</span>
            </p>
          </div>
        </form>
      </div>
      </motion.div>
    </div>  
  );

};
export default Login;
