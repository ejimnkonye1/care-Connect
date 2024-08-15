/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

import {  collection, getDocs, setDoc, doc } from 'firebase/firestore';
import {  firestore } from '../firebase';
import ColorAlerts from '../alert';
import { useDispatch, useSelector} from 'react-redux';
import {  setAlert, setMark } from '../action';
export const MarkAttendance = () => {
  const [users, setUsers] = useState([]); // Store all users data
  // eslint-disable-next-line no-unused-vars
  const [attendance, setAttendance] = useState({}); // Store attendance data
  const [showToast, setShowToast] = useState(false);
  
  const dispatch = useDispatch();
  const alertmode = useSelector((state) => state.alertMode)
  useEffect(() => {
    const fetchUsers = async () => {
      const usersRef = collection(firestore, 'users');
      const usersSnapshot = await getDocs(usersRef);
      const usersData = usersSnapshot.docs.map((doc) => doc.data());
      setUsers(usersData);
    };

    fetchUsers();
  }, [firestore]);

  const handleAttendanceChange = async (userId, childName, status) => {
    const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    await setDoc(doc(firestore, 'attendance', `${childName}_${date}`), {
      childName,
      status,
      date,
      userId: users // pass users here
    });
   dispatch(setMark(!true))
   dispatch(setAlert(!alertmode))
    console.log(`Attendance marked as ${status} for child ${childName} on ${date}`);
    setAttendance((prev) => ({ ...prev, [childName]: status }));
    setShowToast(true);
    
    // Hide the toast after a delay (adjust as needed)
    setTimeout(() => {
      setShowToast(false);
    }, 2000);

    
   
  };

  return (


  
 
<div className="container mt-4">
<div>
            <h1>Staff Dashboard</h1>

        </div>

{showToast && (
     <div className="custom-toast">
      <ColorAlerts />
      f

   </div>
  )} 
  <div className='row'>
    <div className='col-md-12'>
      <div className='card'>
        <div className='header'>
          <h4 className='title'>Attendance</h4>
          <p className='category'>Mark attendance for today</p>
        </div>
        <div className='content'>
        {users.length > 0 ? (
    <div className="table-responsive">
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
           
            <th>Child Name</th>
            <th>Mark Present</th>
            <th>Mark Absent</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            user.children ? (
              user.children.map((child, childIndex) => (
                <tr key={`${index}-${childIndex}`}>
               
                  <td>{child.name}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => handleAttendanceChange(user.uid, child.name, 'present')}
                    >
                      Mark Present
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleAttendanceChange(user.uid, child.name, 'absent')}
                    >
                      Mark Absent
                    </button>
                 
                  </td>
                </tr>
              ))
            ) : (
              <tr key={index}>
                <td colSpan="4">No children data available.</td>
              </tr>
            )
          ))}
        </tbody>
      </table>
      
    </div>
  ) : (
    <p>No users data available.</p>
  )}
        </div>
      </div>
      
    </div>

  </div>
  
</div>

    
  );
};