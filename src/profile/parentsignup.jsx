import { auth, firestore,  } from "../firebase"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {  doc, setDoc } from 'firebase/firestore';
export const ParentSign = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [childName, setChildName] = useState('');
    const navigate = useNavigate()
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const userId = userCredential.user.uid;
          await setDoc(doc(firestore, 'users', userId), {
            email,
            role: 'parent',
            children: [{ name: childName }]
          });
          console.log(userId)
          console.log("User data saved to Firestore");
          // Redirect to parent dashboard or show success message
          navigate('/dash')
        } catch (error) {
          console.error("Error registering: ", error);
        }
      };
    
    return(
        <div className="parent-sign">
        <h2 className="text-center">Parent Sign Up</h2>
        <form id="parent-signup-form"  onSubmit={handleRegister}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="first-name">First Name:</label>
                <input type="text" id="first-name" name="first-name" className="form-control" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="last-name">Last Name:</label>
                <input type="text" id="last-name" name="last-name" className="form-control" />
              </div>
            </div>
          </div>
  
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="child-name">Child Name:</label>
                <input type="text" value={childName} onChange={(e) => setChildName(e.target.value)} placeholder="Child's Name" required  className="form-control"/>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required  className="form-control"/>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="phone-number">Phone Number:</label>
                <input type="text" id="phone-number" name="phone-number" className="form-control" />
              </div>
            </div>
          </div>
  
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required  className="form-control"/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="confirm-password">Confirm Password:</label>
                <input type="password" id="confirm-password" name="confirm-password" className="form-control" />
              </div>
            </div>
          </div>
  <div className="d-flex justify-content-end">
  <button type="submit" className="btns up-btn btn-primary btn-block mt-2  mb-3">Sign Up</button>
  </div>

        </form>
        </div>
    )
}