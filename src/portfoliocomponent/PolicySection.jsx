import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaLeaf, FaHandshake } from 'react-icons/fa';

const policies = [
  {
    icon: FaShieldAlt,
    title: "Data Security",
    description:
      "Your data is protected with state-of-the-art encryption and security protocols.",
  },
  {
    icon: FaLeaf,
    title: "Sustainable Farming",
    description:
      "We promote eco-friendly and sustainable practices for a healthier planet.",
  },
  {
    icon: FaHandshake,
    title: "Fair Pricing",
    description:
      "Our policies ensure transparent and fair pricing for all farmers and partners.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const PolicySection = () => {
  return (
    <section id="policy" className="py-16 bg-white">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold mb-10 text-black"
        >
          Our Core Policies
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {policies.map((policy, index) => {
            const Icon = policy.icon;

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="p-8 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 bg-white cursor-pointer"
              >
                <motion.div
                  whileHover={{ scale: 1.3 }}
                  className="w-14 h-14 flex items-center justify-center rounded-full mb-4 mx-auto bg-black text-white cursor-pointer"
                  aria-label={policy.title}
                >
                  <Icon className="text-3xl" />
                </motion.div>

                <h3 className="text-xl font-semibold mb-2 text-black">{policy.title}</h3>
                <p className="text-gray-700 text-sm">{policy.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PolicySection;
