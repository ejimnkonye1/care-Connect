import { IoPersonOutline } from "react-icons/io5";
import { CiLock } from "react-icons/ci";

import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useState } from 'react';
import {  signInWithEmailAndPassword } from 'firebase/auth';
import { auth,firestore } from "../firebase"
import { useNavigate } from "react-router-dom";
import { doc, getDoc,  } from 'firebase/firestore';
// eslint-disable-next-line react/prop-types
export const Staff = ({ PasswordVisible , togglePasswordvisible, setShowParent, setShowStaff,setAnimate, btnloading, setbtnloading }) => {
    const handleCentre = () => {
        setShowParent(false);
        setShowStaff(false);
        setAnimate(true); // trigger animation
        setTimeout(() => {
            setAnimate(false); // reset animate state after animation is complete
          }, 500);
      };
      const handleParent = () => {
        setShowStaff(false);
        setShowParent(true);
    
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
      const user = userCredential.user
      const staffdoc = await getDoc(doc(firestore, 'staff', user.uid))
      // console.log("Staff logged in: ", userCredential.user);
      // Redirect to Staff Dashboard
      if (staffdoc.exists()) {
        setbtnloading(true)
        setTimeout(() => {
          setbtnloading(false)
          navigate('/staff')
        }, 9000);
      }else{
        setError("You are not an authorized Staff.");
        setTimeout(() => {
          setError(false);
        }, 5000);
      }
   
  
    } catch (error) {
      setbtnloading(true)
      setTimeout(() => {
        setbtnloading(false)
        setError("Invalid email or password.")
        setTimeout(() => {
          setError(false)
        }, 5000)
      }, 2000)
      console.error("Error logging in: ", error)
    
    }
  };

  
return(
    <div className='d-flex flex-column log py-4  '>
    <div>
        <h4 className='text-center login-text'> Staff Login</h4>
    </div>
    <div>
        <p className='sec-sub text-center'>
        Please sign in to continue
        </p>
        {error && (
    <div className="error-container" style={{ position: 'absolute', top: 0, left: 0, right: 0, textAlign: 'center', zIndex: 1, backgroundColor: 'rgba(yellow)', padding: '10px' }}>
      <span className="text-center text-danger" style={{ position: 'absolute', top: 0, left: 0, right: 0, textAlign: 'center', zIndex: 1, backgroundColor: 'rgba(yellow)', padding: '10px' }}>{error}</span>
    </div>
  )}
    </div>
  
    <div className='input-container p-2 py-3'>
      <form  className='py-2' onSubmit={handleLogin}>
      <div className='mb-3 first-container'>
        <div className='input-group'>
        <div className="person-icon">
      
        <IoPersonOutline />
      
    </div>
   
        <input 
         type="email"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
        aria-describedby="basic-addon1" placeholder='Email' 
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
        
        aria-describedby="basic-addon1" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Password' className='user-input w-100' required/>
        </div>
      </div>
      <div className='text-end'>
        <a href='/resetstaff' className='forget'>Forgotten Password?</a>
      </div>
      <div className='mt-2'>
        <button className='w-100 sign-in-staff btns'>
          {btnloading ? (
             <div>
                 
             <span className="spinner-border spinner-border-sm" role="status" aria-hidden="false"></span>
             <span className="pl-3"> Sign In</span>
          </div>
          ):(
            '  Sign In'
          )}
        
          
          </button>
      </div>
      <div className='text-center mt-2'>
        <p> Dont have Account? <a href='/signup' className='acct'>Create account</a></p>
      </div>
      <div className='line-container'>
       <span className='or-line'></span> OR<span className='or-line'></span>
      </div>
     
      </form>
      <div className='two-button-container d-flex justify-content-evenly' >
        <div className='parent'>
            <button 
            onClick={handleCentre}
            className='centre-btn btns'>Centre Login</button>
   
        </div>
        <div className='Staff'>
            <button 
            onClick={handleParent}
            className=' btns pars-btn'> Parent Login</button>
   
        </div>
      </div>
    
    </div>
   
   </div>
)
}