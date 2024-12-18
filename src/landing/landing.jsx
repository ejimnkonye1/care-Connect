/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import './landing.css'
import img1 from '../images/stories-1.svg'
import img2 from '../images/stories-2.svg'
import img3 from '../images/stories-3.svg'
import Get from '../images/get-started.png'
import feat1 from '../images/f-icon-1.svg'
import feat2 from '../images/f-icon-4.svg'
import feat3 from '../images/f-icon-6.svg'
import feat4 from '../images/f-icon-8.svg'
import feat5 from '../images/f-icon-9.svg'
import feat6 from '../images/f-icon-2.svg'
import feat7 from '../images/a1.jpeg'
import c1 from '../assets/c1.jpg'
import c2 from '../assets/c2.jpg'
import c3 from '../assets/c3.jpg'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export const LandingPage = () => {
    const [active, setActive] = useState(null)
    const features = [
        { name: 'Manage Your Child Care Center' },
        { name: 'Engage Parent and Families' },
        { name: 'Streamline Your Daily Operation' },
        { name: 'Empower Your Educator and Staff' },
        { name: 'Manage Your Child Care Center' },
      ];
    const handlefeatures = (index) => {
  setActive(index)
    }
    const navigate = useNavigate()
    const HandleSignUp = () => {
        navigate ('/signup')
    }
    const HandleLogin = () => {
        navigate ('/login')
    }
    const handleDemo = () => {
      alert('coming soon')
    }
    return (
        <div className='child'>
             <nav className="navbar navbar-expand-lg navbar-light  nav-bg">
  <div className="container-fluid">
    <button className="navbar-toggler to-color" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
      <span className="navbar-toggler-icon"></span>
    </button>
    <a className="navbar-brand p-2" href="#">
  <span className="care">𝓒𝓪𝓻𝓮</span>
  <span className="connect">𝓬𝓸𝓷𝓷𝓮𝓬𝓽</span>
</a>
    <div className="nav lg-nav">
        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li className="nav-item ">
            <a className="nav-link land-link" href="#">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link land-link" href="#features">Features</a>
          </li>
          <li className="nav-item">
            <a className="nav-link land-link" href="#testimonials">Testimonials</a>
          </li>
          <li className="nav-item">
            <a className="nav-link land-link" href="#pricing">Pricing</a>
          </li>
          <li className="nav-item">
            <button onClick={HandleLogin} className='btns sign-in-nav'>Sign In</button>
          </li>
          <li className="nav-item mx-lg-4 mx-sm-0">
            <button onClick={HandleSignUp} className='btns sign-up-nav'>Sign Up Free</button>
          </li>
        </ul>
      </div>
    <div className="offcanvas offcanvas-start" tabIndex={'-1'} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title care-5" id="offcanvasNavbarLabel">CareConnect</h5>
        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li className="nav-item ">
            <a className="nav-link land-link" href="#">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link land-link" href="#features">Features</a>
          </li>
          <li className="nav-item">
            <a className="nav-link land-link" href="#testimonials">Testimonials</a>
          </li>
          <li className="nav-item">
            <a className="nav-link land-link" href="#pricing">Pricing</a>
          </li>
          <li className="nav-item">
            <button onClick={HandleLogin} className='btns sign-in-nav'>Sign In</button>
          </li>
          <li className="nav-item mx-lg-4 mx-sm-0">
            <button onClick={HandleSignUp} className='btns sign-up-nav'>Sign Up Free</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>
            <div className="hero container-fluid">
              
<div className='row'>
    <div className='col-md-12 py-5 align-items-center flex-column'>
<div className=''>
<h1 className='care'>Care <span className='connect'>Connect
  </span></h1>
                <p className='text-white'>Connecting Caregivers and Families</p>
                <p className='text-white'>The Careconnect platform simplifies day-to-day operations for childcare centers,<br /> 
                so you can focus on what matters: providing an ideal learning environment that sparks growth,<br/> creativity and happiness in children.

</p>
                <button className="btn btn-primary" onClick={HandleLogin}>Get Started</button>
</div>
    </div>
    

</div>
            </div>
  <div className="container">
        


          

  <section className='py-5 mb-3 feat'>
  <h5 className='text-center mb-4 text-white'>CareConnect is packed with all the features you need</h5>
  <div className='row'>
    {features.map((feature, index) => (
      <div className='col-md-4 mb-4' key={index}>
        <div
          className={`feature-card ${active === index ? 'active' : ''}`}
          onClick={() => handlefeatures(index)}
        >
          <div className='feature-icon'>
   
          </div>
          <p className='text-center mt-3 text-white'>{feature.name}</p>
          <p className='text-center mt-1 feature-description text-white'>{feature.description}</p>
        </div>
      </div>
    ))}
  </div>
</section>



<section id="testimonials" className='mb-4 py-3'>
    <h2 className='text-center mb-3 text-white'>Testimonials</h2>
    <div className='row'>
        <div className='col-md-4'>
            <div className='testimonial-card card'>
                <img src={c1} alt='stories1' />
                <div className='testimonial-body'>
                    <blockquote>
                        <p>CareConnect has been a game-changer for our family. We can finally stay connected with our child's caregivers and receive updates in real-time.</p>
                        <cite>— Sarah P., Happy Parent</cite>
                    </blockquote>
                </div>
            </div>
        </div>
        <div className='col-md-4'>
            <div className='testimonial-card card'>
                <img src={c2} alt='stories2' />
                <div className='testimonial-body'>
                    <blockquote>
                        <p>CareConnect has streamlined our communication with parents and made it easier to provide high-quality care for our children.</p>
                        <cite>— John D., Caregiver</cite>
                    </blockquote>
                </div>
            </div>
        </div>
        <div className='col-md-4'>
            <div className='testimonial-card card'>
                <img src={c3} alt='stories3' />
                <div className='testimonial-body'>
                    <blockquote>
                        <p>CareConnect has streamlined our communication with parents and made it easier to provide high-quality care for our children.</p>
                        <cite>— John D., Caregiver</cite>
                    </blockquote>
                </div>
            </div>
        </div>
    </div>
</section>




            <section id="features" className='mb-4 py-3'>
                <h5 className='text-center mb-3 text-white'>Top features</h5>
             <div className='row'>
                <div className=' col-6 col-md-2'>
                    <div className='card feat-card'>
                        <img src={feat1} className='feat-img' />
                    </div>
                    <p>Childcare attendance</p>
                </div>
                <div className=' col-6 col-md-2'>
                    <div className='card  feat-card'>
                        <img src={feat2} className='feat-img' />
                    </div>
                    <p>Parent communication</p>
                </div>
                <div className='col-6 col-md-2'>
                    <div className='card  feat-card'>
                        <img src={feat3} className='feat-img'/>
                    </div>
                    <p>Classroom Updates</p>
                </div>
                <div className='col-6 col-md-2'>
                    <div className='card  feat-card'>
                        <img src={feat4} className='feat-img'/>
                    </div>
                    <p>Analytics and reports</p>
                </div>
                <div className='col-6 col-md-2'>
                    <div className='card  feat-card'>
                        <img src={feat5} className='feat-img' />
                    </div>
                    <p>Communication filters</p>
                </div>
                <div className='col-6 col-md-2'>
                    <div className='card  feat-card'>
                        <img src={feat6} className='feat-img'/>
                    </div>
                    <p>Admin management</p>
                </div>

             </div>
       
           
            </section>


            <section id="pricing" className="mb-3 py-3">
  <h2 className="text-center mb-3 text-white">Pricing</h2>
  <div className="row">
    <div className="col-md-4 mb-3">
      <div className="pricing-card card-height">
        <div className="pricing-header text-white" style={{ backgroundColor: '#007bff' }}>
          <h3 className="text-center">Basic</h3>
          <p className="text-center">$0.00/month</p>
          <div className="pricing-top-features border-top border-bottom mb-3 text-center" style={{ backgroundColor: '#009bfa', borderColor: '#ffb850' }}>
            Top features include
          </div>
        </div>
        <ul className="tick-list cancel-list">
          <li className="border-bottom p-2">Real-time updates</li>
          <li className="border-bottom p-2">Secure messaging</li>
          <li className="border-bottom p-2">Personalized insights</li>
        </ul>
        <div className="d-flex justify-content-center mb-3">
          <button className="btns book-demo-sign" onClick={HandleSignUp}>Sign Up</button>
        </div>
      </div>
    </div>

    <div className="col-md-4 mb-3">
      <div className="pricing-card card-height">
        <div className="coming-soon-badge">Coming Soon</div>
        <div className="pricing-header text-white" style={{ backgroundColor: '#94a3b8' }}>
          <h3 className="text-center">Premium</h3>
          <p className="text-center">$19.99/month</p>
          <div className="pricing-top-features border-top border-bottom mb-3 text-center" style={{ backgroundColor: '#94a3b0', borderColor: '#94a3b0' }}>
            Top features include
          </div>
        </div>
        <ul className="tick-list">
          <li className="border-bottom p-2">Real-time updates</li>
          <li className="border-bottom p-2">Secure messaging</li>
          <li className="border-bottom p-2">Personalized insights</li>
        </ul>
        <div className="d-flex justify-content-center mb-3">
          <button className="btns book-demo-btn" onClick={handleDemo}>Book A Demo</button>
        </div>
      </div>
    </div>

    <div className="col-md-4 mb-3">
      <div className="pricing-card card-height">
        <div className="coming-soon-badge">Coming Soon</div>
        <div className="pricing-header text-white" style={{ backgroundColor: '#ffb850' }}>
          <h3 className="text-center">Enterprise</h3>
          <p className="text-center">$19.99/month</p>
          <div className="pricing-top-features border-top border-bottom mb-3 text-center" style={{ backgroundColor: '#ffb254', borderColor: '#ffb850' }}>
            Top features include
          </div>
        </div>
        <ul className="tick-list">
          <li className="border-bottom p-2">Real-time updates</li>
          <li className="border-bottom p-2">Secure messaging</li>
          <li className="border-bottom p-2">Personalized insights</li>
        </ul>
        <div className="d-flex justify-content-center mb-3">
          <button className="btns book-demo-btn-second" onClick={()=> alert('coming soon')}>Book A Demo</button>
        </div>
      </div>
    </div>
  </div>
</section>


        {/* <section className='mb-3 py-lg-3 '>
            <div className='row'>

<div className='col-md-6 py-lg-5 align-items-center flex-column'>
<h3>Get started with CareConnect</h3>
<div>
<p>
The comprehensive childcare management platform that 
connects everyone so you can spend less time on
 administrative tasks and more time with each child
</p>
</div>
<div>
    <button className='btns book-demo-get'>Book A Demo</button>
</div>


</div>
<div className='col-md-6'>
<img src={Get} alt='' className='get-started' />
</div>
            </div>
        </section> */}
<footer className="footer">
  <div className="container text-center text-white">
    <p>&copy; 2024 CareConnect. All rights reserved.</p>
  </div>
</footer>    
        </div>
        </div>
      
    );
}
    
