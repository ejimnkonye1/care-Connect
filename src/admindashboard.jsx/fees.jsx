import { addDoc, collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";
import { TextField, Button, Box } from "@mui/material";
import { useState } from "react";

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

  return (

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
    
  );
};
