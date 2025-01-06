

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
  
  } from "@mui/material";
  const Childatt = () => {
  
    const List = [
      {
        childName: "Ella Johnson",
        Attandnace: "Present",
        Allergies: " Peanuts",
        
      },
      {
        childName: "Ella Johnson",
        Attandnace: "Absent",
        Allergies: " Peanuts",
        
      },
      {
        childName: "Ella Johnson",
        Attandnace: "Absent",
  
        
      },
    ];
    return (
      
   <div className="inline-flex w-full flex-col items-start justify-start rounded-[14px] border border-slate-100 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900 shadow-md">
   <div className="flex w-full items-center justify-between">
          <h3 className="text-base font-semibold leading-relaxed text-zinc-800 dark:text-neutral-100">
          Attandance today
          </h3>
          <button className="cursor-pointer text-base font-medium text-emerald-400">
            See All
          </button>
        </div>
        <div className="mb-4 flex w-full items-center justify-between">
          <div className="flex items-center space-x-3">
          </div>
        </div>
  
        {/* Child Details */}
      
        <TableContainer component={''} className="mt-1">
          <Table aria-label="meal updates table">
            <TableHead>
              <TableRow>
                <TableCell className="dark:text-neutral-100" >Name</TableCell>
                <TableCell className="dark:text-neutral-100">Attandnace</TableCell>

  
              </TableRow>
            </TableHead>
            <TableBody>
              {List.map((list, index) => (
                <TableRow key={index}>
                  <TableCell className="dark:text-neutral-100">{list.childName}</TableCell>
                  <TableCell className="dark:text-neutral-100">{list.Attandnace}</TableCell>
                
                 
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
     
      </div>
  
  
  
  
   
    );
  };
  
  export default Childatt;