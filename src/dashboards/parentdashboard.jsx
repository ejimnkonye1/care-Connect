/* eslint-disable no-mixed-spaces-and-tabs */
import '../css/light.css'
import 'animate.css';
import { AiOutlineDashboard } from "react-icons/ai";
import { HiOutlineUserCircle } from "react-icons/hi2";
export const Dashboard = () => {
    return(
        <div className="wrapper">
   <div className="sidebar" data-color="purple" data-image="assets/img/sidebar-5.jpg">
      <div className="sidebar-wrapper">
        <div className="logo">
          <a href="http://www.creative-tim.com" className="simple-text">
            Creative Tim
          </a>
        </div>
        <ul className="nav">
          <li className="active">
            <a href="dashboard.html">
            <AiOutlineDashboard className='icon' />
              <p>Dashboard</p>
            </a>
          </li>
          <li>
            <a href="user.html">
           
              <HiOutlineUserCircle className='icon'  />

              <p>User Profile</p>
            </a>
          </li>
          <li>
            <a href="table.html">
              
              <AiOutlineDashboard className='icon' />
              
              <p>Table List</p>
            </a>
          </li>
          <li>
            <a href="typography.html">
            <AiOutlineDashboard className='icon' />
              <p>Typography</p>
            </a>
          </li>
          <li>
            <a href="icons.html">
            <AiOutlineDashboard className='icon' />
              <p>Iconsssssss</p>
            </a>
          </li>
          <li>
            <a href="maps.html">
            <AiOutlineDashboard className='icon' />
              <p>Maps</p>
            </a>
          </li>
          <li>
            <a href="notifications.html">
            <AiOutlineDashboard className='icon' />
              <p>Notifications</p>
            </a>
          </li>
          <li className="active-pro">
            <a href="upgrade.html">
            <AiOutlineDashboard className='icon' />
              <p>Upgrade to PRO</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
<div className="main-panel">

{/* <nav className="navbar navbar-default navbar-fixed">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navigation-example-2">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <a className="navbar-brand" href="#">Dashboard</a>
        </div>
        <div className="collapse navbar-collapse">
          <ul className="nav navbar-nav navbar-left">
            <li>
              <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                <i className="fa fa-dashboard" />
                <p className="hidden-lg hidden-md">Dashboard</p>
              </a>
            </li>
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                <i className="fa fa-globe" />
                <b className="caret hidden-lg hidden-md" />
                <p className="hidden-lgp hidden-md">
                  5 Notifications
                  <b className="caret" />
                </p>
              </a>
              <ul className="dropdown-menu">
                <li><a href="#">Notification 1</a></li>
                <li><a href="#">Notification 2</a></li>
                <li><a href="#">Notification 3</a></li>
                <li><a href="#">Notification 4</a></li>
                <li><a href="#">Another notification</a></li>
              </ul>
            </li>
            <li>
              <a href="">
                <i className="fa fa-search" />
                <p className="hidden-lg hidden-md">Search</p>
              </a>
            </li>
          </ul>

          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="">
                <p>Account</p>
              </a>
            </li>
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                <p>
                  Dropdown
                  <b className="caret" />
                </p>
              </a>
              <ul className="dropdown-menu">
                <li><a href="#">Action</a></li>
                <li><a href="#">Another action</a></li>
                <li><a href="#">Something</a></li>
                <li><a href="#">Another action</a></li>
                <li><a href="#">Something</a></li>
                <li className="divider" />
                <li><a href="#">Separated link</a></li>
              </ul>
            </li>
            <li>
              <a href="#">
                <p>Log out</p>
              </a>
            </li>
            <li className="separator hidden-lg" />
          </ul>
        </div>
      </div>
    </nav> */}
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Dashboard</a>
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
</nav>

    <div className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card">

                            <div className="header">
                                <h4 className="title">Email Statistics</h4>
                                <p className="category">Last Campaign Performance</p>
                            </div>
                            <div className="content">
                                <div id="chartPreferences" className="ct-chart ct-perfect-fourth"></div>

                                <div className="footer">
                                    <div className="legend">
                                        <i className="fa fa-circle text-info"></i> Open
                                        <i className="fa fa-circle text-danger"></i> Bounce
                                        <i className="fa fa-circle text-warning"></i> Unsubscribe
                                    </div>
                                    <hr />
                                    <div className="stats">
                                        <i className="fa fa-clock-o"></i> Campaign sent 2 days ago
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-8">
                        <div className="card">
                            <div className="header">
                                <h4 className="title">Users Behavior</h4>
                                <p className="category">24 Hours performance</p>
                            </div>
                            <div className="content">
                                <div id="chartHours" className="ct-chart"></div>
                                <div className="footer">
                                    <div className="legend">
                                        <i className="fa fa-circle text-info"></i> Open
                                        <i className="fa fa-circle text-danger"></i> Click
                                        <i className="fa fa-circle text-warning"></i> Click Second Time
                                    </div>
                                    <hr />
                                    <div className="stats">
                                        <i className="fa fa-history"></i> Updated 3 minutes ago
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                <div className="row">
                    <div className="col-md-6">
                        <div className="card ">
                            <div className="header">
                                <h4 className="title">2014 Sales</h4>
                                <p className="category">All products including Taxes</p>
                            </div>
                            <div className="content">
                                <div id="chartActivity" className="ct-chart"></div>

                                <div className="footer">
                                    <div className="legend">
                                        <i className="fa fa-circle text-info"></i> Tesla Model S
                                        <i className="fa fa-circle text-danger"></i> BMW 5 Series
                                    </div>
                                    <hr />
                                    <div className="stats">
                                        <i className="fa fa-check"></i> Data information certified
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card ">
                            <div className="header">
                                <h4 className="title">Tasks</h4>
                                <p className="category">Backend development</p>
                            </div>
                            <div className="content">
                                <div className="table-full-width">
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <td>
													<div className="checkbox"> 
						  							  	<input id="checkbox1" type="checkbox" />
						  							  	<label htmlFor="checkbox1"></label>
					  						  		</div>
                                                </td>
                                                <td>Sign contract for What are conference organizers afraid of ? </td>
                                                <td className="td-actions text-right">
                                                    <button type="button" rel="tooltip" title="Edit Task" className="btn btn-info btn-simple btn-xs">
                                                        <i className="fa fa-edit"></i>
                                                    </button>
                                                    <button type="button" rel="tooltip" title="Remove" className="btn btn-danger btn-simple btn-xs">
                                                        <i className="fa fa-times"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
													<div className="checkbox">
						  							  	<input id="checkbox2" type="checkbox" checked />
										  						  		</div>
	  							  	<label htmlFor="checkbox2"></label>
                                                        
                                                </td>
                                                <td>Lines From Great Russian Literature? Or E-mails From My Boss?</td>
                                                <td className="td-actions text-right">
                                                    <button type="button" rel="tooltip" title="Edit Task" className="btn btn-info btn-simple btn-xs">
                                                        <i className="fa fa-edit"></i>
                                                    </button>
                                                    <button type="button" rel="tooltip" title="Remove" className="btn btn-danger btn-simple btn-xs">
                                                        <i className="fa fa-times"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
													<div className="checkbox">
						  							  	<input id="checkbox3" type="checkbox" />
						  							  	<label htmlFor="checkbox3"></label>
					  						  		</div>
                                                </td>
                                                <td>Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit
												</td>
                                                <td className="td-actions text-right">
                                                    <button type="button" rel="tooltip" title="Edit Task" className="btn btn-info btn-simple btn-xs">
                                                        <i className="fa fa-edit"></i>
                                                    </button>
                                                    <button type="button" rel="tooltip" title="Remove" className="btn btn-danger btn-simple btn-xs">
                                                        <i className="fa fa-times"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
													<div className="checkbox">
						  							  	<input id="checkbox4" type="checkbox" checked />
					  	<label htmlFor="checkbox4"></label>
					  						  		</div>
                                                </td>
                                                <td>Create 4 Invisible User Experiences you Never Knew About</td>
                                                <td className="td-actions text-right">
                                                    <button type="button" rel="tooltip" title="Edit Task" className="btn btn-info btn-simple btn-xs">
                                                        <i className="fa fa-edit"></i>
                                                    </button>
                                                    <button type="button" rel="tooltip" title="Remove" className="btn btn-danger btn-simple btn-xs">
                                                        <i className="fa fa-times"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
													<div className="checkbox">
						  							  	<input id="checkbox5" type="checkbox" />
						  							  	<label htmlFor="checkbox5"></label>
					  						  		</div>
                                                </td>
                                                <td>Read Following makes Medium better</td>
                                                <td className="td-actions text-right">
                                                    <button type="button" rel="tooltip" title="Edit Task" className="btn btn-info btn-simple btn-xs">
                                                        <i className="fa fa-edit"></i>
                                                    </button>
                                                    <button type="button" rel="tooltip" title="Remove" className="btn btn-danger btn-simple btn-xs">
                                                        <i className="fa fa-times"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
													<div className="checkbox">
						  							  	<input id="checkbox6" type="checkbox" checked />
						  							  	<label htmlFor="checkbox6"></label>
					  						  		</div>
                                                </td>
                                                <td>Unfollow 5 enemies from twitter</td>
                                                <td className="td-actions text-right">
                                                    <button type="button" rel="tooltip" title="Edit Task" className="btn btn-info btn-simple btn-xs">
                                                        <i className="fa fa-edit"></i>
                                                    </button>
                                                    <button type="button" rel="tooltip" title="Remove" className="btn btn-danger btn-simple btn-xs">
                                                        <i className="fa fa-times"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="footer">
                                    <hr />
                                    <div className="stats">
                                        <i className="fa fa-history"></i> Updated 3 minutes ago
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <footer className="footer">
            <div className="container-fluid">
                <nav className="pull-left">
                    <ul>
                        <li>
                            <a href="#">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                Company
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                Portfolio
                            </a>
                        </li>
                        <li>
                            <a href="#">
                               Blog
                            </a>
                        </li>
                    </ul>
                </nav>
                <p className="copyright pull-right">
                    &copy; <a href="http://www.creative-tim.com">Creative Tim</a>, made with love for a better web
                </p>
            </div>
        </footer>
</div>
  
</div>
    )
}