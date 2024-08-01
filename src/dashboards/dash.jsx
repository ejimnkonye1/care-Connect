import { AttendanceStatus } from "./status";
import  { Attendance} from "./test";
import { useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebase'

export const Dash = () => {
  const [attendance, setAttendance] = useState({
    Mike: '',
    Michel: '',
    John: '',
    Jane: '',
  });
  const [userData, setUserData] = useState(null);

   useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(firestore, 'users', user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      }
    };

    fetchUserData();
  }, [auth, firestore]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="header">
              <h4 className="title">Child Attendance</h4>
              <p className="category">Today s Attendance</p>
            </div>
            <div className="content">
              <div id="chartAttendance" className="ct-chart ct-perfect-fourth"></div>
              <div className="footer">
                <div className="legend">
                  <i className="fa fa-circle text-info"></i> Present
                  <i className="fa fa-circle text-danger"></i> Absent
             
                </div>
                <hr />
                <div className="stats">
                  <i className="fa fa-clock-o"></i> Updated just now
                </div>
              </div>
            </div>
          </div>
        </div>
<div>
<div>
      <h1>Parent Dashboard</h1>
      {userData ? (
        <div>
          <p>Email: {userData.email}</p>
          <p>Child Name: {userData.children[0].name}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
</div>
        <div className="col-md-8">
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
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="header">
              <h4 className="title">Daily Activities</h4>
              <p className="category">Events and Activities</p>
            </div>
            <div className="content">
              <ul className="activity-list">
             
                <li className="activity-item btn-danger">Had lunch at 12:30 PM</li>
                <li className="activity-item btn-warning">Nap time at 1:00 PM</li>
              </ul>
              <div className="footer">
                <hr />
                <div className="stats">
                  <i className="fa fa-clock-o"></i> Updated just now
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="header">
              <h4 className="title">Staff Communication</h4>
              <p className="category">Messages from Staff</p>
            </div>
            <div className="content">
              <ul className="communication-list">
              
                <li className="communication-item btn-info">Message from John Doe: Please check Sarah  medication.</li>
                <li className="communication-item btn-info">Message from Jane Smith: Come and pick up Jack at 3 PM.</li>
              </ul>
              <div className="footer">
                <hr />
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
