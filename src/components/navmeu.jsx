/* eslint-disable react/prop-types */
import {
    
    Calendar,
   
    Logout,
    Moon,
    Sun1
  } from "iconsax-react";

  import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../action";
  
  const NavMenu = ({ currentPage ,setSidebarOpen,isSidebarOpen }) => {
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
      };
    const formatDate = () => {
      const options = { month: "long", day: "numeric", year: "numeric" };
      const formattedDate = new Date().toLocaleDateString(undefined, options);
      return formattedDate;
    };
  
    const formattedDate = formatDate();
    const dispatch = useDispatch();

    const darkmode = useSelector((state)=> state.darkMode)
   
  
   const toggledark = () => {

     dispatch(setMode(!darkmode)); // Toggle Redux state
     if (!darkmode) {
       document.documentElement.classList.add('dark');
     } else {
       document.documentElement.classList.remove('dark');
     }
   
   }


    return (
      <>
        <section className="flex  lg:w-[100%] items-center justify-between bg-neutral-50  dark:bg-[#111313] px-4 py-2  border-b border-slate-200 dark:border-neutral-800  lg:py-4 ">
          <span className="text-base font-semibold text-zinc-800 dark:text-neutral-100 md:text-xl hidden lg:block">
            {currentPage}
          </span>
          
 <button
        onClick={toggleSidebar}
        aria-controls="separator-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg lg:hidden md:block hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <FiMenu className="w-6 h-6" />
      </button>
          <div className="flex items-center gap-3 sm:gap-6">
          
  
           
  
            <div className="hidden items-center gap-3 dark:text-neutral-100 lg:flex">
              <Calendar size={20} />
              <span className="text-sm font-medium text-zinc-800 dark:text-neutral-100">
                {formattedDate}
              </span>
            </div>
  
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300 text-slate-900 dark:border-neutral-700 dark:text-neutral-100 md:h-10 md:w-10" onClick={toggledark}>
         {darkmode ? <Sun1 size='20'/> : <Moon  size='20'/>}
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300 text-slate-900 dark:border-neutral-700 dark:text-neutral-100 md:h-10 md:w-10">
              <Logout size="20" />
            </span>
           
          </div>
        </section>
      </>
    );
  };
  
  export default NavMenu;