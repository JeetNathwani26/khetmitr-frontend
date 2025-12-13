import React from "react";
import { motion } from "motion/react";
import { toast, Toaster } from "react-hot-toast";



const ManagerRegister = ({ form, handleChange, handleSubmit, handleSkillChange, handleCropChange, handleFileChange }) => (
 <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >  
  <form onSubmit={handleSubmit} className="space-y-2">
    <div className="overflow-auto scrollbar-hide h-92 p-5 space-y-6">
      <Toaster />
  

    <div>
      <div>
        <label className="block text-gray-700 font-medium mb-2" htmlFor="experience">
          Experience
        </label>
        <input
          type="text"
          name="experience"
          id="experience"
          value={form.experience}
          onChange={handleChange}
          placeholder="e.g., 5 years in agriculture"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="pt-3">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="experience">
          which city you can work 
          </label>
        <input
          type="text"
          name="manager_city"
          id="manager_city"
          value={form.manager_city}
          onChange={handleChange}
          placeholder="e.g., vadodara"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
 
    </div>


    <div>
      <label className="block text-gray-700 font-medium mb-2">
        Skills (comma-separated)
      </label>
      <input
        type="text"
        name="skills"
        id="skills"
        value={form.skills}
        onChange={handleSkillChange}
        placeholder="e.g., Crop Management, Irrigation Techniques, Pest Control"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block text-gray-700 font-medium mb-2">
        Crops (comma-separated)
      </label>
      <input
        type="text"
        name="crop"
        id="crop"
        value={form.crop}
        onChange={handleCropChange}
        placeholder="e.g., Rice, Mongo"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>



    <div>
      <label className="block text-gray-700 font-medium mb-2" htmlFor="idProof">
        ID Proof Document
      </label>
      <input
        type="file"
        name="idProof"
        id="idProof"
        onChange={handleFileChange}
        multiple
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    </div>

    <button
      type="submit"
      className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200"
    >
      Register as Manager
    </button>
  </form>
  </motion.div>
);

export default ManagerRegister;
