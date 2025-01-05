/* eslint-disable react/no-unescaped-entities */
import { sendPasswordResetEmail} from 'firebase/auth';
import { auth, firestore } from "../firebase";
import { useState } from "react";
import {  getDocs, where, query , collection } from 'firebase/firestore';

export const Resetstaff = () => {
    const [email, setEmail] = useState('');
    const [success, setsuccess] = useState('')
    const [error, setError] = useState('');
    const [btnloading, setbtnLoading] = useState(false);
    const handleReset = async (e) => {
      e.preventDefault();
      try {
        const usersRef = collection(firestore, 'staff');
        const q = query(usersRef, where('email', '==', email));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.docs.length > 0) {
          await sendPasswordResetEmail(auth, email);
          setbtnLoading(true);
          setTimeout(() => {
            setbtnLoading(false);
            setsuccess(`An email has been sent to ${email}`);
          }, 9000);
        } else {
          setError("User not found");
          setTimeout(() => {
            setError(false);
          }, 5000);
        }
      } catch (err) {
        console.error("Error resetting password: ", err);
        setError("Error resetting password");
        setTimeout(() => {
          setError(false);
        }, 5000);
      }
    };
    return(
        
  <div className="flex mt-20 justify-center items-center gap-8 transition delay-150 duration-300 ease-in-out p-10">
         
    <form className="md:max-w-md w-full mx-auto" onSubmit={handleReset}>
    {error && (
          <div className="bg-yellow-300 text-center p-2 rounded mb-4">
            <span className="text-danger">{error}</span>
          </div>
        )}
         {success && (
          <div className="bg-yellow-300 text-center p-2 rounded mb-4">
            <span className="text-danger">{success}</span>
          </div>
        )}
           <div className="">
             <h3 className="text-4xl font-extrabold text-blue-600">Reset Password</h3>
           </div>
     
           <div>
             <div className="relative flex items-center">
               <input
                 name="email"
                 type="text"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
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
            type="submit"
            className="w-full shadow-xl py-2.5 px-5 text-sm font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            {btnloading ? (
              <svg
                className="animate-spin h-5 w-5 text-white mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                role="status"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v2a6 6 0 100 12v2a8 8 0 01-8-8z"
                ></path>
              </svg>
            ) : (
              " Reset Password"
            )}
          </button>
  
        
       
             <p className="text-gray-800 text-sm text-center mt-6">
                <a href="javascript:void(0);" className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">Back to login</a>
             </p>
           </div>
         </form>
  </div>
    )
}