/* eslint-disable no-unused-vars */
// import { useState } from 'react';
// import '../css/login.css'
// import { Parent } from './parent';
// import { Parent1 } from './parentHead';
// import { Centre1 } from './centreHead';
// import { Staff1 } from './staffHead';
// import { Staff } from './staff';
// import { Centre } from './centre';

// export const LoginForm = () => {
//     const  [PasswordVisible, setPasswordVisible] = useState(false)
//     const [showParent, setShowParent] = useState()
//     const [showStaff, setShowStaff] = useState()
//     const [animate, setAnimate] = useState(false)
//     const [btnloading, setbtnLoading] = useState(false);
// const togglePasswordvisible = () => {
//     setPasswordVisible(!PasswordVisible)
// }
//   const handlebtnClick = () => {
//     setbtnLoading(true);
    
//     // Simulate an async operation 
//     setTimeout(() => {
//       setbtnLoading(false);
//       // Add your sign-in logic here
//     }, 9000);
//   };
//     return(
//             <div className="container-fluid holder-main">
//                        <nav className="navbar crec mt-3 sm-creach">
//   <div className="container-fluid crec">
//     <span className="navbar-brand mb-0 h5">ℭ𝔯𝔢𝔠𝔥𝔢ℭ𝔬𝔫𝔫𝔢𝔠𝔱</span>
//   </div>
// </nav>
//         <div className={`row shadow-add ${showParent? 'transition-container ease-in duration-300' : ''}`}>
          
//             <div className="col-6 col-md-8 background-side ">
//             <nav className="navbar crec">
//   <div className="container-fluid crec">
//     <span className="navbar-brand mb-0 h5">ℭ𝔯𝔢𝔠𝔥𝔢ℭ𝔬𝔫𝔫𝔢𝔠𝔱</span>
//   </div>
// </nav>
// <div
//    className={`component-first ${animate ? 'animate' : ''}`}>
// {showParent? (
// <Parent1  />
// ): showStaff ?(
//  <Staff1 />
// ): (
// <Centre1 />
// )}
// </div>
//             </div>

// <div className="col-12 col-md-4 login-side">
// <div className={`component-container ${animate ? 'animate' : ''}`}>
//     {showParent ? (
//       <Parent
//         PasswordVisible={PasswordVisible}
//         togglePasswordvisible={togglePasswordvisible}
//         setShowParent={setShowParent}
//         setShowStaff={setShowStaff}
//         setAnimate={setAnimate}
//         btnloading={btnloading}
//         setbtnloading={setbtnLoading}
//       />
//     ) : showStaff ? (
//       <Staff
//         PasswordVisible={PasswordVisible}
//         togglePasswordvisible={togglePasswordvisible}
//         setShowParent={setShowParent}
//         setAnimate={setAnimate}
//         setShowStaff={setShowStaff}
//         btnloading={btnloading}
//         setbtnloading={setbtnLoading}
//       />
//     ) : (
//       <Centre
//         PasswordVisible={PasswordVisible}
//         togglePasswordvisible={togglePasswordvisible}
//         setShowParent={setShowParent}
//         setShowStaff={setShowStaff}
//         setAnimate={setAnimate}
//         handlebtnClick={handlebtnClick}
//         btnloading={btnloading}
//       />
//     )}
//   </div>
// </div>
//         </div>

//     </div>

//     )


// }






import { useState } from 'react';
import '../css/login.css';
import { Parent } from './parent';
import { Staff } from './staff';
import { Centre } from './centre';

export const LoginForm = () => {
    const [PasswordVisible, setPasswordVisible] = useState(false);
    const [showParent, setShowParent] = useState(false);
    const [showStaff, setShowStaff] = useState(false);
    const [animate, setAnimate] = useState(false);
    const [btnloading, setbtnLoading] = useState(false);

    const togglePasswordvisible = () => {
        setPasswordVisible(!PasswordVisible);
    };

    const handlebtnClick = () => {
        setbtnLoading(true);

        // Simulate an async operation 
        setTimeout(() => {
            setbtnLoading(false);
            // Add your sign-in logic here
        }, 9000);
    };

    return (
        <div className="container-fluid holder-main">
            <div className="center-wrapper">
                <div className="component-container">

                    {showParent ? (
                        <Parent
                            PasswordVisible={PasswordVisible}
                            togglePasswordvisible={togglePasswordvisible}
                            setShowParent={setShowParent}
                            setShowStaff={setShowStaff}
                            setAnimate={setAnimate}
                            btnloading={btnloading}
                            setbtnloading={setbtnLoading}
                        />
                        
                    ) : showStaff ? (
                        <Staff
                            PasswordVisible={PasswordVisible}
                            togglePasswordvisible={togglePasswordvisible}
                            setShowParent={setShowParent}
                            setAnimate={setAnimate}
                            setShowStaff={setShowStaff}
                            btnloading={btnloading}
                            setbtnloading={setbtnLoading}
                        />
                    ) : (
                        <Centre
                            PasswordVisible={PasswordVisible}
                            togglePasswordvisible={togglePasswordvisible}
                            setShowParent={setShowParent}
                            setShowStaff={setShowStaff}
                            setAnimate={setAnimate}
                            handlebtnClick={handlebtnClick}
                            btnloading={btnloading}
                            setbtnloading={setbtnLoading}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

