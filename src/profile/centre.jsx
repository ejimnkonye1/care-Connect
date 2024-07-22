import { IoPersonOutline } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
// eslint-disable-next-line react/prop-types
export const Centre = ({setShowParent, setShowStaff, PasswordVisible, togglePasswordvisible,  setAnimate}) => {
    const handleAnimate = () => {
        setShowParent(true); // or setShowStaff(true) depending on the button
        setAnimate(true); // trigger animation
        setTimeout(() => {
            setAnimate(false); // reset animate state after animation is complete
          }, 500);
    }
    return(
        <div className='d-flex flex-column log py-4 '>
        <div>
            <h4 className='text-center login-text'>Login</h4>
        </div>
        <div>
            <p className='sec-sub text-center'>
            Please sign in to continue
            </p>
        </div>
        <div className='input-container p-2 py-3'>
          <form className='py-2'>
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
          <div className='mt-3'>
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
                <button className='parent-btn btns'
                   onClick={handleAnimate}
                >Parent Login</button>
    
            </div>
            <div className='Staff'>
                <button className='Staff-btn btns'
                onClick={() => setShowStaff(true)}
                > Staff Login</button>
    
            </div>
          </div>
        
        </div>
    
    </div>
    )
}