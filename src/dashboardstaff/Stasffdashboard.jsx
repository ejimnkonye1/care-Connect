/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
import '../css/light.css'
import 'animate.css';
import { useState } from 'react';
import { AiOutlineDashboard } from "react-icons/ai";
import { HiOutlineUserCircle } from "react-icons/hi2";

import { Staffdash } from './staffdash';
import { Staffpro } from './staffpro';
import { MarkAttendance } from './attendance';
import { StaffMealUpdatesTable } from './Meal';
import { StaffReport } from './report';
import StaffChat from './staffchat';


export const StaffDashboard = ({showToast, setShowToast}) => {
  const [currenpage, setcurrentpage] = useState('dashboard')

  const handlechange = (page) => {
    setcurrentpage(page)
  }
    return(
        <div className="wrapper">
   <div className="sidebar " >
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
        <AiOutlineDashboard className='icon' />
        <span>Attendance</span>
        </span>
      
    </li>
    <li className={`nav-item ${currenpage === 'event' && 'active'}`}>

    <span className='nav-link' onClick={() => handlechange('event')}>
        <AiOutlineDashboard className='icon' />
        <span>Events</span>
        </span>
    </li>
    <li className={`nav-item ${currenpage === 'meal' && 'active'}`}>

    <span className='nav-link' onClick={() => handlechange('meal')}>
        <AiOutlineDashboard className='icon' />
        <span>Meals Updates</span>
        </span>
    </li>
    <li className={`nav-item ${currenpage === 'fees' && 'active'}`}>

    <span className='nav-link' onClick={() => handlechange('fees')}>
        <AiOutlineDashboard className='icon' />
        <span>Fees</span>
        </span>
    </li>
    <li className={`nav-item ${currenpage === 'nofiication' && 'active'}`}>

    <span className='nav-link' onClick={() => handlechange('notification')}>
        <AiOutlineDashboard className='icon' />
        <span>Notifications</span>
        </span>
    </li>
    <li className="nav-item active-pro mt-0">
      <a className="nav-link" {...() => onclick(alert('coming soon'))}>
        <AiOutlineDashboard className='icon' />
        <span>Upgrade to PRO</span>
      </a>
    </li>
  </ul>
</div>
    </div>
<div className="main-panel ">
<nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
  <div className="container-fluid">
    <a className="navbar-brand " href="#">Staff</a>
    <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
    <span className="navbar-toggler-icon"></span>
  </button>
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
    <li className="nav-item dropdown hidden-lgp hidden-md" >
      <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <i className="fa fa-globe hidden-lgp hidden-md icon"></i> Notification
      </a>
      <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
        <li><a className="dropdown-item" href="#">Notification 1</a></li>
        <li><a className="dropdown-item" href="#">Notification 2</a></li>
        <li><a className="dropdown-item" href="#">Notification 3</a></li>
        <li><a className="dropdown-item" href="#">Notification 4</a></li>
        <li><a className="dropdown-item" href="#">Another notification</a></li>
      </ul>
    </li>
    {/* <li className="nav-item">
      <a className="nav-link" href="#">
        <i className="fa fa-search"></i>
      </a>
    </li> */}
  </ul>
  <div className='top'>

  </div>
  <div className="sm-sidebar ">
    <div className="sm-sidebar-wrapper ">
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
        <AiOutlineDashboard className='icon' />
        <span>Table List</span>
        </span>
      
    </li>
    <li className={`nav-item ${currenpage === 'event' && 'active'}`}>

    <span className='nav-link' onClick={() => handlechange('event')}>
        <AiOutlineDashboard className='icon' />
        <span>Events</span>
        </span>
    </li>
    <li className={`nav-item ${currenpage === 'meal' && 'active'}`}>

    <span className='nav-link' onClick={() => handlechange('meal')}>
        <AiOutlineDashboard className='icon' />
        <span>Meals Updates</span>
        </span>
    </li>
    <li className={`nav-item ${currenpage === 'fees' && 'active'}`}>

    <span className='nav-link' onClick={() => handlechange('fees')}>
        <AiOutlineDashboard className='icon' />
        <span>Fees</span>
        </span>
    </li>
    <li className={`nav-item ${currenpage === 'nofiication' && 'active'}`}>

    <span className='nav-link' onClick={() => handlechange('notification')}>
        <AiOutlineDashboard className='icon' />
        <span>Notifications</span>
        </span>
    </li>
    <li className="nav-item active-pro mt-0">
      <a className="nav-link" {...() => onclick(alert('coming soon'))}>
        <AiOutlineDashboard className='icon' />
        <span>Upgrade to PRO</span>
      </a>
    </li>
  </ul>
    </div>
  </div>
</div>
  </div>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="nav navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link" href="#">
            <i className="fa fa-dashboard"></i>
          </a>
        </li>
        <li className="nav-item dropdown hidden-lgp hidden-md" >
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="fa fa-globe hidden-lgp hidden-md"></i>
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a className="dropdown-item" href="#">Notification 1</a></li>
            <li><a className="dropdown-item" href="#">Notification 2</a></li>
            <li><a className="dropdown-item" href="#">Notification 3</a></li>
            <li><a className="dropdown-item" href="#">Notification 4</a></li>
            <li><a className="dropdown-item" href="#">Another notification</a></li>
          </ul>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            <i className="fa fa-search"></i>
          </a>
        </li>
      </ul>
      <ul className="nav navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link" href="#">Account</a>
        </li>
        <li className="nav-item dropdown hidden-lgp hidden-md">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><a className="dropdown-item" href="#">Something</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><a className="dropdown-item" href="#">Something</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#">Separated link</a></li>
          </ul>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Log out</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
    <div className="content">
      {currenpage === 'dashboard' &&     <Staffdash/>}
      {currenpage === 'user' && <Staffpro />}
      {currenpage === 'report' && <MarkAttendance showToast={showToast} setShowToast={setShowToast} />}
      
      {currenpage === 'notification' && <StaffChat />}
      {/* {currenpage === 'fees' && <FeesList />}  */}
      {currenpage === 'meal' && <StaffMealUpdatesTable/>}
      {currenpage === 'event' && <StaffReport />}
        </div>


        {/* <footer className="footer last-footer">
            <div className="container-fluid ">
                <p className=" text-center">
                    &copy; <a href="http://www.creative-tim.com">Creative Tim</a>, made with love for a better web
                </p>
            </div>
        </footer> */}
</div>
  
</div>
    )
}
