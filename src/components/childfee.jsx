import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore, auth } from "../firebase"; // Import auth to get current user
import {
  Hidden,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
// import { format } from "date-fns"; 
import SkeletonLoader from "../reuseable/skelenton";

const Fees = () => {
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

  const handlePay = async (feeId, amount) => {
    try {
      if (!window.PaystackPop) {
        console.error("Paystack library is not loaded.");
        return;
      }

      const handler = window.PaystackPop.setup({
        key: "pk_test_15ecd67b8e01212bcb121f80203606ecee45a74b",
        email: auth.currentUser?.email || "user@example.com", // Use current user's email
        amount: amount * 100, // Amount in kobo
        currency: "NGN",
        callback: function (response) {
          updateFeeStatus(feeId, response.reference);
        },
        onClose: function () {
          alert("Payment window closed");
        },
      });

      handler.openIframe();
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  const updateFeeStatus = async (feeId, reference) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.error("No authenticated user found");
        return;
      }

      const userId = currentUser.uid;
      const feeRef = doc(firestore, "users", userId, "fees", feeId);
      await updateDoc(feeRef, {
        status: "Paid",
        paymentReference: reference,
      });
      setFeesAdding((prev) =>
        prev.map((fee) =>
          fee.id === feeId ? { ...fee, status: "Paid" } : fee
        )
      );
    } catch (error) {
      console.error("Error updating fee status:", error);
    }
  };
  // const isPastDue = (date) => {
  //   const today = new Date();
  //   const feeDate = new Date(date);
  //   return feeDate < today; // Check if the fee date is in the past
  // };
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
  return (
    <div className="inline-flex w-full flex-col items-start justify-start rounded-[14px] border border-slate-100 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex w-full items-center justify-between">
        <h3 className="text-base font-semibold leading-relaxed text-zinc-800 dark:text-neutral-100">
          Fee Reminder
        </h3>
    
      </div>

      <div className="scrollbar mx-auto mt-7 w-full overflow-x-auto">
    
          <Table className="w-full text-left">
          {loading ? (
          <>
         <SkeletonLoader height={20} count={4} />
         <SkeletonLoader height={20} count={4} />
          </>
          
        ) : (
<>

            <TableHead>
              <TableRow>
                <TableCell className="dark:text-neutral-100">Name</TableCell>
                <TableCell className="dark:text-neutral-100">Amount</TableCell>
                <Hidden smDown>
                <TableCell className="dark:text-neutral-100">Status</TableCell>
                </Hidden>
                {/* <Hidden smDown>
                <TableCell className="dark:text-neutral-100">Date</TableCell>
                </Hidden> */}
                <TableCell className="dark:text-neutral-100">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feesadding.length > 0 ? (
                feesadding.map((fee) => (
                  <TableRow key={fee.id}>
                    <TableCell className="dark:text-neutral-100 ">{fee.fee_Name}</TableCell>
                    <TableCell className="dark:text-neutral-100">₦{fee.amount.toLocaleString()}</TableCell>
                    <Hidden smDown>
                    <TableCell
                            style={{ color: statusColor(fee.status) }}
                    className="dark:text-neutral-100">{fee.status}</TableCell>
                    </Hidden>
                    {/* <Hidden smDown>
                    <TableCell
                    className={isPastDue(fee.date) ? "text-blue-500" : " text-blue-500"}
                    >{fee.date}</TableCell>
                    </Hidden> */}
                    <TableCell>
                      <button
                        disabled={fee.status === "Paid"}
                        onClick={() => handlePay(fee.id, fee.amount)}
                        className={`rounded-lg px-4 py-2 text-sm font-medium text-white text-nowrap ${fee.status === 'Paid' 
                          ? 'bg-gray-400 cursor-not-allowed' // Style for disabled button
                          : 'bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:focus:ring-emerald-600'
                        }`}
                      >
                        {fee.status === "Paid" ? "Paid" : "Pay Now"}
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5}>No fees available.</TableCell>
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

export default Fees;
