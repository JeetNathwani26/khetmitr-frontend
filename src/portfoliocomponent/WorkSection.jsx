import React from 'react';
import { motion } from 'framer-motion';
import { FaLandmark, FaUserTie, FaSeedling } from 'react-icons/fa';

const roles = [
  {
    title: "Landowner",
    description:
      "This refers to individuals who own land and allow others to cultivate it. KhetMitra offers a pathway to register your land for farming support, connecting with agricultural experts.",
    icon: FaLandmark,
  },
  {
    title: "Manager",
    description:
      "This role involves tasks such as starting ground, handling, comprehending productivity through careful planning and hard work. Focuses on efficient and productive management of agricultural activities.",
    icon: FaUserTie,
  },

];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const WorkSection = () => {
  return (
    <section id="work" className="py-16 bg-white min-h-[90vh]">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-12 text-black"
        >
          How It Works
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {roles.map((role, index) => {
            const Icon = role.icon;

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="p-6 rounded-3xl shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 bg-white"
              >
                <motion.div
                  whileHover={{ scale: 1.3 }}
                  className="w-14 h-14 flex items-center justify-center rounded-full mb-4 mx-auto cursor-pointer bg-black text-white"
                  aria-label={role.title}
                >
                  <Icon />
                </motion.div>

                <h3 className="text-xl font-semibold mb-2 text-black">{role.title}</h3>
                <p className="text-gray-700 text-sm">{role.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
