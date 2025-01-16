
import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebase';
import SkeletonLoader from '../reuseable/skelenton';


const StaffProfile = () => {
  const [staffData, setStaffData] = useState(null);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    address: '',
    phone: '',
    gender: '',
    age: '',
    image: ''
  });
  const [loading, setLoading] = useState(true); // Set loading to true initially

  const user = auth.currentUser ;

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true)
      if (user) {
        const userDocRef = doc(firestore, 'staff', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setStaffData(userDoc.data());
          setFormData({
            address: userDoc.data().address ?? '',
            phone: userDoc.data().phone ?? '',
            gender: userDoc.data().gender ?? '',
            age: userDoc.data().age ?? '',
            image: userDoc.data().image ?? ''
          });
        }
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchUserData();
  }, [user]);



  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
        setFormData((prevData) => ({
          ...prevData,
          image: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.age || !formData.address || !formData.gender || !formData.phone) {
      alert('Fill in all empty fields');
      return;
    }
    const hasChanged = Object.keys(formData).some((key) => formData[key] !== staffData[key]);

    if (user && hasChanged) {
      const userDocRef = doc(firestore, 'staff', user.uid);
      try {
        await updateDoc(userDocRef, formData);
        alert('Profile updated successfully');
      } catch (error) {
        console.error('Error updating profile:', error);
        alert('Error updating profile');
      }
    }
  };

  return (
    <div className="inline-flex w-full flex-col items-start border-b justify-start rounded-[14px] border border-slate-100 bg-white p-6 space-y-6 dark:border-neutral-800 dark:bg-neutral-900">
      {/* Profile Picture Section */}
      <div className="flex flex-start items-center flex-row mb-4 border-slate-200 dark:border-neutral-800 border-b w-full">
        {loading ? (
          <SkeletonLoader height={128} width={128} circle={true} /> // Skeleton for profile picture
        ) : (
          <img
            src={image || staffData?.image } // Use the uploaded image or fallback to default
            alt="Profile"
            className="h-32 w-32 rounded-full object-cover mb-4"
          />
        )}
        <div className="flex flex-col pl-3">
        {loading ? (
              <SkeletonLoader height={20}  /> 
            ) : (
              <>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden" // Hide the default file input
            id="file-upload"
          />
          <label htmlFor="file-upload" className="px-4 py-2 w-40 bg-emerald-500 text-white text-sm font-medium rounded cursor-pointer hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emer ald-400 focus:ring-offset-2 dark:bg-neutral-800 dark:hover:bg-neutral-700">
            Upload new photo
          </label>
          </>
           )}
          <p className="text-xs text-gray-500 mt-1">
            At least 800x800 px recommended. JPG or PNG is allowed.
          </p>
        </div>
      </div>
      <div className="flex w-full items-center justify-between">
        <button type='submit' onClick={handleSubmit} className="cursor-pointer text-underline text-base font-medium text-emerald-400">
          Save Changes
        </button>
      </div>
      <form className="w-full space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company
          </label>
          {loading ? (
              <SkeletonLoader height={40} width="100%" /> 
            ) : (
          <input
            type="text"
            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
            disabled
            placeholder="CareConnect."
          />
             )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block disabled:bg-gray-100 text-sm font-medium text-gray-700">
              Staff Email
            </label>
            {loading ? (
              <SkeletonLoader height={40} width="100%" /> 
            ) : (
            <input
              type="email"
              className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
              disabled
              placeholder="example@email.com"
              value={staffData?.email ?? ''}
            />
          )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Staff Name
            </label>
            {loading ? (
              <SkeletonLoader height={40} width="100%" /> 
            ) : (
            <input
              type="text"
              className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
              disabled
              placeholder="Child's Name"
              value={staffData?.name ?? ''}
            />
          )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block disabled:bg-gray-100 text-sm font-medium text-gray-700">
              Address
            </label>
            {loading ? (
              <SkeletonLoader height={40} width="100%" /> // Skeleton for address input
            ) : (
              <input
                type="text"
                className="mt-1 disabled:bg-gray-100 block w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500"
                name="address"
                placeholder="Enter Home Address"
                disabled
                value={formData.address}
              />
            )}
          </div>
          <div>
            <label className="block disabled:bg-gray-100 text-sm font-medium text-gray-700">
              Phone
            </label>
            {loading ? (
              <SkeletonLoader height={40} width="100%" /> // Skeleton for phone input
            ) : (
              <input
                type="number"
                className="mt-1 disabled:bg-gray-100 block w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500"
                name="phone"
                placeholder="Enter Phone Number"
                disabled
                value={formData.phone}
              />
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block disabled:bg-gray-100 text-sm font-medium text-gray-700">
              Gender
            </label>
            {loading ? (
              <SkeletonLoader height={40} width="100%" /> // Skeleton for gender input
            ) : (
              <input
                type="text"
                className="mt-1 disabled:bg-gray-100 block w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500"
                name="gender"
                placeholder="Enter Gender"
                disabled
                value={formData.gender}
              />
            )}
          </div>
          <div>
            <label className="block disabled:bg-gray-100 text-sm font-medium text-gray-700">
              Age
            </label>
            {loading ? (
              <SkeletonLoader height={40} width="100%" /> // Skeleton for age input
            ) : (
 <input
                type="number"
                className="mt-1 disabled:bg-gray-100 block w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500"
                name="age"
                placeholder="Age"
                value={formData.age}
                disabled
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default StaffProfile;