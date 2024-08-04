import { IoPersonOutline } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import '../css/login.css'
export const ResetPassword = () => {
    return(
      <div className="container reset-side">
        
      <div className=" reset-shadow">
            
    <div className="mt-5">
    <h3 className="mb-0  text-center  reset-header">ℭ𝔯𝔢𝔠𝔥𝔢ℭ𝔬𝔫𝔫𝔢𝔠𝔱</h3>
          
    </div>
         
       
              <div className="d-flex flex-column justify-content-center align-items-center py-5  ">
       
        <form>
          <div className="mb-1  reset-space">
            <h5 className="center-header text-center">Centre-Reset Password</h5>
            <p className="text-center reset-sub">Please enter email to continue</p>
          </div>
          <div className="mb-3">
            <div className="input-group">
              <div className="person-icon">
                <IoPersonOutline />
              </div>
              <input type="text" aria-describedby="basic-addon1" placeholder="Email ID" className=" user-input w-100" />
            </div>
          </div>
          <div className="mb-3">
            <button className="sign-btn reset-p btns">Reset Password</button>
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

