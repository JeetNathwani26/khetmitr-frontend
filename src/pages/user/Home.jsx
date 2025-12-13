import React from 'react';
import Usernav from '../../components/Usernav';
import Mangerlist from '../../components/Mangerlist';
import { useState,useEffect } from 'react';
import Lottie from 'lottie-react';
import finding from '../../assets/animation/aDuYlSibpb.json'

const FindingView = () => {
  return (
 <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 px-4">
  <div className="flex flex-col items-center text-center space-y-4">
    
    {/* Animation */}
    <Lottie 
      animationData={finding} 
      loop={true} 
      className="w-32 h-32 sm:w-40 sm:h-40" 
    />

    {/* Text Content */}
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-green-600">
        Finding a Manager...
      </h2>
      <p className="mt-2 text-gray-600 text-sm sm:text-base">
        Please wait while we find the best match for you.
      </p>
    </div>
  </div>
</div>
  );
};

const Home = () => {
      const [showFinding, setShowFinding] = useState(false);
      const [timeleft, setTimeleft] = useState(5);
      const [login, setLogin] = useState(localStorage.getItem("userEmail"));
    
      useEffect(() => {
        const hasSeenFinding = localStorage.getItem('hasSeenFinding');
        if (login && !hasSeenFinding) {
          setShowFinding(true);
        }
      }, [login]);
    
      useEffect(() => {
        if (timeleft > 0 && showFinding) {
          const timer = setTimeout(() => setTimeleft(timeleft - 1), 1000);
          return () => clearTimeout(timer);
        } else if (timeleft === 0) {
          setShowFinding(false);
          localStorage.setItem('hasSeenFinding', 'true');
        }
      }, [timeleft, showFinding]);
    return (
        <div className="fixed top-0 left-0 bg-gradient-to-t from-green-100/50  to-white-100 h-screen w-screen overflow-y-auto">
            <Usernav/>
            {showFinding ? <FindingView /> : <Mangerlist/>}
            
        </div>
    );
};

export default Home;
