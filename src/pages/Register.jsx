import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import ManagerRegister from '../components/ManagerRegister';
import LandownerRegister from '../components/LandownerRegister';
import logo from '../assets/photo/logo2.png';
import { useNavigate, useLocation } from 'react-router-dom';
import Lottie from "lottie-react";
import success from '../assets/animation/5WI1ga8qHh.json';
import { motion } from "motion/react";
import { gmailPattern, passwordPattern, pdfPattern, phonePattern } from '../components/patterns';

const Message=({ nav })=>{
  return(
  <motion.div
    initial={{opacity:0,y:-20}}
    animate={{opacity:1,y:0}}
    exit={{opacity:0,y:0}}
    transition={{duration:0.5}}
  >
       
      <div className="flex p-7 bg-gray-100/70 drop-shadow-md backdrop-blur-lg
                    rounded-2xl m-1 flex-col gap-2  border-0 border-black
                    shadow-lg md:p-7 " role="alert">
                      <Lottie animationData={success} loop={false} className="w-40 h-20 mx-auto"/>
        <span className="font-medium text-green-600 text-center">Success!</span>Your registration has been submitted successfully and is pending admin verification. You will be able to send proposals once approved.
        <button
          onClick={() => nav('/login')}
          className="ml-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Return to Login
        </button>
      </div>
  </motion.div>  
  );
}

