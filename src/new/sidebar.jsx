/* eslint-disable react/no-unescaped-entities */
import {  AiOutlineInbox, AiOutlineAppstore } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import  { useState } from "react";
import logo from '../assets/image.png'
import { Dash } from "iconsax-react";
const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  
  const closeSidebar = () => {
    setSidebarOpen(false); // Close the sidebar
  };
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
  
          <ul className="space-y-2 font-medium  px-3 py-5">
            
          <span className="dark:text-white">Menu</span>
            <li onClick={closeSidebar}>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Dash size='25' className=" text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Dashboard</span>
              </a>
            </li>

            {/* Kanban */}
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <AiOutlineAppstore className="w-5 h-5 text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">Kanban</span>
                <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                  Pro
                </span>
              </a>
            </li>

            {/* Inbox */}
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <AiOutlineInbox className="w-5 h-5 text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">Inbox</span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  3
                </span>
              </a>
            </li>
          </ul>
        </div>
      </aside>


     
</div>

  );
};

export default Sidebar;