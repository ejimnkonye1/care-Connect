/* eslint-disable react/prop-types */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { LoginForm } from './profile/login'
import { ResetPassword} from './profile/resetPassword'
import { useState , useEffect} from 'react'
import {  ResetStaff } from './profile/resetstaff'
import { ResetParent } from './profile/resetparent'
import { LandingPage } from './landing/landing'
import { Dashboard } from './dashboards/parentdashboard'
import { StaffDashboard } from './dashboardstaff/Stasffdashboard'
import {  SignUp } from './profile/SignUp'
import { Provider } from 'react-redux'
import store from './store'
import { AdminDashboard } from './admindashboard.jsx/admin'
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


const Loader = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
    <div className="text-center">
    <div className="spinner-grow text-warning" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
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
  const [showToast, setShowToast] = useState(false);
  const [btnloading, setbtnLoading] = useState(false);
  return (
    <>
    <Provider store={store} >

 
     <Layout>

   
      <Router>
        
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<LoginForm />} />

          <Route path='/reset' element={<ResetPassword btnloading={btnloading} setbtnLoading={setbtnLoading} />} />
          <Route path='/resetstaff' element={<ResetStaff btnloading={btnloading} setbtnLoading={setbtnLoading}  />} />
          <Route path='/resetpar' element={<ResetParent btnloading={btnloading} setbtnLoading={setbtnLoading}  />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/dash' element={<Dashboard showToast={showToast} setShowToast={setShowToast} />} />
          <Route path='/staff' element={<StaffDashboard showToast={showToast} setShowToast={setShowToast} />} />
          <Route path='/admin' element={<AdminDashboard showToast={showToast} setShowToast={setShowToast} />} />
          <Route path='/parentdashboard' element={<Dashboards />} />
          <Route path='/re' element={<Report />} />
          <Route path='/ev' element={<Event />} />
          <Route path='/meal' element={<Meal />} />
          <Route path='/fee' element={<Fee />} />
          <Route path='/pro' element={<Profile />} />
          <Route path='/chat' element={<Chats />} />
          <Route path='/st' element={<Staffdashboards />} />
          <Route path='/reups' element={<Staffreports />} />
          <Route path='/act' element={<Staffactivity />} />
          <Route path='/evups' element={<Staffevent />} />
          <Route path='/at' element={<Staffattandance />} />
          <Route path='/mealupdates' element={<Staffmeals />} />
          <Route path='/schat' element={<Staffchat />} />
          <Route path='/spro' element={<Staffprofile />} />
          <Route path='/ad' element={<Adminsdashboards />} />
          <Route path='/signups' element={<SignUps />} />
          <Route path='/log' element={<MainLogin />} />
          <Route path='/res' element={<Resetparent />} />
          <Route path='/rest' element={<Resetstaff />} />
          <Route path='/resa' element={<Resetadmin />} />
        </Routes>
      </Router>
      </Layout>
      </Provider>
    </>
  )
}

export default App