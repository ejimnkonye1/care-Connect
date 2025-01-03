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
        <div>
   <form id="admin-signup-form" onSubmit={handleRegister}>
             {error && (
    <div className="error-container" style={{ position: 'absolute', top: 0, left: 0, right: 0, textAlign: 'center', zIndex: 1, backgroundColor: 'rgba(yellow)', padding: '10px' }}>
      <span className="text-center text-danger" style={{ position: 'absolute', top: 0, left: 0, right: 0, textAlign: 'center', zIndex: 1, backgroundColor: 'rgba(yellow)', padding: '10px' }}>{error}</span>
    </div>
  )}
          <h2 className="text-center">Admin Sign Up</h2>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="admin-name">Admin Name:</label>
              <input 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
              className="form-control" />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              className="form-control" />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input 
             type="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             placeholder="Password"
             required
   
               className="form-control" />
            </div>
          </div>
        </div>
<div className='d-flex justify-content-end'>
<button type="submit" className="btns btn-primary up-btn btn-block mt-2">
  
{btnloading ? (
             <div>
                 
             <span className="spinner-border spinner-border-sm" role="status" aria-hidden="false"></span>
             <span className="pl-3"> Sign Up</span>
          </div>
          ):(
            '  Sign Up'
          )}
    
  </button>
</div>

       
      </form>

             <div className="inline-flex w-full flex-col items-start border-b justify-start rounded-[14px] border border-slate-100 bg-white p-6 space-y-6 dark:border-neutral-800 dark:bg-neutral-900">
                  {/* Profile Picture Section */}
                  <div className="flex flex-start items-center flex-row mb-4 border-slate-200 dark:border-neutral-800 border-b w-full">
                    <img
                      src={''}
                      alt="Profile"
                      className="h-32 w-32 rounded-full object-cover mb-4"
                    />
                    <div className="flex flex-col pl-3">
                      <button className="px-4 py-2 w-40 bg-emerald-500 text-white text-sm font-medium rounded hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 dark:bg-neutral-800 dark:hover:bg-neutral-700">
                        Upload new photo
                      </button>
                      <p className="text-xs text-gray-500 mt-1">
                        At least 800x800 px recommended. JPG or PNG is allowed.
                      </p>
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between">
                   
                    <button className="cursor-pointer text-underline text-base font-medium text-emerald-400">
                      Edit Profile
                    </button>
                  </div>
                  <form className="w-full space-y-6">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                      <label className="block disabled:bg-gray-100 text-sm font-medium text-gray-700">
                        Staff Email
                      </label>
                      <input
                        type="email"
                        className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
                        disabled
                        placeholder="example@email.com"
                      />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Staff Name
                        </label>
                        <input
                          type="text"
                          className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
                          disabled
                          placeholder="Child's Name"
                          value='Jane doe'
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
                          value={'2 Ubaka streets Enugu'}
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
                          value={'07062487335'}
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
                          placeholder="Enter Home Address"
                          disabled
                          value='Female'
                        />
                        
                      </div>
                      
                    </div>
                  </form>
                </div>
        </div>
     
    )
}