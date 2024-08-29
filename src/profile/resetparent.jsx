/* eslint-disable react/prop-types */
import { IoPersonOutline } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import '../css/login.css'
import { sendPasswordResetEmail} from 'firebase/auth';
import { auth, firestore } from "../firebase";
import { useState } from "react";
import { doc, getDoc, getDocs, where, query , collection } from 'firebase/firestore';
export const ResetParent = ({btnloading, setbtnLoading}) => {
  const [email, setEmail] = useState('');
  const [success, setsuccess] = useState('')
  const [error, setError] = useState('');
  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const usersRef = collection(firestore, 'users');
      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.docs.length > 0) {
        await sendPasswordResetEmail(auth, email);
        setbtnLoading(true);
        setTimeout(() => {
          setbtnLoading(false);
          setsuccess(`An email has been sent to ${email}`);
        }, 9000);
      } else {
        setError("User not found");
        setTimeout(() => {
          setError(false);
        }, 5000);
      }
    } catch (err) {
      console.error("Error resetting password: ", err);
      setError("Error resetting password");
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  };
    return(
      <div className="container">
      <div className=" reset-shadow">
            
    

              <div className="d-flex flex-column justify-content-center align-items-center py-5 ">
       
        <form onSubmit={handleReset}>
        {error && (
    <div className="error-container" style={{ position: 'absolute', top: 0, left: 0, right: 0, textAlign: 'center', zIndex: 1, backgroundColor: 'rgba(yellow)', padding: '10px' }}>
      <span className="text-center text-danger" style={{ position: 'absolute', top: 0, left: 0, right: 0, textAlign: 'center', zIndex: 1, backgroundColor: 'rgba(yellow)', padding: '10px' }}>{error}</span>
    </div>
  )}
    {success && (
    <div className="error-container" style={{ position: 'absolute', top: 0, left: 0, right: 0, textAlign: 'center', zIndex: 1, backgroundColor: 'rgba(yellow)', padding: '10px' }}>
      <span className="text-center text-danger" style={{ position: 'absolute', top: 0, left: 0, right: 0, textAlign: 'center', zIndex: 1, backgroundColor: 'rgba(yellow)', padding: '10px' }}>{success}</span>
    </div>
  )}
          <div className="mb-1  reset-space">
            <h5 className="center-header text-center" style={{color:'#15228abf'}}>Parent-Reset Password</h5>
            <p className="text-center reset-sub">Please enter email to continue</p>
          </div>
          <div className="mb-3">
            <div className="input-group">
              <div className="person-icon">
                <IoPersonOutline />
              </div>
              <input type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
               aria-describedby="basic-addon1" placeholder="Email ID" className=" user-input w-100" />
            </div>
          </div>
          <div className="mb-3">
            <button type="submit" className="parent-btn btns">

            {btnloading ? (
             <div>
                 
             <span className="spinner-border spinner-border-sm" role="status" aria-hidden="false"></span>
             <span className="pl-3"> Reset Password</span>
          </div>
          ):(
            '  Reset Password'
          )}
            </button>
          </div>
          <div className="mb-3 text-center back-to-login">
          <FaArrowLeft className="left" />    <a href="/" className="text-decoration-none">Back to login</a>    
          </div>
        </form>
      </div>
      </div>
      </div>
  
    )
}

