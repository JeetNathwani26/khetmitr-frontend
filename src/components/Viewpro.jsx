import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Usernav from './Usernav';
import logo from '../assets/photo/logo2.png';
import Lottie from 'lottie-react';
import loder from '../assets/animation/a5haOnj6gP.json';
import {motion} from "motion/react";
import { AiOutlineSend, AiOutlineInbox, AiOutlineWhatsApp } from 'react-icons/ai';
const API_URL = import.meta.env.VITE_BACKEND_URL;

const sendProposalNotification = async (recipientEmail, status, proposalDetails) => {
  const subject = status === 'Accepted'
    ? "Proposal Accepted - KhetMitra"
    : "Proposal Rejected - KhetMitra";

  const text = status === 'Accepted'
    ? `
        <div style="font-family: Arial, sans-serif; color: #333; text-align: center;">
          <img src="https://raw.githubusercontent.com/JeetNathwani26/image/refs/heads/main/logo.png" alt="KhetMitra" width="200" style="margin-bottom: 20px;" />
          <h2>KhetMitra Notification</h2>
          <p style="font-size: 16px;">Great news! Your proposal has been accepted.</p>
          <p style="font-size: 16px;">The manager will shortly send you a message via WhatsApp to discuss next steps.</p>
          <p style="margin-top: 20px; font-size: 14px; color: #666;">
            Best regards,<br/>🌿 The KhetMitra Team
          </p>
        </div>
      `
    : `
        <div style="font-family: Arial, sans-serif; color: #333; text-align: center;">
          <img src="https://raw.githubusercontent.com/JeetNathwani26/image/refs/heads/main/logo.png" alt="KhetMitra" width="200" style="margin-bottom: 20px;" />
          <h2>KhetMitra Notification</h2>
          <p style="font-size: 16px;">We regret to inform you that your proposal has been rejected.</p>
          <p style="font-size: 16px;">Thank you for your interest in KhetMitra.</p>
          <p style="margin-top: 20px; font-size: 14px; color: #666;">
            Best regards,<br/>🌿 The KhetMitra Team
          </p>
        </div>
      `;

  const mailPromise = fetch(`${API_URL}/sendmail`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to: recipientEmail,
      subject: subject,
      text: text,
    }),
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to send mail");
    return res.json();
  });

  toast.promise(
    mailPromise,
    {
      loading: `Sending ${status.toLowerCase()} notification...`,
      success: `${status} notification sent successfully!`,
      error: `Failed to send ${status.toLowerCase()} notification.`,
    }
  );
};

