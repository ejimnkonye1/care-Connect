import { useState, useEffect } from "react";
import {  collection, getDocs, } from 'firebase/firestore';
import {  firestore } from '../firebase';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
 
    
  } from "@mui/material";
import { useSelector } from "react-redux";
export const Admindash = () => {
    const [user, setUsers] = useState(null); // Store user data
    const [staffdata, setStaffs] = useState(null); // Store staff data

    useEffect(() => {
        const fetchUsers = async () => {
          const usersRef = collection(firestore, 'users');
          const usersSnapshot = await getDocs(usersRef);
          const usersData = usersSnapshot.docs.map((doc) => doc.data());
          setUsers(usersData);
        };
    
        fetchUsers();
      }, [firestore]);

      useEffect(() => {
        const fetchStaff = async () => {
          const staffRef = collection(firestore, 'staff');
          const staffSnapshot = await getDocs(staffRef);
          const staffData = staffSnapshot.docs.map((doc) => doc.data());
          setStaffs(staffData);
          console.log (staffData, 'all staffs')
        };
    
        fetchStaff();
      }, [firestore]);
      const darkmode = useSelector((state)=> state.darkMode)
    return(

        <div className="container-fluid">
            <div className="row">
                        <div className="col-md-6">
                        <div className={`card ${darkmode ? 'card-mode':''}`} >
            <div className="header">
              <h4 className={`title ${darkmode ? 'card-color':''}`} >List Of Children</h4>
              {/* <p className="category">Recent Notifications</p> */}
            </div>
            <div className="content">
  <TableContainer component={Paper} className={`card ${darkmode ? 'card-mode':''}`} >
    <Table aria-label="simple table">
      <TableHead className="table-header">
        <TableRow>
          <TableCell className={`${darkmode ? 'card-color':''}`}>Parent Name</TableCell>
          <TableCell className={`${darkmode ? 'card-color':''}`}>Child Name</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {user?.map((users, index) =>
          users.children ? (
            users.children.map((child, childIndex) => (
              <TableRow key={`${index}-${childIndex}`} className="table-row">
                <TableCell  className={`${darkmode ? 'card-color':''}`}>
                  {users.lastName}
                </TableCell>
                <TableCell  className={`${darkmode ? 'card-color':''}`}>
                  {child.name}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow key={index} className="table-row no-data-row">
              <TableCell className="table-cell" colSpan={2}>
                No data available
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  </TableContainer>

  <div className="footer">
    <hr />
    <div className="stats">
      <i className="fa fa-history"></i> Updated just now
    </div>
  </div>
</div>


          </div>
        </div>
        <div className="col-md-6">
        <div className={`card ${darkmode ? 'card-mode':''}`} >
            <div className="header">
              <h4 className={`title ${darkmode ? 'card-color':''}`}>List Of Staffs</h4>
              {/* <p className="category">Recent Notifications</p> */}
            </div>
            <div className="content">
         
            <ul className="list-group">
                {staffdata?.map((staff, index) => (
                  <li key={index} className={`list-group-item ${darkmode ? 'card-mode':''}`}      >
                    <span className="badges badge-primary">{staff.name}</span>
                    <span  className={`list-group-item-text${darkmode ? 'card-color text-white':''}`} >{staff.email}</span>
                  </li>
                ))}
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
    )
}