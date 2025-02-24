import { useState, useEffect } from "react";
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase';
import SkeletonLoader from "../reuseable/skelenton";


const ChildrenList = () => {
  const [childrenData, setChildren] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    const fetchChildren = async () => {
      setLoading(true); // Set loading to true before fetching
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
            age: userData.age,
            totalchildren: userData.length,
            parentFirstName: userData.firstName, // Assuming `firstName` field in `users`
            parentLastName: userData.lastName, // Assuming `lastName` field in `users`
            parentImage: userData.image || '', // Assuming `image` field in `users`
          };

          allChildren.push(childWithParentData); // Add this child to allChildren array
        });
      }

      setChildren(allChildren); // Set all children data
      setLoading(false); // Set loading to false after fetching
     
    };

    fetchChildren();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-base font-semibold leading-relaxed text-zinc-800 dark:text-neutral-100 text-center mb-10">
        Children List <span className="text-blue-600">({childrenData.length})</span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          // Render skeleton loaders for each child while loading
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border border-slate-100 dark:border-neutral-800 dark:bg-neutral-900">
              <div className="text-center">
                <SkeletonLoader circle={true} height={48} width={48} />
                <div className="ml-4">
                  <SkeletonLoader height={20} width={100} />
                  <SkeletonLoader height={16} width={150} />
                </div>
              </div>
            </div>
          ))
        ) : (
          // Render actual children data
          childrenData.map((child) => (
            <div key={child.id} className="bg-white p-6 rounded-lg border border-slate-100 dark:border-neutral-800 dark:bg-neutral-900 hover:shadow-xl transition-shadow">
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

                <h2 className="text-lg font-semibold text-gray-800 dark:text-neutral-100">{child.name}</h2>
                <p className="text-gray-500 dark:text-neutral-100">Age: {child.age} years</p>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600 dark:text-neutral-100">Parent: {child.parentFirstName} {child.parentLastName}</p> {/* Display parent's full name */}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChildrenList;