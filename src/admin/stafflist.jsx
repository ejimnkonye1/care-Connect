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
      <h1 className="text-2xl font-bold mb-4">Staff List</h1>
      {staffData.length === 0 ? (
        <p>No staff found.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Position</th>
            </tr>
          </thead>
          <tbody>
            {staffData.map((staff) => (
              <tr key={staff.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{staff.id}</td>
                <td className="py-2 px-4 border-b">{staff.name}</td>
                <td className="py-2 px-4 border-b">{staff.email}</td>
                <td className="py-2 px-4 border-b">{staff.position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StaffList;