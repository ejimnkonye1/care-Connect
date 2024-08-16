import { collection, getDocs, getDoc, doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { firestore, auth } from '../firebase';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const FeesList = () => {
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
          const feeRef = collection(firestore, `users/${auth.currentUser.uid}/fees`);
          const feeSnapshot = await getDocs(feeRef);
          const fees = [];

          feeSnapshot.forEach((feeDoc) => {
            const feeData = feeDoc.data();
            if (feeData.status === 'Unpaid') {
              fees.push({
                id: feeDoc.id,
                ...feeData,
              });
            }
          });

          setFeesAdding(fees);
        } catch (error) {
          console.error('Error fetching fees:', error);
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
      const feeRef = doc(firestore, `users/${auth.currentUser.uid}/fees`, feeId);
      await updateDoc(feeRef, { status: 'Paid' });
  
      setFeesAdding((prevFees) =>
        prevFees.map((fee) =>
          fee.id === feeId ? { ...fee, status: 'Paid' } : fee
        )
      );
  
      alert(`Payment complete! Reference: ${reference}`);
    } catch (error) {
      console.error('Error updating fee status:', error);
    }
  };
  

  return (
    <div className='card'>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Fee Name</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feesadding.length > 0 ? (
              feesadding.map((fee) => (
                <TableRow key={fee.id}>
                  <TableCell>{fee.fee_Name}</TableCell>
                  <TableCell>₦{fee.amount}</TableCell>
                  <TableCell>{fee.status}</TableCell>
                  <TableCell>
                    {fee.status === 'Paid' ? (
                      <span>Paid</span>
                    ) : (
                      <button onClick={() => handlePay(fee.id, fee.amount)}>Pay</button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>No unpaid fees available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FeesList;
