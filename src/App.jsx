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
        </Routes>
      </Router>
      </Layout>
      </Provider>
    </>
  )
}

export default App