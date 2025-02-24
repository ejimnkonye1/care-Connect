import { Calendar2 } from "iconsax-react";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase"; 
import SkeletonLoader from "../reuseable/skelenton";

// const events = [
//   {
//     name: "Parent Orientation Day",
//     date: "Nov 15, 2023",
//     status: "Full Day",
//   },
//   {
//     name: "Nutrition Awareness Session",
//     date: "Nov 15, 2023",
//     status: "Half Day",
//   },
//   {
//     name: "Child Safety Workshop",
//     date: "Nov 14, 2023",
//     status: "Half Day",
//   },
//   {
//     name: "Health Screening Day",
//     date: "Nov 13, 2023",
//     status: "Full Day",
//   },
// ];

const Events = () => {
   const [events, setEvents] = useState({});
   const [loading, setLoading] = useState(true); 
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      try {
        const querySnapshot = await getDocs(collection(firestore, 'schoolEvents'));
        const eventsData = {};
        querySnapshot.forEach((doc) => {
          const event = doc.data();
          const formattedDate = event.date;
          if (eventsData[formattedDate]) {
            eventsData[formattedDate].push(event);
          } else {
            eventsData[formattedDate] = [event];
          }
        });
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching events: ", error);
      }
      setLoading(false)
    };

    fetchEvents();
  }, []);
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

    </div>
    <div className="scrollbar mx-auto mt-1 block w-full overflow-x-auto text-left h-[300px]">
    {loading ? (
      // Show skeleton loaders while data is loading
      <>
        <SkeletonLoader height={20}  count={4} />
        <SkeletonLoader height={20} count={4} />
      </>
    ) : (
      <>

      {Object.keys(events).length > 0 ? (
        Object.entries(events).map(([eventDate, eventList], index) => (
          eventList.map((event, idx) => (
            <div key={`${index}-${idx}`} className="flex justify-between py-3 border-b">
              <div className="flex flex-col text-sm font-medium text-gray-700 dark:text-neutral-300">
                <div className="flex items-center">
                  <span>{event.event}</span>
                </div>
                <div className="inline-flex items-center text-xs pt-1">
                  <Calendar2 className="mr-1" />
                  <span>{eventDate}</span>
                </div>
              </div>
              <div className="pt-3 flex items-center">
                <button
                  className={`h-6 inline-flex cursor-pointer items-center py-1 text-xs rounded-lg px-2 ${getStatusColor(event.status)}`}
                >
                  {event.status}
                </button>
              </div>
            </div>
          ))
        ))
      ) : (
        <p className="text-center text-gray-800 dark:text-neutral-300">
          No events for this date.
        </p>
      )}
          </>
    )}
    </div>
  </div>
  );
};

export default Events;
