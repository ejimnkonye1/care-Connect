import Add from "./add";
import WeeklyAttendance from "./at";
import DailyUpdates from "./daily";
import Events from "./events";
import Fees from "./fee";
import { Welcome } from "./welcome";

// eslint-disable-next-line react/prop-types
const Layout = () => {
  return (
    <section className="flex min-h-screen flex-wrap content-start gap-3 bg-neutral-50 px-4 py-4 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="h-min w-full lg:w-[calc(35%_-_10px)] animate-fadeInLeft">
        <Welcome  />
      </div>

      <div className="h-min w-full flex-grow lg:w-[calc(30%_-_10px)] animate-fadeUp delay-100">
        <Add />
      </div>
      
      <div className="h-min w-full flex-grow lg:w-[calc(30%_-_10px)] animate-fadeDown delay-200">
        <WeeklyAttendance />
      </div>

      <div
        className="h-min w-full lg:w-[calc(35%_-_10px)] animate-fadeUp delay-300"
        onClick={() => console.log("clicked")}
      >
        <Fees />
      </div>

      <div className="h-min w-full flex-grow lg:w-[calc(30%_-_10px)] animate-fadeUp delay-400">
        <Events />
      </div>

      <div className="h-min w-full flex-grow lg:w-[calc(30%_-_10px)] animate-fadeLeft delay-500">
        <DailyUpdates />
      </div>
    </section>
  );
};

export default Layout;
