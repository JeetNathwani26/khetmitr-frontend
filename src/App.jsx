import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loginpages from './pages/Loginpages';
import Adminpage from './pages/Admin/Adminpage';
import Homes from './pages/Admin/Homes';
import Landowner from './pages/Admin/Landownerpendding';
import ManagerPending from './pages/Admin/Managerpendding';
import Landhomes from './pages/Admin/landhomes';
import Registerpage from './pages/Registerpage';
import Home from './pages/user/Home';
import Forget from './pages/user/forget';
import Lhome from './pages/user/lhome';
import Proposal from './components/proposal';
import Profile from './pages/user/profile';
import Viewproposal from './pages/user/viewproposal';
import Aproposal from './pages/Admin/Aproposal';
import Registration1 from './pages/Redi';
import Report from './pages/Admin/Report';
import Portfolio from './pages/user/Portfolio';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/login" element={<Loginpages />} />
        <Route path="/admin" element={<Adminpage />} />
        <Route path="/manager" element={<Homes />} />
        <Route path="/lpendding" element={<Landowner />} />
        <Route path="/mpending" element={<ManagerPending />} />
        <Route path='/landowner' element={<Landhomes/>}/>
        <Route path='/landowner_home' element={<Home/>}/>
        <Route path='/Register' element={<Registerpage/>}/>
        <Route path='/Forget' element={<Forget/>}/>
        <Route path='/manager_view' element={<Lhome/>}/>
        <Route path='/proposal' element={<Proposal/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/Proposal_home' element={<Viewproposal/>}/>
        <Route path='/proposal_admin' element={<Aproposal/>}/>
        <Route path='/Registration1' element={<Registration1/>}/>
        <Route path='/reports' element={<Report/>}/>



      </Routes>
    </Router>
  );
}

export default App;
