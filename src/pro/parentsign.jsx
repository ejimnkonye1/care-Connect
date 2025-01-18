/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { auth, firestore } from "../firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';
import { MdAddCircleOutline } from "react-icons/md";
import {  ErrorAlert} from "../alert";

export const ParentSign = ({ btnloading, setbtnloading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [childName, setChildName] = useState('');
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [age, setAge] = useState('');
  const [ address, setAddress] = useState('')
  const [ gender, setGender] = useState('')
  const [allergic, setAllergic] = useState('')
  const [loading, setLoading] = useState('')
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!image) {
      setError("Please upload an image.");
      setTimeout(() => {
        setError(false);
      }, 5000);
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;
      await setDoc(doc(firestore, 'users', userId), {
        email,
        role: 'parent',
        children: [{ name: childName }],
        phone,
        firstName,
        lastName,
        image,
        age,
        gender,
        address,
        allergic,
      });
      console.log(userId);
      console.log("User  data saved to Firestore");
      setbtnloading(true);
      setTimeout(() => {
        setbtnloading(false);
        navigate('/parentdashboard');
      }, 9000);
    } catch (error) {
      setbtnloading(true);
      setTimeout(() => {
        setbtnloading(false);
        setError(error.message);
        setTimeout(() => {
          setError(false);
        }, 5000);
      }, 2000);
      console.error("Error registering: ", error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative">
      {error && (
         <>
                    <ErrorAlert
                   open={!!error}
                   message={error}
                   onClose={() => setError("")}
                 />
           </>
      )}

      <div className="flex flex-col items-start  justify-start ">
        {/* Profile Picture Section */}
        <div className="flex w-full items-center justify-between">
          <button className="cursor-pointer text-base font-medium text-emerald-400">
            Child Profile
          </button>
        </div>
        <form className="w-full space-y-6" onSubmit={handleRegister}>
          <div className="mt-2">
          <div className="image-upload flex flex-col items-start">
      <label htmlFor="file-input" className="cursor-pointer">
        <div className="circular-image relative">
          {image ? (
            <img
              src={image}
              alt="Upload"
              id="preview"
              className="rounded-full w-24 h-24 object-cover border-2 border-gray-300"
            />
          ) : (
            <div className="flex items-center justify-center w-24 h-24 rounded-full border-2 border-gray-300">
              <MdAddCircleOutline className="add-icon text-2xl text-gray-400" />
            </div>
          )}
        </div>
      </label>
      <input
        id="file-input"
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
      <span className="mt-2 text-gray-600">Add child picture</span>
    </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Child Name *</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Obi"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray- 700">Age *</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter Age"
                onChange={(e) =>setAge(e.target.value)}
                value={age}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Allergies *</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter Allergies"
                onChange={(e) => setAllergic(e.target.value)}
                value={allergic}
                required
              />
            </div>
            <div>
  <label className="block text-sm font-medium text-gray-700">Gender *</label>
  <select
    className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500"
    name="gender"
    value={gender} 
    onChange={(e) => setGender( e.target.value )} 
    required
  >
    <option value="" disabled>Select Gender</option> {/* Placeholder option */}
    <option value="Male">Male</option>
    <option value="Female">Female</option>
  </select>
</div>
          </div>

          <div className="flex w-full items-center justify-between">
            <button className="cursor-pointer text-base font-medium text-emerald-400">
              Parent Profile
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Parent Email *</label>
              <input
                type="email"
                className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Parent  Firstname *</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter FirstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
              <label className="block text-sm font-medium text-gray-700">Parent Lastname *</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter lastname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
           
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone *</label>
              <input
                type="tel"
                className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
              <label className="block text-sm font-medium text-gray-700">Address *</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter Home Address"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password *</label>
              <input
                type="password"
                className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
  <button
    type="submit"
    className={`mt-4 rounded-lg bg-emerald-400 text-white py-3 px-4  
            ${btnloading ? ' cursor-not-allowed' : 'bg-emerald-400 hover:bg-emerald-600'}`}
    disabled={btnloading}
    
  >
     {btnloading? (
        <>
          <svg
            className="animate-spin h-5 w-5  mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
        
        </>
        
      ) : (
        '  Register'
      )}
 
  </button>
</div>
        
        </form>
      </div>
    </div>
  );
};