import { Calendar } from "iconsax-react";
import { useEffect, useState } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { firestore } from '../firebase';

const Childlupdates = () => {
  const [mealUpdates, setMealUpdates] = useState([]);

  useEffect(() => {
    const mealUpdatesRef = collection(firestore, 'mealUpdates');
    const q = query(mealUpdatesRef);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const mealUpdatesData = snapshot.docs.map((doc) => doc.data());

      // Group meal updates by child name and find the latest one for each child
      const groupedUpdates = mealUpdatesData.reduce((acc, update) => {
        const childKey = update.childName;
        if (!acc[childKey] || new Date(update.date) > new Date(acc[childKey].date)) {
          acc[childKey] = update; // Keep the latest update for each child
        }
        return acc;
      }, {});

      // Convert the grouped updates into an array for rendering
      const latestMealUpdates = Object.values(groupedUpdates);
      setMealUpdates(latestMealUpdates);
    });

    return () => unsubscribe();
  }, []);

  // Limit to 2 updates
  const limitedMealUpdates = mealUpdates.slice(0, 2);

  return (
    <div className="inline-flex w-full flex-col items-start justify-start rounded-[14px] border border-slate-100 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex w-full items-center justify-between">
        <h3 className="text-base font-semibold leading-relaxed text-zinc-800 dark:text-neutral-100">
          Meal Updates 
        </h3>
        <button className="cursor-pointer text-base font-medium text-emerald-400">
          See All
        </button>
      </div>

      <div className="scrollbar mx-auto mt-7 block w-full overflow-x-auto text-left">
        {limitedMealUpdates.length > 0 ? (
          limitedMealUpdates.map((mealUpdate, index) => (
            <div
              key={index}
              className="grid grid-cols-2 w-full py-4 border-b border-gray-200 dark:border-neutral-700"
            >
              <div className="flex flex-col text-sm font-medium text-gray-700 dark:text-neutral-300">
                <p className="text-sm">{mealUpdate.childName}</p>
                <span className="inline-flex items-center text-xs text-gray-500 dark:text-neutral-400">
                  <Calendar />
                  <span className="pl-2">{mealUpdate.date}</span> {/* Display the date of the meal update */}
                </span>
              </div>

              <div>
                <span className="text-sm">{mealUpdate.food}</span> {/* Display the meal description */}
              </div>
            </div>
          ))
        ) : (
          <p>No meal updates available for any children.</p>
        )}
      </div>
    </div>
  );
};

export default Childlupdates;
