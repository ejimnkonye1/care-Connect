
import { doc, getDoc } from 'firebase/firestore';
import  { useState, useEffect } from 'react';

import { auth, firestore } from '../firebase'
import SkeletonLoader from '../reuseable/skelenton';
export const WelcomeAdmin = () => {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const currentHour = new Date().getHours();
  let greeting;

  if (currentHour < 12) {
    greeting = "Good Morning!";
  } else if (currentHour < 18) {
    greeting = "Good Afternoon!";
  } else {
    greeting = "Good Evening!";
  }

  useEffect(() => {
    const fetchAdminData = async () => {
      const user = auth.currentUser;
      setLoading(true)
      if (user) {
        console.log(user.uid)
        const adminDoc = await getDoc(doc(firestore, 'Admin', user.uid));
        if (adminDoc.exists()) {
          setAdminData(adminDoc.data());
        }
      }
      setLoading(false)
    };

    fetchAdminData();
  }, []);

  return (
    <div>
    {loading ? ( // Show skeleton loader while loading
        <section className="flex h-auto w-full rounded-[14px] border border-slate-100 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
          <div className="flex items-center justify-between space-x-4 w-full">
            <div className="p-2 rounded-lg shadow-md flex items-center flex-grow">
              <SkeletonLoader circle={true} height={48} width={48} />
              <div className="ml-4">
                <SkeletonLoader height={20} width={100} />
                <SkeletonLoader height={16} width={150} />
              </div>
            </div>
          </div>
        </section>
          ) : (
<section className="flex h-auto w-full rounded-[14px] border border-slate-100 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex items-center justify-between space-x-4 w-full">
        <div className="p-2 rounded-lg shadow-md flex items-center flex-grow">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-gray-400 rounded-full overflow-hidden">
              <img src={adminData?.image ?? ''} alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="ml-4">
            <h2 className="text-sm font-semibold dark:text-white">{greeting}</h2>
            <p className="text-gray-600 dark:text-white text-sm">{adminData?.name ?? ''}</p>
          </div>
        </div>

      
      </div>
    </section>
       )}
    <section className="mt-2 inline-flex w-full flex-col items-start justify-start rounded-[14px] border border-slate-100 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900 shadow-md">
    <div className="flex w-full items-center justify-between">
        <h6 className="text-base text-sm font-semibold leading-relaxed text-zinc-800 dark:text-neutral-100">
          Admin details
        </h6>
     
      </div>
      <div className="mb-4 flex w-full items-center justify-between">
        <div className="flex items-center space-x-3">
        </div>
      </div>

      
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
          <span>{adminData?.name ?? ''}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-700 dark:text-neutral-300">
          <span className="font-medium">Phone:</span>
          <span>{adminData?.phone ?? ''}</span>
        </div>
        </>
          )}
      </div>
    </section>
    </div>
  
    
  );
};
