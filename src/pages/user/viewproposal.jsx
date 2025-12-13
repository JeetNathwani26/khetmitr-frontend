import React from 'react';
import Usernav from '../../components/Usernav';
import Viewpro from '../../components/Viewpro';

const Viewproposal = () => {
    return (
        <div className="fixed top-0 left-0 bg-gradient-to-t from-green-100/50  to-white-100 h-screen w-screen overflow-y-auto">
            <Usernav/>
            <Viewpro/>
        </div>
    );
};

export default Viewproposal;
