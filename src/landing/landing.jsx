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
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineCancel } from "react-icons/md";
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
export const LandingPage = () => {
    const [active, setActive] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
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
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const toggleMenu = () => {
     setMenuOpen(prevState => !prevState);
      console.log('Menu is open:', menuOpen);
    };
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 0);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return (
        <div className='child'>

<header className={`flex justify-between items-center fixed top-0 p-4 z-10  w-full ${scrolled? 'bg-gray-700 ':''}`}>
<a className="text-2xl font-bold p-2" href="#">
          <span className="text-yellow-500">𝓒𝓪𝓻𝓮</span>
          <span className="text-blue-700">𝓬𝓸𝓷𝓷𝓮𝓬𝓽</span>
        </a>
        <nav className="flex items-center z-10">
            <button 
                className="block lg:hidden bg-transparent border-none cursor-pointer z-30" 
                onClick={toggleMenu}
            >
                {menuOpen ? (
                    <MdOutlineCancel className="text-white text-2xl" />
                ) : (
                    <RxHamburgerMenu className="text-white text-2xl" />
                )}
            </button>
    
            <ul 
                className={`flex-col lg:flex-row items-center m-2 p-2 transition-all duration-300 
                    ${menuOpen ? 'flex absolute top-0 left-0 w-full bg-[#457AD4] p-4 flex-col items-center z-20' : 'hidden lg:flex'} 
                    lg:static lg:bg-transparent`}
            >
                <li className={`${menuOpen? 'mb-2':''}`}>
                    <a href="#stack" className="text-white text-base font-semibold px-8 py-2 transition-colors duration-200 hover:text-gray-300">Home</a>
                </li>
                <li className={`${menuOpen? 'mb-2':''}`}>
                    <a href="#projects" className="text-white text-base font-semibold px-8 py-2 transition-colors duration-200 hover:text-gray-300">Features</a>
                </li>
                <li className={`${menuOpen? 'mb-3':''}`}>
                    <a href="#about" className="text-white text-base font-semibold px-8 py-2 transition-colors duration-200 hover:text-gray-300">Testimonials</a>
                </li>
                <li className={`${menuOpen? 'mb-3':''}`}>
                    <a href="#contact" className="text-white text-base font-semibold px-8 py-2 transition-colors duration-200 hover:text-gray-300">Pricing</a>
                </li>
                <li className={`${menuOpen? 'mb-3':''}`}>
                    <a 
                     onClick={HandleLogin}
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-white text-base font-semibold px-8 py-2 border-2 border-[#5494FF] transition-colors duration-200 hover:bg-[#5494FF] hover:text-white"
                    >
                       Sign In
                    </a>
                </li>
            </ul>
        </nav>
    </header>
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



<section id="testimonials" className="mb-4 py-3 bg-gray-800">
  <h2 className="text-center mb-3 text-white text-3xl font-semibold">Testimonials</h2>
  <div className="flex flex-wrap justify-center">
    <div className="w-full md:w-1/3 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <img src={c1} alt="stories1" className="w-full h-48 object-cover rounded-t-lg" />
        <div className="testimonial-body mt-4">
          <blockquote>
            <p className="text-gray-700">
              CareConnect has been a game-changer for our family. We can finally stay connected with our child's caregivers and receive updates in real-time.
            </p>
            <cite className="block mt-2 text-gray-500">— Sarah P., Happy Parent</cite>
          </blockquote>
        </div>
      </div>
    </div>
    <div className="w-full md:w-1/3 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <img src={c2} alt="stories2" className="w-full h-48 object-cover rounded-t-lg" />
        <div className="testimonial-body mt-4">
          <blockquote>
            <p className="text-gray-700">
              CareConnect has streamlined our communication with parents and made it easier to provide high-quality care for our children.
            </p>
            <cite className="block mt-2 text-gray-500">— John D., Caregiver</cite>
          </blockquote>
        </div>
      </div>
    </div>
    <div className="w-full md:w-1/3 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <img src={c3} alt="stories3" className="w-full h-48 object-cover rounded-t-lg" />
        <div className="testimonial-body mt-4">
          <blockquote>
            <p className="text-gray-700">
              CareConnect has streamlined our communication with parents and made it easier to provide high-quality care for our children.
            </p>
            <cite className="block mt-2 text-gray-500">— John D., Caregiver</cite>
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
    
