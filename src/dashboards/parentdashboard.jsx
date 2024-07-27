/* eslint-disable no-mixed-spaces-and-tabs */
import '../css/light.css'
import 'animate.css';
import { useState } from 'react';
import { AiOutlineDashboard } from "react-icons/ai";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { Dash } from './dash';
import { Profilenn } from './profile';
import NotificationSystem from './noti';

export const Dashboard = () => {
  const [currenpage, setcurrentpage] = useState('dashboard')

  const hanlechange = (page) => {
    setcurrentpage(page)
  }
    return(
        <div className="wrapper">
   <div className="sidebar " >
   <div className="sidebar-wrapper  border-right">
  <div className="logo p-3">
    <a href="http://www.creative-tim.com" className="simple-text">
      Creative Tim
    </a>
  </div>
  <ul className="nav flex-column">
    <li className="nav-item active">
    <span onClick={() => hanlechange('dashboard')}>
            <AiOutlineDashboard className='icon' />
            <span>Dashboard</span>
          </span>
    </li>
    <li className="nav-item">
    <span onClick={() => hanlechange('user')}>
            <HiOutlineUserCircle className='icon' />
            <span>User Profile</span>
          </span>
    </li>
    <li className="nav-item">
    <span onClick={() => hanlechange('notification')}>
        <AiOutlineDashboard className='icon' />
        <span>Table List</span>
        </span>
      
    </li>
    <li className="nav-item">
      <a className="nav-link" href="typography.html">
        <AiOutlineDashboard className='icon' />
        <span>Typography</span>
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="icons.html">
        <AiOutlineDashboard className='icon' />
        <span>Iconsssssss</span>
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="maps.html">
        <AiOutlineDashboard className='icon' />
        <span>Maps</span>
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="notifications.html">
        <AiOutlineDashboard className='icon' />
        <span>Notifications</span>
      </a>
    </li>
    <li className="nav-item active-pro">
      <a className="nav-link" href="upgrade.html">
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
    <a className="navbar-brand " href="#">Dashboard</a>
    <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
    <span className="navbar-toggler-icon"></span>
  </button>
<div className="offcanvas offcanvas-end"  tabIndex={'-1'} id="offcanvasNavbar"
 aria-labelledby="offcanvasNavbarLabel" data-bs-scroll="true">
    <div className="offcanvas-header text-center border-bottom">
      <h5 className="offcanvas-title " id="offcanvasNavbarLabel">Sidebar</h5>
      {/* <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button> */}
    </div>
    <div className="offcanvas-body">
  <ul className="nav navbar-nav me-auto mb-2 mb-lg-0 w-100 px-0">
    <li className="nav-item">
      <a className="nav-link" href="#">
        <i className="fa fa-dashboard"></i>Dashboard
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
  <div className="sm-sidebar border-top">
    <div className="sm-sidebar-wrapper">
    <ul className="nav flex-column">
    <li className="nav-item active">
      <a className="nav-link" href="dashboard.html">
        <AiOutlineDashboard className='icon' />
        <span>Dashboard</span>
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="user.html">
        <HiOutlineUserCircle className='icon' />
        <span>User Profile</span>
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="table.html">
        <AiOutlineDashboard className='icon' />
        <span>Table List</span>
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="typography.html">
        <AiOutlineDashboard className='icon' />
        <span>Typography</span>
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="icons.html">
        <AiOutlineDashboard className='icon' />
        <span>Iconsssssss</span>
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="maps.html">
        <AiOutlineDashboard className='icon' />
        <span>Maps</span>
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="notifications.html">
        <AiOutlineDashboard className='icon' />
        <span>Notifications</span>
      </a>
    </li>
    <li className="nav-item active-pro">
      <a className="nav-link" href="upgrade.html">
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
      {currenpage === 'dashboard' && <Dash />}
      {currenpage === 'user' && <Profilenn />}
      {currenpage === 'notification' && <NotificationSystem />}
        </div>


        <footer className="footer">
            <div className="container-fluid ">
                <p className=" text-center">
                    &copy; <a href="http://www.creative-tim.com">Creative Tim</a>, made with love for a better web
                </p>
            </div>
        </footer>
</div>
  
</div>
    )
}