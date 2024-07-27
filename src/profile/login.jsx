import { useState } from 'react';
import '../css/login.css'
import { Parent } from './parent';
import { Parent1 } from './parentHead';
import { Centre1 } from './centreHead';
import { Staff1 } from './staffHead';
import { Staff } from './staff';
import { Centre } from './centre';

export const LoginForm = () => {
    const  [PasswordVisible, setPasswordVisible] = useState(false)
    const [showParent, setShowParent] = useState()
    const [showStaff, setShowStaff] = useState()
    const [animate, setAnimate] = useState(false)
const togglePasswordvisible = () => {
    setPasswordVisible(!PasswordVisible)
}
    return(
            <div className="container-fluid holder-main">
        <div className={`row shadow-add ${showParent? 'transition-container ease-in duration-300' : ''}`}>
            <div className="col-6 col-md-8 background-side ">
            <nav className="navbar crec">
  <div className="container-fluid crec">
    <span className="navbar-brand mb-0 h5">ℭ𝔯𝔢𝔠𝔥𝔢ℭ𝔬𝔫𝔫𝔢𝔠𝔱</span>
  </div>
</nav>
<div
   className={`component-first ${animate ? 'animate' : ''}`}>
{showParent? (
<Parent1  />
): showStaff ?(
 <Staff1 />
): (
<Centre1 />
)}
</div>
            </div>

<div className="col-12 col-md-4 login-side">
<div className={`component-container ${animate ? 'animate' : ''}`}>
    {showParent ? (
      <Parent
        PasswordVisible={PasswordVisible}
        togglePasswordvisible={togglePasswordvisible}
        setShowParent={setShowParent}
        setShowStaff={setShowStaff}
        setAnimate={setAnimate}
      />
    ) : showStaff ? (
      <Staff
        PasswordVisible={PasswordVisible}
        togglePasswordvisible={togglePasswordvisible}
        setShowParent={setShowParent}
        setAnimate={setAnimate}
        setShowStaff={setShowStaff}
      />
    ) : (
      <Centre
        PasswordVisible={PasswordVisible}
        togglePasswordvisible={togglePasswordvisible}
        setShowParent={setShowParent}
        setShowStaff={setShowStaff}
        setAnimate={setAnimate}
      />
    )}
  </div>
</div>
        </div>

    </div>

    )


}