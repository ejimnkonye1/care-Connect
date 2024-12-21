/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { ParentLoginForm } from "./parent";
import { AdminLoginForm } from "./admin";

const Test = () => {
    const [isParentLogin, setIsParentLogin] = useState(false);

  
    return (
    <div className="font-[sans-serif] bg-white flex items-center justify-center md:h-auto h-auto p-4">
      <div className="shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)] max-w-6xl max-md:max-w-lg w-full rounded-md p-6">
        <a >
          <img
            src="https://readymadeui.com/readymadeui.svg"
            alt="logo"
            className='w-40 md:mb-4 mb-12'
          />
        </a>


        {isParentLogin? 
       

<ParentLoginForm
 setIsParentLogin={setIsParentLogin}
 isParentLogin={isParentLogin}
/>
      
        :
       
       <AdminLoginForm 
       setIsParentLogin={setIsParentLogin}
       isParentLogin={isParentLogin}
        />
    
    }

      
      </div>
    </div>
    );
  };
  
  export default Test;
