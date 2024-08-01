import { useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebase'
import img from '../images/face-3.jpg'

export const Profilenn = () => {
  const [userData, setUserData] = useState(null);

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
    return(
    
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-8">
                  <div className="card">
                    <div className="header">
                      <h4 className="title">Edit Profile</h4>
                    </div>
                    <div className="content">
                      <form>
                        <div className="row">
                          <div className="col-md-5">
                            <div className="form-group">
                              <label>Company (disabled)</label>
                              <input type="text" className="form-control" disabled placeholder="Company" value="Crech Connect." />
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="form-group">
                              <label>Child Name</label>
                              <input type="text" className="form-control" placeholder="Child's Name"  value={userData?.children[0].name ?? ''} />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">Parent Email address</label>
                              
                              <input type="email" className="form-control" placeholder="Email" value={userData?.email ?? ''}/>
                            </div>
                          </div>
                        </div>
        
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Parent FirstName</label>
                              <input type="text" className="form-control" placeholder="First Name" value="Mike" />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Parent LastName</label>
                              <input type="text" className="form-control" placeholder="Last Name" value="Andrew" />
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
        
                        <button type="submit" className="btn mt-3 btn-info btn-fill pull-right">Update Profile</button>
                        <div className="clearfix"></div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card card-user">
                    <div className="image">
                      <img src="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400" alt="..." />
                    </div>
                    <div className="content">
                      <div className="author">
                       
                          <img className="avatar border-gray" src={img} alt="..." />
                          <h4 className="title">{userData?.children[0].name ?? ''}

                            
                          </h4>
                        
                      </div>
                     <div>
                        <p>
                            AGE :5 years
                        </p>
                        <p>
                            Gender:Male
                        </p>
                        <p>Parent name:Mike
                        </p>
                     </div>
                    </div>
                    <hr />
                    <div className="text-center">
                      <button href="#" className="btn btn-simple"><i className="fa fa-facebook-square"></i></button>
                      <button href="#" className="btn btn-simple"><i className="fa fa-twitter"></i></button>
                      <button href="#" className="btn btn-simple"><i className="fa fa-google-plus-square"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          
        
    )
}