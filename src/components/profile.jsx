import pa from '../assets/pa.jpg';

const ProfileInfo = () => {
    return (
      <div className="inline-flex w-full flex-col items-start justify-start rounded-[14px] border border-slate-100 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
        {/* Profile Picture Section */}
        <div className="flex items-center justify-center flex-row mb-6 border-b border-slate-200 dark:border-neutral-800">
          <img
            src={pa}
            alt="Profile"
            className="h-32 w-32 rounded-full object-cover mb-4"
          />
          <div className="flex flex-col pl-3">
            <button className="text-emerald-500 font-medium text-sm hover:underline">
              Upload new photo
            </button>
            <p className="text-xs text-gray-500 mt-1">
              At least 800x800 px recommended. JPG or PNG is allowed.
            </p>
          </div>
        </div>
  <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>

 
        {/* Parent Details Section */}
        <div className="mb-6 bg-gray-100 p-4 rounded-lg shadow-inner dark:bg-neutral-800">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-neutral-100">
              Parent Details
            </h3>
            <button className="text-sm text-emerald-500 hover:underline">Edit</button>
          </div>
          <div className="grid grid-cols-3 gap-4 w-full">
            <div className="text-sm font-medium text-gray-700 dark:text-neutral-300 p-2">
              Full Name:
            </div>
            <div className="text-sm font-medium text-gray-700 dark:text-neutral-300 p-2">
              Email:
            </div>
            <div className="text-sm font-medium text-gray-700 dark:text-neutral-300 p-2">
              Phone:
            </div>
            <div className="text-sm font-normal text-gray-600 dark:text-neutral-400 p-2">
              John Doe
            </div>
            <div className="text-sm font-normal text-gray-600 dark:text-neutral-400 p-2">
              john.doe@example.com
            </div>
            <div className="text-sm font-normal text-gray-600 dark:text-neutral-400 p-2">
              (123) 456-7890
            </div>
          </div>
        </div>
  
        {/* Child Details Section */}
        <div className="mb-6 bg-gray-100 p-4 rounded-lg shadow-inner dark:bg-neutral-800">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-neutral-100">
              Child Details
            </h3>
            <button className="text-sm text-emerald-500 hover:underline">Edit</button>
          </div>
        
          <div className="grid grid-cols-4 gap-4 w-full">
            <div className="text-sm font-medium text-gray-700 dark:text-neutral-300 p-2">
              Name:
            </div>
            <div className="text-sm font-medium text-gray-700 dark:text-neutral-300 p-2">
              Age:
            </div>
            <div className="text-sm font-medium text-gray-700 dark:text-neutral-300 p-2">
              Gender
            </div>
            <div className="text-sm font-medium text-gray-700 dark:text-neutral-300 p-2">
              Address
            </div>
            <div className="text-sm font-normal text-gray-600 dark:text-neutral-400 p-2">
            Jane Doe
            </div>
            <div className="text-sm font-normal text-gray-600 dark:text-neutral-400 p-2">
            Female
            </div>
            <div className="text-sm font-normal text-gray-600 dark:text-neutral-400 p-2">
            3 years
            </div>
            <div className="text-sm font-normal text-gray-600 dark:text-neutral-400 p-2">
            1234 Elm St, Springfield, IL, 62704
            </div>
            

          </div>
        </div>
        </div>
      </div>
    );
  };
  


export default ProfileInfo;
