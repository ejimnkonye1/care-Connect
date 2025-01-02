/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */

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
import ba from '../images/ba.png'
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
        <div className='chil'>

<header className={`flex justify-between items-center fixed top-0 p-4 z-10  w-full ${scrolled? 'bg-gray-700 ':'bg-white'}`}>
<a className="text-2xl font-bold p-2" href="#">
          <span className="text-yellow-500">𝓒𝓪𝓻𝓮</span>
          <span className="text-[#00adef]">𝓬𝓸𝓷𝓷𝓮𝓬𝓽</span>
        </a>
        <nav className="flex items-center z-10 text-black">
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
                    <a href="#stack" className="text-black text-base font-semibold px-8 py-2 transition-colors duration-200 hover:text-gray-300">Home</a>
                </li>
                <li className={`${menuOpen? 'mb-2':''} `} >
                    <a href="#projects" className=" text-base font-semibold px-8 py-2 transition-colors duration-200 hover:text-gray-300">Features</a>
                </li>
                <li className={`${menuOpen? 'mb-3':''}`}>
                    <a href="#about" className=" text-base font-semibold px-8 py-2 transition-colors duration-200 hover:text-gray-300">Testimonials</a>
                </li>
                <li className={`${menuOpen? 'mb-3':''}`}>
                    <a href="#contact" className="text-base font-semibold px-8 py-2 transition-colors duration-200 hover:text-gray-300">Pricing</a>
                </li>
                <li className={`${menuOpen? 'mb-3':''}`}>
                    <a 
                     onClick={HandleLogin}
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-white text-base font-semibold px-8 py-2 rounded-full transition-colors duration-200 hover:bg-[#5494FF] bg-[#00adef] hover:text-white"
                    >
                       Sign In
                    </a>
                </li>
            </ul>
        </nav>
    </header>





<div
      className="h-auto p-8 text-center bg-cover bg-center bg-no-repeat text-white mt-12"
      style={{
        backgroundImage:  ` url(${ba})`,
      }}
    >

  <div className="left side lg:w-[35%] w-full flex-col items-start   h-full py-5">
    <div className="w-full">
    
<div className='title relative '>
<h6 className='text-[4.9rem] font-[800] font-sans relative text-start'>
  <span className='text-[#943885]'>happy</span> 
  {/* <span className='text-[#a5cc44] inline-block -mt-[400px]'>happens</span> <br />
  <span className='text-[#f7b45d]'>here.</span> */}

</h6>
<h6 className='text-[4.9rem] font-[800] font-sans relative  top-[-30px] text-start'>
<span className='text-[#a5cc44] inline-block -mt-10'>happens</span></h6>
<h6 className='text-[4.9rem] font-[800] font-sans relative  text-start  top-[-50px]'> <span className='text-[#f7b45d]'>here.</span></h6>
</div>
<div className='relative text-start top-[-40px] '>
<p className="text-black mt-2 text-[1.5rem] ">
      From <span className='text-[#00adef]'>infancy to preschool,</span> 
      </p>
      <p className="text-black mt-1 text-[1.5rem]">
        we make early education and daycare joyful, engaging, and fun so children are happy to <span className='text-[#00adef]'>learn</span>,<span className='text-[#a5cc55]'> play</span>, and <span className='text-[#943885] font-bold'>grow.</span>
      </p>
</div>
   
      {/* <button className="btn btn-primary mt-4" onClick={HandleLogin}>
        Get Started
      </button> */}
    </div>
  </div>
</div>


  <div className="container">
        


          
  <section id="Our mission" className="mb-4 py-3 ">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div className="col-span-2 flex flex-col justify-center">
    <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
    <p className="text-lg">
      Our mission is to provide exceptional service and quality products that enhance the lives of our customers.
    </p>
  </div>
  <div className="col-span-1">
    <img src="your-image-url.jpg" alt="Mission Image" className="w-full h-auto object-cover" />
  </div>
</div>

</section>

<section id="testimonials" className="mb-4 py-3 ">
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



<section id="features" className="mb-4 py-3 ">
  <h5 className="text-center mb-3 text-white text-2xl font-semibold">Top Features</h5>
  <div className="flex flex-wrap justify-center">
    <div className="w-1/2 md:w-1/6 p-4">
      <div className="bg-white rounded-lg shadow-lg p-4 text-center feat-card">
        <img src={feat1} alt="Childcare attendance" className="feat-img mx-auto mb-2" />
        <p className="text-gray-700">Childcare attendance</p>
      </div>
    </div>
    <div className="w-1/2 md:w-1/6 p-4">
      <div className="bg-white rounded-lg shadow-lg p-4 text-center feat-card">
        <img src={feat2} alt="Parent communication" className="feat-img mx-auto mb-2" />
        <p className="text-gray-700">Parent communication</p>
      </div>
    </div>
    <div className="w-1/2 md:w-1/6 p-4">
      <div className="bg-white rounded-lg shadow-lg p-4 text-center feat-card">
        <img src={feat3} alt="Classroom Updates" className="feat-img mx-auto mb-2" />
        <p className="text-gray-700">Classroom Updates</p>
      </div>
    </div>
    <div className="w-1/2 md:w-1/6 p-4">
      <div className="bg-white rounded-lg shadow-lg p-4 text-center feat-card">
        <img src={feat4} alt="Analytics and reports" className="feat-img mx-auto mb-2" />
        <p className="text-gray-700">Analytics and reports</p>
      </div>
    </div>
    <div className="w-1/2 md:w-1/6 p-4">
      <div className="bg-white rounded-lg shadow-lg p-4 text-center feat-card">
        <img src={feat5} alt="Communication filters" className="feat-img mx-auto mb-2" />
        <p className="text-gray-700">Communication filters</p>
      </div>
    </div>
    <div className="w-1/2 md:w-1/6 p-4">
      <div className="bg-white rounded-lg shadow-lg p-4 text-center feat-card">
        <img src={feat6} alt="Admin management" className="feat-img mx-auto mb-2" />
        <p className="text-gray-700">Admin management</p>
      </div>
    </div>
  </div>
</section>

<section id="pricing" className="mb-3 py-3 bg-gray-800">
  <h2 className="text-center mb-3 text-white text-3xl font-semibold">Pricing</h2>
  <div className="flex flex-wrap justify-center">
    {/* Basic Plan */}
    <div className="w-full md:w-1/3 mb-3">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="bg-blue-600 text-white p-4 rounded-t-lg">
          <h3 className="text-center text-xl">Basic</h3>
          <p className="text-center text-lg">$0.00/month</p>
          <div className="border-t border-b border-yellow-400 bg-blue-500 text-center py-2 mb-3">
            Top features include
          </div>
        </div>
        <ul className="list-disc list-inside p-4">
          <li className="border-b p-2">Real-time updates</li>
          <li className="border-b p-2">Secure messaging</li>
          <li className="border-b p-2">Personalized insights</li>
        </ul>
        <div className="flex justify-center mb-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={HandleSignUp}>Sign Up</button>
        </div>
      </div>
    </div>

    {/* Premium Plan */}
    <div className="w-full md:w-1/3 mb-3">
      <div className="bg-white rounded-lg shadow-lg p-4 relative">
        <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 text-xs rounded-bl">Coming Soon</div>
        <div className="bg-gray-400 text-white p-4 rounded-t-lg">
          <h3 className="text-center text-xl">Premium</h3>
          <p className="text-center text-lg">$19.99/month</p>
          <div className="border-t border-b border-gray-400 bg-gray-300 text-center py-2 mb-3">
            Top features include
          </div>
        </div>
        <ul className="list-disc list-inside p-4">
          <li className="border-b p-2">Real-time updates</li>
          <li className="border-b p-2">Secure messaging</li>
          <li className="border-b p-2">Personalized insights</li>
        </ul>
        <div className="flex justify-center mb-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleDemo}>Book A Demo</button>
        </div>
      </div>
    </div>

    {/* Enterprise Plan */}
    <div className="w-full md:w-1/3 mb-3">
      <div className="bg-white rounded-lg shadow-lg p-4 relative">
        <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 text-xs rounded-bl">Coming Soon</div>
        <div className="bg-yellow-400 text-white p-4 rounded-t-lg">
          <h3 className="text-center text-xl">Enterprise</h3>
          <p className="text-center text-lg">$19.99/month</p>
          <div className="border-t border-b border-yellow-500 bg-yellow-300 text-center py-2 mb-3">
            Top features include
          </div>
        </div>
        <ul className="list-disc list-inside p-4">
          <li className="border-b p-2">Real-time updates</li>
          <li className="border-b p-2">Secure messaging</li>
          <li className="border-b p-2">Personalized insights</li>
        </ul>
        <div className="flex justify-center mb-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => alert('coming soon')}>Book A Demo</button>
        </div>
      </div>
    </div>
  </div>
</section>

     
<footer className="footer">
  <div className="container text-center text-white">
    <p>&copy; 2025 CareConnect. All rights reserved.</p>
  </div>
</footer>    
        </div>
        </div>
      
    );
}
    
