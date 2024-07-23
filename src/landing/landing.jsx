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
import { useState } from 'react'
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
    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-bra" href="#">CareConnect</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse d flex justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#features">Features</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#testimonials">Testimonials</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#pricing">Pricing</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#contact">Contact</a>
                        </li>
                    </ul>
                </div>
            </nav>


            <div className="hero">
                <h1>CareConnect</h1>
                <p>Connecting Caregivers and Families</p>
                <button className="btn btn-primary">Get Started</button>
            </div>

<section className='py-5 mb-3'>
<h5 className='text-center mb-3'>Careconnect is packed with all the features you need</h5>
             
<div className='row'>
      {features.map((feature, index) => (
        <div className='col-md-4 mb-4' key={index}>
          <div
            className={`feat-border ${active === index? 'clicked' : ''}`}
            onClick={() => handlefeatures(index)}
          >
            <p className='text-center mt-2'>{feature.name}</p>
          </div>
        </div>
      ))}
    </div>
</section>


            <section id="testimonials" className='mb-4 py-3'>
                <h2 className='text-center mb-3'>Testimonials</h2>
                <div className='row'>
                    <div className='col-md-4'>
                        <div className='card'>
                            <img src={img1} alt='stories1' />
                            <div className='card-body'>
                            <blockquote>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <p>CareConnect has been a game-changer for our family. We can finally stay connected with our child's caregivers and receive updates in real-time.</p>
                    <cite className='d-flex justify-content-end'>— Sarah P., Happy Parent</cite>
                </blockquote>
                            </div>

                        </div>
                  
                    </div>
                    <div className='col-md-4'>
                        <div className='card'>
                            <img src={img2} alt='stories2' />
                        <div className='card-body'>
                        <blockquote>

                    <p>CareConnect has streamlined our communication with parents and made it easier to provide high-quality care for our children.</p>
                    <cite className='d-flex justify-content-end'>— John D., Caregiver</cite>
                </blockquote>
                            </div>  
                        </div>
                  
                 </div>
                 <div className='col-md-4'>
                        <div className='card'>
                            <img src={img3} alt='stories3' />
                        <div className='card-body'>
                        <blockquote>

                    <p>CareConnect has streamlined our communication with parents and made it easier to provide high-quality care for our children.</p>
                    <cite className='d-flex justify-content-end'>— John D., Caregiver</cite>
                </blockquote>
                            </div>  
                        </div>
                  
                 </div>
                </div>
             
               
               
            </section>



            <section id="features" className='mb-4 py-3'>
                <h5 className='text-center mb-3'>Top features</h5>
             <div className='row'>
                <div className='col-md-2'>
                    <div className='card feat-card'>
                        <img src={feat1} className='feat-img' />
                    </div>
                    <p>Childcare admissions and attendance</p>
                </div>
                <div className='col-md-2'>
                    <div className='card  feat-card'>
                        <img src={feat2} className='feat-img' />
                    </div>
                    <p>Parent engagement / communication</p>
                </div>
                <div className='col-md-2'>
                    <div className='card  feat-card'>
                        <img src={feat3} className='feat-img'/>
                    </div>
                    <p>Classroom views and live ratios</p>
                </div>
                <div className='col-md-2'>
                    <div className='card  feat-card'>
                        <img src={feat4} className='feat-img'/>
                    </div>
                    <p>Analytics and reports</p>
                </div>
                <div className='col-md-2'>
                    <div className='card  feat-card'>
                        <img src={feat5} className='feat-img' />
                    </div>
                    <p>Communication filters</p>
                </div>
                <div className='col-md-2'>
                    <div className='card  feat-card'>
                        <img src={feat6} className='feat-img'/>
                    </div>
                    <p>Center management</p>
                </div>

             </div>
       
                {/* <div className="row">
                    <div className="col-md-4">
                        <i className="fas fa-mobile-alt"></i>
                        <h3>Real-time Updates</h3>
                        <p>Stay connected with caregivers and receive real-time updates about your childs activities.</p>
                    </div>
                    <div className="col-md-4">
                        <i className="fas fa-lock"></i>
                        <h3>Secure Messaging</h3>
                        <p>Communicate securely with caregivers and other parents through our encrypted messaging system.</p>
                    </div>
                    <div className="col-md-4">
                        <i className="fas fa-chart-bar"></i>
                        <h3>Personalized Insights</h3>
                        <p>Gain valuable insights into your child development and receive personalized recommendations from our experts.</p>
                    </div>
                </div> */}
            </section>


            <section id="pricing" className='mb-3 py-3'>
                <h2 className='text-center mb-3'>Pricing</h2>
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <div className='card card-height' >
                            <div className=' text-white' style={{backgroundColor:'#007bff'}}>
                            <h3 className='text-center'>Basic</h3>
                            <p className='text-center'>$0.00/month</p>
                            <div className='border-top border-bottom mb-3 text-center' style={{backgroundColor:'#009bfa', borderColor:'#ffb850'}}>
                            Top features include
                            </div>
                            </div>
                        

                            <ul className='tick-list cancel-list'>
                            <li className='border-bottom p-2'>Real-time updates</li>
                            <li className='border-bottom p-2'>Secure messaging</li>
                            <li className='border-bottom p-2'>Personalized insights</li>
                        </ul>
                        <div className='d-flex justify-content-center mb-3'>
                            <button className='btns book-demo-sign'>Sign Up </button>
                        </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className='card  card-height'>
                        <div className='coming-soon-badge'>Coming Soon</div>
                            <div className='text-white' style={{backgroundColor:'#94a3b8'}}>
                            <h3 className='text-center'>Premium</h3>
                            <p className='text-center'>$19.99/month</p>
                            <div className='border-top border-bottom mb-3 text-center' style={{backgroundColor:'#94a3b0', borderColor:'#94a3b0'}}>
                            Top features include
                            </div>
                            </div>
                      
                        <ul className='tick-list '>
                            <li className='border-bottom p-2'>Real-time updates</li>
                            <li className='border-bottom p-2'>Secure messaging</li>
                            <li className='border-bottom p-2'>Personalized insights</li>
                        </ul>
                        <div className='d-flex justify-content-center mb-3'>
                            <button className='btns book-demo-btn'>Book A Demo</button>
                        </div>
                        </div>
                      
                    </div>

                    <div className="col-md-4 mb-3 ">
                    <div className='card  card-height'>
  <div className='coming-soon-badge'>Coming Soon</div>
  <div className='text-white' style={{backgroundColor:'#ffb850'}}>
    <h3 className='text-center'>Enterprise</h3>
    <p className='text-center'>$19.99/month</p>
    <div className='border-top border-bottom mb-3 text-center' style={{backgroundColor:'#ffb254', borderColor:'#ffb850'}}>
                            Top features include
                            </div>
  </div> 

  <ul className='tick-list '>
                            <li className='border-bottom p-2'>Real-time updates</li>
                            <li className='border-bottom p-2'>Secure messaging</li>
                            <li className='border-bottom p-2'>Personalized insights</li>
                        </ul>
                        <div className='d-flex justify-content-center mb-3'>
                            <button className='btns book-demo-btn-second'>Book A Demo</button>
                        </div>
</div>
                       
                    </div>
                </div>
            </section>

        <section className='mb-3 py-3'>
            <div className='row'>

<div className='col-md-6 py-5 align-items-center flex-column'>
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
        </section>
<footer className="footer">
  <div className="container">
    <p>&copy; 2023 CareConnect. All rights reserved.</p>
  </div>
</footer>    
        </div>
    );
}
    
