
import { Hidden, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,  } from '@mui/material';
import { useEffect, useState } from 'react';
import { auth, firestore } from '../firebase';
import { collection,  onSnapshot, query, where } from 'firebase/firestore';
import SkeletonLoader from '../reuseable/skelenton';


// const incidents = [
//     {
//       name: "Fall Injury",
//       date: "Nov 15, 2023",
//       duration: "N/A",
//       status: "Resolved",
//       description: "Your child experienced a minor fall during playtime, but was promptly attended to with first aid. They are doing well."
//     },

//     {
//       name: "Allergic Reaction",
//       date: "Nov 14, 2023",
//       duration: "N/A",
//       status: "Resolved",
//       description: "Your child had a mild allergic reaction to a snack, but they were quickly treated and are doing fine now."
//     },
//     {
//       name: "Vomiting",
//       date: "Nov 13, 2023",
//       duration: "N/A",
//       status: "Resolved",
//       description: "Your child felt unwell after lunch but recovered quickly. They were sent home with your consent for further rest."
//     },
//     {
//       name: "Lost Child",
//       date: "Nov 13, 2023",
//       duration: "N/A",
//       status: "Resolved",
//       description: "Your child was briefly separated from the group during outdoor play, but was quickly found and safely returned."
//     },
//   ];
  

const ChildIncidentReport = () => {
  const [incidentReports, setincidentReports] = useState([])
  const [loading, setLoading] = useState(true); 
const user = auth.currentUser

useEffect(() => {
setLoading(true)
if (user) {
  const incidentReportRef = collection(firestore, 'incidentReport')
  const q = query(incidentReportRef, where('userId', '==', user.uid))

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const incidentReportsData = snapshot.docs.map((doc) => doc.data())
      // Sort the activity data by date
      const sortedReports = incidentReportsData.sort((a, b) => {
        // Assuming `date` is a string in 'YYYY-MM-DD' format
        return new Date(a.date) - new Date(b.date);
      });
  setincidentReports(sortedReports)
  setLoading(false)
  })
  
return unsubscribe;
}


}, [user])

// const formatTime = (timeString) => {
//   const [hours, minutes] = timeString.split(':').map(Number);
//   const ampm = hours >= 12 ? 'PM' : 'AM';
//   const formattedHours = hours % 12 || 12; // Converts 0 (midnight) to 12
//   return `${formattedHours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
// };
  const statusColor = (status) => {
    switch (status) {
      case "Resolved":
        return "green";
      case "Ongoing":
        return "orange";
      case "Unresolved":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <section>

    
    <div className="inline-flex  flex-col items-start justify-start rounded-[14px] border border-slate-100 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex  items-center justify-between">
        <h3 className="text-base font-semibold leading-relaxed text-zinc-800 dark:text-neutral-100">
          Child Incident Report
        </h3>
   
      </div>

      <TableContainer component={''} className="mt-7">
      <div className="scrollbar mx-auto mt-7 block lg:w-full  overflow-x-auto text-left  ">
        <Table aria-label="child incident report table w-[70%]" >
        {loading ? (
      
      <>
        <SkeletonLoader height={20}  count={4} />
        <SkeletonLoader height={20} count={4} />
      </>
    ) : (
      <>
          <TableHead>
            <TableRow>
              <TableCell  className='dark:text-neutral-100'>Incident</TableCell>
              <TableCell className='dark:text-neutral-100'>Description</TableCell>
              <TableCell className='dark:text-neutral-100'>Status</TableCell>
              <Hidden smDown>
              <TableCell className='dark:text-neutral-100'>Date</TableCell>
              </Hidden>
            </TableRow>
          </TableHead>
          <TableBody>
            {incidentReports.map((incident, index) => (
              <TableRow key={index}>
                <TableCell className='dark:text-neutral-100'>{incident.name}</TableCell>
                <TableCell  className='dark:text-neutral-100'>{incident.description}</TableCell>
                <TableCell style={{ color: statusColor(incident.status) }}>
                  {incident.status}
                </TableCell>
                <Hidden smDown>
                <TableCell  className='dark:text-neutral-100 md:hidden lg:block"'>{incident.date}</TableCell>
                </Hidden>

              </TableRow>
            ))}
          </TableBody>
          </>
    )}
        </Table>
        </div>
      </TableContainer>
    </div>
      </section>
  );
};

export default ChildIncidentReport;
