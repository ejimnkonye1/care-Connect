import { useState, useEffect } from "react";
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase';

const StaffList = () => {
  const [staffData, setStaffs] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const fetchStaff = async () => {
      const staffRef = collection(firestore, 'staff');
      const staffSnapshot = await getDocs(staffRef);
      const staffData = staffSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setStaffs(staffData);
      console.log(staffData, 'all staffs');
    };

    fetchStaff();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-8 text-center">Staff List</h1>
      {staffData.length === 0 ? (
        <p className="text-center text-gray-500">No staff found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {staffData.map((staff) => (
            <div key={staff.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-center">
                <h2 className="text-lg font-semibold text-gray-800">{staff.name}</h2>
                <p className="text-gray-500">{staff.email}</p>
                <p className="text-sm text-gray-600">Position: {staff.position}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StaffList;
