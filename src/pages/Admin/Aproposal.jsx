import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Adminnav from '../../components/Adminnav';
import logo from '../../assets/photo/logo2.png';
import { AiOutlineFileText, AiOutlineUser, AiOutlineMail } from 'react-icons/ai';
import { IoMdClose, IoMdSend } from "react-icons/io";
import { motion } from "motion/react";
const API_URL = import.meta.env.VITE_BACKEND_URL;


const Aproposal = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await fetch(`${API_URL}/get_proposal`, {
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) throw new Error('Failed to fetch proposals');
        const data = await response.json();
        setProposals(data);
      } catch (err) {
        setError(err.message);
        toast.error('Failed to load proposals');
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, []);

  const handleViewProposal = (proposal) => {
    setSelectedProposal(proposal);
    setShowModal(true);
  };



  if (error) {
    return (
      <div>
        <Adminnav />
        <div className="flex justify-center items-center">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 bg-gradient-to-t from-green-100/50  to-white-100 h-screen w-screen">
      <Adminnav />
     <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        > 
      <div className="container mx-auto px-4 py-8 max-w-4xsl fixed left-50 top-10 ">
        {/* Header */}
        <div className=" text-center">
          <h1 className="text-3xl font-bold text-green-600">All Proposals</h1>
        </div>

        {/* Proposals List */}
        <div className="space-y-6 h-127 overflow-y-auto scrollbar-hide p-5">
          {proposals.length === 0 ? (
            <div className="bg-gray-100/50 shadow-lg rounded-2xl p-6 text-center">
              <p className="text-gray-600">No proposals found.</p>
            </div>
          ) : (
            proposals.map((proposal, index) => (
              <div key={index} className="bg-gray-100/50 shadow-lg rounded-2xl p-6 ">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Proposal {index + 1}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center">
                        <AiOutlineUser className="text-gray-500 mr-2" size={16} />
                        <span className="font-medium">Sender:</span>
                        <span className="ml-2">{proposal.emails}</span>
                      </div>
                      <div className="flex items-center">
                        <AiOutlineMail className="text-gray-500 mr-2" size={16} />
                        <span className="font-medium">Recipient:</span>
                        <span className="ml-2">{proposal.sendemail}</span>
                      </div>
                      <div>
                        <span className="font-medium">Duration:</span>
                        <span className="ml-2">{proposal.form.duration} years</span>
                      </div>
                      <div>
                        <span className="font-medium">Crops:</span>
                        <span className="ml-2">{proposal.form.crops}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleViewProposal(proposal)}
                    className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal for Proposal Details */}
      {showModal && selectedProposal && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">

          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto scrollbar-hide">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Proposal Details</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="font-semibold text-gray-700">Sender:</span>
                  <p className="text-gray-900">{selectedProposal.emails}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Recipient:</span>
                  <p className="text-gray-900">{selectedProposal.sendemail}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Duration:</span>
                  <p className="text-gray-900">{selectedProposal.form.duration} years</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Crops:</span>
                  <p className="text-gray-900">{selectedProposal.form.crops}</p>
                </div>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Terms:</span>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  {selectedProposal.form.term.map((term, i) => (
                    <li key={i} className="text-gray-900">{term}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      </motion.div> 
    </div>
  );
};

export default Aproposal;
