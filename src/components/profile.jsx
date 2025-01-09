/* eslint-disable no-unused-vars */
import pa from '../assets/pa.jpg';
import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebase';

const ProfileInfo = () => {
  const [userData, setUserData] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    gender: '',
    age: '',
    image: '',
  });

  const user = auth.currentUser ;

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDocRef = doc(firestore, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserData(userDoc.data());
          setFormData({
            firstName: userDoc.data().firstName ?? '',
            lastName: userDoc.data().lastName ?? '',
            address: userDoc.data().address ?? '',
            phone: userDoc.data().phone ?? '',
            gender: userDoc.data().gender ?? '',
            age: userDoc.data().age ?? '',
            image: userDoc.data().image ?? ''
          });
        }
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result); // Update the image preview
        setFormData((prevData) => ({
          ...prevData,
          image: e.target.result, // Store the base64 image data
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.age || !formData.address || !formData.gender || !formData.phone) {
      alert('Please fill in all fields');
      return;
    }

    const hasChanged = Object.keys(formData).some((key) => formData[key] !== userData[key]);

    if (hasChanged && user) {
      const userDocRef = doc(firestore, 'users', user.uid);
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
        <img
          src={image || userData?.image || pa} // Use the uploaded image or fallback to default
          alt="Profile"
          className="h-32 w-32 rounded-full object-cover mb-4"
        />
        <div className="flex flex-col pl-3">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden" // Hide the default file input
            id="file-upload"
          />
          <label htmlFor="file-upload"  className="px-4 py-2 w-40 bg-emerald-500 text-white text-sm font-medium rounded cursor-pointer hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 dark:bg-neutral-800 dark:hover:bg-neutral-700">
            Upload new photo
          </label>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
              disabled
              placeholder="CareConnect."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Child Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
              disabled
              placeholder="Child's Name"
              value={userData?.children[0]?.name ?? ''}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block disabled:bg-gray-100 text-sm font-medium text-gray-700">
              Gender
            </label>
            <input
              type="text"
              className="mt-1 disabled:bg-gray-100 block w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500"
              name="gender"
              placeholder="Enter Gender"
              disabled
              value={formData.gender}
            />
          </div>
          <div>
            <label className="block disabled:bg-gray-100 text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              type="number"
              className="mt-1 disabled:bg-gray-100 block w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500"
              name="age"
              placeholder="Enter Age"
              value={formData.age}
              disabled
            />
          </div>
        </div>
        <div>
          <label className="block disabled:bg-gray-100 text-sm font-medium text-gray-700">
            Parent Email address
          </label>
          <input
            type="email"
            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
            disabled
            placeholder="example@email.com"
            value={userData?.email ?? ''}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block disabled:bg-gray-100 text-sm font-medium text-gray-700">
              Parent First Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
              name="firstName"
              disabled
              placeholder="Enter First Name"
              value={formData.firstName}
              
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Parent Last Name
            </label>
            <input
              type="text"
              className="mt-1 disabled:bg-gray-100 block w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500"
              name="lastName"
              placeholder="Enter Last Name"
              disabled
              value={formData.lastName}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block disabled:bg-gray-100 text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              className="mt-1 disabled:bg-gray-100 block w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500"
              name="address"
              placeholder="Enter Home Address"
              disabled
              value={formData.address}
            />
          </div>
          <div>
            <label className="block disabled:bg-gray-100 text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="number"
              className="mt-1 disabled:bg-gray-100 block w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500"
              name="phone"
              placeholder="Enter Phone Number"
              disabled
              value={formData.phone}
            />
          </div>
        </div>
        
      </form>
    </div>
  );
};

export default ProfileInfo;