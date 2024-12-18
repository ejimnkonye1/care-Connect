/* eslint-disable react/no-unescaped-entities */

import { FiMenu } from "react-icons/fi";
import  { useState } from "react";
import logo from '../assets/image.png'
import { Dash,Logout, UserOctagon,Messages,MoneySend,DocumentLike,CalendarTick,Reserve,Sun1,Moon
} from "iconsax-react";
const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  
  const closeSidebar = () => {
    setSidebarOpen(false); // Close the sidebar
  };
  const theme = ''
  return (
    <div className='' >
 
 <button
        onClick={toggleSidebar}
        aria-controls="separator-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden md:block hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <FiMenu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <aside
        id="separator-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform  ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full py-4 overflow-y-auto bg-[#111313] ">
        <ul className="p-0 m-0 border-b border-gray-700"> 
    <li className="">
      <a
        href="#"
        className="flex items-center text-gray-900 rounded-lg dark:text-white"
      >
       
        <img
          src={logo} 
          alt="Logo"
          className="w-20 h-20 rounded-full -mt-4" 
        />
        <span className="">CareConnect</span>
      </a>
    </li>
  </ul>
  
          <ul className="space-y-2 font-medium  px-3 py-3">
            
          <span className="dark:text-white text-sm">Menu</span>
            <li onClick={closeSidebar}>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Dash size='25' className=" text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <DocumentLike
 className="w-5 h-5 text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">Reports</span>
              
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <CalendarTick className="w-5 h-5 text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">Events</span>
              
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <MoneySend className="w-5 h-5 text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">Fees</span>
              
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Reserve className="w-5 h-5 text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">Meals</span>
              
              </a>
            </li>
          </ul>
          

        
          <ul className="space-y-2 font-medium  px-3 ">
            
            <span className="dark:text-white text-sm">Communication</span>
              <li onClick={closeSidebar}>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <Messages size='25' className=" text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="ms-3">Chat</span>
                </a>
              </li>
             
             
            </ul>
            <ul className="space-y-2 font-medium  px-3 ">
            
            <span className="dark:text-white text-sm">Profile</span>
              <li onClick={closeSidebar}>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <UserOctagon size='25' className=" text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="ms-3">Profile</span>
                </a>
              </li>
              <li onClick={closeSidebar}>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <Logout size='25' className=" text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="ms-3">Logout</span>
                </a>
              </li>
             
            </ul>
        </div>
      </aside>


     
</div>

  );
};

export default Sidebar;