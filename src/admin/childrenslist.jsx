import { useState, useEffect } from "react";
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase';

const ChildrenList = () => {
  const [childrenData, setChildren] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const fetchChildren = async () => {
      const usersRef = collection(firestore, 'users'); // Fetch users collection
      const usersSnapshot = await getDocs(usersRef);
      const allChildren = [];

      // Loop through each user to fetch children data
      for (const userDoc of usersSnapshot.docs) {
        const userData = userDoc.data();
        const userChildren = userData.children || []; // Assuming children are stored in an array

        // Map over the children and add them with the parent's data (name and image)
        userChildren.forEach((child) => {
          const childWithParentData = {
            ...child, // Spread child data
            age:userData.age,
            parentFirstName: userData.firstName, // Assuming `firstName` field in `users`
            parentLastName: userData.lastName, // Assuming `lastName` field in `users`
            parentImage: userData.image || '', // Assuming `image` field in `users`
          };

          allChildren.push(childWithParentData); // Add this child to allChildren array
        });
      }

      setChildren(allChildren); // Set all children data
      console.log(allChildren, 'all children');
    };

    fetchChildren();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-8 text-center">Children List</h1>
      {childrenData.length === 0 ? (
        <p className="text-center text-gray-500">No children found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {childrenData.map((child) => (
            <div key={child.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-center">
                {/* Display child's image if available */}
                {child.parentImage ? (
                  <img 
                    src={child.parentImage} 
                    alt={child.name} 
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" 
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4"></div>
                )}

                <h2 className="text-lg font-semibold text-gray-800">{child.name}</h2>
                <p className="text-gray-500">Age: {child.age}</p>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">Parent: {child.parentFirstName} {child.parentLastName}</p> {/* Display parent's full name */}
           
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChildrenList;
