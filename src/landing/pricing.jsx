
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";

export const Pricing = () => {

    const handleDemo = () => {
        alert('coming soon')
      }
    return(
<section id="pricing" className="mb-3 py-3  p-5 lg:p-10">
  <h2 className="text-center mb-10 mt-10 text-[1.9rem] font-[700] text-[#00adef]">Pricing</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:p-10">
    {/* Basic Plan */}
    <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow">
      <div className="bg-[#00adef] text-white p-4 rounded-t-lg">
        <h3 className="text-center text-xl">Basic</h3>
        <p className="text-center text-lg">$0.00/month</p>
        <div className="border-t border-b border-l border-r border-blue-800 bg-blue-500 text-center py-2 mb-3">
          Top features include
        </div>
      </div>
      <ul className="p-4 space-y-2  cursor-poniter">
        <li className="flex items-center border-b p-2 cursor-poniter">
          <IoCheckmarkDoneOutline className="text-blue-600 mr-2 cursor-pointer" />
          Real-time updates
        </li>
        <li className="flex items-center border-b p-2">
          <IoCheckmarkDoneOutline className="text-blue-600 mr-2" />
           <span className=" cursor-poniter">Secure messaging</span>
        </li>
        <li className="flex items-center border-b p-2">
          <FaXmark className="text-red-500 mr-2" />
          Personalized insights
        </li>
        <li className="flex items-center border-b p-2">
          <FaXmark className="text-red-500 mr-2" />
          Classroom View
        </li>
      </ul>
      <div className="flex justify-center mb-3">
        <a className="bg-[#00adef] text-white px-4 py-2 rounded" href='/signup' >
          Sign Up
        </a>
      </div>
    </div>

    {/* Premium Plan */}
    <div className="bg-white rounded-lg shadow-lg p-4 relative hover:shadow-xl transition-shadow">
      <div className="absolute top-[60px] left-[4px] bg-[#1DC7EA] text-white px-[10px] py-[5px] rounded text-xs font-bold transform -rotate-45 origin-top-left">
        Coming Soon
      </div>
      <div className="bg-gray-400 text-white p-4 rounded-t-lg">
        <h3 className="text-center text-xl">Premium</h3>
        <p className="text-center text-lg">$19.99/month</p>
        <div className="border-t border-b border-gray-400 bg-gray-300 text-center py-2 mb-3">
          Top features include
        </div>
      </div>
      <ul className="p-4 space-y-2">
        <li className="flex items-center border-b p-2">
          <IoCheckmarkDoneOutline className="text-gray-600 mr-2" />
          Real-time updates
        </li>
        <li className="flex items-center border-b p-2">
          <IoCheckmarkDoneOutline className="text-gray-600 mr-2" />
          Secure messaging
        </li>
        <li className="flex items-center border-b p-2">
          <IoCheckmarkDoneOutline className="text-gray-600 mr-2" />
          Personalized insights
        </li>
        <li className="flex items-center border-b p-2">
          <FaXmark className="text-red-500 mr-2" />
          Classroom View
        </li>
      </ul>
      <div className="flex justify-center mb-3">
        <button className="bg-[#00adef] text-white px-4 py-2 rounded" onClick={handleDemo}>
          Book A Demo
        </button>
      </div>
    </div>

    {/* Enterprise Plan */}
    <div className="bg-white rounded-lg shadow-lg p-4 relative hover:shadow-xl transition-shadow">
      <div className="absolute top-[60px] left-[4px] bg-[#1DC7EA] text-white px-[10px] py-[5px] rounded text-xs font-bold transform -rotate-45 origin-top-left">
        Coming Soon
      </div>
      <div className="bg-[#f7b45d] text-white p-4 rounded-t-lg">
        <h3 className="text-center text-xl">Enterprise</h3>
        <p className="text-center text-lg">$19.99/month</p>
        <div className="border-t border-b border-yellow-500 bg-yellow-300 text-center py-2 mb-3">
          Top features include
        </div>
      </div>
      <ul className="p-4 space-y-2">
        <li className="flex items-center border-b p-2">
          <IoCheckmarkDoneOutline className="text-yellow-600 mr-2" />
          Real-time updates
        </li>
        <li className="flex items-center border-b p-2">
          <IoCheckmarkDoneOutline className="text-yellow-600 mr-2" />
          Secure messaging
        </li>
        <li className="flex items-center border-b p-2">
          <IoCheckmarkDoneOutline className="text-yellow-600 mr-2" />
          Personalized insights
        </li>
        <li className="flex items-center border-b p-2">
          <IoCheckmarkDoneOutline className="text-yellow-600 mr-2" />
          Classroom View
        </li>
      </ul>
      <div className="flex justify-center mb-3">
        <button className="bg-[#00adef] text-white px-4 py-2 rounded" onClick={() => alert('coming soon')}>
          Book A Demo
        </button>
      </div>
    </div>
  </div>
</section> 

    )
}