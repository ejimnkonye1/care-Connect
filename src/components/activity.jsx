
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@mui/material';

const activities = [
  {
    name: "Nap Time",
    date: "Nov 15, 2023",
    duration: "1 hour 30 minutes",
    status: "Completed",
  },
  {
    name: "Meal Time (Lunch)",
    date: "Nov 15, 2023",
    duration: "45 minutes",
    status: "Completed",
  },
  {
    name: "Playtime",
    date: "Nov 14, 2023",
    duration: "1 hour",
    status: "Cancelled",
  },
  {
    name: "Story Time",
    date: "Nov 14, 2023",
    duration: "30 minutes",
    status: "Completed",
  },
  {
    name: "Toilet Break",
    date: "Nov 13, 2023",
    duration: "15 minutes",
    status: "Completed",
  },
];

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

  return (
    <div className="inline-flex w-full flex-col items-start justify-start rounded-[14px] border border-slate-100 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex w-full items-center justify-between">
        <h3 className="text-base font-semibold leading-relaxed text-zinc-800 dark:text-neutral-100">
          Child Activity Report
        </h3>
        <button className="cursor-pointer text-base font-medium text-emerald-400">
          See All
        </button>
      </div>

      <TableContainer component={''} className="mt-7">
        <Table aria-label="child activity report table">
          <TableHead>
            <TableRow>
              <TableCell className='dark:text-neutral-100'>Name</TableCell>
              <TableCell className='dark:text-neutral-100'>Duration</TableCell>
              <TableCell className='dark:text-neutral-100'>Status</TableCell>
              <TableCell className='dark:text-neutral-100'>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activities.map((activity, index) => (
              <TableRow key={index}>
                <TableCell className='dark:text-neutral-100'>{activity.name}</TableCell>
                <TableCell className='dark:text-neutral-100'>{activity.duration}</TableCell>
                <TableCell  style={{ color: statusColor(activity.status) }}>
                  {activity.status}
                </TableCell>
                <TableCell className='dark:text-neutral-100'>{activity.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ChildActivityReport;
