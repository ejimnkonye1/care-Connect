/* eslint-disable no-unused-vars */

import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebase';
import { useSelector } from 'react-redux';
import { IoCalendarNumber } from "react-icons/io5";
import { LiaGenderlessSolid } from "react-icons/lia";
import { FaUserAstronaut } from "react-icons/fa";
import img1 from '../assets/crec.jpg';

export const Staffpro = () => {
    const [staffData, setStaffData] = useState(null);
    const [image, setImage] = useState(null);
    const [formData, setFormData] = useState({
        address: '',
        phone: '',
        gender: '',
        age: '',
        image: ''
    });
    const [loading, setLoading] = useState(null);

    const user = auth.currentUser;
    const darkmode = useSelector((state) => state.darkMode);

    useEffect(() => {
        const fetchUserData = async () => {
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
                setLoading(false);
            }
        };

        fetchUserData();
    }, [user]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

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

    // if (loading) {
    //     return (
    //         <div className="container-fluid">
    //             <div className="row">
    //                 <div className="col-md-8">
    //                     <div className={`card ${darkmode ? 'card-mode' : ''} loading-skeleton`}>
    //                         <div className="header">
    //                             <h4 className={`title ${darkmode ? 'card-color' : ''}`}>Edit Profile</h4>
    //                         </div>
    //                         <div className="content">
    //                             {/* Form skeleton */}
    //                             <form onSubmit={handleSubmit}>
    //                     <div className="row">
    //                       <div className="col-md-">
    //                         <div className="form-group">
    //                           <label>Company (disabled)</label>
    //                           <input type="text" className="form-control" disabled placeholder="Company" value="Crech Connect." />
    //                         </div>
    //                       </div>
    //                     </div>
        
    //                     <div className="row">
    //                       <div className="col-md-6">
    //                         <div className="form-group">
    //                         <label htmlFor="exampleInputEmail1">Staff Email </label>
                              
    //                           <input type="email" className="form-control" disabled placeholder="Email" value={staffData?.email ?? ''} />
    //                         </div>
    //                       </div>
    //                       <div className="col-md-6">
    //                         <div className="form-group">
    //                         <label>Staff Name </label>
    //                         <input type="text" className="form-control" disabled placeholder="Staff Name" value={staffData?.name ?? ''} />
    //                         </div>
    //                       </div>
    //                     </div>
        
    //                     <div className="row">
    //                       <div className="col-md-6">
    //                       <div className="form-group">
    //               <label>Address</label>
    //               <input
    //                 type="text"
    //                 className="form-control"
    //                 name="address"
    //                 placeholder="Home Address"
    //                 value={formData.address}
    //                 onChange={handleChange}
    //               />
    //             </div>
    //                       </div>
    //                       <div className="col-md-6">
    //             <div className="form-group">
    //               <label>Phone</label>
    //               <input
    //                 type="number"
    //                 className="form-control"
    //                 name="phone"
    //                 placeholder="Phone"
    //                 value={formData.phone}
    //                 onChange={handleChange}
    //               />
    //             </div>
    //           </div>
    //                     </div>
        
    //                     <div className="row">
    //               <div className="col-md-6">
    //                 <div className="form-group">
    //                   <label>Gender</label>
    //                   <select 
    //                      value={formData.gender}
    //                      onChange={handleChange}
    //                      name='gender'
    //                   className="form-control">
    //                     <option value="">Select Gender</option>
    //                     <option value="male">Male</option>
    //                     <option value="female">Female</option>
    //                     <option value="other">Other</option>
    //                   </select>
    //                 </div>

    //               </div>
    //               <div className="col-md-6">
    //               <div className="form-group">
    //               <label>Age</label>
    //               <input
    //                 type="number"
    //                 className="form-control"
    //                 name="age"
    //                 placeholder="Age"
    //                 value={formData.age}
    //                 onChange={handleChange}
    //               />
    //             </div>
    //               </div>
                
    //             </div>
                
    //             <div className="row">
    //               <div className="col-md-12">
    //                 <div className="form-group">
    //                   <label>Profile Image</label>
    //                   <input
    //                     type="file"
    //                     className="form-control"
    //                     onChange={handleImageChange}
    //                   />
    //                 </div>
    //               </div>
    //             </div>
    //                     <button type="submit" className="btn mt-3 btn-dark btn-fill pull-right">Update Profile</button>
    //                     <div className="clearfix"></div>
    //                   </form>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="col-md-4">
    //                     <div className={`card card-user ${darkmode ? 'card-mode' : ''} loading-skeleton`}>
    //                         <div className="image">
    //                             <img src={img1} alt="..." />
    //                         </div>
    //                         <div className="content">
    //                             <div className="author">
    //                                 <img className="avatar border-gray img-fluid rounded-circle" alt="..." />
    //                                 <h4 className="title">staff</h4>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }

    return(
    
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-8">
                <div className={`card ${darkmode ? 'card-mode': ''}`}>
                    <div className="header">
                    <h4 className={`title ${darkmode? 'card-color':''}`}>Edit Profile</h4>
                    </div>
                    <div className="content">
                      <form onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-md-">
                            <div className="form-group">
                              <label>Company (disabled)</label>
                              <input type="text" className="form-control" disabled placeholder="Company" value="Crech Connect." />
                            </div>
                          </div>
                        </div>
        
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Staff Email </label>
                              
                              <input type="email" className="form-control" disabled placeholder="Email" value={staffData?.email ?? ''} />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                            <label>Staff Name </label>
                            <input type="text" className="form-control" disabled placeholder="Staff Name" value={staffData?.name ?? ''} />
                            </div>
                          </div>
                        </div>
        
                        <div className="row">
                          <div className="col-md-6">
                          <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    placeholder="Home Address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
                          </div>
                          <div className="col-md-6">
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="number"
                    className="form-control"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
                        </div>
        
                        <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Gender</label>
                      <select 
                         value={formData.gender}
                         onChange={handleChange}
                         name='gender'
                      className="form-control">
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                  </div>
                  <div className="col-md-6">
                  <div className="form-group">
                  <label>Age</label>
                  <input
                    type="number"
                    className="form-control"
                    name="age"
                    placeholder="Age"
                    value={formData.age}
                    onChange={handleChange}
                  />
                </div>
                  </div>
                
                </div>
                
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Profile Image</label>
                      <input
                        type="file"
                        className="form-control"
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>
                </div>
                        <button type="submit" className="btn mt-3 btn-dark btn-fill pull-right">Update Profile</button>
                        <div className="clearfix"></div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                <div className={`card card-user ${darkmode? 'card-mode':''}`}>
                    <div className="image">
                      <img src={img1} alt="..." />
                    </div>
                    <div className="content">
                      <div className="author">
                       
                          <img className="avatar border-gray img-fluid rounded-circle" src={staffData?.image ?? formData.image} alt="..." />
                          <h4 className="title">staff

                            
                          </h4>
                        
                      </div>
                      <div className="mt-4 namess">
      <p className="text-muted">
        <FaUserAstronaut className={`${darkmode? 'card-color':''}`} style={{ fontSize: 18, marginRight: 10 }} />
        <label>Staff Name: </label> <strong className={`${darkmode ? 'card-color':''}`}>{staffData?.name ?? ''}</strong>
      </p>
      <p className="text-muted mb-2">
        <IoCalendarNumber className={`${darkmode? 'card-color':''}`} style={{ fontSize: 18, marginRight: 10 }} />
      <label>AGE: </label><strong className={`m-1${darkmode ? 'card-color':''}`}>{staffData?.age ?? ''} Years</strong>
      </p>
      <p className="text-muted mb-2">
        <LiaGenderlessSolid className={`${darkmode? 'card-color':''}`} style={{ fontSize: 18, marginRight: 10 }} />
        <label>Gender:</label>  <strong className={`${darkmode ? 'card-color':''}`}>{staffData?.gender}</strong>
        
      </p>
   
    </div>
                    </div>
                    {/* <hr />
                    <div className="text-center">
                      <button href="#" className="btn btn-simple"><i className="fa fa-facebook-square"></i></button>
                      <button href="#" className="btn btn-simple"><i className="fa fa-twitter"></i></button>
                      <button href="#" className="btn btn-simple"><i className="fa fa-google-plus-square"></i></button>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          
        
    )
}