import { collection, getDocs, getDoc, doc, } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { firestore, auth } from '../firebase';
import { Table, TableBody, TableCell,  TableHead, TableRow,  } from "@mui/material";

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
      case "Paid":
        return "text-emerald-400";
      case "Refund":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };
 const [feesadding, setFeesAdding] = useState([]);
  const [user, setUser] = useState(null);
 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const userDoc = await getDoc(doc(firestore, 'users', currentUser.uid));

          if (userDoc.exists()) {
            setUser(userDoc.data());
           
          } else {
            console.error("User document does not exist.");
          }
        } else {
          console.error("No user is currently signed in.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (user) {
      const fetchFees = async () => {
        try {
          const feesRef = collection(firestore, 'fees');
          const querySnapshot = await getDocs(feesRef);
          const fees = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setFeesAdding(fees); // assuming you have a state variable `fees` to store the fetched fees
        } catch (error) {
          console.error("Error fetching fees", error);
        }
      };

      fetchFees();
    }
  }, [user]);


 

  return (
    <div className="inline-flex w-full flex-col items-start justify-start rounded-[14px] border border-slate-100 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex w-full items-center justify-between">
        <h3 className="text-base font-semibold leading-relaxed text-zinc-800 dark:text-neutral-100">
          Fee Reminder
        </h3>
        <button className="cursor-pointer text-base font-medium text-emerald-400">
          See All
        </button>
      </div>

      <div className="scrollbar mx-auto mt-7 w-full overflow-x-auto">
        <Table className="w-full text-left">
          <TableHead>
            <TableRow>
              <TableCell className="px-4 pb-3 text-left text-base font-medium text-gray-400 dark:text-neutral-200">
                Name
              </TableCell>
              <TableCell className="px-4 pb-3 text-left text-base font-medium text-gray-400 dark:text-neutral-200">
                Amount
              </TableCell>
              <TableCell className="px-4 pb-3 text-left text-base font-medium text-gray-400 dark:text-neutral-200">
                Status
              </TableCell>
              <TableCell className="px-4 pb-3 text-left text-base font-medium text-gray-400 dark:text-neutral-200">
                Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feesadding.map((Fee, index) => (
              <TableRow
                key={index}
                className="border-b border-gray-200 dark:border-neutral-800"
              >
                <TableCell className="w-[100px] px-2 py-3 text-sm font-medium text-gray-700 dark:text-neutral-300">
                  {Fee.name}
                </TableCell>
                <TableCell className="px-3 py-3 text-sm font-medium text-slate-900 dark:text-neutral-200">
                  ${Fee.amount.toLocaleString()}
                </TableCell>
                <TableCell className="px-3 py-3 text-sm font-medium text-slate-900 dark:text-neutral-400">
                  {Fee.date}
                </TableCell>
                <TableCell
                  className={`px-2 py-3 text-sm font-medium ${statusColor(
                    Fee.status
                  )}`}
                >
                  {Fee.status}
                </TableCell>
              
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Fees;