export default function Register() {

  const [form1, setForm1] = useState({
    // Basic fields for step 1
    username: "",
    password: "",
    confirmPassword: "",
    role: "",
    otp: "",

    // Manager fields
    name: "",
    email: "",
    phone: "",
    location: "",
    manager_city: "",
    experience: "",
    DOB: "",
    adhar: "",

    //manager fields
    skills:[],
    crop:[],


    // Landowner fields
    landsize: "",
    land_location: "",
    land_city: "",
    land_number: "",
    soil: "",
    ph: "",
    N: "",
    p: "",
    k: "",

    documents: [],
  });

  const [step, setStep] = useState(1);
  const [open,setOpen]=useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [close,setClose]=useState(false);
  const [sendop, setSendop] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (timeLeft === 0) {
      setGeneratedOtp("");
      setSendop(true);
      toast.error("OTP expired. Please request a new one.");
    }
  }, [timeLeft]);

  const nav=useNavigate();
  const adddata = async () => {
    const formData = new FormData();
    formData.append("name", form1.name);
    formData.append("email", form1.email);
    formData.append("phone", form1.phone);
    formData.append("location", form1.location);
    formData.append("landsize", form1.landsize);
    formData.append("land_location", form1.land_location);
    formData.append("land_city", form1.land_city);
    formData.append("land_number", form1.land_number);
    formData.append("experience", form1.experience);
    formData.append("DOB", form1.DOB);
    formData.append("adhar", form1.adhar);
    formData.append("soil", form1.soil);
    formData.append("ph", form1.ph);
    formData.append("N", form1.N);
    formData.append("p", form1.p);
    formData.append("k", form1.k);
    formData.append("role", form1.role);
    formData.append("status", "pendding");
    formData.append("appliedDate", new Date().toISOString().split('T')[0]);
    formData.append("password", form1.password);

    form1.documents.forEach((file, index) => {
      formData.append("documents", file);
    });

    const response = await fetch("https://khetmitra-backend.onrender.com/add_user_data", {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Registration failed: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  };

  const adddata2 = async () => {
    const formData = new FormData();
    formData.append("name", form1.name);
    formData.append("email", form1.email);
    formData.append("phone", form1.phone);
    formData.append("location", form1.location);
    formData.append("experience", form1.experience);
    formData.append("DOB", form1.DOB);
    formData.append("manager_city", form1.manager_city);
    formData.append("adhar", form1.adhar);
    formData.append("skills", form1.skills);
    formData.append("crop",form1.crop);
    formData.append("role", form1.role);
    formData.append("status", "pendding");
    formData.append("appliedDate", new Date().toISOString().split('T')[0]);
    formData.append("password", form1.password);

    form1.documents.forEach((file, index) => {
      formData.append("documents", file);
    });

    const response = await fetch("https://khetmitra-backend.onrender.com/add_user_data", {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Registration failed: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  };

  const handleChange = (e) => {
    setForm1({ ...form1, [e.target.name]: e.target.value });
  };

  const handleRoleSelect = (e) => {
    setForm1({ ...form1, role: e.target.value });
  };

const handleSkillChange = (e) => {
  // split input by comma, trim spaces, and remove empty strings
  const skillsArray = e.target.value;
    

  setForm1({ ...form1, skills: skillsArray });
};

const handleCropChange = (e) => {
  const cropArray = e.target.value;
   
   

  setForm1({ ...form1, crop: cropArray });
};

  const handleFileChange = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      const file = files[0];
      if (!pdfPattern.test(file.name)) {
        toast.error("Please upload a PDF file");
        return;
      }
      setForm1({ ...form1, documents: [...form1.documents, file] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form1.password !== form1.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    await toast.promise(
      (async () => {
        await adddata();
        // Send confirmation email
        await fetch("https://khetmitra-backend.onrender.com/sendmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: form1.email,
            subject: "Registration Successful - Pending Verification",
            text: `
              <div style="font-family: Arial, sans-serif; color: #333; text-align: center;">
                <img src="https://raw.githubusercontent.com/JeetNathwani26/image/refs/heads/main/logo.png" alt="KhetMitra" width="200" style="margin-bottom: 20px;" />
                <h2>Hello ${form1.name},</h2>
                <p style="font-size: 16px;">Your registration has been submitted successfully!</p>
                <p style="font-size: 16px;">Your account is now pending admin verification. Once approved, you will be able to send proposals and access full features.</p>
                <p style="font-size: 16px;">You will receive a notification email once your account is verified.</p>
                <p style="font-size: 16px;">Login:-${form1.email}</p>
                <p style="font-size: 16px;">password:-${form1.password}</p>
                <p style="margin-top: 20px; font-size: 14px; color: #666;">
                  Best regards,<br/>🌿 The KhetMitra Team
                </p>
              </div>
            `,
          }),
        });
        localStorage.removeItem('userEmail');
        setShowMessage(true);
      })(),
      {
        loading: "Submitting registration...",
        success: "Registration submitted successfully! Check your email for confirmation.",
        error: "Registration failed. Please try again.",
      }
    );
  };


  const handleSubmit1 = async (e) => {
    e.preventDefault();
    if (form1.password !== form1.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    await toast.promise(
      (async () => {
        await adddata2();
        // Send confirmation email
        await fetch("https://khetmitra-backend.onrender.com/sendmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: form1.email,
            subject: "Registration Successful - Pending Verification",
            text: `
              <div style="font-family: Arial, sans-serif; color: #333; text-align: center;">
                <img src="https://raw.githubusercontent.com/JeetNathwani26/image/refs/heads/main/logo.png" alt="KhetMitra" width="200" style="margin-bottom: 20px;" />
                <h2>Hello ${form1.name},</h2>
                <p style="font-size: 16px;">Your registration has been submitted successfully!</p>
                <p style="font-size: 16px;">Your account is now pending admin verification. Once approved, you will be able to send proposals and access full features.</p>
                <p style="font-size: 16px;">You will receive a notification email once your account is verified.</p>
                <p style="font-size: 16px;">Login:-${form1.email}</p>
                <p style="font-size: 16px;">password:-${form1.password}</p>
                <p style="margin-top: 20px; font-size: 14px; color: #666;">
                  Best regards,<br/>🌿 The KhetMitra Team
                </p>
              </div>
            `,
          }),
        });
        localStorage.removeItem('userEmail');
        setShowMessage(true);
      })(),
      {
        loading: "Submitting registration...",
        success: "Registration submitted successfully! Check your email for confirmation.",
        error: "Registration failed. Please try again.",
      }
    );
  };

  const sendotp = async () => {
    if (!form1.email) {
      toast.error("Please enter your email first.");
      return;
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    setGeneratedOtp(otp);

    try {
      await toast.promise(
        fetch("https://khetmitra-backend.onrender.com/sendmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: form1.email,
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
        }),
        {
          loading: "Sending OTP...",
          success: "OTP sent successfully!",
          error: "Failed to send OTP.",
        }
      );
      setOpen(true);
      setTimeLeft(120);
    } catch (err) {
      console.error(err);
    }
  };

  const verifyotp = () => {
    if (form1.otp === generatedOtp) {
      toast.success("✅ OTP verified successfully!", {
        duration: 1000,
      });
      setTimeout(() => {
        setOtpVerified(true);
        
      }, 1000);
    } else {
      toast.error("❌ Invalid OTP. Please try again.");
    }
    setOpen(false);
    setClose(true);
  };

  return (
    <div className="fixed w-full  h-full flex justify-center items-center pt-25 p-5 md:pt-5  ">
      <Toaster />
      {showMessage && <Message nav={nav} />}
      {!showMessage &&(
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          >
              <div className="  flex p-7 bg-white drop-shadow-md backdrop-blur-lg
                   rounded-2xl m-1 flex-col gap-2  border-0 border-black
                   shadow-lg md:p-7 ">
                <div className="flex flex-col items-center text-center">
                  <img src={logo} className='w-15 h-15 animate-pulse'/>
                  <h3 className="text-3xl font-bold text-green-600 ">Sign Up</h3>
                </div>
        {step === 1 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!gmailPattern.test(form1.email)) {
                toast.error("Please enter a valid Gmail address");
                return;
              }
              if (!passwordPattern.test(form1.password)) {
                toast.error("Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character");
                return;
              }
              if (!phonePattern.test(form1.phone)) {
                toast.error("Please enter a valid 10-digit phone number");
                return;
              }
              if (!form1.role) {
                toast("Please select a role");
                return;
              }
              if (!otpVerified) {
                toast("Please verify your email with OTP first");
                return;
              }
              setStep(2);
            }}
            className="space-y-5 w- "
          >
          <div className="h-85 overflow-y-auto scrollbar-hide p-4 relative">
            <div className="pb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="username">
               User Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={form1.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white"
              />
            </div>
                  <div className="flex flex-row gap-4 pb-4">
            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={form1.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="relative top-8">
             { close ?( <button
                className="bg-gray-600 text-white p-2 rounded-2xl hover:bg-gray-800"
                onClick={()=>toast("you already verify it")}
              >
                Send OTP
              </button>):(
              <button
                className="bg-green-600 text-white p-2 rounded-2xl hover:bg-green-800"
                onClick={sendotp}
              >
                Send OTP
              </button>               
              )}
            </div>
          </div> 
                  {open &&(
          <div className="flex flex-col">
            <div className="flex flex-row gap-4 pb-4">
              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="otp"
                >
                  OTP
                </label>
                <input
                  type="text"
                  name="otp"
                  id="otp"
                  value={form1.otp}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {sendop ? (
                            <div className="relative top-8">
              <button
                className="bg-green-600 text-white p-2 rounded-2xl hover:bg-green-800"
                onClick={sendotp}
              >
                Send OTP
              </button>
            </div>
              ):(
              <div className="relative top-8 flex items-center gap-2 flex-col">
                <button
                  className="bg-green-600 text-white p-2 rounded-2xl hover:bg-green-800"
                  onClick={verifyotp}
                >
                  Verify OTP
                </button>
          
              </div>
              )}

            </div>
            <div className="absolute top-49 right-60">
              <span className="text-red-500 font-bold">
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')} min
              </span>
            </div>
          </div>
        )}  


        



             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={form1.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="location">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      id="location"
                      value={form1.location}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
                <div>
                        <div>
                          <label className="block text-gray-700 font-medium mb-2" htmlFor="DOB">
                            Date of Birth
                          </label>
                          <input
                            type="date"
                            name="DOB"
                            id="DOB"
                            value={form1.DOB}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                </div>
                <div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="adhar">
                        Aadhar Number
                      </label>
                      <input
                        type="text"
                        name="adhar"
                        id="adhar"
                        value={form1.adhar}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                </div>
              </div>  
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4"> 
                <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={form1.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300  bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={form1.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                  />
                </div>
            </div>      
          <div className="pb-4">
          <label className="block text-gray-700 font-medium mb-2">Select Role</label>
              <select
                name="role"
                value={form1.role}
                onChange={handleRoleSelect}
                required
                className="w-full px-3 py-3 border border-gray-300 rounded-md bg-white"
              >
                <option value="">Select Role</option>
                <option value="Manager">Manager</option>
                <option value="Landowner">Landowner</option>
              </select>
          </div>
        </div> 
        <div className="pb-2">
            <button
              type="submit"
              className="border-2 border-black p-2 rounded-md bg-black text-white hover:bg-gray-800 cursor-pointer w-full"
            >
              Next
            </button>
        </div> 

          </form>
        )}
        {step === 2 && form1.role === "Manager" && (
          <ManagerRegister form={form1} handleChange={handleChange} handleSubmit={handleSubmit1} handleSkillChange={handleSkillChange} handleCropChange={handleCropChange} handleFileChange={handleFileChange} />
        )}
        {step === 2 && form1.role === "Landowner" && (
          <LandownerRegister form={form1} handleChange={handleChange} handleSubmit={handleSubmit} handleFileChange={handleFileChange} />
        )}
              </div>
          </motion.div>    

      )}

    </div>
  );
}