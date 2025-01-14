/* eslint-disable react/no-unescaped-entities */

import { useState } from "react";

import NavMenu from "../components/navmeu";
import Sidebar from "../components/sidebar";
import Layout from "../layouts/Feelayout";




const Fee = () => {
  
   const [isSidebarOpen, setSidebarOpen] = useState(false);

 

  return (

    <section className="flex w-[100%]  bg-[#09090b] h-screen">
      <section className="lg:w-[20%] h-screen" >
     < Sidebar
      setSidebarOpen={setSidebarOpen}
      isSidebarOpen={isSidebarOpen}
     
     /> 
      </section>

    <section className="lg:w-[80%] flex-grow "> {/* Set NavMenu width to 70% */}
      <NavMenu
      setSidebarOpen={setSidebarOpen}
      isSidebarOpen={isSidebarOpen}
      
      currentPage="Fees" />
    <Layout />
    </section>
  </section>

     


  );
};

export default Fee;