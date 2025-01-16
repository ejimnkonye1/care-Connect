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
import SkeletonLoader from "../reuseable/skelenton";

const Childlist = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    const fetchAllUsers = async () => {
      setLoading(true)
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
      setLoading(false)
    };

    fetchAllUsers();
  }, []);

  return (
    <div className="inline-flex w-full flex-col items-start justify-start rounded-[14px] border border-slate-100 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900 shadow-md">
      <div className="flex w-full items-center justify-between mb-4">
        <h3 className="text-base font-semibold leading-relaxed text-zinc-800 dark:text-neutral-100">
          Children List
        </h3>
    
      </div>

      {/* Children Table */}
      <div className="scrollbar mx-auto mt-1 w-full overflow-x-auto h-[269px]">
  <Table aria-label="Children List Table">
    {loading ? (
      // Show skeleton loaders while data is loading
      <>
        <SkeletonLoader height={20}  count={4} />
        <SkeletonLoader height={20} count={4} />
      </>
    ) : (
      <>
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
                      {user.age ?? "N/A"}
                    </TableCell>
                    <TableCell className="dark:text-neutral-100">
                      {user.allergic ?? "NONE"}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                // If the user has no children, render a message
                <TableRow key={user.id}>
                  <TableCell colSpan={3} className="dark:text-neutral-100 text-center">
                    No children available
                  </TableCell>
                </TableRow>
              )
            )
          ) : (
            // If there are no users, render a message
            <TableRow>
              <TableCell colSpan={3} className="dark:text-neutral-100 text-center">
                No users available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </>
    )}
  </Table>
</div>
    </div>
  );
};

export default Childlist;
