


import { useState, useEffect } from "react";
import {  doc, getDoc,  } from 'firebase/firestore';
import { auth, firestore } from '../firebase'
import SkeletonLoader from "../reuseable/skelenton";



const Childdetails = () => {
  const [loading, setLoading] = useState(true); 
  const [userData, setUserData] = useState(null);
  const user = auth.currentUser
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true)
      if (user) {
        const userDocRef = doc(firestore, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserData(userDoc.data());
     
        }
  
      }
      setLoading(false)
    };

    fetchUserData();
  }, [user]);
  return (
    
 <div className="inline-flex w-full flex-col items-start justify-start rounded-[14px] border border-slate-100 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900 shadow-md">
 <div className="flex w-full items-center justify-between">
        <h3 className="text-base font-semibold leading-relaxed text-zinc-800 dark:text-neutral-100">
          Child details
        </h3>
   
      </div>
      <div className="mb-4 flex w-full items-center justify-between">
        <div className="flex items-center space-x-3">
        </div>
      </div>

      {/* Child Details */}
      <div className="w-full space-y-4">
      {loading ? (
            <>
              <SkeletonLoader height={20} width={`100%`} />
              <SkeletonLoader height={20} width={`100%`} />
            </>
          ) : (
            <>
        <div className="flex justify-between text-sm text-gray-700 dark:text-neutral-300">
          <span className="font-medium">Name</span>
          <span>{userData?.children[0]?.name ?? ''} </span>
        </div>
        <div className="flex justify-between text-sm text-gray-700 dark:text-neutral-300">
          <span className="font-medium">Age:</span>
          <span>{userData?.age} Years</span>
        </div>
        <div className="flex justify-between text-sm text-gray-700 dark:text-neutral-300">
          <span className="font-medium">Gender:</span>
          <span>{userData?.gender}</span>
        </div>
        </>
          )}
      </div>

   
    </div>




 
  );
};

export default Childdetails;