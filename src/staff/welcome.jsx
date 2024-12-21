import pa from '../assets/pa.jpg';

const childDetails = {
    name: "Ella Johnson",
    dob: "January 15, 2020",
    age: "3 years",
    gender: "Female",
    Number:'07062487335',
    allergies: ["Peanuts", "Dairy"],
  };
export const WelcomeStaff = () => {
  return (
    <div>

<section className="flex h-auto w-full rounded-[14px] border border-slate-100 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex items-center justify-between space-x-4 w-full">
        <div className="p-2 rounded-lg shadow-md flex items-center flex-grow">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-gray-400 rounded-full overflow-hidden">
              <img src={pa} alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="ml-4">
            <h2 className="text-sm font-semibold dark:text-white">Welcome Back!</h2>
            <p className="text-gray-600 dark:text-white text-sm">billie@example.com</p>
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

      {/* Child Details */}
      <div className="w-full space-y-4">
        <div className="flex justify-between text-sm text-gray-700 dark:text-neutral-300">
          <span className="font-medium">Name</span>
          <span>{childDetails.name}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-700 dark:text-neutral-300">
          <span className="font-medium">Phone:</span>
          <span>{childDetails.Number}</span>
        </div>
     
      </div>
    </section>
    </div>
  
    
  );
};
