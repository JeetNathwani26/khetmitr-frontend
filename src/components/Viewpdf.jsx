import React, { useState, useEffect } from "react";
import { SlEye } from "react-icons/sl";


const Viewpdf = ({ name, onClose }) => {
  const [selectDoc, setSelectDoc] = useState(null);

  useEffect(() => {
    setSelectDoc(name);
  }, [name]);

  if (!selectDoc) return null;


  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-[80%] h-[80%] rounded-xl shadow-xl relative p-4">
        {/* Close Button */}


        {/* PDF Viewer */}
        <iframe
          src={`/document/${selectDoc}.pdf`}
          title="PDF Viewer"
          className="relative top-5 w-full h-100 rounded-lg "
        ></iframe>
        <div className="absolute right-5 bottom-2">
                  <button
          type="button"
          className="flex items-center gap-2 bg-green-500 text-white px-3 py-1  rounded hover:bg-green-600"
          onClick={onClose}
        >
          <SlEye className="text-lg" />
          <span>Viewed</span>
        </button>
        </div>

      </div>
    </div>
  );
};

export default Viewpdf;
