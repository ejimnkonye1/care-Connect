/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import {  doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebase'
import img from '../images/face-3.jpg'
import { IoCalendarNumber } from "react-icons/io5";
import { LiaGenderlessSolid } from "react-icons/lia";
import { FaUserAstronaut } from "react-icons/fa";
import img1 from '../assets/child2.jpeg'
import { useSelector } from "react-redux";
export const Profilenn = () => {
  const [userData, setUserData] = useState(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    gender: '',
    age: '',
  });

  const user = auth.currentUser
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
          });
        }
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (user) {
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








  useEffect(() => {
   const fetchUserData = async () => {
     const user = auth.currentUser;
     if (user) {
       const userDoc = await getDoc(doc(firestore, 'users', user.uid));
       if (userDoc.exists()) {
         setUserData(userDoc.data());
       }
     }
   };

   fetchUserData();
 }, [auth, firestore]);
 const darkmode = useSelector((state)=> state.darkMode)
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
              <div className="col-md-5">
                <div className="form-group">
                  <label>Company</label>
                  <input
                    type="text"
                    className="form-control"
                    disabled
                    placeholder="Company"
                    value="Crech Connect."
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>Child Name</label>
                  <input
                    type="text"
                    className="form-control"
                    disabled
                    placeholder="Child's Name"
                    value={userData?.children[0]?.name ?? ''}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Parent Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    disabled
                    placeholder="Email"
                    value={userData?.email ?? ''}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Parent First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Parent Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
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
                    className="form-control"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
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
            <button type="submit" className="btn mt-3 btn-dark btn-fill pull-right">
              Update Profile
            </button>
            <div className="clearfix"></div>
          </form>
        </div>
      </div>
    </div>
    <div className="col-md-4">
  <div className={`card card-user ${darkmode? 'card-mode':''}`}>
    <div className="image">
      <img
        src={img1}
        alt="Profile background"
        className="img-fluid"
      />
    </div>
    <div className="content">
      <div className="author">
        <img className="avatar border-gray img-fluid rounded-circle" src={img1} alt="User Avatar" />
        {/* <h4 className="title mt-3">{userData?.children[0].name ?? ''}</h4> */}
      </div>
      <div className="mt-4 namess">
      <p className="text-muted">
        <FaUserAstronaut className={`${darkmode? 'card-color':''}`} style={{ fontSize: 18, marginRight: 10 }} />
        <label>Child Name: </label> <strong className={`${darkmode ? 'card-color':''}`}>{userData?.children[0].name ?? ''}</strong>
      </p>
      <p className="text-muted mb-2">
        <IoCalendarNumber className={`${darkmode? 'card-color':''}`} style={{ fontSize: 18, marginRight: 10 }} />
      <label>AGE: </label><strong className={`${darkmode ? 'card-color':''}`}>{userData?.age}</strong>
      </p>
      <p className="text-muted mb-2">
        <LiaGenderlessSolid className={`${darkmode? 'card-color':''}`} style={{ fontSize: 18, marginRight: 10 }} />
        <label>Gender:</label>  <strong className={`${darkmode ? 'card-color':''}`}>{userData?.gender}</strong>
        
      </p>
   
    </div>

    </div>
    {/* <hr /> */}
    {/* <div className="text-center">
      <button className="btn btn-simple btn-facebook me-2">
        <i className="fa fa-facebook-square"></i>
      </button>
      <button className="btn btn-simple btn-twitter me-2">
        <i className="fa fa-twitter"></i>
      </button>
      <button className="btn btn-simple btn-google">
        <i className="fa fa-google-plus-square"></i>
      </button>
    </div> */}
  </div>
</div>

              </div>
            </div>
          
        
    )
}