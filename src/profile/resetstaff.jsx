import { IoPersonOutline } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import '../css/login.css'
export const ResetStaff = () => {
    return(
      <div className="container">
      <div className=" reset-shadow">
            
    
       
              <div className="d-flex flex-column justify-content-center align-items-center py-5 ">
       
        <form>
          <div className="mb-1  reset-space">
            <h5 className="center-header text-center" style={{color:' #ffb850bf'}}>Staff-Reset Password</h5>
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
            <button className="Staff-btn btns">Reset Password</button>
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

