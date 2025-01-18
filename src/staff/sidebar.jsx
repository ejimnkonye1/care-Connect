/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */

import { FiMenu } from "react-icons/fi";
import  { useState } from "react";
import logo from '../assets/image.png';
import { Dash,Logout, UserOctagon,Messages,MoneySend,DocumentLike,CalendarTick,Reserve,Sun1,Moon
} from "iconsax-react";
import { NavLink, useNavigate } from "react-router-dom";
import LogoutModal from "../reuseable/logout";
import { signOut } from 'firebase/auth';
import { auth } from "../firebase";
import { ErrorAlert } from "../alert";
const Sidebar = ({isSidebarOpen,setSidebarOpen,}) => {

  const closeSidebar = () => {
    setSidebarOpen(false); // Close the sidebar
  };

  const [open, setOpen] = useState(false);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  

  const handleLogout = async () => {
    try {
      
      setLoading(true);
      await signOut(auth);
      setTimeout(() => {
        setOpen(false); // Close the modal
        navigate('/login'); // Redirect to login page
        setLoading(false); // Reset loading state
      }, 5000);
    } catch (error) {
      console.error("Error logging out: ", error);
     
  }
}
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className='' >
 

      {/* Sidebar */}
      <aside
  id="separator-sidebar"
  className={`fixed top-0 left-0 z-40 w-64 lg:w-[20%] h-screen transition-transform duration-300 ${
    isSidebarOpen ? "translate-x-0 block" : "-translate-x-full"
  } md:${isSidebarOpen ? "block" : "hidden"} lg:translate-x-0 lg:block`}
>


 

        <div className="h-full py-4 overflow-y-auto bg-neutral-50 dark:bg-[#111313] border-r border-slate-200 dark:border-neutral-800">
        <ul className="p-0 m-0 border-b border-slate-200 dark:border-neutral-800"> 
    <li className="">
      <NavLink
        to="#"
        className="flex items-center text-gray-900 rounded-lg dark:text-white"
      >
       
        <img
          src={logo} 
          alt="Logo"
          className="w-20 h-20 rounded-full -mt-4" 
        />
        <span className="">CareConnect</span>
      </NavLink>
    </li>
  </ul>
  
          <ul className="space-y-2 font-medium  px-3 py-3">
            
          <span className="dark:text-white text-sm">Menu</span>
            <li onClick={closeSidebar}>
              <NavLink
                to="/staffdashboard"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Dash size='25' className=" text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/addreports"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <DocumentLike
 className="w-5 h-5 text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">Reports</span>
              
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/addactivity"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <DocumentLike
 className="w-5 h-5 text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">Activity</span>
              
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/staffevents"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <CalendarTick className="w-5 h-5 text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">Events</span>
              
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/addattandance"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <MoneySend className="w-5 h-5 text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">Attandance</span>
              
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/addmealupdates"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Reserve className="w-5 h-5 text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">Meal Updates</span>
              
              </NavLink>
            </li>
          </ul>
          

        
          <ul className="space-y-2 font-medium  px-3 ">
            
            <span className="dark:text-white text-sm">Communication</span>
              <li onClick={closeSidebar}>
                <NavLink
                  to="/staffchat"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <Messages size='25' className=" text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="ms-3">Chat</span>
                </NavLink>
              </li>
             
             
            </ul>
            <ul className="space-y-2 font-medium  px-3 ">
            
            <span className="dark:text-white text-sm">Profile</span>
              <li onClick={closeSidebar}>
                <NavLink
                  to="/staffprofile"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <UserOctagon size='25' className=" text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="ms-3">Profile</span>
                </NavLink>
              </li>
              <li onClick={(e) => {closeSidebar(); handleOpen();}}>
                <NavLink
                  to="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <Logout size='25' className=" text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="ms-3">Logout</span>
                </NavLink>
              </li>
             <LogoutModal 
           
           
             open={open}
             onClose={handleClose}
             onLogout={handleLogout}
             loading={loading}
             />
               {error && (
                         <>
                                                <ErrorAlert
                                               open={!!error}
                                               message={error}
                                               onClose={() => setError("")}
                                             />
                                       </>
                       )}
            </ul>
        </div>
      </aside>


     
</div>

  );
};

export default Sidebar;
