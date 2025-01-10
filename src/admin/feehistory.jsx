import {  collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";
import { TextField, MenuItem,  } from "@mui/material";
import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    
  } from "@mui/material";
export const FeeHistory = () => {
    const [feesadding, setFeesAdding] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const fetchUsers = async () => {
        try {
          const usersRef = collection(firestore, "users");
          const usersSnapshot = await getDocs(usersRef);
          const usersData = usersSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setUsers(usersData);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
    
      const fetchUserFees = async (userId) => {
        try {
          const userFeesRef = collection(firestore, "users", userId, "fees");
          const userFeesSnapshot = await getDocs(userFeesRef);
          const userFeesData = userFeesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setFeesAdding(userFeesData);
        } catch (error) {
          console.error("Error fetching user fees:", error);
        }
      };
    
      useEffect(() => {
        fetchUsers();
      }, []);
    
      useEffect(() => {
        if (selectedUser) {
          fetchUserFees(selectedUser);
        } else {
          setFeesAdding([]);
        }
      }, [selectedUser]);
return(
    
    <div className="inline-flex w-full flex-col items-start justify-start rounded-[14px] border border-slate-100 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
    <h4 className="text-base font-semibold leading-relaxed text-zinc-800 dark:text-neutral-100">Fee History</h4>
    <TextField
      select
      label="Select User"
      value={selectedUser}
      onChange={(e) => setSelectedUser(e.target.value)}
      fullWidth
      margin="normal"
      InputProps={{
        className:"dark:text-neutral-100",
      }}
      InputLabelProps={{
        className:"dark:text-neutral-100",
        shrink: true, 
        }}
        
    >
      <MenuItem value="" className="dark:text-neutral-100">Select User</MenuItem>
      {users.map((user) => (
        
        <MenuItem key={user.id} value={user.id}  >
          {user.name || user.email} {/* Display user name or email */}
        </MenuItem>
      ))}
    </TextField>
    <div className="scrollbar mx-auto mt-7 w-full overflow-x-auto h-[300px]">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className="text-base font-medium text-gray-400 dark:text-neutral-200">Fee Name</TableCell>
            <TableCell className="text-base font-medium text-gray-400 dark:text-neutral-200">Amount</TableCell>
            <TableCell className="text-base font-medium text-gray-400 dark:text-neutral-200">Status</TableCell>
            <TableCell className="text-base font-medium text-gray-400 dark:text-neutral-200">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {feesadding.length > 0 ? (
            feesadding.map((fee) => (
              <TableRow key={fee.id}
            className="border-b border-gray-200 dark:border-neutral-800"
              >
                <TableCell className="text-sm font-medium text-slate-900 dark:text-neutral-200">{fee.fee_Name}</TableCell>
                <TableCell className="text-sm font-medium text-slate-900 dark:text-neutral-200">₦{fee.amount}</TableCell>
                <TableCell className="text-sm font-medium text-slate-900 dark:text-neutral-200">{fee.status}</TableCell>
                <TableCell className="text-sm font-medium text-slate-900 dark:text-neutral-200">{fee.date}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500">
                No fees available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  </div>
  
)
}

