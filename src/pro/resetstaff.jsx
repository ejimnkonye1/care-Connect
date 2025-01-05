/* eslint-disable react/no-unescaped-entities */


export const Resetstaff = () => {
    return(
        
  <div className="flex mt-20 justify-center items-center gap-8 transition delay-150 duration-300 ease-in-out p-10">
         
    <form className="md:max-w-md w-full mx-auto">
           
     
           <div className="">
             <h3 className="text-4xl font-extrabold text-blue-600">Reset Password</h3>
           </div>
     
           <div>
             <div className="relative flex items-center">
               <input
                 name="email"
                 type="text"
                 required
                 className="w-full text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                 placeholder="Enter email"
               />
               <svg
                 xmlns="http://www.w3.org/2000/svg"
                 fill="#bbb"
                 stroke="#bbb"
                 className="w-[18px] h-[18px] absolute right-2"
                 viewBox="0 0 682.667 682.667"
               >
                 <defs>
                   <clipPath id="a" clipPathUnits="userSpaceOnUse">
                     <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                   </clipPath>
                 </defs>
                 <g clipPath="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                   <path
                     fill="none"
                     strokeMiterlimit="10"
                     strokeWidth="40"
                     d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                     data-original="#000000"
                   ></path>
                   <path
                     d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                     data-original="#000000"
                   ></path>
                 </g>
               </svg>
             </div>
           </div>
       

       
           <div className="mt-12">
             <button
               type="button"
               className="w-full shadow-xl py-2.5 px-5 text-sm font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
             >
             Reset Password
             </button>
       
        
       
             <p className="text-gray-800 text-sm text-center mt-6">
                <a href="javascript:void(0);" className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">Back to login</a>
             </p>
           </div>
         </form>
  </div>
    )
}