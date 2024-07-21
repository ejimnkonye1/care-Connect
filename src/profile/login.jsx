import { useState } from 'react';
import '../css/login.css'
import { IoPersonOutline } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import img from '../images/centre.svg'
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
export const LoginForm = () => {
    const  [PasswordVisible, setPasswordVisible] = useState(false)
const togglePasswordvisible = () => {
    setPasswordVisible(!PasswordVisible)
}
    return(
            <div className="container-fluid">
        <nav className="navbar crec">
  <div className="container-fluid crec">
    <span className="navbar-brand mb-0 h5">ℭ𝔯𝔢𝔠𝔥𝔢ℭ𝔬𝔫𝔫𝔢𝔠𝔱</span>
  </div>
</nav>
        <div className="row">
            <div className="col-md-8 background-side">
                <div className="d-flex justify-content-center flex-column">
                    <h4 className="text-center welcome">Welcome to CrecheConnect Web Portal 👋</h4>

                    <div className="first-title py-2">
                        <p className="title-sub text-center ">
                        Streamline your childcare experience with our smart platform.<br/> Manage enrollments, daily updates, parent communications, 
                        and more – all in one convenient place.
                        </p>
                    </div>
                    <div className='first-holder'>
                    <div className='d-flex justify-content-center mt-4'>
                        <img src={img} className='background-img' />
                    </div>
                    <div className="dotted-circle">
       
    </div>
                    </div>
         
                    <div className='end-text text-center mt-1'>
                        <p>Powered by ℭ𝔯𝔢𝔠𝔥𝔢ℭ𝔬𝔫𝔫𝔢𝔠𝔱. © Ejimnkonye - All rights reserved</p>

                    </div>
                </div>

            </div>
<div className="col-md-4 login-side ">
    <div className='d-flex flex-column log '>
        <div>
            <h4 className='text-center'>Login</h4>
        </div>
        <div>
            <p className='sec-sub text-center'>
            Please sign in to continue
            </p>
        </div>
        <div className='input-container p-2 py-3'>
          <form action className='py-2'>
          <div className='mb-3 first-container'>
            <div className='input-group'>
            <div className="person-icon">
          
            <IoPersonOutline />
          
        </div>

            <input type='text'   aria-describedby="basic-addon1" placeholder='Username' className='user-input w-100' />
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
            
            aria-describedby="basic-addon1" placeholder='Password' className='user-input w-100' />
            </div>
          </div>
          <div className='text-end'>
            <a href='#' className='forget'>Forgotten Password?</a>
          </div>
          <div className='mt-4'>
            <button className='w-100 sign-btn btns'>Sign In</button>
          </div>
          <div className='text-center mt-3'>
            <p> Dont have Account? <a href='#' className='acct'>Create account</a></p>
          </div>
          <div className='line-container'>
           <span className='or-line'></span> OR<span className='or-line'></span>
          </div>

          </form>
          <div className='two-button-container d-flex justify-content-evenly' >
            <div className='parent'>
                <button className='parent-btn btns'>Parent Login</button>

            </div>
            <div className='Staff'>
                <button className='Staff-btn btns'> Staff Login</button>

            </div>
          </div>
          <div className='privay text-center mt-4'>
            <p>
                <span className='priv'>
                
                <a href='#'>Privacy notice </a>
                </span> 
                <span> |</span>
               <span className='terms'>
               <a href='#'>Terms of use</a>
               </span>
                                    
            </p>
          </div>
        </div>

    </div>

</div>
        </div>

    </div>

    )


}