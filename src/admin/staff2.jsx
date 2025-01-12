import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
  
  } from "@mui/material";
const StaffList2 = () => {
  const [staffData, setStaffs] = useState([]);

  useEffect(() => {
    const fetchStaff = async () => {
      const staffRef = collection(firestore, "staff");
      const staffSnapshot = await getDocs(staffRef);
      const staffData = staffSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStaffs(staffData);
    };

    fetchStaff();
  }, []);




  return (
    <div className="inline-flex w-full flex-col items-start justify-start rounded-[14px] border border-slate-100 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900 shadow-md">
    <div className="flex w-full items-center justify-between mb-4">
      <h3 className="text-base font-semibold leading-relaxed text-zinc-800 dark:text-neutral-100">
        Staff List
      </h3>
      <button className="cursor-pointer text-base font-medium text-emerald-400">
        See All
      </button>
    </div>

    <div className="scrollbar mx-auto mt-7 w-full overflow-x-auto h-[140px]">
    <Table aria-label="children list table">
      <TableHead>
        <TableRow className="bg-slate-100 dark:bg-neutral-800">
          <TableCell className="text-sm font-medium dark:text-neutral-100">Name</TableCell>
          <TableCell className="text-sm font-medium dark:text-neutral-100">Age</TableCell>
          <TableCell className="text-sm font-medium dark:text-neutral-100">Phone</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {staffData.length > 0 ? (
          staffData.map((child, index) => (
            <TableRow key={`${child.id}-${index}`} className="hover:bg-slate-50 dark:hover:bg-neutral-800">
              <TableCell className="dark:text-neutral-100">{child.name ?? "N/A"}</TableCell>
              <TableCell className="dark:text-neutral-100">{child.age ?? "N/A"}</TableCell>
              <TableCell className="dark:text-neutral-100">{child.phone ?? "NONE"}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={3} className="text-center text-sm text-gray-500 dark:text-neutral-300">
              No children found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
    </div>
  </div>
  );
};

export default StaffList2;
