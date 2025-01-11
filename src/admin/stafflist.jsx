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

  const handleEdit = (id) => {
    console.log(`Edit staff with ID: ${id}`);
    // Implement edit functionality here
  };

  const handleDelete = (id) => {
    console.log(`Delete staff with ID: ${id}`);
    // Implement delete functionality here
  };

  return (
    <div className="p-5 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Staff Directory
      </h1>
      {staffData.length === 0 ? (
        <p className="text-center text-gray-500">No staff found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {staff.name}
                </h2>
                <p className="text-gray-500 text-sm">{staff.email}</p>
              </div>
              {/* Action Buttons */}
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleEdit(staff.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
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
