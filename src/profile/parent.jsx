import { IoPersonOutline } from "react-icons/io5";
import { CiLock } from "react-icons/ci";

import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { auth  } from "../firebase"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {  signInWithEmailAndPassword } from 'firebase/auth';
// eslint-disable-next-line react/prop-types
export const Parent = ({ PasswordVisible , togglePasswordvisible, setShowParent, setShowStaff,setAnimate }) => {
  const handleCentre = () => {
    setShowParent(false);
    setShowStaff(false);
    setAnimate(true); // trigger animation
    setTimeout(() => {
        setAnimate(false); // reset animate state after animation is complete
      }, 500);
  };
  const handleStaff = () => {
    setShowParent(false);
    setShowStaff(true);
    setAnimate(true); // trigger animation
    setTimeout(() => {
        setAnimate(false); // reset animate state after animation is complete
      }, 500);
   
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in: ", userCredential.user);
      // Redirect to Parent Dashboard
     navigate('/dash')
    } catch (error) {
      console.error("Error logging in: ", error);
      setError("Invalid email or password.");
    }
  };

return(
    <div className='d-flex flex-column log py-4  '>
    <div>
        <h4 className='text-center login-text'> Parent Login</h4>
    </div>
    <div>
        <p className='sec-sub text-center'>
        Please sign in to continue
        </p>
    </div>
    <div className='input-container p-2 py-3'>
      <form  className='py-2 ' onSubmit={handleLogin}>
      <div className='mb-3 first-container'>
        <div className='input-group'>
        <div className="person-icon">
      
        <IoPersonOutline />
      
    </div>


        <input   type="email"aria-describedby="basic-addon1"  placeholder="Email"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
        className='user-input w-100' required />
        </div>
   
      </div>
      <div className='second-conatiner mb-3 mt-4' >
      <div className='input-group'>
        <div className="person-icon">
      
        <CiLock />
      
    </div>
    <div className="eye-icon " onClick={togglePasswordvisible}>
      
      {PasswordVisible? <IoMdEyeOff />:<IoMdEye /> }
    
   </div>
   
        <input type={PasswordVisible ? 'text': 'password'}
        
        aria-describedby="basic-addon1" placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='user-input w-100' required />
        </div>
      </div>
      <div className='text-end'>
       
        <a  href="/resetpar" className='forget'>Forgotten Password?</a>
        
      </div>
      <div className='mt-3'>
        <button className='w-100 sign-in-parent btns'>Sign In</button>
      </div>
      <div className='text-center mt-3'>
        <p> Dont have Account? <a href='#' className='acct'>Create account</a></p>
      </div>
      {/* <div className='line-container'>
       <span className='or-line'></span> OR<span className='or-line'></span>
      </div> */}
        {error && <p>{error}</p>}
      </form>
      <div className='two-button-container d-flex justify-content-evenly' >
        <div className='parent'>
            <button 
            onClick={handleCentre}
            className='centre-btn btns'>Centre Login</button>
   
        </div>
        <div className='Staff'>
            <button 
            onClick={handleStaff}
            className='Staff-btn btns'> Staff Login</button>
   
        </div>
      </div>
    
    </div>
   
   </div>
)
}