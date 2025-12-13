import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import Viewpdf from "./Viewpdf";
import { SlEnvolope, SlPhone, SlLocationPin, SlCalender,SlUser,SlPaperPlane ,SlEnvolopeLetter } from "react-icons/sl";
import {  AiOutlineFileText} from 'react-icons/ai';
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const block = async (item, text) => {
  const mailPromise = fetch(`${API_URL}/sendmail`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to: item.email,
      subject: "Manager Account Blocked",
      text: `
        <div style="font-family: Arial, sans-serif; color: #333; text-align: center;">
          <img src="https://raw.githubusercontent.com/JeetNathwani26/image/refs/heads/main/logo.png" alt="KhetMitra" width="200" style="margin-bottom: 20px;" />
          <h2>Dear ${item.name},</h2>
          <p style="font-size: 16px;">${text}</p>
          <p style="font-size: 16px;">If you believe this is a mistake, please contact support.</p>
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
      loading: "Sending message...",
      success: "Message sent successfully!",
      error: "Failed to send message.",
    }
  );


};

const Message = ({ name1 }) => {
  const [mview, setMview] = useState(false);
  const [text, setText] = useState("");

  const sub = (e) => {
    e.preventDefault();
    block(name1, text);
    setText("");
  };

  return (
    <div >
      <div className="flex items-center gap-3">
          <button
            onClick={() => setMview(!mview)}
            className="absolute bottom-2 flex  items-center gap-2 bg-green-500 text-white px-3 py-1 mb-2 rounded hover:bg-green-600 left-110 "
          ><SlEnvolopeLetter/>
            Send Message
          </button>
      </div>

      {mview && (
        <form
          onSubmit={sub}
          className="fixed flex flex-row p-3 m-1 bottom-25"
        >
          <input
            type="text"
            value={text}
            placeholder="Sendding...."
            onChange={(e) => setText(e.target.value)}
            className="pl-10 p-2 rounded bg-gray-50/70 shadow-2xl drop-shadow-md backdrop-blur-lg w-220 focus:outline-none"
          />
          <button
            type="submit"
            className="flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          >
            <SlPaperPlane/>
          </button>
        </form>
      )}
    </div>
  );
};

const Viewdetail = ({ name ,onClose }) => {
  const [view, setView] = useState(false);
  const [selectDo, setSelectDo] = useState(null);

  const openPdf = (doc) => {
    setView(true);
    setSelectDo(doc);
  };

  let statusElement;

    if (name.status === "Verify By Admin") {
      statusElement = <span className="text-green-600 font-semibold">✅ Verified by Admin</span>;
    } else if (name.status === "Block") {
      statusElement = <span className="text-red-600 font-semibold">🚫 Blocked</span>;
    } else {
      statusElement = <span className="text-yellow-600 font-semibold">⏳ Pending</span>;
    }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 ">
      <div className="bg-white w-[80%] h-[80%] rounded-xl shadow-xl relative p-4 ">
        <button
          className="absolute right-3 text-2xl text-red-400 cursor-pointer"
          onClick={onClose}
        >
          <IoMdClose />
        </button>

          <div className=" w-full h-100 overflow-scroll scrollbar-hide p-6">
              <div className="border-1 border-gray-100 shadow-2xs p-3 mb-2 w-full">
                  <p className="text-5xl">{name.name}</p>
                  <p >{name.experience}</p>
                  <div>
                    {statusElement}
                  </div>
                </div>

                <div className="border-1 border-gray-100 shadow-2xs p-3 mb-2 w-full">
                  <p>Personal info</p>
                  <div className="flex flex-row gap-30  text-gray-700">
                    <div className="p-3">
                      <div className="flex items-center gap-2 pb-2 ">
                        <SlEnvolope /> {name.email}
                      </div>
                      <div className="flex items-center gap-2 pb-2">
                        <SlPhone /> {name.phone}
                      </div>
                    </div>
                    <div className="p-3">
                        <div className="flex items-center gap-2 pb-2">
                          <SlLocationPin /> {name.location}
                        </div>
                        <div className="flex items-center gap-2 pb-2">
                          <SlCalender /> Applied: {name.appliedDate}
                        </div>
                    </div>
                    <div className="p-3">
                        <div className="flex items-center gap-2 pb-2">
                          <SlUser />Adhar ID: {name.adhar}
                        </div>
                        <div className="flex items-center gap-2 pb-2">
                          <SlCalender /> DOB: {name.DOB}
                        </div>
                    </div>


                  </div>
                </div>

                {/* Documents */}
                <div className="border-1 border-gray-100 shadow-2xs p-3 mb-2 w-full">
                  <p className="pb-2">Documents</p>
                  <div className="flex flex-row gap-2">
                    {name.documents.map((doc, idx) => (
                      <span
                        key={idx}
                        onClick={() => openPdf(doc)}
                        className="px-3 py-1 text-sm border w-40 border-gray-300 rounded-full cursor-pointer"
                      >
                        <div className="flex flex-row gap-4">
                          <div className="p-1"><AiOutlineFileText size={16} className="text-gray-500" /></div>
                          <div>{doc}</div>
                            
                        
                        </div>

                      </span>
                    ))}
                  </div>
                </div>

                {/* Skills OR Land Size */}
            {name.role !== "manager" && (name.skills?.length > 0 || name.preferred_Crops?.length > 0) ? (
                <div>
                  {/* Skills Section */}
                  {name.skills?.length > 0 && (
                    <div className="border border-gray-100 shadow-2xs p-3 mb-2 w-full">
                      <p className="pb-2 font-semibold">Skills</p>
                      <div className="flex flex-row gap-3 flex-wrap">
                        {(Array.isArray(name.skills) ? name.skills : name.skills.split(',').map(s => s.trim()).filter(Boolean)).map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 text-sm border border-gray-300 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Preferred Crops Section */}
                  {name.crop?.length > 0 ? (
                    <div className="border border-gray-100 shadow-2xs p-3 mb-2 w-full">
                      <p className="pb-2 font-semibold">Preferred Crops</p>
                      <div className="flex flex-row gap-3 flex-wrap">
                        {(Array.isArray(name.crop) ? name.crop : name.crop.split(',').map(s => s.trim()).filter(Boolean)).map((crop, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 text-sm border border-gray-300 rounded-full"
                          >
                            {crop}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No preferred crops added</p>
                  )}
                </div>
              ) : (
                /* Land Size Section (fallback if no skills/crops) */
                <div className="border border-gray-100 shadow-2xs p-3 mb-2 w-full">
                  <p className="pb-2 ">Land Detail</p>
                  <div className="flex flex-row gap-50">
                    <div className="p-3">
                        <div className="pb-2">Survey Number: {name.land_number}</div>
                        <div className="pb-2">Land Size: {name.landsize}</div>
                        <div className="pb-2">Land Location: {name.land_location}</div>
                    </div>
                    <div className="p-3">
                      <p className="pb-2">Soil Type: {name.soil}</p>
                      <p className="pb-2">ph: {name.ph}</p>
                      <p className="pb-2">N: {name.N}</p>
                    </div>
                  </div>


                </div>
              )}

          </div>

        <Message name1={name} className="p-5" />
      </div>

      {view && <Viewpdf name={selectDo} onClose={() => setView(false)} />}
    </div>
  );
};

export default Viewdetail;