const Viewpro = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('sent');

  const emails = localStorage.getItem('userEmail');

  useEffect(() => {
    if (!emails) {
      setError('User not logged in');
      setLoading(false);
      return;
    }

    const fetchProposals = async () => {
      try {
        const response = await fetch(`${API_URL}/get_proposal`, {
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) throw new Error('Failed to fetch proposals');
        const data = await response.json();
        setProposals(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        toast.error('Failed to load proposals');
      }
    };

    fetchProposals();
    const interval = setInterval(fetchProposals, 1000);

    return () => clearInterval(interval);
  }, [emails]);

  if (loading ) {
    return (
      <div className='p-3 pt-10'>
        <div>
          <img src={logo} alt="Logo" className="w-16 h-16 mx-auto mb-2 animate-pulse" />
          <h1 className="text-3xl font-bold text-green-600 text-center ">My Proposals</h1>
        </div>
        <div className="container mx-auto px-1 py-4">
          <div className='h-60  p-6'>
                     <div className="bg-gray-100/50 shadow-md rounded-full p-2 mb-8 ">
            <div className="flex justify-center space-x-4">
              <button
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-colors ${
                  activeTab === 'sent'
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-green-50'
                }`}
                onClick={() => setActiveTab('sent')}
              >
                <AiOutlineSend size={20} />
                <span>Sent Proposals</span>
              </button>
              <button
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-colors ${
                  activeTab === 'received'
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-green-50'
                }`}
                onClick={() => setActiveTab('received')}
              >
                <AiOutlineInbox size={20} />
                <span>Received Proposals</span>
              </button>
            </div>
          </div>
          </div>
 
        </div>

        <div className="flex justify-center items-center h-4">
          <div className='flex flex-col'>
            <div>
                <Lottie animationData={loder} loop={true} className='h-20 w-64' />
            </div>
          
          <p className='text-center'>Loding...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="flex justify-center items-center">
          <p className="text-red-500 pt-15">{error}</p>
        </div>
      </div>
    );
  }

  const sentProposals = proposals.filter(proposal => proposal.emails === emails);
  const receivedProposals = proposals.filter(proposal => proposal.sendemail === emails);

  const handleProposalStatus = async (proposalId, status, proposal) => {
    try {
      const response = await fetch("http://localhost:5000/update_proposal_status", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ proposal_id: proposalId, status }),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(`Proposal ${status} successfully!`);

        // Send notification email to the proposal sender
        await sendProposalNotification(proposal.emails, status, proposal);

      } else {
        toast.error(result.error || "Failed to update proposal status");
      }
    } catch (error) {
      toast.error("Error updating proposal status");
    }
  };

  const renderProposals = (list, type) => (
    <div className="space-y-6 pt-4">
          {list.length === 0 ? (
            <div className="bg-gray-100/50 shadow-2xl rounded-2xl p-6 text-center">
              <p className="text-gray-600">No {type} proposals found.</p>
            </div>
          ) : (
            list.map((proposal, index) => (
              <div key={index} className="bg-gray-100/50 shadow-md rounded-2xl p-6  ">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Proposal {index + 1}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-gray-700">Duration:</span>
                    <span className="text-gray-900">{proposal.form.duration} years</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-gray-700">Crops:</span>
                    <span className="text-gray-900">{proposal.form.crops}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-gray-700">Sender:</span>
                    <span className="text-gray-900">{proposal.emails}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-gray-700">Recipient:</span>
                    <span className="text-gray-900">{proposal.sendemail}</span>
                  </div>
                </div>
                <div className="mb-4">
                  <span className="font-semibold text-gray-700">Terms:</span>
                  <ul className="list-disc ml-6 mt-2 space-y-1">
                    {proposal.form.term.map((term, i) => (
                      <li key={i} className="text-gray-900">{term}</li>
                    ))}
                  </ul>
                </div>
                <div className="mb-4">
                  <span className="font-semibold text-gray-700">Status:</span>
                  <span className={`ml-2 font-semibold ${
                    proposal.status === 'Accepted' ? 'text-green-600' :
                    proposal.status === 'Rejected' ? 'text-red-600' : 'text-yellow-600'
                  }`}>
                    {proposal.status ? proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1) : 'Pending'}
                  </span>
                </div>
                {type === 'received' && (proposal.status === 'pending' || !proposal.status) && (
                  <div className="flex justify-center space-x-4 mb-4">
                    <button
                      onClick={() => handleProposalStatus(proposal._id, 'Accepted', proposal)}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleProposalStatus(proposal._id, 'Rejected', proposal)}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                      Reject
                    </button>
                  </div>
                )}
                {(proposal.status === "Accepted")&&(
                                  <div className="text-center">
                  <a
                    href={`https://wa.me/${proposal.phone}?text=${encodeURIComponent("I am interested in your proposal")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors shadow-md"
                  >
                    <AiOutlineWhatsApp size={20} />
                    <span>Send Message via WhatsApp</span>
                  </a>
                </div>
                )}

              </div>
            ))
          )}
    </div>
  );

  return (
    <div className="fixed top-0 left-0 bg-gradient-to-t from-green-100/50 to-white-100 ">
      <Usernav />
      <div className="container mx-auto px-1 py-4 ">
        {/* Header */}
        <div className='pb-3'>
          <img src={logo} alt="Logo" className="w-16 h-16 mx-auto mb-2 animate-pulse" />
          <h1 className="text-3xl font-bold text-green-600 text-center ">My Proposals</h1>
        </div>


        {/* Tabs */}
        <div className='h-140 md:h-90 overflow-auto scrollbar-hide p-6'>
          <div className="md:bg-gray-100/50 md:shadow-md md:rounded-full md:p-2 md:mb-8 ">
            <div className="flex justify-center space-x-4">
              <button
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-colors ${
                  activeTab === 'sent'
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-green-50'
                }`}
                onClick={() => setActiveTab('sent')}
              >
                <AiOutlineSend size={20} />
                <span>Sent Proposals</span>
              </button>
              <button
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-colors ${
                  activeTab === 'received'
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-green-50'
                }`}
                onClick={() => setActiveTab('received')}
              >
                <AiOutlineInbox size={20} />
                <span>Received Proposals</span>
              </button>
            </div>
          </div>
         

          {/* Proposals */}
          <motion.div
            initial={{ opacity: 0, y: -20  }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}       
          >
          {activeTab === 'sent' && renderProposals(sentProposals, 'sent')}
          {activeTab === 'received' && renderProposals(receivedProposals, 'received')}
          </motion.div>
       </div>
      </div>
    </div>
  );
};

export default Viewpro;
