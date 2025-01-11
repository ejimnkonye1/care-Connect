// import { useState, useEffect } from "react";
// import { collection, getDocs } from 'firebase/firestore';
// import { firestore } from '../firebase';

// const ParentLists = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchAllUserData = async () => {
//       const usersRef = collection(firestore, 'users');
//       const usersSnapshot = await getDocs(usersRef);
//       const usersData = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       setUsers(usersData);
//     };

//     fetchAllUserData();
//   }, []);

//   return (
//     <div className="p-5  ">
//     <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Parent Directory</h1>
//     {users.length === 0 ? (
//       <p className="text-center text-gray-500 text-lg">No parents found.</p>
//     ) : (
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {users.map((user) => (
//           <div key={user.id} className="bg-white p-6 rounded-lg shadow">
//             <h2 className="text-lg font-semibold text-gray-800">{user.firstName} {user.lastName}</h2>
//             <p className="text-sm text-gray-500">{user.email}</p>
//             <p className="mt-2 text-sm text-gray-600">Phone: {user.phone || 'N/A'}</p>
//             {user.children && user.children.length > 0 ? (
//               <div className="mt-3">
//                 <h3 className="text-sm font-semibold text-gray-700 mb-1">Children:</h3>
//                 <div className="flex flex-wrap gap-2">
//                   {user.children.map((child, index) => (
//                     <span
//                       key={index}
//                       className="bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded"
//                     >
//                       {child.name}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             ) : (
//               <p className="text-sm text-gray-500">No children added.</p>
//             )}
//           </div>
//         ))}
//       </div>
//     )}
//   </div>
  
  
  
  
  
  
//   );
// };

// export default ParentLists;
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";

const ParentLists = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;

  useEffect(() => {
    const fetchAllUserData = async () => {
      const usersRef = collection(firestore, "users");
      const usersSnapshot = await getDocs(usersRef);
      const usersData = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
      setFilteredUsers(usersData);
    };

    fetchAllUserData();
  }, []);

  // Handle search functionality
  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  // Pagination calculations
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };



  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Total Parents  <span className="text-2xl text-blue-600">{users.length}</span>
      </h1>

      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="p-2 border rounded w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

      </div>

      {/* Parent Cards */}
      {filteredUsers.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No parents found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-sm text-gray-500">{user.email}</p>
              <p className="mt-2 text-sm text-gray-600">Phone: {user.phone || "N/A"}</p>
              {user.children && user.children.length > 0 ? (
                <div className="mt-3">
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">
                    Children:
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
          ))}
        </div>
      )}

      {/* Pagination */}
      {filteredUsers.length > usersPerPage && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={handlePrevPage}
            className="px-3 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            className="px-3 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 ml-2"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ParentLists;
