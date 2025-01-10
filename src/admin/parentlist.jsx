import { useState, useEffect } from "react";
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase';

const ParentLists = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUserData = async () => {
      const usersRef = collection(firestore, 'users');
      const usersSnapshot = await getDocs(usersRef);
      const usersData = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData);
    };

    fetchAllUserData();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-8 text-center">Parent List</h1>
      {users.length === 0 ? (
        <p className="text-center text-gray-500">No parents found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.map((user) => (
            <div key={user.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-center">
                <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
                <p className="text-gray-500">{user.email}</p>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">Phone: {user.phone}</p>
                
                {user.children && user.children.length > 0 ? (
                  <div className="mt-2">
                    <h3 className="text-sm font-semibold text-gray-700">Children:</h3>
                    <ul className="list-disc pl-5 text-gray-600">
                      {user.children.map((child, index) => (
                        <li key={index} className="text-sm">{child.name}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No children added.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ParentLists;
