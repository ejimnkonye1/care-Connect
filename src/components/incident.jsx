
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow,  } from '@mui/material';

const incidents = [
    {
      name: "Fall Injury",
      date: "Nov 15, 2023",
      duration: "N/A",
      status: "Resolved",
      description: "Your child experienced a minor fall during playtime, but was promptly attended to with first aid. They are doing well."
    },

    {
      name: "Allergic Reaction",
      date: "Nov 14, 2023",
      duration: "N/A",
      status: "Resolved",
      description: "Your child had a mild allergic reaction to a snack, but they were quickly treated and are doing fine now."
    },
    {
      name: "Vomiting",
      date: "Nov 13, 2023",
      duration: "N/A",
      status: "Resolved",
      description: "Your child felt unwell after lunch but recovered quickly. They were sent home with your consent for further rest."
    },
    {
      name: "Lost Child",
      date: "Nov 13, 2023",
      duration: "N/A",
      status: "Resolved",
      description: "Your child was briefly separated from the group during outdoor play, but was quickly found and safely returned."
    },
  ];
  

const ChildIncidentReport = () => {
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
    <div className="inline-flex w-full flex-col items-start justify-start rounded-[14px] border border-slate-100 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex w-full items-center justify-between">
        <h3 className="text-base font-semibold leading-relaxed text-zinc-800 dark:text-neutral-100">
          Child Incident Report
        </h3>
        <button className="cursor-pointer text-base font-medium text-emerald-400">
          See All
        </button>
      </div>

      <TableContainer component={''} className="mt-7">
        <Table aria-label="child incident report table">
          <TableHead>
            <TableRow>
              <TableCell  className='dark:text-neutral-100'>Incident Name</TableCell>
              <TableCell className='dark:text-neutral-100'>Description</TableCell>
              <TableCell className='dark:text-neutral-100'>Status</TableCell>
              <TableCell className='dark:text-neutral-100'>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {incidents.map((incident, index) => (
              <TableRow key={index}>
                <TableCell className='dark:text-neutral-100'>{incident.name}</TableCell>
                <TableCell  className='dark:text-neutral-100'>{incident.description}</TableCell>
                <TableCell style={{ color: statusColor(incident.status) }}>
                  {incident.status}
                </TableCell>
                <TableCell  className='dark:text-neutral-100'>{incident.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ChildIncidentReport;
