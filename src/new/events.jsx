import { Calendar2 } from "iconsax-react";
const events = [
    {
      name: "Parent Orientation Day",
      date: "Nov 15, 2023",
      status: "Full Day",

    },
    {
      name: "Nutrition Awareness Session",
      date: "Nov 15, 2023",
      status: "Half Day",

    },
    {
      name: "Child Safety Workshop",
      date: "Nov 14, 2023",
      status: "Half Day",

    },
    {
      name: "Health Screening Day",
      date: "Nov 13, 2023",
      status: "Full Day",

    },
  ];
  
  

const Events = () => {
 

  const statusColor = (status) => {
    switch (status) {
      case "Nov 15, 2023":
        return "text-emerald-400";
      case "Nov 14, 2023":
        return "text-red-500";
      default:
    }
  };

  return (
    <div className="inline-flex w-full flex-col items-start justify-start rounded-[14px] border border-slate-100 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex w-full items-center justify-between">
        <h3 className="text-base font-semibold leading-relaxed text-zinc-800 dark:text-neutral-100">
        Events List
        </h3>
        <button className="cursor-pointer text-base font-medium text-emerald-400">
          See All
        </button>
      </div>

      <div className="scrollbar mx-auto mt-7 block w-full overflow-x-auto text-left">
          {events.map((event, index) => (
         <div key={index} className="flex justify-between">
         <div className="flex flex-col py-3 text-sm font-medium text-gray-700 dark:text-neutral-300">
           {event.name}
           <span className="inline-flex">
             <Calendar2 />
             <span className="pt-1"> {event.date}</span>
           </span>
         </div>
       
         <div
           className='pt-6'
         >
            <button className="h-6 inline-flex cursor-pointer items-center py-1 text-xs dark:text-red-200 bg-red-500 rounded-lg px-2">
            {event.status}
            </button>
         
         </div>
       </div>
          ))}
        
      </div>
    </div>
  );
};

export default Events;