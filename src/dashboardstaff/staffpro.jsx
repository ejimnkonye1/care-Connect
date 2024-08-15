
import img from '../images/face-3.jpg'
import  { useState, useEffect } from 'react';

import { doc, getDoc } from 'firebase/firestore';

import { auth, firestore } from '../firebase'
import { useSelector } from 'react-redux';
import { IoCalendarNumber } from "react-icons/io5";
import { LiaGenderlessSolid } from "react-icons/lia";
import { FaUserAstronaut } from "react-icons/fa";
export const Staffpro = () => {
    const [staffData, setStaffData] = useState(null);
  

    useEffect(() => {
      const fetchStaffData = async () => {
        const user = auth.currentUser;
        if (user) {
          const staffDoc = await getDoc(doc(firestore, 'staff', user.uid));
          if (staffDoc.exists()) {
            setStaffData(staffDoc.data());
          }
        }
      };
  
      fetchStaffData();
    }, []);
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
                      <form>
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
                              
                              <input type="email" className="form-control" placeholder="Email" value={staffData?.email ?? ''} />
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
                          <div className="col-md-12">
                            <div className="form-group">
                              <label>Address</label>
                              <input type="text" className="form-control" placeholder="Home Address" value="No 5 Ubaka Street, Enugu state" />
                            </div>
                          </div>
                        </div>
        
                        <div className="row">
                          <div className="col-md-4">
                            <div className="form-group">
                              <label>City</label>
                              <input type="text" className="form-control" placeholder="City" value="Mike" />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label>Country</label>
                              <input type="text" className="form-control" placeholder="Country" value="Andrew" />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label>Postal Code</label>
                              <input type="number" className="form-control" placeholder="ZIP Code" />
                            </div>
                          </div>
                        </div>
        
                        <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Gender</label>
                      <select className="form-control">
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
                      <input type="number" className="form-control" placeholder="Age" />
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
                      <img src="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400" alt="..." />
                    </div>
                    <div className="content">
                      <div className="author">
                       
                          <img className="avatar border-gray img-fluid rounded-circle" src={img} alt="..." />
                          <h4 className="title">staff

                            
                          </h4>
                        
                      </div>
                      <div className="mt-4 namess">
      <p className="text-muted">
        <FaUserAstronaut className={`${darkmode? 'card-color':''}`} style={{ fontSize: 18, marginRight: 10 }} />
        <label>Child Name: </label> <strong className={`${darkmode ? 'card-color':''}`}>{staffData?.name ?? ''}</strong>
      </p>
      <p className="text-muted mb-2">
        <IoCalendarNumber className={`${darkmode? 'card-color':''}`} style={{ fontSize: 18, marginRight: 10 }} />
      <label>AGE: </label><strong className={`${darkmode ? 'card-color':''}`}>{staffData?.age}</strong>
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