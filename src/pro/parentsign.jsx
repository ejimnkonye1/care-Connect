/* eslint-disable react/prop-types */
import { auth, firestore,  } from "../firebase"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {  doc, setDoc } from 'firebase/firestore';
import { MdAddCircleOutline } from "react-icons/md";
export const ParentSign = ({btnloading, setbtnloading}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [childName, setChildName] = useState('');
    const [phone, setphone] = useState('')
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [error, setError] = useState(null)
    const [image, setImage] = useState(null);

    const navigate = useNavigate()
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
            image

          });
          console.log(userId)
          console.log("User data saved to Firestore");
          setbtnloading(true)
          setTimeout(() => {
            setbtnloading(false)
            navigate('/dash')
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
    return(
        <div className="">
       {error && (
    <div className="error-container" style={{ position: 'absolute', top: 0, left: 0, right: 0, textAlign: 'center', zIndex: 1, backgroundColor: 'rgba(yellow)', padding: '10px' }}>
      <span className="text-center text-danger" style={{ position: 'absolute', top: 0, left: 0, right: 0, textAlign: 'center', zIndex: 1, backgroundColor: 'rgba(yellow)', padding: '10px' }}>{error}</span>
    </div>
  )}
       
        <div className="inline-flex w-full flex-col items-start border-b justify-start rounded-[14px] border border-slate-100 bg-white p-6 space-y-6 dark:border-neutral-800 dark:bg-neutral-900 p-10">
                  {/* Profile Picture Section */}
                
                  <div className="flex w-full items-center justify-between">
                   
                    <button className="cursor-pointer text-underline text-base font-medium text-emerald-400">
                      Child Profile
                    </button>
                  </div>
                  <form className="w-full space-y-6">
                  <div className="col-md-6 mt-2">
            <div className="form-group">
            <div className="image-upload">
                        <label htmlFor="file-input">
                          <div className="circular-image">
                          {image && <img src={image} alt="Upload" id="preview" />}
                            <MdAddCircleOutline className="add-icon" />
                          </div>
                        </label>
                        <input id="file-input" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
                      </div>
                      </div>
            </div>
                 
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                      <label className="block disabled:bg-gray-100 text-sm font-medium text-gray-700">
                        Child Name *
                      </label>
                      <input
                        type="name"
                        className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
                
                        placeholder="Obi"
                      />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Age *
                        </label>
                        <input
                          type="text"
                          className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
                      
                          placeholder="Child's Name"
                       
                        />
                      </div>
                    </div>
                   
                   
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block disabled:bg-gray-100 text-sm font-medium text-gray-700">
                          Allegeries *
                        </label>
                        <input
                          type="text"
                          className="mt-1 disabled:bg-gray-100 block w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500"
                          name="address"
                          placeholder="Enter Home Address"
                       
                        />
                      </div>
                      <div>
                        <label className="block disabled:bg-gray-100 text-sm font-medium text-gray-700">
                          Gender *
                        </label>
                        <input
                         type="text"
                         className="mt-1 disabled:bg-gray-100 block w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500"
                         name="gender"
                         placeholder="Enter Home Address"
                      
                        />
                      </div>
                
            
                    </div>
                  
                  </form>
                  <div className="flex w-full items-center justify-between">
                   
                   <button className="cursor-pointer text-underline text-base font-medium text-emerald-400">
                     Parent Profile
                   </button>
                 </div>
                 <form className="w-full space-y-6">
                 
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                     <label className="block disabled:bg-gray-100 text-sm font-medium text-gray-700">
                       Parent Email *
                     </label>
                     <input
                       type="email"
                       className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
                       
                       placeholder="example@email.com"
                     />
                     </div>
                     <div>
                       <label className="block text-sm font-medium text-gray-700">
                         Parent Name *
                       </label>
                       <input
                         type="text"
                         className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
                        
                         placeholder="Child's Name"
                         value='Jane doe'
                       />
                     </div>
                   </div>
                  
                  
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                       <label className="block disabled:bg-gray-100 text-sm font-medium text-gray-700">
                         Address *
                       </label>
                       <input
                         type="text"
                         className="mt-1 disabled:bg-gray-100 block w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500"
                         name="address"
                         placeholder="Enter Home Address"
                         
                       />
                     </div>
                     <div>
                       <label className="block disabled:bg-gray-100 text-sm font-medium text-gray-700">
                         Phone *
                       </label>
                       <input
                         type="number"
                         className="mt-1 disabled:bg-gray-100 block w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500"
                         name="phone"
                         placeholder="Enter Phone Number"
                        
                         value={'07062487335'}
                       />
                     </div>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                       <label className="block disabled:bg-gray-100 text-sm font-medium text-gray-700">
                         Gender *
                       </label>
                       <input
                         type="text"
                         className="mt-1 disabled:bg-gray-100 block w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500"
                         name="gender"
                         placeholder="Enter Home Address"
                      
                         value='Female'
                       />
                       
                     </div>
                     <div>
                       <label className="block disabled:bg-gray-100 text-sm font-medium text-gray-700">
                         Passowrd *
                       </label>
                       <input
                         type="text"
                         className="mt-1 disabled:bg-gray-100 block w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500"
                         name="gender"
                         placeholder="Enter Home Address"
                         
                         value='Password'
                       />
                       
                     </div>
                     
                   </div>
                 </form>
                 
                </div>
        </div>
    )
}