/* eslint-disable react/prop-types */
import { auth, firestore,  } from "../firebase"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {  doc, setDoc } from 'firebase/firestore';
import { MdAddCircleOutline } from "react-icons/md";
export const ParentSign = ({btnloading, setbtnloading}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [childName, setChildName] = useState('');
    const [phone, setphone] = useState('')
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [error, setError] = useState(null)
    const [image, setImage] = useState(null);

    const navigate = useNavigate()
    const handleRegister = async (e) => {
        e.preventDefault();
        if (!image) {
          setError("Please upload an image.");
          setTimeout(() => {
              setError(false);
          }, 5000);
          return;
      }
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const userId = userCredential.user.uid;
          await setDoc(doc(firestore, 'users', userId), {
            email,
            role: 'parent',
            children: [{ name: childName }],
            phone,
            firstName,
            lastName,
            image

          });
          console.log(userId)
          console.log("User data saved to Firestore");
          setbtnloading(true)
          setTimeout(() => {
            setbtnloading(false)
            navigate('/dash')
          }, 9000);
         
        } catch (error) {
          setbtnloading(true)
          setTimeout(() => {
            setbtnloading(false)
            setError(error.message)
            setTimeout(() => {
              setError(false)
            }, 5000)
          }, 2000)
          console.error("Error registering: ", error);
          
        }
      };
      const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            setImage(e.target.result);
          };
          reader.readAsDataURL(file);
        }
      };
    return(
        <div className="parent-sign">
       {error && (
    <div className="error-container" style={{ position: 'absolute', top: 0, left: 0, right: 0, textAlign: 'center', zIndex: 1, backgroundColor: 'rgba(yellow)', padding: '10px' }}>
      <span className="text-center text-danger" style={{ position: 'absolute', top: 0, left: 0, right: 0, textAlign: 'center', zIndex: 1, backgroundColor: 'rgba(yellow)', padding: '10px' }}>{error}</span>
    </div>
  )}
        <h2 className="text-center">Parent Sign Up</h2>
        <form id="parent-signup-form"  onSubmit={handleRegister}>
        
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="first-name">First Name:</label>
                <input type="text" id="first-name" placeholder="First Name" value={firstName} onChange={(e) => setfirstName(e.target.value)} required name="first-name" className="form-control" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="last-name">Last Name:</label>
                <input type="text" id="last-name" placeholder="Last Name" name="last-name" value={lastName} onChange={(e) => setlastName(e.target.value)} required className="form-control" />
              </div>
            </div>
          </div>
  
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="child-name">Child Name:</label>
                <input type="text" value={childName} onChange={(e) => setChildName(e.target.value)} placeholder="Child's Name" required  className="form-control"/>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required  className="form-control"/>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="phone-number">Phone Number:</label>
                <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setphone(e.target.value)} required id="phone-number" name="phone-number" className="form-control" />
              </div>
            </div>
          </div>
  
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required  className="form-control"/>
              </div>
            </div>
            <div className="col-md-6 mt-2">
            <div className="form-group">
            <div className="image-upload">
                        <label htmlFor="file-input">
                          <div className="circular-image">
                          {image && <img src={image} alt="Upload" id="preview" />}
                            <MdAddCircleOutline className="add-icon" />
                          </div>
                        </label>
                        <input id="file-input" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
                      </div>
                      </div>
            </div>
          </div>
  <div className="d-flex justify-content-end">
  <button type="submit" className="btns up-btn btn-primary btn-block mt-2  mb-3">
    
  {btnloading ? (
             <div>
                 
             <span className="spinner-border spinner-border-sm" role="status" aria-hidden="false"></span>
             <span className="pl-3"> Sign Up</span>
          </div>
          ):(
            '  Sign Up'
          )}
    
    </button>
  </div>

        </form>
        </div>
    )
}