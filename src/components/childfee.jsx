import { collection, getDocs, getDoc, doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { firestore, auth } from '../firebase';
import { Table, TableBody, TableCell,  TableHead, TableRow, } from "@mui/material";

// const Fee = [
//     {
//       name: "Tuition Fee",
//       date: "Dec 15, 2024",
//       amount: 80000,
//       status: "Paid",
//     },
//     {
//       name: "Feeding Fee",
//       date: "Dec 15, 2024",
//       amount: 150000,
//       status: "Ongoing",
//     },
//     {
//       name: "Late Pickup Fee",
//       date: "Dec 14, 2024",
//       amount: 87000,
//       status: "Paid",
//     },
//     {
//       name: "Stationery Fee",
//       date: "Dec 14, 2024",
//       amount: 100000,
//       status: "Ongoing",
//     },
//     {
//       name: "Medical Fee",
//       date: "Dec 13, 2024",
//       amount: 78000,
//       status: "Paid",
//       button: ''
//     },
//   ];


const Fees = () => {

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

  const handlePay = async (feeId, amount) => {
    try {
      if (!window.PaystackPop) {
        console.error('Paystack library is not loaded.');
        return;
      }
  
      const handler = window.PaystackPop.setup({
        key: 'pk_test_15ecd67b8e01212bcb121f80203606ecee45a74b',
        email: user.email,
        amount: amount * 100, // Amount in kobo
        currency: 'NGN',
        callback: function(response) {
          // Ensure the callback function is defined correctly as an inline function
          updateFeeStatus(feeId, response.reference);
        },
        onClose: function() {
          alert('Payment window closed');
        },
      });
  
      handler.openIframe();
    } catch (error) {
      console.error('Error initiating payment:', error);
    }
  };
  
 
const updateFeeStatus = async (feeId, reference) => {
  try {
    const feeRef = doc(firestore, 'fees', feeId);
    await updateDoc(feeRef, {
      status: 'paid',
      paymentReference: reference,
    });
    console.log('Fee status updated successfully');
    
    // Fetch fees again to update the component state
    const fetchFeesAgain = async () => {
      try {
        const feesRef = collection(firestore, 'fees');
        const querySnapshot = await getDocs(feesRef);
        const fees = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setFeesAdding(fees);
      } catch (error) {
        console.error("Error fetching fees again", error);
      }
    };
    fetchFeesAgain();
  } catch (error) {
    console.error('Error updating fee status:', error);
  }
};
  // const handlePayClick = (name, amount) => {
  //   alert(`You selected to pay for: ${name} - $${amount}`);
  //   // Add payment logic here
  // };

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
              <TableCell className="px-4 pb-3 text-left text-base font-medium text-gray-400 dark:text-neutral-200">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {feesadding.length > 0 ? (
            feesadding.map((fee, index) => (
              <TableRow
                key={index}
                className="border-b border-gray-200 dark:border-neutral-800"
              >
                <TableCell className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-neutral-300">
                  {fee.fee_Name}
                </TableCell>
                <TableCell className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-neutral-200">
                ₦{fee.amount.toLocaleString()}
                </TableCell>
                <TableCell
                  className={`px-4 py-3 text-sm font-medium ${
                    fee.status === "Paid"
                      ? "text-emerald-400"
                      : "text-red-500"
                  }`}
                >
                  {fee.status}
                </TableCell>
                <TableCell className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-neutral-400">
                  {fee.date}
                </TableCell>
                <TableCell className="px-4 py-3">
  <button
    className={`rounded-lg px-4 py-2 text-sm font-medium text-white 
      ${fee.status === 'Paid' 
        ? 'bg-gray-400 cursor-not-allowed' // Style for disabled button
        : 'bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:focus:ring-emerald-600'
      }`}
    onClick={() => handlePay(fee.name, fee.amount, fee.id)}
    disabled={fee.status === 'Paid'}
  >
    Pay Now
  </button>
</TableCell>
              </TableRow>
            ))
          ):(
            <TableRow className='w-full text-center'>
            <TableCell colSpan={5} className='text-sm font-medium text-slate-900 dark:text-neutral-200 flex items-center justify-center text-center h-full'>
              No meal updates available.
            </TableCell>
          </TableRow>
          )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Fees;
