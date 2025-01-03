/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {  createUserWithEmailAndPassword } from 'firebase/auth';
import {  doc, setDoc } from 'firebase/firestore';
import { auth, firestore,  } from "../firebase"
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
export const AdminSign = ({btnloading, setbtnloading}) => {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Admin member registered: ", userCredential.user);
      const userId = userCredential.user.uid;
      await setDoc(doc(firestore, 'Admin', userId), {
        email,
        name,
        role: 'admin'
      });
      console.log("admin data saved to Firestore");
      setbtnloading(true)
      setTimeout(() => {
        setbtnloading(false)
        navigate('/admin')
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
      console.error("Error registering admin: ", error);
      // setError("Error registering admin. Please try again.");
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
                  Admin Profile
                </button>
              </div>
              <form className="w-full mt-4 space-y-6" onSubmit={handleRegister}>
      
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700"> Name *</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Obi"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email *</label>
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