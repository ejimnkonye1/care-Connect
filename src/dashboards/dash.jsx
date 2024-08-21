/* eslint-disable react/prop-types */
import  { useState,  } from 'react';
import LastUpdated from '../lastupdate';
import { ChildAttendance } from './attendance';
import { useEffect,} from 'react';
import { auth, firestore } from '../firebase';
import { collection,  query, where, onSnapshot } from 'firebase/firestore';
import { Attendancechart } from './charts';
import { useSelector } from 'react-redux';
import ColorAlerts from '../alert';
import Staffmes from './staffmes';

export const Dash = ({showToast,setShowToast}) => {
  const [triggerUpdate,setTriggerUpdate ] = useState(false);

  const [activityUpdates, setActivityUpdates] = useState([]);
  const user = auth.currentUser

  useEffect(() => {
    if (user) {
      const activityRef = collection(firestore, 'activities');
      const q = query(activityRef, where('userId', '==', user.uid));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const activityData = snapshot.docs.map((doc) => doc.data());
        setActivityUpdates(activityData);
      });

      // Cleanup the subscription on unmount
      return  unsubscribe;
    }
  }, [user]);
  const btn = useSelector((state) => state.btnclick)
  const darkmode = useSelector((state)=> state.darkMode)
 

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Converts 0 (midnight) to 12
    return `${formattedHours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
  };

  return (
    <div className="container-fluid">
      {btn && (
         <div className="custom-toast">
         <ColorAlerts />
   
      </div>
      )}
      <div className="row">
        <div className="col-md-4">
        <div className={`card ${darkmode ? 'card-mode':''}`}>
            <div className="header">
              <h4 className={`title ${darkmode? 'card-color':''}`} >Child Attendance</h4>
              <p className="category">Today s Attendance</p>
            </div>
            <div className="content">
              <div id="chartAttendance" className="ct-chart ct-perfect-fourth"></div>
              <div className="footer">
                <div className="legend">
                <ChildAttendance
                showToast={showToast} setShowToast={setShowToast}
                setTriggerUpdate={setTriggerUpdate}
                
                />
                
               
                </div>
                <hr className='hr' />
                <div className="stats">
                <LastUpdated triggerUpdate={triggerUpdate} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8">
        <div className={`card ${darkmode ? 'card-mode':''}`}>
            <div className="header">
              <h4 className={`title ${darkmode? "card-color":''}`}>Attendance Chart</h4>
              <p className="category">Weekly Attendance</p>
            </div>
            <div className="content ">
              <div className='chart'>
              <div id="chartAttendance" className="ct-chart ct-perfect-fourth"></div>
              <div className="footer">
                <div className="legend ">
                <Attendancechart />
               
                </div>
                </div>
                </div>
                <hr className='hr' />
                <div className="stats">
                <LastUpdated triggerUpdate={triggerUpdate} />
                </div>
             
             
            </div>
          </div>
        </div>
        
        {/* <div className="col-md-8">
          <div className="card">
            <div className="header">
              <h4 className="title">Staff Notifications</h4>
              <p className="category">Recent Notifications</p>
            </div>
            <div className="content">
         
              <ul className="notification-list">
            
                <li className="notification-item  btn-success">Reminder: Staff meeting at 2 PM</li>
                <li className="notification-item btn-warning">New parent-teacher conference scheduled</li>
              </ul>
              <div className="footer">
                <hr />
                <div className="stats">
                  <i className="fa fa-history"></i> Updated just now
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className={`card ${darkmode ? 'card-mode':''}`}>
            <div className="header">
              <h4 className={`title ${darkmode? 'card-color':''}`} >Daily Activities</h4>
              <p className="category">Events and Activities</p>
            </div>
            <div className="content">
              <div className='act-content'>
              {activityUpdates.map((updates, index) => (
              <ul className="activity-list" key={index}>
   <li className={`activity-item ${index % 2 === 0 ? 'btn-danger' : 'btn-warning'}`}>
      {updates.activity} at {formatTime(updates.time)}
    </li>
              </ul>
                  ))}
              </div>
      
              <div className="footer">
                <hr className='hr' />
                <div className="stats">
                  <i className="fa fa-clock-o"></i> Updated just now
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
        <div className={`card ${darkmode ? 'card-mode':''}`}>
            <div className="header">
              <h4 className={`title ${darkmode? 'card-color':''}`}>Staff Communication</h4>
              <p className="category">Messages from Staff</p>
            </div>
            <div className="content">
              <ul className="communication-list">
              
                {/* <li className="communication-item btn-info">Message from John Doe: Please check Sarah  medication.</li>
                <li className="communication-item btn-info">Message from Jane Smith: Come and pick up Jack at 3 PM.</li> */}
                <Staffmes />

              </ul>
              <div className="footer">
                <hr className='hr' />
                <div className="stats">
                  <i className="fa fa-history"></i> Updated just now
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
