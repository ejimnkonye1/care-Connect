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
        <form id="staff-signup-form" onSubmit={handleRegister}>
             {error && (
    <div className="error-container" style={{ position: 'absolute', top: 0, left: 0, right: 0, textAlign: 'center', zIndex: 1, backgroundColor: 'rgba(yellow)', padding: '10px' }}>
      <span className="text-center text-danger" style={{ position: 'absolute', top: 0, left: 0, right: 0, textAlign: 'center', zIndex: 1, backgroundColor: 'rgba(yellow)', padding: '10px' }}>{error}</span>
    </div>
  )}
          <h2 className="text-center">Staff Sign Up</h2>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="staff-name">Staff Name:</label>
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
        <div className="row">
           
           
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
    )
}