/* eslint-disable react/no-unescaped-entities */

import { useState } from "react";
import Layout from "./new/Layout";
import NavMenu from "./new/navmeu";
import Sidebar from "./new/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "./action";

const Test = () => {
  
   const [isSidebarOpen, setSidebarOpen] = useState(false);
   const dispatch = useDispatch();

   const darkmode = useSelector((state)=> state.darkMode)
  
 
  const toggledark = () => {
    dispatch(setMode(!darkmode))
  }
 

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
      
      currentPage="Dashboard" />
      <Layout />
    </section>
  </section>

     


  );
};

export default Test;