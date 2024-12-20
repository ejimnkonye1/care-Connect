
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,

} from "@mui/material";


const mealUpdates = [
  {
    childName: "Ella Johnson",
    meal: "Scrambled eggs and toast",
    type: "Breakfast",
    date: "Dec 18, 2023",
    status: "Completed",
  },
  {
    childName: "Ella Johnson",
    meal: "Grilled chicken with rice",
    type: "Lunch",
    date: "Dec 17, 2023",
    status: "Ongoing",
  },
  {
    childName: "Ella Johnson",
    meal: "Apple slices with peanut butter",
    type: "Snack",
    date: "Dec 16, 2023",
    status: "Completed",
  },
];

const MealUpdates = () => {
  const childName = mealUpdates[0]?.childName || "No Name"; // Show the first child's name or fallback to "No Name."

  const statusColor = (status) => {
    switch (status) {
      case "Completed":
        return "green";
      case "Ongoing":
        return "orange";
      default:
        return "gray";
    }
  };

  return (
    <div className="inline-flex w-full flex-col items-start justify-start rounded-[14px] border border-slate-100 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex w-full items-center justify-between">
        <h3 className="text-base font-semibold leading-relaxed text-zinc-800 dark:text-neutral-100">
          Meal Updates for {childName}
        </h3>
        <button className="cursor-pointer text-base font-medium text-emerald-400">
          See All
        </button>
      </div>

      <TableContainer component={''} className="mt-7">
        <Table aria-label="meal updates table">
          <TableHead>
            <TableRow>
              <TableCell className="dark:text-neutral-100" >Meal Type</TableCell>
              <TableCell className="dark:text-neutral-100">Meal</TableCell>
              <TableCell className="dark:text-neutral-100">Date</TableCell>
              <TableCell className="dark:text-neutral-100">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mealUpdates.map((update, index) => (
              <TableRow key={index}>
                <TableCell className="dark:text-neutral-100">{update.type}</TableCell>
                <TableCell className="dark:text-neutral-100">{update.meal}</TableCell>
                <TableCell>
                  <div className="dark:text-neutral-100">
                 
                    {update.date}
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    style={{
                      backgroundColor: statusColor(update.status),
                      color: "white",
                      padding: "5px 10px",
                      borderRadius: "5px",
                    }}
                  >
                    {update.status}
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

export default MealUpdates;
