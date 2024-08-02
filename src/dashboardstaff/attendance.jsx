import { useState, useEffect } from 'react';

import {  collection, getDocs, setDoc, doc } from 'firebase/firestore';
import {  firestore } from '../firebase';

export const MarkAttendance = () => {
  const [users, setUsers] = useState([]); // Store all users data
  // eslint-disable-next-line no-unused-vars
  const [attendance, setAttendance] = useState({}); // Store attendance data

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
    console.log(`Attendance marked as ${status} for child ${childName} on ${date}`);
    setAttendance((prev) => ({ ...prev, [childName]: status }));
  };
  return (


    // <div className="container mt-4">
    //   <h1 className="mb-4">Mark Attendance</h1>
    //   {users.length > 0 ? (
    //     <div className="row">
    //       {users.map((user, index) => (
    //         <div className="col-md-4 mb-3" key={index}>
    //           <div className="card">
    //             <div className="card-body">
    //               <h5 className="card-title">{user.name}</h5>
    //               {user.children ? (
    //                 user.children.map((child, childIndex) => (
    //                   <div key={childIndex} className="mb-2">
    //                     <p className="card-text">{child.name}</p>
    //                     <button
    //                       className="btn btn-success me-2"
    //                       onClick={() => handleAttendanceChange(user.uid, child.name, 'present')}
    //                     >
    //                       Mark Present
    //                     </button>
    //                     <button
    //                       className="btn btn-danger"
    //                       onClick={() => handleAttendanceChange(user.uid, child.name, 'absent')}
    //                     >
    //                       Mark Absent
    //                     </button>
    //                   </div>
    //                 ))
    //               ) : (
    //                 <p className="card-text">No children data available.</p>
    //               )}
    //             </div>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   ) : (
    //     <p>No users data available.</p>
    //   )}
    // </div>
 
<div className="container mt-4">
  <h1 className="mb-4">Mark Attendance</h1>
  {users.length > 0 ? (
    <div className="table-responsive">
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>User Name</th>
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
                  <td>{user.name}</td>
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

    
  );
};