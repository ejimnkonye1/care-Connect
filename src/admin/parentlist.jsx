

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";
import SkeletonLoader from "../reuseable/skelenton";

const ParentLists = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // Initialize loading state


  useEffect(() => {
    const fetchAllUserData = async () => {
      setLoading(true)
      const usersRef = collection(firestore, "users");
      const usersSnapshot = await getDocs(usersRef);
      const usersData = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
      setFilteredUsers(usersData);
      setLoading(false)
    };

    fetchAllUserData();
  }, []);

  
  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);





  return (
    <div className="p-5">
      <h1 className="text-base font-semibold text-center leading-relaxed text-zinc-800 dark:text-neutral-100">
        Total Parents  <span className=" text-blue-600">({users.length})</span>
      </h1>

      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="p-2 border rounded w-full md:w-1/3 rounded-[14px] border border-slate-100 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

      </div>

  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading ? (
          // Render skeleton loaders for each child while loading
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border border-slate-100 dark:border-neutral-800 dark:bg-neutral-900">

                  <SkeletonLoader height={20} width={100} />
                  <SkeletonLoader height={20} width={150} />
                  <SkeletonLoader height={20} width={100} />
                  <SkeletonLoader height={20} width={150} />
        
            </div>
          ))
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow rounded-[14px] border border-slate-100 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <h2 className="text-lg font-semibold text-gray-800  dark:text-neutral-100">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-sm text-gray-500 dark:text-neutral-100">{user.email}</p>
              <p className="mt-2 text-sm text-gray-600  dark:text-neutral-100">Phone: {user.phone || "N/A"}</p>
              {user.children && user.children.length > 0 ? (
                <div className="mt-3">
                  <h3 className="text-sm font-semibold text-gray-700 mb-1  dark:text-neutral-100">
                    Child:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {user.children.map((child, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded"
                      >
                        {child.name}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No children added.</p>
              )}
              <div className="flex justify-end gap-2 mt-3">
                <button className="text-xs bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                  Edit
                </button>
                <button className="text-xs bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                  Delete
                </button>
              </div>
            </div>
              ))
          )}
        </div>
    

  
    </div>
  );
};

export default ParentLists;
