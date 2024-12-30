/* eslint-disable react/no-unescaped-entities */





const Childlschdule = () => {


    return (
      
   <div className="inline-flex w-full flex-col items-start justify-start rounded-[14px] border border-slate-100 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900 shadow-md">
   <div className="flex w-full items-center justify-between">
          <h3 className="text-base font-semibold leading-relaxed text-zinc-800 dark:text-neutral-100">
          Today's Schedule
          </h3>
          <button className="cursor-pointer text-base font-medium text-emerald-400">
            See All
          </button>
        </div>
        <div className="mb-4 flex w-full items-center justify-between">
          <div className="flex items-center space-x-3">
          </div>
        </div>
  
 
   
  <div className="w-full space-y-4">
  <div className="flex justify-between text-sm text-gray-700 dark:text-neutral-300">
          <span className="font-bold">Schedule</span>
          <span className="font-bold"> Time</span>
        </div>
        <div className="flex justify-between text-sm text-gray-700 dark:text-neutral-300">
          <span className="font-medium">Group Playtime</span>
          <span> 9:00 AM</span>
        </div>
        <div className="flex justify-between text-sm text-gray-700 dark:text-neutral-300">
          <span className="font-medium">Group Lunch</span>
          <span>11:00 AM</span>
        </div>
        <div className="flex justify-between text-sm text-gray-700 dark:text-neutral-300">
          <span className="font-medium"> Group Nap</span>
          <span>1:00 PM </span>
        </div>
      </div>
        </div>
  
     
      
  
  
  
   
    );
  };
  
  export default Childlschdule;