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
  const getStatusColor = (status) => {
    switch (status) {
      case "Full Day":
        return "bg-green-500 text-white";
      case "Half Day":
        return "bg-yellow-500 text-white";
      default:
        return "bg-gray-500 text-white";
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
          <div key={index} className="flex justify-between py-3 border-b">
            <div className="flex flex-col text-sm font-medium text-gray-700 dark:text-neutral-300">
              <div className="flex items-center">
                
                <span>{event.name}</span>
              </div>
              <div className="inline-flex items-center text-xs pt-1">
                <Calendar2 className="mr-1" />
                <span>{event.date}</span>
              </div>
            </div>

            <div className="pt-3 flex items-center">
              <button
                className={`h-6 inline-flex cursor-pointer items-center py-1 text-xs rounded-lg px-2 ${getStatusColor(
                  event.status
                )}`}
              >
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
