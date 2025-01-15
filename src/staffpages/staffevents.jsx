/* eslint-disable react/no-unescaped-entities */

import { useState } from "react";


import NavMenu from "../components/navmeu";
import Sidebar from "../staff/sidebar";
import StaffLayout from "../stafflayouts/staffeventslayout";


const Staffevent = () => {
  
   const [isSidebarOpen, setSidebarOpen] = useState(false);
 
 

  return (

    <section className="flex bg-[#09090b] h-screen w-[100%]">
      <section className=" h-screen lg:w-[20%]" >
     < Sidebar
      setSidebarOpen={setSidebarOpen}
      isSidebarOpen={isSidebarOpen}
     
     /> 
      </section>

    <section className=" flex-grow lg:w-[75%]"> 
      <NavMenu
      setSidebarOpen={setSidebarOpen}
      isSidebarOpen={isSidebarOpen}
      
      currentPage=" Events" />
      <StaffLayout />
    </section>
  </section>

     


  );
};

export default Staffevent;