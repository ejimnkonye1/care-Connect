import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";

const StaffList = () => {
  const [staffData, setStaffs] = useState([]);

  useEffect(() => {
    const fetchStaff = async () => {
      const staffRef = collection(firestore, "staff");
      const staffSnapshot = await getDocs(staffRef);
      const staffData = staffSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStaffs(staffData);
    };

    fetchStaff();
  }, []);


  const handleDelete = (id) => {
    console.log(`Delete staff with ID: ${id}`);
    // Implement delete functionality here
  };

  return (
    <div className="p-5 ">
      <h1 className="text-base font-semibold text-center leading-relaxed text-zinc-800 dark:text-neutral-100 mb-10">
        Staffs <span className="text-blue-600">({staffData.length})</span>
      </h1>
      {staffData.length === 0 ? (
        <p className="text-center text-gray-500">No staff found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {staffData.map((staff) => (
            <div
              key={staff.id}
              className="rounded-[14px] border border-slate-100 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 hover:shadow-xl transition-shadow flex flex-col justify-between"
            >
              {/* Staff Image */}
              <div className="flex justify-center mb-4">
                <img
                  src={staff.image || "https://via.placeholder.com/100"}
                  alt={staff.name}
                  className="w-24 h-24 rounded-full border-2 border-slate-200 dark:border-neutral-700"
                />
              </div>
              {/* Staff Details */}
              <div className="text-center">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-neutral-100">
                  {staff.name}
                </h2>
                <p className="text-gray-500 text-sm dark:text-neutral-100">{staff.email}</p>
                <p className="text-gray-500 text-sm dark:text-neutral-100">{staff.phone}</p>
              </div>
              {/* Action Buttons */}
              <div className="mt-4 flex justify-end">
            
                <button
                  onClick={() => handleDelete(staff.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StaffList;
