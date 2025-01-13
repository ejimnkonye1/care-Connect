import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,

} from "@mui/material";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";

const Childlist = () => {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const usersRef = collection(firestore, "users");
        const snapshot = await getDocs(usersRef);
        const usersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchAllUsers();
  }, []);

  return (
    <div className="inline-flex w-full flex-col items-start justify-start rounded-[14px] border border-slate-100 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900 shadow-md">
      <div className="flex w-full items-center justify-between mb-4">
        <h3 className="text-base font-semibold leading-relaxed text-zinc-800 dark:text-neutral-100">
          Children List
        </h3>
        <button className="cursor-pointer text-base font-medium text-emerald-400">
          See All
        </button>
      </div>

      {/* Children Table */}
      <div className="scrollbar mx-auto mt-7 w-full overflow-x-auto h-[200px]">
        <Table aria-label="children list table">
          <TableHead>
            <TableRow className="bg-slate-100 dark:bg-neutral-800">
              <TableCell className="text-sm font-medium dark:text-neutral-100">
                Name
              </TableCell>
              <TableCell className="text-sm font-medium dark:text-neutral-100">
                Age
              </TableCell>
              <TableCell className="text-sm font-medium dark:text-neutral-100">
                Allergies
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allUsers.length > 0 ? (
              allUsers.map((user) =>
                user.children && user.children.length > 0 ? (
                  user.children.map((child, index) => (
                    <TableRow
                      key={`${user.id}-${index}`}
                      className="hover:bg-slate-50 dark:hover:bg-neutral-800"
                    >
                      <TableCell className="dark:text-neutral-100">
                        {child.name ?? "N/A"}
                      </TableCell>
                      <TableCell className="dark:text-neutral-100">
                        {user.age  ?? "N/A"}
                      </TableCell>
                      <TableCell className="dark:text-neutral-100">
                        {child.allergies ?? "NONE"}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow key={user.id}>
                    <TableCell
                      colSpan={3}
                      className="text-center text-sm text-gray-500 dark:text-neutral-300"
                    >
                      No children data available for this user.
                    </TableCell>
                  </TableRow>
                )
              )
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center text-sm text-gray-500 dark:text-neutral-300"
                >
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

export default Childlist;
