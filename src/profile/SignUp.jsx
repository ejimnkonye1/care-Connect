import '../css/signup.css'
import { useState } from "react"
import { StaffSign } from "./staffsignup";
import { ParentSign } from "./parentsignup";

import { AdminSign } from "./adminsignup";

  
 export const SignUp= () => {
    const [role, setRole] = useState(''); // initialize role state to an empty string
    const [btnloading, setbtnloading] = useState(false);
    const handleRoleChange = (event) => {
      setRole(event.target.value); // update role state when user selects a new option
    };
    return (
      <section className="vh-100 cux-gradient-custom">
        <div className="container py-5 h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-12 col-lg-9 col-xl-7">
              <div className="card shadow-2-strong cux-card-registration" style={{ borderRadius: '15px' }}>
                <div className="card-body p-4 p-md-5">
                <div className="row">
                      <div className="col-12">
                      <label htmlFor="role" className='form-label select-label'>I am a:</label><br/>
                        <select className="select form-control-lg"
                          id="role"
                    name="role"
                         value={role}
                         onChange={handleRoleChange}
                        >
                        <option value="parent">Parent</option>
                    <option value="staff">Staff</option>
                    <option value="admin">Admin</option>
                        </select>

                      </div>
                    </div>
                  {/* <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Registration Form</h3> */}
                  { role === 'admin' ?
             <AdminSign
             btnloading={btnloading}
             setbtnloading={setbtnloading}
             /> :  
              role === 'staff' ? <StaffSign
              btnloading={btnloading}
              setbtnloading={setbtnloading}
              /> 
              : 
              <ParentSign 
              btnloading={btnloading}
              setbtnloading={setbtnloading}
              />
                      }
                  <div className="mb-3 mt-2">
            <p className="text-center mb-3">Already have an account? <a href="/login">Login here</a></p>
            </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  


