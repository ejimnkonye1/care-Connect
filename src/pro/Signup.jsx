
import { useState } from "react"
import { StaffSign } from "./staffsign";
import { ParentSign } from "./parentsign";

import { AdminSign } from "./adminsign";

  
 export const SignUps= () => {
    const [role, setRole] = useState(''); // initialize role state to an empty string
    const [btnloading, setbtnloading] = useState(false);
    const handleRoleChange = (event) => {
      setRole(event.target.value); // update role state when user selects a new option
    };
    return (
      <section className="h-auto">
        <div className="container py-5 ">
          <div className=" ">
            <div className="grid cols-1">
              <div  >
                <div className="">
                <div className="">
                      <div className="">
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
            <p className=" mb-3">Already have an account? <a href="/login">Login here</a></p>
            </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  


