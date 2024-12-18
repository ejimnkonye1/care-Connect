/* eslint-disable react/no-unescaped-entities */

import Layout from "./new/Layout";
import NavMenu from "./new/navmeu";
import Sidebar from "./new/sidebar";

const Test = () => {
  
 
  return (

    <section className="flex w-[100%]  bg-[#09090b] h-screen">
      <section className="lg:w-[20%]" >
     < Sidebar /> 
      </section>

    <section className="lg:w-[80%] flex-grow "> {/* Set NavMenu width to 70% */}
      <NavMenu currentPage="Dashboard" />
      <Layout />
    </section>
  </section>

     


  );
};

export default Test;