import { collection, getDocs, } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { firestore, auth } from '../firebase';
import {  Table, TableBody, TableCell,  TableHead, TableRow,  } from "@mui/material";
import SkeletonLoader from '../reuseable/skelenton';

// const orders = [
//   {
//     name: "Tuition Fee",
//     date: "Nov 15, 2023",
//     amount: 80000,
//     status: "Paid",
//   },
//   {
//     name: "Feeding Fee",
//     date: "Nov 15, 2023",
//     amount: 150000,
//     status: "Refund",
//   },
//   {
//     name: "Late Pickup Fee",
//     date: "Nov 14, 2023",
//     amount: 87000,
//     status: "Paid",
//   },
//   {
//     name: "Stationery Fee",
//     date: "Nov 14, 2023",
//     amount: 100000,
//     status: "Refund",
//   },
//   {
//     name: "Medical Fee",
//     date: "Nov 13, 2023",
//     amount: 78000,
//     status: "Paid",
//   },
// ];

const Fees = () => {

  const statusColor = (status) => {
    switch (status) {
      case "Ongoing":
        return "green";
      case "Paid":
        return "gray";
      default:
        return "text-gray-500";
    }
  };
 const [feesadding, setFeesAdding] = useState([]);
 const [loading, setLoading] = useState(false);

 
  useEffect(() => {
    const fetchCurrentUserFees = async () => {
      setLoading(true);
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          console.error("No authenticated user found");
          setLoading(false);
          return;
        }

        const userId = currentUser.uid;
        const feesRef = collection(firestore, "users", userId, "fees");
        const feesSnapshot = await getDocs(feesRef);

        const userFees = feesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setFeesAdding(userFees);
      } catch (error) {
        console.error("Error fetching fees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUserFees();
  }, []);


 

  return (
    <div className="inline-flex w-full flex-col items-start justify-start rounded-[14px] border border-slate-100 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex w-full items-center justify-between">
        <h3 className="text-base font-semibold leading-relaxed text-zinc-800 dark:text-neutral-100">
          Fee Reminder
        </h3>
       
      </div>

      <div className="scrollbar mx-auto mt-7 w-full overflow-x-auto">
        <Table className="  ">
        {loading ? (
             <>
             <SkeletonLoader height={20}  count={4} />
             <SkeletonLoader height={20} count={4} />
           </>
        ) : (
          <>
       
          <TableHead>
            <TableRow>
              <TableCell className="   text-base font-medium text-gray-400 dark:text-neutral-200">
                Name
              </TableCell>
              <TableCell className="   text-base font-medium text-gray-400 dark:text-neutral-200">
                Amount
              </TableCell>
              
              <TableCell className="   text-base font-medium text-gray-400 dark:text-neutral-200">
                Status
              </TableCell>
              {/* <Hidden smDown>
              <TableCell className="px-4 pb-3 text-left text-base font-medium text-gray-400 dark:text-neutral-200">
                Date
              </TableCell>
              </Hidden> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {feesadding.map((Fee, index) => (
              <TableRow
                key={index}
                className="border-b border-gray-200 dark:border-neutral-800"
              >
                <TableCell className="w-[100px]  text-sm font-medium text-gray-700 dark:text-neutral-300 text-nowrap">
                  {Fee.fee_Name}
                </TableCell>
                <TableCell className=" text-sm font-medium text-slate-900 dark:text-neutral-200">
                ₦{Fee.amount.toLocaleString()}
                </TableCell>
                <TableCell
                style={{ color: statusColor(Fee.status) }}
                  className={` text-sm font-medium  `}
                >
                  {Fee.status}
                </TableCell>
                {/* <Hidden smDown>
                <TableCell className="px-3 py-3 text-sm font-medium text-slate-900 dark:text-neutral-200">
                {Fee.date}
                </TableCell>
                </Hidden> */}
             
            
              
              </TableRow>
            ))}
          </TableBody>
          </>
             )}
        </Table>
      </div>
    </div>
  );
};

export default Fees;
