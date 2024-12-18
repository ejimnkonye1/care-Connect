import { Copy } from 'iconsax-react';
import pa from '../assets/pa.jpg';

export const Welcome = () => {
  return (
    <section className="flex h-auto w-full flex-wrap  rounded-[14px] border border-slate-100 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
      {/* Hello Billie Section */}
      <div className="flex items-center justify-between space-x-4">
            <div className="p-2 rounded-lg shadow-md flex items-center">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-gray-400 rounded-full overflow-hidden">
                        <img src={pa} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                </div>
                <div className="ml-4">
                    <h2 className="text-lg font-semibold dark:text-white">Hello Billie</h2>
                    <p className="text-gray-600 dark:text-white">billie@example.com</p>
                </div>
            </div>
            <div className="bg-gray-800 text-white rounded-full px-4 py-2">
                Edit profile
            </div>
        </div>

      {/* Additional Info Sections - Push to the end */}
      {/* <div className="flex space-x-4 ml-auto">
        <div className="p-2 rounded-lg text-sm dark:bg-neutral-800">
          <div className="p-1 rounded-lg shadow-md flex flex-col">
            <h2 className="text-sm font-semibold dark:text-white text-start">User ID</h2>
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm font-semibold dark:text-white text-start">99876</p>
              <div className="flex justify-end pl-6">
                <button aria-label="Copy User ID" className="text-gray-600 dark:text-white hover:text-gray-800 dark:hover:text-gray-300 text-end">
                  <Copy className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-2 rounded-lg text-sm dark:bg-neutral-800">
          <div className="p-1 rounded-lg shadow-md flex flex-col">
            <h2 className="text-sm font-semibold dark:text-white text-start">Phone Number</h2>
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm font-semibold dark:text-white text-start">+1 (234) 567-890</p>
              <div className="flex justify-end pl-6">
                <button aria-label="Copy Phone Number" className="text-gray-600 dark:text-white hover:text-gray-800 dark:hover:text-gray-300 text-end">
                  <Copy className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-2 rounded-lg text-sm dark:bg-neutral-800">
          <div className="p-1 rounded-lg shadow-md flex flex-col">
            <h2 className="text-sm font-semibold dark:text-white text-start">Address</h2>
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm font-semibold dark:text-white text-start">1234 Elm Street, Springfield</p>
              <div className="flex justify-end pl-6">
                <button aria-label="Copy Address" className="text-gray-600 dark:text-white hover:text-gray-800 dark:hover:text-gray-300 text-end">
                  <Copy className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-2 rounded-lg text-sm dark:bg-neutral-800">
          <div className="p-1 rounded-lg shadow-md flex flex-col">
            <h2 className="text-sm font-semibold dark:text-white text-start">Date of Birth</h2>
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm font-semibold dark:text-white text-start">January 1, 1990</p>
              <div className="flex justify-end pl-6">
                <button aria-label="Copy Date of Birth" className="text-gray-600 dark:text-white hover:text-gray-800 dark:hover:text-gray-300 text-end">
                  <Copy className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </section>
  );
};
