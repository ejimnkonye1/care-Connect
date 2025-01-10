/* eslint-disable react/no-unescaped-entities */

import { useState } from "react";


import NavMenu from "../components/navmeu";
import Sidebar from "../admin/sidebar";

import AdminLayout from "../adminlayouts/children";


const ParentList = () => {
  
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
      
      currentPage="parentList" />
      <AdminLayout />
    </section>
  </section>

     


  );
};

export default ParentList ;