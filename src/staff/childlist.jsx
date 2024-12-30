

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,

} from "@mui/material";
const Childlist = () => {

  const List = [
    {
      childName: "Ella Johnson",
      Age: "3",
      Allergies: " Peanuts",
      
    },
    {
      childName: "Ella Johnson",
      Age: "3",
      Allergies: " Peanuts",
      
    },
    {
      childName: "Ella Johnson",
      Age: "3",
      Allergies: " Peanuts",
      
    },
  ];
  return (
    
 <div className="inline-flex w-full flex-col items-start justify-start rounded-[14px] border border-slate-100 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900 shadow-md">
 <div className="flex w-full items-center justify-between">
        <h3 className="text-base font-semibold leading-relaxed text-zinc-800 dark:text-neutral-100">
        Children List
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
    
      <TableContainer component={''} className="mt-7">
        <Table aria-label="meal updates table">
          <TableHead>
            <TableRow>
              <TableCell className="dark:text-neutral-100" >Name</TableCell>
              <TableCell className="dark:text-neutral-100">Age</TableCell>
              <TableCell className="dark:text-neutral-100">Allergies</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {List.map((list, index) => (
              <TableRow key={index}>
                <TableCell className="dark:text-neutral-100">{list.childName}</TableCell>
                <TableCell className="dark:text-neutral-100">{list.Age}</TableCell>
                <TableCell>
                  <div className="dark:text-neutral-100">
                 
                    {list.Allergies}
                  </div>
                </TableCell>
               
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
   
    </div>




 
  );
};

export default Childlist;