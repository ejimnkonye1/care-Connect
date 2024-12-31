/* eslint-disable react/no-unescaped-entities */

import { useState } from "react";

import NavMenu from "../components/navmeu";
import Sidebar from "../staff/sidebar";

import StaffLayout from "../stafflayouts/staffrepotslayout";


const Staffreports = () => {
  
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
      
      currentPage="Staff dashboard" />
      <StaffLayout />
    </section>
  </section>

     


  );
};

export default Staffreports;