/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { ParentLoginForm } from "./parent";
import { AdminLoginForm } from "./admin";

import { StaffLoginForm } from "./staff";

const MainLogin = () => {
    const [isAdminLogin, setIsAdminLogin] = useState(false);
    const [isStaffLogin, setIsStaffLogin] = useState(false);
    const [btnloading, setbtnLoading] = useState(false);
    const [PasswordVisible, setPasswordVisible] = useState(false);
    const togglePasswordvisible = () => {
      setPasswordVisible(!PasswordVisible);
  };
    return (
    <div className="font-[sans-serif] bg-white flex items-center justify-center md:h-auto h-auto p-4">
      <div className="shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)] max-w-6xl max-md:max-w-lg w-full rounded-md p-6">
        <a className="text-2xl font-bold p-2  " >
          {/* <img
            // src="https://readymadeui.com/readymadeui.svg"
            src=""
            alt="logo"
            className='w-40 md:mb-4 mb-12'
          /> */}
      <span className="text-[#f7b45d]">𝓒𝓪𝓻𝓮</span>
      <span className="text-[#00adef]">𝓬𝓸𝓷𝓷𝓮𝓬𝓽</span>
        </a>


        {isAdminLogin? (
       
       <AdminLoginForm 
       setIsAdminLogin={setIsAdminLogin}
       setIsStaffLogin={setIsStaffLogin}
       isAdminLogin={isAdminLogin}
       btnloading={btnloading}
       setbtnloading={setbtnLoading}
       
        />
      
           )   : isStaffLogin ? (
       
       <StaffLoginForm 
       setIsAdminLogin={setIsAdminLogin}
       setIsStaffLogin={setIsStaffLogin}
       isAdminLogin={isAdminLogin}
       btnloading={btnloading}
       setbtnloading={setbtnLoading}
       
        />
            ) :(
              <ParentLoginForm
              setIsAdminLogin={setIsAdminLogin}
              setIsStaffLogin={setIsStaffLogin}
              btnloading={btnloading}
              setbtnloading={setbtnLoading}
              PasswordVisible={PasswordVisible}
              togglePasswordvisible={togglePasswordvisible}
             />
    
    )}

      
      </div>
    </div>
    );
  };
  
  export default MainLogin;
