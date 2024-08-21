/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
import '../css/light.css'
import 'animate.css';
import { useState } from 'react';
import { AiOutlineDashboard } from "react-icons/ai";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { Dash } from './dash';
import { Profilenn } from './profile';

import MessagingSystem from './mes';
import FeesList from './fee';

import EventCalendar from './eventcal';
import { Medical } from './medical';
import MealUpdatesTable from './meal';
import { LuActivitySquare } from "react-icons/lu";
import { TbTimelineEventMinus } from "react-icons/tb";
import { MdNoMeals } from "react-icons/md";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { IoChatbubbles } from "react-icons/io5";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import {setMode} from '../action'
export const Dashboard = ({showToast, setShowToast}) => {
  const [currenpage, setcurrentpage] = useState('dashboard')
 
  const dispatch = useDispatch();

  const darkmode = useSelector((state)=> state.darkMode)
 



 const toggledark = () => {
   dispatch(setMode(!darkmode))
 }

 

  const handlechange = (page) => {
    setcurrentpage(page)
  }

    return(
      
      <div className={`wrapper ${darkmode ? 'dark-mode border-bottom': ''}`}  >


   <div className={`sidebar ${darkmode ? 'dark-mode' :''}`} >
   <div className="sidebar-wrapper  border-right">
  <div className="logo p-3 d-flex justify-content-center">
    <a href="#" className="simple-text">
      CareConnect
    </a>
  </div>
  <ul className="nav flex-column">
    <li className={`nav-item ${currenpage === 'dashboard' && 'active'}`}>
    <span  className='nav-link' onClick={() => handlechange('dashboard')}>
            <AiOutlineDashboard className='icon' />
            <span>Dashboard</span>
          </span>
    </li>
       <li className={`nav-item ${currenpage === 'user' && 'active'}`}>

    <span  className='nav-link' onClick={() => handlechange('user')}>
            <HiOutlineUserCircle className='icon' />
            <span>User Profile</span>
          </span>
    </li>
    <li className={`nav-item ${currenpage === 'report' && 'active'}`}>

    <span  className='nav-link' onClick={() => handlechange('report')}>
       
        <LuActivitySquare className='icon' />
        <span>Reports</span>
        </span>
      
    </li>
    <li className={`nav-item ${currenpage === 'event' && 'active'}`}>

    <span className='nav-link' onClick={() => handlechange('event')}>
       
        <TbTimelineEventMinus className='icon' />
        <span>Events</span>
        </span>
    </li>
    <li className={`nav-item ${currenpage === 'meal' && 'active'}`}>

    <span className='nav-link' onClick={() => handlechange('meal')}>
     
        <MdNoMeals  className='icon'/>

        <span>Meals Updates</span>
        </span>
    </li>
    <li className={`nav-item ${currenpage === 'fees' && 'active'}`}>

    <span className='nav-link' onClick={() => handlechange('fees')}>
        
        <FaMoneyCheckAlt className='icon' />
        <span>Fees</span>
        </span>
    </li>
    <li className={`nav-item ${currenpage === 'nofiication' && 'active'}`}>

    <span className='nav-link' onClick={() => handlechange('notification')}>
       
        <IoChatbubbles className='icon'/>
        <span>Messaging</span>
        </span>
    </li>
    <li className="nav-item active-pro mt-5">
      <a className="nav-link" {...() => onclick(alert('coming soon'))}>
        <AiOutlineDashboard className='icon' />
        <span>Upgrade to PRO</span>
      </a>
    </li>
  </ul>
</div>
    </div>
<div className="main-panel  ">
<nav className={`navbar navbar-expand-lg navbar-light  border-bottom ${darkmode? 'dark-mode':'bg-white'}`}>
  <div className="container-fluid">
  <div className={`navbar-toggler ${darkmode? 'navbar-toggler-color':''}`} type="" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
      <span className="navbar-toggler-icon "></span>
    </div>
    <a className={`navbar-brand  ${darkmode? "color-mode": ''}`} href="#" >CareConnect</a>
  
    <div className='switch ms-auto d-lg-none'>
  <ul className='nav navbar-nav me-auto mb-2 mb-lg-0'>
    <li className="nav-item">
      <a className={`nav-link ${darkmode ? 'color-mode' : ''}`} href="#" onClick={toggledark}>
        <span className="icon-circle">
          {darkmode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
        </span>
      </a>
    </li>
  </ul>
</div>
<div className="offcanvas offcanvas-end"  tabIndex={'-1'} id="offcanvasNavbar"
 aria-labelledby="offcanvasNavbarLabel" data-bs-scroll="true">
    <div className="offcanvas-header text-center border-bottom">
<div className='d-flex justify-content-center text-center text-align-center'>
<h5 className="offcanvas-title" id="offcanvasNavbarLabel">CareConnect</h5>
  </div>
      {/* <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button> */}
    </div>
    <div className="offcanvas-body">
    <ul className="nav flex-column">
    <li className={`nav-item ${currenpage === 'dashboard' && 'active'}`}>
    <span  className='nav-link' onClick={() => handlechange('dashboard')}>
            <AiOutlineDashboard className='icon' />
            <span>Dashboard</span>
          </span>
    </li>
       <li className={`nav-item ${currenpage === 'user' && 'active'}`}>

    <span  className='nav-link' onClick={() => handlechange('user')}>
            <HiOutlineUserCircle className='icon' />
            <span>User Profile</span>
          </span>
    </li>
    <li className={`nav-item ${currenpage === 'report' && 'active'}`}>

    <span  className='nav-link' onClick={() => handlechange('report')}>
       
        <LuActivitySquare className='icon' />
        <span>Reports</span>
        </span>
      
    </li>
    <li className={`nav-item ${currenpage === 'event' && 'active'}`}>

    <span className='nav-link' onClick={() => handlechange('event')}>
       
        <TbTimelineEventMinus className='icon' />
        <span>Events</span>
        </span>
    </li>
    <li className={`nav-item ${currenpage === 'meal' && 'active'}`}>

    <span className='nav-link' onClick={() => handlechange('meal')}>
     
        <MdNoMeals  className='icon'/>

        <span>Meals Updates</span>
        </span>
    </li>
    <li className={`nav-item ${currenpage === 'fees' && 'active'}`}>

    <span className='nav-link' onClick={() => handlechange('fees')}>
        
        <FaMoneyCheckAlt className='icon' />
        <span>Fees</span>
        </span>
    </li>
    <li className={`nav-item ${currenpage === 'nofiication' && 'active'}`}>

    <span className='nav-link' onClick={() => handlechange('notification')}>
       
        <IoChatbubbles className='icon'/>
        <span>Messaging</span>
        </span>
    </li>
    <li className="nav-item active-pro mt-5">
      <a className="nav-link" {...() => onclick(alert('coming soon'))}>
        <AiOutlineDashboard className='icon' />
        <span>Upgrade to PRO</span>
      </a>
    </li>
  </ul>
  <div className='top'>

  </div>
  
</div>
  </div>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className='nav navbar-nav me-auto mb-2 mb-lg-0 '>
      <li className="nav-item">
  <a className={`nav-link ${darkmode ? 'color-mode': ''}`} href="#" onClick={toggledark}>
  <span className="icon-circle">
          {darkmode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
        </span>
  </a>
</li>
      </ul>
      <ul className="nav navbar-nav ms-auto mb-2 mb-lg-0">
        <li className='nav-item'  style={{cursor:'pointer'}}>
          <a className={`nav-link ${darkmode? 'color-mode': ''}`} 
          
          onClick={() => handlechange('user')} >Account</a>
        </li>
        <li className="nav-item">
          <a className={`nav-link ${darkmode? 'color-mode': ''}`} href="#">Log out</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
<div className={`content billie mb-1 ${darkmode ? "dark-mode" : ""}`}>
      {currenpage === 'dashboard' && <Dash showToast={showToast} setShowToast={setShowToast} />}
      {currenpage === 'user' && <Profilenn />}
      {currenpage === 'report' && <Medical />}
      {currenpage === 'notification' && <MessagingSystem />}
      {currenpage === 'fees' && <FeesList />}
      {currenpage === 'meal' && <MealUpdatesTable />}
      {currenpage === 'event' && <EventCalendar/>}
        </div>


        {/* <footer className="foote fixed-foot">
            <div className="container-fluid ">
                <p className=" text-center">
                    &copy; <a href="">Careconnect</a>, made with love for a better web
                </p>
            </div>
        </footer> */}
</div>


        
</div>
       
      
  

    )
}