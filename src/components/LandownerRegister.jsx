import React from "react";
import { motion } from "motion/react";
import { toast, Toaster } from "react-hot-toast";

const LandownerRegister = ({ form, handleChange, handleSubmit, handleFileChange }) => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="space-y-2  ">
        <div className="overflow-auto scrollbar-hide h-92  p-5 space-y-6 ">

          <Toaster />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="landsize">
                  Land Size
                </label>
                <input
                  type="text"
                  name="landsize"
                  id="landsize"
                  value={form.landsize}
                  onChange={handleChange}
                  placeholder="e.g., 5 acres"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="land_location">
                  Land Location
                </label>
                <input
                  type="text"
                  name="land_location"
                  id="land_location"
                  value={form.land_location}
                  onChange={handleChange}
                  placeholder="e.g., vasad"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
                            <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="land_location">
                  Land City
                </label>
                <input
                  type="text"
                  name="land_city"
                  id="land_city"
                  value={form.land_city}
                  onChange={handleChange}
                  placeholder="e.g., vadodra"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="land_number">
                  Land Number
                </label>
                <input
                  type="text"
                  name="land_number"
                  id="land_number"
                  value={form.land_number}
                  onChange={handleChange}
                  placeholder="e.g., GH0123"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="soil">
                  Soil Type
                </label>
                <input
                  type="text"
                  name="soil"
                  id="soil"
                  value={form.soil}
                  onChange={handleChange}
                  placeholder="e.g., sand"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="ph">
                  pH Level
                </label>
                <input
                  type="text"
                  name="ph"
                  id="ph"
                  value={form.ph}
                  onChange={handleChange}
                  placeholder="e.g., 4.5"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="N">
                  Nitrogen (N)
                </label>
                <input
                  type="text"
                  name="N"
                  id="N"
                  value={form.N}
                  onChange={handleChange}
                  placeholder="e.g., 03"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="p">
                  Phosphorus (P)
                </label>
                <input
                  type="text"
                  name="p"
                  id="p"
                  value={form.p}
                  onChange={handleChange}
                  placeholder="e.g., 89"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="k">
                  Potassium (K)
                </label>
                <input
                  type="text"
                  name="k"
                  id="k"
                  value={form.k}
                  onChange={handleChange}
                  placeholder="e.g., 56"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
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
                  placeholder="e.g., 2 years on platform"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>


            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Land Ownership Document
              </label>
              <input
                type="file"
                name="landOwnership"
                id="landOwnership"
                onChange={handleFileChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="identityProof">
                Identity Proof Document
              </label>
              <input
                type="file"
                name="identityProof"
                id="identityProof"
                onChange={handleFileChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="landReport">
                Land Report Document
              </label>
              <input
                type="file"
                name="landReport"
                id="landReport"
                onChange={handleFileChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
        </div>    

        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200"
        >
          Register as Landowner
        </button>
      </form>
    </motion.div>  
      
);

export default LandownerRegister;
