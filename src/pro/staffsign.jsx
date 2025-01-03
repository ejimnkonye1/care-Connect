/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {  createUserWithEmailAndPassword } from 'firebase/auth';
import {  doc, setDoc } from 'firebase/firestore';
import { auth, firestore,  } from "../firebase"
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { MdAddCircleOutline } from "react-icons/md";
export const StaffSign = ({btnloading, setbtnloading}) => {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()
  const [image, setImage] = useState(null);
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
      console.log("Staff member registered: ", userCredential.user);
      const userId = userCredential.user.uid;
      await setDoc(doc(firestore, 'staff', userId), {
        email,
        name,
        role: 'staff',
        image
      });
      console.log("Staff data saved to Firestore");
      // Redirect to staff dashboard or show success message
      setbtnloading(true)
      setTimeout(() => {
        setbtnloading(false)
        navigate('/staff')
      }, 9000);
     
    } catch (error) {
      setbtnloading(true)
      setTimeout(() => {
        setbtnloading(false)
        setError(error.message)
        setTimeout(() => {
          setError(false)
        }, 5000)
      }, 2000)
      console.error("Error registering staff: ", error);
      // setError("Error registering staff. Please try again.");
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
    return(
      <div className="relative">
      {error && (
        <div className="absolute top-0 left-0 right-0 text-center z-10 bg-yellow-200 p-2">
          <span className="text-red-600">{error}</span>
        </div>
      )}

      <div className="flex flex-col items-start  justify-start ">
        {/* Profile Picture Section */}
        <div className="flex w-full items-center justify-between">
          <button className="cursor-pointer text-base font-medium text-emerald-400">
            Staff Profile
          </button>
        </div>
        <form className="w-full space-y-6" onSubmit={handleRegister}>
          <div className="mt-2">
            <div className="image-upload">
              <label htmlFor="file-input">
                <div className="circular-image">
                  {image && <img src={image} alt="Upload" id="preview" className="rounded-full w-24 h-24 object-cover" />}
                  <MdAddCircleOutline className="add-icon text-2xl" />
                </div>
              </label>
              <input id="file-input" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Staff Name *</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Obi"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Staff Email *</label>
              <input
                type="email"
                className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Gender *</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter Gender"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
              <label className="block text-sm font-medium text-gray- 700">Age *</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter Age"
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
              />
            </div>
          </div>


         

       
         
          <div className="flex justify-end">
  <button
    type="submit"
    className="mt-4 rounded-lg bg-emerald-400 text-white py-3 px-4  focus:outline-none focus:ring-2 focus:ring-indigo-500"
  >
    Register
  </button>
</div>
        
        </form>
      </div>
    </div>
    )
}