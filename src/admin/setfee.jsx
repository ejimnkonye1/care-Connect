import { addDoc, collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";
import { TextField, Button, MenuItem,  } from "@mui/material";
import {  useState } from "react";
import { MessageAlert } from "../alert";


export const SetFees = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [newfeesadding, setNewFeesAdding] = useState({
    fee_Name: "",
    amount: "",
    status: "Ongoing",
    date: new Date().toISOString().split("T")[0],
  });

  const handleFeesAdder = async (e) => {
    e.preventDefault();

    if (!newfeesadding.fee_Name || !newfeesadding.amount || !newfeesadding.date) {
      alert("Please fill in all required fields");
      return;
    }

    if (new Date(newfeesadding.date) < new Date()) {
      alert("The due date cannot be in the past.");
      return;
    }

    try {
      setLoading(true);
      const usersRef = collection(firestore, "users");
      const usersSnapshot = await getDocs(usersRef);

      const feePromises = usersSnapshot.docs.map(async (userDoc) => {
        const userId = userDoc.id;
        const userFeesRef = collection(firestore, "users", userId, "fees");
        await addDoc(userFeesRef, newfeesadding);
      });

      await Promise.all(feePromises);

      setSuccessMessage("Fee added successfully for all users!");
      setNewFeesAdding({
        fee_Name: "",
        amount: "",
        status: "Ongoing",
        date: new Date().toISOString().split("T")[0],
      });
    } catch (error) {
      console.error("Error adding fees for all users:", error);
    } finally {
      setLoading(false);
    }
  };

 

  return (
   
      <div className="inline-flex w-full flex-col items-start justify-start rounded-[14px] border border-slate-100 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
        <h4 className="text-base font-semibold leading-relaxed text-zinc-800 dark:text-neutral-100">Add Fees</h4>
        <form onSubmit={handleFeesAdder} className="space-y-4">
          <TextField
            label="Fee Name"
            required
            value={newfeesadding.fee_Name}
            onChange={(e) =>
              setNewFeesAdding({ ...newfeesadding, fee_Name: e.target.value })
            }
            fullWidth
            margin="normal"
            InputProps={{
                className:"dark:text-neutral-100",
              }}
              InputLabelProps={{
                className:"dark:text-neutral-100",
                
                }}
          />
          <TextField
            label="Amount"
            required
            type="number"
            value={newfeesadding.amount}
            onChange={(e) =>
              setNewFeesAdding({ ...newfeesadding, amount: e.target.value })
            }
            fullWidth
            margin="normal"
            InputProps={{
                className:"dark:text-neutral-100",
              }}
              InputLabelProps={{
                className:"dark:text-neutral-100",
                
                }}
          />
          <TextField
            label="Due Date"
            type="date"
            required
            value={newfeesadding.date}
            onChange={(e) =>
              setNewFeesAdding({ ...newfeesadding, date: e.target.value })
            }
            fullWidth
            margin="normal"
            InputProps={{
                className:"dark:text-neutral-100",
              }}
              InputLabelProps={{
                className:"dark:text-neutral-100",
                
                }}
          />
          <TextField
            select
            label="Status"
            required
            value={newfeesadding.status}
            onChange={(e) =>
              setNewFeesAdding({ ...newfeesadding, status: e.target.value })
            }
            fullWidth
            margin="normal"
            InputProps={{
                className:"dark:text-neutral-100",
              }}
              InputLabelProps={{
                className:"dark:text-neutral-100",
                
                }}
          >
            <MenuItem value="Ongoing">Ongoing</MenuItem>
       
          </TextField>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Fee"}
          </Button>
        </form>
   

      

           <MessageAlert
            open={!!successMessage}
            message={successMessage}
            
            onClose={() => setSuccessMessage("")}
          />
    </div>
  );
};
