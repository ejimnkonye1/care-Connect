/* eslint-disable no-unused-vars */
import { addDoc, collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";
import { TextField, Button, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

export const FeesAdding = () => {
  const [feesadding, setFeesAdding] = useState([]); 
  const [newfeesadding, setNewFeesAdding] = useState({
    fee_Name: '',
    amount: '',
    status: 'Unpaid',
  });

  const handleFeesAdder = async (e) => {
    e.preventDefault();
    if (!newfeesadding.fee_Name || !newfeesadding.amount || !newfeesadding.status) {
      alert("Please fill in all required fields");
      return;
    }
    try {
        const usersRef = collection(firestore, 'users');
    //   const feesRef = collection(firestore, 'Fees');
    const querysnapshot = await getDocs(usersRef)
    querysnapshot.forEach( async (userdoc) => {
   const usersfeesRef = collection(firestore, `users/${userdoc.id}/fees`)
   await addDoc(usersfeesRef, newfeesadding);
    })
      
      setFeesAdding((prevUpdates) => [...prevUpdates, newfeesadding]);

      setNewFeesAdding({
        fee_Name: '',
        amount: '',
        status: ''
      });
      alert("Fee added to all parents successfully!");
    } catch (error) {
      console.error("Error adding fees", error);
    }
  };
  const darkmode = useSelector((state)=> state.darkMode)
  useEffect(() => {
    const fetchFees = async () => {
      try {
        const usersRef = collection(firestore, 'users');
        const usersSnapshot = await getDocs(usersRef);
        const fees = [];
  
        usersSnapshot.forEach(async (userDoc) => {
          const userFeesRef = collection(firestore, `users/${'slG595vQe6UHqhPOuX4rdnWdXSG3'}/fees`);
          const userFeesSnapshot = await getDocs(userFeesRef);
          userFeesSnapshot.forEach((feeDoc) => {
            fees.push(feeDoc.data());
          });
        });
  
        setFeesAdding(fees);
      } catch (error) {
        console.error('Error fetching fees:', error);
      }
    };
    fetchFees();
  }, [firestore]);
  return (
    <div className="row">
      <div className="col-md-6">
      <div className={`card ${darkmode ? 'card-mode':''}`}>
    <div className='header'>
    <h4 className={`title ${darkmode ? 'card-color':''}`} >Add School Fees</h4>
    {/* <p className="category">Activity today</p> */}
    </div>
    <div className='content'>
    <form onSubmit={handleFeesAdder}>
        <TextField
          label='Fee Name'
          required
          value={newfeesadding.fee_Name}
          onChange={(e) => setNewFeesAdding({ ...newfeesadding, fee_Name: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label='Amount'
          required
          type="number"
          value={newfeesadding.amount}
          onChange={(e) => setNewFeesAdding({ ...newfeesadding, amount: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label='Status'
          required
          value={newfeesadding.status}
          onChange={(e) => setNewFeesAdding({ ...newfeesadding, status: e.target.value })}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Add Fee
        </Button>
      </form>
    </div>
  </div>
      </div>
      <div className="col-md-6">
      <div className={`card ${darkmode ? 'card-mode':''}`}>
        <div className='header'>
        <h4 className={`title ${darkmode ? 'card-color':''}`} >Activity History</h4>
        <p className="category">Activity today</p>
        </div>
        <div className='content'>
        <TableContainer component={Paper}className={`${darkmode ? 'card-mode':''}`}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={`${darkmode ? 'card-color':''}`}>Fee Name</TableCell>
              <TableCell className={`${darkmode ? 'card-color':''}`}>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feesadding.length > 0 ? (
              feesadding.map((fee) => (
                <TableRow key={fee.id}>
                  <TableCell className={`${darkmode ? 'card-color':''}`}>{fee.fee_Name}</TableCell>
                  <TableCell className={`${darkmode ? 'card-color':''}`}>₦{fee.amount}</TableCell>
                 
                  <TableCell>
               
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell  className={`text-center ${darkmode ? 'card-color text-white text-center':''}`} colSpan={4}>No fees available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
        </div>
      </div>
</div>
    </div>
  
    
    
  );
};
