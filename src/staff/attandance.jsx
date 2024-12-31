
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,

  Button,
} from "@mui/material";

const AttendanceTable = () => {
  const childname = [
    { name: "Emma Johnson", status: "Present" },
    { name: "Noah Brown", status: "Absent" },
    { name: "Liam Smith", status: "Present" },
    { name: "Sophia Davis", status: "Absent" },
  ];
  const statusColor = (status) => {
    switch (status) {
      case "Present":
        return "green";
      case "Absent":
        return "Red";
      default:
        return "gray";
    }
  };

  return (
    <div className="inline-flex w-full flex-col items-start justify-start rounded-[14px] border border-slate-100 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex w-full items-center justify-between">
        <h3 className="text-base font-semibold leading-relaxed text-zinc-800 dark:text-neutral-100">
          List of children
        </h3>
        <button className="cursor-pointer text-base font-medium text-emerald-400">
          See All
        </button>
      </div>
 <TableContainer component={''}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Child Name</TableCell>
            <TableCell className="dark:text-neutral-100" align="center">Mark Present</TableCell>
            <TableCell  className="dark:text-neutral-100" align="center">Mark Absent</TableCell>
            <TableCell  className="dark:text-neutral-100" align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {childname.map((child, index) => (
            <TableRow key={index}>
              <TableCell  className="dark:text-neutral-100">{child.name}</TableCell>
              <TableCell align="center">
                <Button variant="contained" color="primary">
                  Mark Present
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button variant="contained" color="secondary">
                  Mark Absent
                </Button>
              </TableCell>
              <TableCell  align="center"> <span 
                    style={{
                      color: statusColor(child.status),
                   
                      
                    }}>
                {child.status}
              </span>
                
</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
   
  );
};

export default AttendanceTable;
