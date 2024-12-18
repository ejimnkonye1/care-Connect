/* eslint-disable react/prop-types */
import {
    
    Calendar,
   
    Logout,
    Sun1
  } from "iconsax-react";

  
  const NavMenu = ({ currentPage }) => {
    const formatDate = () => {
      const options = { month: "long", day: "numeric", year: "numeric" };
      const formattedDate = new Date().toLocaleDateString(undefined, options);
      return formattedDate;
    };
  
    const formattedDate = formatDate();
  
    return (
      <>
        <section className="flex w-full items-center justify-between  bg-[#111313] px-4 py-2 border-l border-t border-gray-700  lg:py-4 ">
          <span className="text-base font-semibold text-zinc-800 dark:text-neutral-100 md:text-xl">
            {currentPage}
          </span>
          <div className="flex items-center gap-3 sm:gap-6">
          
  
           
  
            <div className="hidden items-center gap-3 dark:text-neutral-100 lg:flex">
              <Calendar size={20} />
              <span className="text-sm font-medium text-zinc-800 dark:text-neutral-100">
                {formattedDate}
              </span>
            </div>
  
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300 text-slate-900 dark:border-neutral-700 dark:text-neutral-100 md:h-10 md:w-10">
              <Sun1 size="20" />
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