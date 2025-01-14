

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
  
  } from "@mui/material";
  import { useState, useEffect } from 'react';
  import {  collection, getDocs,  } from 'firebase/firestore';
  import {  firestore } from '../firebase';
import SkeletonLoader from "../reuseable/skelenton";

  const Childatt = () => {
       const [users, setUsers] = useState([]);
       const [loading, setLoading] = useState(true); 
    useEffect(() => {
      const fetchUsers = async () => {
        setLoading(true)
        const usersRef = collection(firestore, 'users');
        const usersSnapshot = await getDocs(usersRef);
        const usersData = usersSnapshot.docs.map((doc) => doc.data());
    
        // Fetch attendance data for each child
        const attendanceRef = collection(firestore, 'attendance');
        const attendanceSnapshot = await getDocs(attendanceRef);
        const attendanceData = attendanceSnapshot.docs.reduce((acc, doc) => {
          const data = doc.data();
          acc[`${data.childName}_${data.date}`] = data.status; // Use date and child name as unique identifier
          return acc;
        }, {});
    
        // Update users' children with the attendance data
        const usersWithAttendance = usersData.map((user) => ({
          ...user,
          children: user.children.map((child) => ({
            ...child,
            status: attendanceData[`${child.name}_${new Date().toISOString().split('T')[0]}`] || undefined,
          })),
        }));
    
        setUsers(usersWithAttendance);
        setLoading(false)
      };
    
      fetchUsers();
    }, [firestore]);
    const statusColor = (status) => {
      switch (status) {
        case "present":
          return "green";
        case "absent":
          return "Red";
        default:
          return "gray";
      }
    };
  
    return (
      
   <div className="inline-flex w-full flex-col items-start justify-start rounded-[14px] border border-slate-100 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900 shadow-md">
   <div className="flex w-full items-center justify-between">
          <h3 className="text-base font-semibold leading-relaxed text-zinc-800 dark:text-neutral-100">
          Attandance today
          </h3>
          <button className="cursor-pointer text-base font-medium text-emerald-400">
            See All
          </button>
        </div>
        <div className="mb-4 flex w-full items-center justify-between">
          <div className="flex items-center space-x-3">
          </div>
        </div>
  
        {/* Child Details */}
        <div className="scrollbar mx-auto mt-7 w-full overflow-x-auto h-[200px]">
        {loading ? (
      // Show skeleton loaders while data is loading
      <>
        <SkeletonLoader height={20}  count={4} />
        <SkeletonLoader height={20} count={4} />
      </>
    ) : (
      <>
        {users.length > 0 ? (
        <TableContainer component={''} className="mt-1">
          <Table aria-label="meal updates table">
            <TableHead>
              <TableRow>
                <TableCell className="dark:text-neutral-100" >Name</TableCell>
                <TableCell className="dark:text-neutral-100">Attandnace</TableCell>

  
              </TableRow>
            </TableHead>
            <TableBody>
            {users.map((user, index) => (
          user.children ? (
            user.children.map((child, childIndex) => (
                <TableRow key={`${index}-${childIndex}`}>
                  <TableCell className="dark:text-neutral-100">{child.name}</TableCell>
                  <TableCell className="dark:text-neutral-100"
                     style={{
                      color: statusColor(child.status),
                   
                      
                    }}
                  >{child.status || 'Not Marked'}</TableCell>
                
                 
                </TableRow>
              ))
            ) : (
              ''
            )
            ))}
         
            </TableBody>
          </Table>
        </TableContainer>
        ):(
          ''
        )}
            </>
    )}
        </div>
      </div>
  
  
  
  
   
    );
  };
  
  export default Childatt;