import React, { useState, useEffect } from "react";
import { IoMdClose, IoMdSend, IoMdCheckmark } from "react-icons/io";
import {toast,Toaster } from 'react-hot-toast';
import Lottie from "lottie-react";
import successer from '../assets/animation/5WI1ga8qHh.json';
const API_URL = import.meta.env.VITE_BACKEND_URL;
const MODEL_URL = import.meta.env.VITE_MODEL_URL;



const sendRequest = async (senderName, recipientEmail, proposalDetails) => {
  const mailPromise = fetch(`${API_URL}/sendmail`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to: recipientEmail,
      subject: "New Proposal Received - KhetMitra",
      text: `
        <div style="font-family: Arial, sans-serif; color: #333; text-align: center;">
          <img src="https://raw.githubusercontent.com/JeetNathwani26/image/refs/heads/main/logo.png" alt="KhetMitra" width="200" style="margin-bottom: 20px;" />
          <h2>KhetMitra Notification</h2>
          <p style="font-size: 16px;">You have received a new proposal.</p>
          <p style="font-size: 16px;">Please check your dashboard for details.</p>
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

  toast.promise(
    mailPromise,
    {
      loading: "Sending proposal notification...",
      success: "Proposal notification sent successfully!",
      error: "Failed to send notification.",
    }
  );
};

const Sendmessage= ({ onClose })=>{
    return(
        <div className=" relative flex flex-col items-center justify-center h-full top-20">
            <Lottie animationData={successer} loop={false} />
            <p className="text-2xl font-semibold text-gray-800 mb-6">Your proposal has been sent!</p>
            <button
                onClick={() => {
                    onClose();
                }}
                className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200 cursor-pointer"
            >
                Return Home
            </button>
        </div>
    )
};


const Proposal=({ name , onClose})=>{

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [emails,setEmails]=useState(localStorage.getItem('userEmail'));
    const [landowner,setLandowner]=useState([]);
    const [taggel,setTaggel]=useState(false);
    const [terms, setTerms] = useState([]);

    const sendemail=name.email;

    
    
        useEffect(() => {
        if (!emails) return; // skip if email not available

        const fetchLandowners = async () => {
            try {
            const response = await fetch(`${API_URL}/get_data`, {
                method: "GET",
                credentials: "include",
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.message === "you already set proposal") {
                    toast.error("you already set proposal");
                    setLoading(false);
                    return;
                }
                throw new Error('Failed to fetch data');
            }

            const verifiedLandowners = data.filter(user => user.email === emails);
            

            setLandowner(verifiedLandowners);

            const role = verifiedLandowners[0].role;
            setTerms(role === "Manager" ? landownerConditions  :  managerConditions);

            } catch (err) {
            setError(err.message);
            toast.error('Failed to load landowners');
            } finally {
            setLoading(false);
            }
        };

        fetchLandowners();
        
        }, [emails]);

        const selection = [
            { label: "rice", value: "rice" },
            { label: "maize", value: "maize" },
            { label: "jute", value: "jute" },
            { label: "cotton", value: "cotton" },
            { label: "coconut", value: "coconut" },
            { label: "papaya", value: "papaya" },
            { label: "orange", value: "orange" },
            { label: "apple", value: "apple" },
            { label: "muskmelon", value: "muskmelon" },
            { label: "watermelon", value: "watermelon" },
            { label: "grapes", value: "grapes" },
            { label: "mango", value: "mango" },
            { label: "banana", value: "banana" },
            { label: "pomegranate", value: "pomegranate" },
            { label: "lentil", value: "lentil" },
            { label: "blackgram", value: "blackgram" },
            { label: "mungbean", value: "mungbean" },
            { label: "mothbeans", value: "mothbeans" },
            { label: "pigeonpeas", value: "pigeonpeas" },
            { label: "kidneybeans", value: "kidneybeans" },
            { label: "chickpea", value: "chickpea" },
            { label: "coffee", value: "coffee" }
        ];

        const landownerConditions = [
        { value: "landowner1", label: "Provide the agreed agricultural land free from legal disputes, encroachments, or third-party claims." },
        { value: "landowner2", label: "Hand over land in a cultivable condition at the start of the agreement." },
        { value: "landowner3", label: "Ensure continuous access to water sources such as borewell, canal, well, or pump." },
        { value: "landowner4", label: "Maintain irrigation infrastructure (pipes, pumps, motors) in working condition unless otherwise agreed." },
        { value: "landowner5", label: "Ownership of the land remains with the Landowner." },
        { value: "landowner6", label: "Allow Manager/Company free access to the land during the lease period for all farming operations." },
        { value: "landowner7", label: "Provide access to necessary utilities like electricity for irrigation." },
        { value: "landowner8", label: "Support basic infrastructure like fencing, storage, or sheds if agreed." },
        { value: "landowner9", label: "Do not interfere in daily farming operations managed by the Manager/Company." },
        { value: "landowner10", label: "Communicate any suggestions or concerns formally." },
        { value: "landowner11", label: "Ensure that the land use complies with local agricultural laws and regulations." },
        { value: "landowner12", label: "Pay government land taxes and dues unless agreed otherwise." },
        { value: "landowner13", label: "Accept profit-sharing terms as agreed in the contract." },
        { value: "landowner14", label: "Cooperate during profit calculation and annual reviews." },
        { value: "landowner15", label: "Provide 3 months’ written notice in case of termination." },
        { value: "landowner16", label: "Ensure smooth handover of land at the end of the contract without obstruction." },
        { value: "landowner17", label: "Assist in crop/land insurance formalities if required." },
        { value: "landowner18", label: "Ensure no boundary disputes with neighbors during the agreement period." },
        { value: "landowner19", label: "Cooperate in maintaining soil quality and avoid prohibited chemical dumping." },
        ];

        const managerConditions = [
        { value: "manager1", label: "Plan and execute all farming activities, including plowing, sowing, irrigation scheduling, crop protection, harvesting, and storage." },
        { value: "manager2", label: "Ensure timely planting and harvesting as per seasonal requirements." },
        { value: "manager3", label: "Procure quality seeds, fertilizers, pesticides, and other agricultural inputs." },
        { value: "manager4", label: "Maintain proper records of all purchased inputs and usage." },
        { value: "manager5", label: "Hire, pay, and supervise agricultural labor." },
        { value: "manager6", label: "Ensure fair wages and safe working conditions for workers." },
        { value: "manager7", label: "Use water resources efficiently and responsibly." },
        { value: "manager8", label: "Maintain irrigation schedules to avoid wastage and ensure crop health." },
        { value: "manager9", label: "Bear all farming-related expenses unless otherwise specified in the agreement." },
        { value: "manager10", label: "Maintain transparent accounts of expenses and revenues for profit-sharing." },
        { value: "manager11", label: "Deduct genuine expenses before calculating net profit." },
        { value: "manager12", label: "Share profits with Landowner and Agent (if applicable) according to agreed ratios." },
        { value: "manager13", label: "Conduct annual review of profit-sharing terms with Landowner." },
        { value: "manager14", label: "Adopt eco-friendly methods to protect soil fertility and environment." },
        { value: "manager15", label: "Avoid overuse of harmful chemicals and encourage organic methods where feasible." },
        { value: "manager16", label: "Maintain proper records of expenses, sales, and profits." },
        { value: "manager17", label: "Provide Landowner access to accounts and reports at regular intervals." },
        { value: "manager18", label: "Take necessary measures to reduce crop risks (pest management, weather monitoring)." },
        { value: "manager19", label: "If crop insurance is taken, handle premium payments and claim process in coordination with Landowner." },
        { value: "manager20", label: "Ensure that all farming operations comply with government agricultural policies and environmental laws." },
        { value: "manager21", label: "Pay any agricultural compliance fees (if not the Landowner’s responsibility)." },
        { value: "manager22", label: "Cooperate with Landowner in resolving any land-related or operational disputes." },
        { value: "manager23", label: "Follow agreed procedures for termination with 3 months’ written notice." },
        ];


    const [form, setForm] = useState({
        duration: "",
        term: [],
        crops: "",
    });

    const [recommendedCrop, setRecommendedCrop] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setForm(prev => ({
                ...prev,
                [name]: checked ? [...(prev[name] || []), value] : (prev[name] || []).filter(v => v !== value)
            }));
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const getCropRecommendation = async () => {
  const cropParams = {
    N: name.N || landowner[0].N,
    P: name.p || landowner[0].p,
    K: name.k || landowner[0].k,
    ph: name.ph || landowner[0].ph,
  };

  const request = fetch(`${MODEL_URL}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cropParams),
  }).then(async (response) => {
    const result = await response.json();

    if (!response.ok) {
      throw new Error("Prediction failed");
    }

    const recommended = result["Recommended Crop"];
    setRecommendedCrop(recommended);
    setForm((prev) => ({ ...prev, crops: recommended.toLowerCase() }));

    return recommended;
  });

  toast.promise(request, {
    loading: "Generating crop recommendation...",
    success: "Crop recommendation generated successfully 🌱",
    error: "Failed to get crop recommendation ❌",
  });
};



    const handleSubmit = async (e) => {
        e.preventDefault();
        let sender = name.name;
        let phone = name.phone;
        let status = "pending";


        try {
            const response = await fetch(`${API_URL}/add_prosal`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ emails, sendemail, form, phone, status }),
            });
            const result = await response.json();
            console.log("Proposal submitted:", result);

            if (response.ok) {
                if (result.message === "you already proposal sent") {
                    toast("You have already sent a proposal");
                } else {
                    sendRequest(sender, sendemail, form);
                    setSubmitted(true);
                }
            } else {
                throw new Error("Failed to submit proposal");
            }
        } catch (error) {
            console.error("Error submitting proposal:", error);
            toast.error("❌ Failed to submit proposal. Please try again.");
        }
    };


    return (
        <div className="fixed inset-0 bg-black/50  backdrop-blur-xs flex justify-center items-center z-50 ">
            <Toaster/>
            <div className="bg-white w-[80%] h-[80%] rounded-xl shadow-xl relative p-4 ">
                        
                        <button
                          className="absolute right-3 top-3 text-2xl text-red-400 cursor-pointer z-10"
                          onClick={onClose}
                        >
                          <IoMdClose />
                        </button>
                    <div className="pt-5">
                        {submitted ? (
                            <Sendmessage onClose={onClose} />
                        ) : (
                            <>
                                <div className="border-1 border-gray-100 shadow-2xs p-3 mb-2 w-full">
                                    <p className="text-5xl">Create Proposal</p>
                                </div>

                                <form onSubmit={handleSubmit} >
                                    <div className=" w-full h-75 overflow-scroll scrollbar-hide p-2">
                                        <div className="border-1 border-gray-100 shadow-2xs p-3 mb-2 w-full">
                                            <p className="pb-2">Agreement Details</p>
                                            <div className="flex flex-row gap-30 text-gray-700">
                                                <div className="p-3">
                                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="duration">
                                                        Land Agreement Duration (in years)
                                                    </label>
                                                    <input
                                                        type="number"
                                                        name="duration"
                                                        id="duration"
                                                        value={form.duration}
                                                        onChange={handleChange}
                                                        required
                                                        min="1"
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    />
                                                </div>

                                            </div>
                                        </div>


                                        <div className="border-1 border-gray-100 shadow-2xs p-3 mb-2 w-full">
                                            <p className="pb-2">Crop Selection</p>
                                            <div className="p-3">
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 font-medium mb-2">
                                                        Choose Crop Selection Method
                                                    </label>
                                                    <div className="flex items-center space-x-4">
                                                        <label className="flex items-center">
                                                            <input
                                                                type="radio"
                                                                name="cropMethod"
                                                                value="manual"
                                                                checked={!taggel}
                                                                onChange={() => setTaggel(false)}
                                                                className="mr-2"
                                                            />
                                                            Manual Selection
                                                        </label>
                                                        <label className="flex items-center">
                                                            <input
                                                                type="radio"
                                                                name="cropMethod"
                                                                value="ai"
                                                                checked={taggel}
                                                                onChange={() => setTaggel(true)}
                                                                className="mr-2"
                                                            />
                                                            AI Recommendation
                                                        </label>
                                                    </div>
                                                </div>

                                                {!taggel ? (
                                                    <div>
                                                        <label className="block text-gray-700 font-medium mb-2" htmlFor="crops">
                                                            Select Crop
                                                        </label>
                                                        <select
                                                            name="crops"
                                                            id="crops"
                                                            value={form.crops}
                                                            onChange={handleChange}
                                                            required
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        >
                                                            <option value="">Select Crop</option>
                                                            {selection.map((item,key)=>(
                                                                <option key={key} value={item.value}>{item.label}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                ) : (

                                                        <div>
                                                            <div className="mb-4">
                                                                <p className="text-gray-600 text-sm mb-4">
                                                                    AI will analyze your soil parameters (N: {name.N || landowner[0].N}, P: {name.p || landowner[0].p}, K: {name.k || landowner[0].k}, pH: {name.ph || landowner[0].ph}) to recommend the best crop.
                                                                </p>
                                                                <div className="flex justify-center mb-4">
                                                                    <button
                                                                        type="button"
                                                                        onClick={getCropRecommendation}
                                                                        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 cursor-pointer"
                                                                    >
                                                                        Get AI Crop Recommendation
                                                                    </button>
                                                                </div>
                                                                {recommendedCrop && (
                                                                    <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-lg">
                                                                        <p className="text-green-800 font-semibold">Recommended Crop: {recommendedCrop}</p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>

                                        <div className="border-1 border-gray-100 shadow-2xs p-3 mb-2 w-full">
                                                                    <div className="p-3">
                                                <label className="block text-gray-700 font-medium mb-2" htmlFor="term">
                                                    Select Terms and Conditions
                                                </label>
                                                <div className="w-full px-4 py-2  focus:outline-none focus:ring-2 focus:ring-green-700">
                                                    <div className="flex flex-col space-y-2">
                                                        {terms.map(term => (
                                                            <label key={term.value} className="flex items-center">
                                                                <input
                                                                    type="checkbox"
                                                                    name="term"
                                                                    value={term.label}
                                                                    checked={form.term.includes(term.label)}
                                                                    onChange={handleChange}
                                                                    className="mr-2 accent-green-700"
                                                                />
                                                                {term.label}
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>

                                    <div className="flex justify-center mt-3">
                                        <button
                                            type="submit"

                                            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200 cursor-pointer"
                                        >
                                            Sent Proposal
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
            </div>
        </div>
    );
}

export default Proposal;
