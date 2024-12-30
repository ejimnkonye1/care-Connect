
import { Calendar } from "iconsax-react";




const Childlupdates = () => {

  const dailyUpdates = [
    {
      childName: "Ella Johnson",
      update: "Had lunch and played with building blocks.",
      date: "Dec 18, 2023",
      status: "Completed",
    },
    {
      childName: "John doe",
      update: "Participated in storytime and napped.",
      date: "Dec 17, 2023",
      status: "Ongoing",
    },
    // {
    //   childName: "luke dee",
    //   update: "Painted a drawing and read a book.",
    //   date: "Dec 16, 2023",
    //   status: "Completed",
    // },
  ];
  // eslint-disable-next-line no-unused-vars
  const statusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-500 text-white";
      case "Ongoing":
        return "bg-yellow-400 text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };
  return (
    
   <div className="inline-flex w-full flex-col items-start justify-start rounded-[14px] border border-slate-100 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
       <div className="flex w-full items-center justify-between">
         <h3 className="text-base font-semibold leading-relaxed text-zinc-800 dark:text-neutral-100">
           Daily Updates for Childrens
         </h3>
         <button className="cursor-pointer text-base font-medium text-emerald-400">
           See All
         </button>
       </div>
 
       <div className="scrollbar mx-auto mt-7 block w-full overflow-x-auto text-left">
         {dailyUpdates.map((update, index) => (
           <div
             key={index}
             className="grid grid-cols-2 w-full  py-4 border-b border-gray-200 dark:border-neutral-700"
           >
             <div className="flex flex-col text-sm font-medium text-gray-700 dark:text-neutral-300">
               <p className="text-sm">{update.childName}</p>
               <span className="inline-flex items-center text-xs text-gray-500 dark:text-neutral-400">
                 <Calendar />
                 <span className="pl-2">{update.date}</span>
               </span>
             </div>
 
             <div>
             <span className="text-sm">{update.update}</span>
            
             </div>
           

           </div>
         ))}
       </div>
     </div>




 
  );
};

export default Childlupdates;