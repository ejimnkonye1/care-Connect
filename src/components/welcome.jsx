
import { useState, useEffect } from "react";
import {  doc, getDoc,  } from 'firebase/firestore';
import { auth, firestore } from '../firebase'

export const Welcome = () => {
    const [userData, setUserData] = useState(null);
    const user = auth.currentUser
    useEffect(() => {
      const fetchUserData = async () => {
        if (user) {
          const userDocRef = doc(firestore, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUserData(userDoc.data());
       
          }
    
        }
      };
  
      fetchUserData();
    }, [user]);
  return (
    <div>

<section className="flex h-auto w-full rounded-[14px] border border-slate-100 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex items-center justify-between space-x-4 w-full">
        <div className="p-2 rounded-lg shadow-md flex items-center flex-grow">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-gray-400 rounded-full overflow-hidden">
              <img src={userData?.image ??''} alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="ml-4">
            <h2 className="text-sm font-semibold dark:text-white">Welcome Back!</h2>
          <p className="text-gray-600 dark:text-white text-sm">{userData?.email??''}</p>
          </div>
        </div>

      
      </div>
    </section>
    <section className="mt-2 inline-flex w-full flex-col items-start justify-start rounded-[14px] border border-slate-100 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900 shadow-md">
    <div className="flex w-full items-center justify-between">
        <h6 className="text-base text-sm font-semibold leading-relaxed text-zinc-800 dark:text-neutral-100">
          Parent details
        </h6>
     
      </div>
      <div className="mb-4 flex w-full items-center justify-between">
        <div className="flex items-center space-x-3">
        </div>
      </div>

      <div className="w-full space-y-4">
        <div className="flex justify-between text-sm text-gray-700 dark:text-neutral-300">
          <span className="font-medium">Name</span>
          <span>{userData?.lastName}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-700 dark:text-neutral-300">
          <span className="font-medium">Phone:</span>
          <span>{userData?.phone}</span>
        </div>
     
      </div>
    </section>
    </div>
  
    
  );
};
