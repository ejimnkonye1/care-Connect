/* eslint-disable react/prop-types */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import { useState , useEffect} from 'react'

import { LandingPage } from './landing/landing'

import { Provider } from 'react-redux'
import store from './store'

import Dashboards from './pages/Dashboard'
import Report from './pages/Reports'
import Event from './pages/Events'
import Meal from './pages/meal'
import Fee from './pages/fee'
import Profile from './pages/profile'
import Chats from './pages/chat'
import Staffdashboards from './staffpages/dashboard'
import Staffreports from './staffpages/staffreport'
import Staffevent from './staffpages/staffevents'
import Staffattandance from './staffpages/Attandace'
import Staffmeals from './staffpages/staffmealupdates'
import Staffchat from './staffpages/staffchat'
import Staffprofile from './staffpages/staffprofile'
import Staffactivity from './staffpages/staffactivity'
import Adminsdashboards from './adminpages/dashboard'
import { SignUps } from './pro/Signup'
import MainLogin from './Login/main'
import { Resetparent } from './pro/resetparent'
import { Resetstaff } from './pro/resetstaff'
import { Resetadmin } from './pro/resetadmin'
import ChildrenList from './adminpages/children'
import ParentList from './adminpages/parent'
import StaffList from './adminpages/staff'
import Finance from './adminpages/finance'
import Events from './adminpages/events'
import Adminchat from './adminpages/adminchat'


const Loader = () => (
/* From Uiverse.io by devAaus */ 
<div className="flex-col gap-4 w-full flex items-center justify-center h-screen">
  <div
    className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
  >
    <div
      className="w-16 h-16 border-4 border-transparent text-[#f7b45d]-400 text-2xl animate-spin flex items-center justify-center border-t-[#f7b45d] rounded-full"
    ></div>
  </div>
</div>

  
  
  );
  
  const Layout = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const delayLoader = setTimeout(() => {
        setIsLoading(false);
      }, 5000);
  
      return () => clearTimeout(delayLoader);
    }, []);
  
    return isLoading ? <Loader /> : children;
  };
function App() {

  
  return (
    <>
    <Provider store={store} >

 
     <Layout>

   
      <Router>
        
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/signup' element={<SignUps />} />
          <Route path='/login' element={<MainLogin />} />
          <Route path='/resetpar' element={<Resetparent />} />
          <Route path='/resetstaff' element={<Resetstaff />} />
          <Route path='/reset' element={<Resetadmin />} />
          <Route path='/parentdashboard' element={<Dashboards />} />
          <Route path='/re' element={<Report />} />
          <Route path='/ev' element={<Event />} />
          <Route path='/meal' element={<Meal />} />
          <Route path='/fee' element={<Fee />} />
          <Route path='/pro' element={<Profile />} />
          <Route path='/chat' element={<Chats />} />
          <Route path='/staffdashboard' element={<Staffdashboards />} />
          <Route path='/addreports' element={<Staffreports />} />
          <Route path='/addactivity' element={<Staffactivity />} />
          <Route path='/staffevents' element={<Staffevent />} />
          <Route path='/addattandance' element={<Staffattandance />} />
          <Route path='/addmealupdates' element={<Staffmeals />} />
          <Route path='/staffchat' element={<Staffchat />} />
          <Route path='/staffprofile' element={<Staffprofile />} />
          <Route path='/admin' element={<Adminsdashboards />} />
          <Route path='/childrenlist' element={<ChildrenList />} />
          <Route path='/parentlist' element={<ParentList />} />
          <Route path='/stafflist' element={<StaffList />} />
          <Route path='/finance' element={<Finance />} />
          <Route path='/setevent' element={<Events />} />
          <Route path='/adminchat' element={<Adminchat />} />
        </Routes>
      </Router>
      </Layout>
      </Provider>
    </>
  )
}

export default App