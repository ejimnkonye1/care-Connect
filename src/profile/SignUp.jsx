import { useState } from "react"
import { StaffSign } from "./staffsignup";
import { ParentSign } from "./parentsignup";
import '../css/signup.css'
export const SignUp = () => {
    const [role, setRole] = useState(''); // initialize role state to an empty string

    const handleRoleChange = (event) => {
      setRole(event.target.value); // update role state when user selects a new option
    };
    return(
      <div className="container py-lg-5 sign">
      <div className="row justify-content-center">
        <div className="outer-container ">
          <div className="col-md-6 signup-container ">
            <div className="row mb-5">
              <div className="col-md-12 jutify-content-center">
                <div className="form-group">
                  <label htmlFor="role">I am a:</label>
                  <select
                    id="role"
                    name="role"
                    className="form-control"
                    value={role}
                    onChange={handleRoleChange}
                  >
                    <option value="parent">Parent</option>
                    <option value="staff">Staff</option>
                  </select>
                </div>
              </div>
            </div>
            {role === 'staff' ? <StaffSign /> : <ParentSign />}
            <div className="mb-3 mt-2">
            <p className="text-center mb-3">Already have an account? <a href="/login">Login here</a></p>
            </div>

          </div>
        </div>
      </div>
    </div>
    
    )
}