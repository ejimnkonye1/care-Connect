import { Calendar } from "iconsax-react";

const dailyUpdates = [
  {
    childName: "Ella Johnson",
    update: "Had lunch and played with building blocks.",
    date: "Dec 18, 2023",
    status: "Completed",
  },
  {
    childName: "Ella Johnson",
    update: "Participated in storytime and napped.",
    date: "Dec 17, 2023",
    status: "Ongoing",
  },
  {
    childName: "Ella Johnson",
    update: "Painted a drawing and read a book.",
    date: "Dec 16, 2023",
    status: "Completed",
  },
];

const DailyUpdates = () => {
  const childName = dailyUpdates[0]?.childName || "No Name"; // Show the first child's name or fallback to "No Name."

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
          Daily Updates for {childName}
        </h3>
        <button className="cursor-pointer text-base font-medium text-emerald-400">
          See All
        </button>
      </div>

      <div className="scrollbar mx-auto mt-7 block w-full overflow-x-auto text-left">
        {dailyUpdates.map((update, index) => (
          <div
            key={index}
            className="flex w-full items-start justify-between py-4 border-b border-gray-200 dark:border-neutral-700"
          >
            <div className="flex flex-col text-sm font-medium text-gray-700 dark:text-neutral-300">
              <p className="text-sm">{update.update}</p>
              <span className="inline-flex items-center text-xs text-gray-500 dark:text-neutral-400">
                <Calendar />
                <span className="pl-2">{update.date}</span>
              </span>
            </div>

            <div>
              <span
                className={`h-6 inline-flex cursor-pointer items-center rounded-lg px-3 py-1 text-xs font-medium ${statusColor(
                  update.status
                )}`}
              >
                {update.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyUpdates;
