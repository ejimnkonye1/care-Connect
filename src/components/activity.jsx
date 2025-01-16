
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@mui/material';
import { useEffect, useState } from 'react';
import { auth, firestore } from '../firebase';
import { collection,  query, where, onSnapshot } from 'firebase/firestore';
import SkeletonLoader from '../reuseable/skelenton';
// const activities = [
//   {
//     name: "Nap Time",
//     date: "Nov 15, 2023",
//     duration: "1 hour 30 minutes",
//     status: "Completed",
//   },
//   {
//     name: "Meal Time (Lunch)",
//     date: "Nov 15, 2023",
//     duration: "45 minutes",
//     status: "Completed",
//   },
//   {
//     name: "Playtime",
//     date: "Nov 14, 2023",
//     duration: "1 hour",
//     status: "Cancelled",
//   },
//   {
//     name: "Story Time",
//     date: "Nov 14, 2023",
//     duration: "30 minutes",
//     status: "Completed",
//   },
//   {
//     name: "Toilet Break",
//     date: "Nov 13, 2023",
//     duration: "15 minutes",
//     status: "Completed",
//   },
// ];

const ChildActivityReport = () => {
  const statusColor = (status) => {
    switch (status) {
      case "Completed":
        return "green";
      case "Cancelled":
        return "red";
      default:
        return "gray";
    }
  };
  const [activityUpdates, setActivityUpdates] = useState([]);
  const user = auth.currentUser
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    setLoading(true)
    if (user) {
      const activityRef = collection(firestore, 'activities');
      const q = query(activityRef, where('userId', '==', user.uid));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const activityData = snapshot.docs.map((doc) => doc.data());
        // Sort the activity data by date
        const sortedActivityData = activityData.sort((a, b) => {
          // Assuming `date` is a string in 'YYYY-MM-DD' format
          return new Date(a.date) - new Date(b.date);
        });
        setActivityUpdates(sortedActivityData);
        setLoading(false)
      });

      // Cleanup the subscription on unmount
      return  unsubscribe;
    }
  }, [user]);
  
  // Utility function to format time
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Converts 0 (midnight) to 12
    return `${formattedHours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
  };

  return (
    <div className="inline-flex w-full flex-col items-start justify-start rounded-[14px] border border-slate-100 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex w-full items-center justify-between">
        <h3 className="text-base font-semibold leading-relaxed text-zinc-800 dark:text-neutral-100">
          Child Activity Report
        </h3>
   
      </div>

      <TableContainer component={''} className="mt-7">
        <Table aria-label="child activity report table">
        {loading ? (
      
      <>
        <SkeletonLoader height={20}  count={4} />
        <SkeletonLoader height={20} count={4} />
      </>
    ) : (
      <>
          <TableHead>
            <TableRow>
              <TableCell className='dark:text-neutral-100'>Name</TableCell>
              <TableCell className='dark:text-neutral-100'>Time</TableCell>
              <TableCell className='dark:text-neutral-100'>Status</TableCell>
              <TableCell className='dark:text-neutral-100'>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activityUpdates.map((activity, index) => (
              <TableRow key={index}>
                <TableCell className='dark:text-neutral-100'>{activity.activity}</TableCell>
                <TableCell className='dark:text-neutral-100'>{formatTime(activity.time)}</TableCell>
                <TableCell  style={{ color: statusColor(activity.status) }}>
                  {activity.status}
                </TableCell>
                <TableCell className='dark:text-neutral-100'>{activity.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          </>
    )}
        </Table>
      </TableContainer>
    </div>
  );
};

export default ChildActivityReport;
