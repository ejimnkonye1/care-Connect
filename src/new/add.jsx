


const childDetails = {
    name: "Ella Johnson",
    dob: "January 15, 2020",
    age: "3 years",
    gender: "Female",
    allergies: ["Peanuts", "Dairy"],
  };

const Add = () => {


  return (
    
 <div className="inline-flex w-full flex-col items-start justify-start rounded-[14px] border border-slate-100 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900 shadow-md">
 <div className="flex w-full items-center justify-between">
        <h3 className="text-base font-semibold leading-relaxed text-zinc-800 dark:text-neutral-100">
          Child details
        </h3>
        <button className="cursor-pointer text-base font-medium text-emerald-400">
          See All
        </button>
      </div>
      <div className="mb-4 flex w-full items-center justify-between">
        <div className="flex items-center space-x-3">
        </div>
      </div>

      {/* Child Details */}
      <div className="w-full space-y-4">
        <div className="flex justify-between text-sm text-gray-700 dark:text-neutral-300">
          <span className="font-medium">Name</span>
          <span>{childDetails.name}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-700 dark:text-neutral-300">
          <span className="font-medium">Age:</span>
          <span>{childDetails.age}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-700 dark:text-neutral-300">
          <span className="font-medium">Gender:</span>
          <span>{childDetails.gender}</span>
        </div>
      </div>

   
    </div>




 
  );
};

export default Add;