import {  createUserWithEmailAndPassword } from 'firebase/auth';
import {  doc, setDoc } from 'firebase/firestore';
import { auth, firestore,  } from "../firebase"
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
export const AdminSign = () => {
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
      // Redirect to staff dashboard or show success message
      navigate('/admin')
    } catch (error) {
      console.error("Error registering admin: ", error);
      setError("Error registering admin. Please try again.");
    }
  };

    return(
        <form id="admin-signup-form" onSubmit={handleRegister}>
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
<button type="submit" className="btns btn-primary up-btn btn-block mt-2">Sign Up</button>
</div>

        {error && <p>{error}</p>}
      </form>
    )
}