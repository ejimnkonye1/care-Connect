
import WeeklyAttendance from "../components/attendace";
import Events from "../components/events";
import Fees from "../components/fee";
import { Welcome } from "../components/welcome";
import Childdetails from "../components/childdetails";

// eslint-disable-next-line react/prop-types
const Layout = () => {
  return (
    <section className="flex min-h-screen  flex-wrap content-start gap-3 bg-neutral-50 px-4 py-4 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="h-min w-full lg:w-[calc(35%_-_10px)] animate-fadeInLeft">
        <Welcome  />
      </div>

      <div className="h-min w-full flex-grow lg:w-[calc(30%_-_10px)] animate-fadeUp delay-100">
        <Childdetails />
      </div>
      
      <div className="h-min w-full flex-grow lg:w-[calc(30%_-_10px)] animate-fadeDown delay-200">
        <WeeklyAttendance />
      </div>

      <div
        className="h-min w-full lg:w-[calc(50%_-_10px)] animate-fadeUp delay-300"
        onClick={() => console.log("clicked")}
      >
        <Fees />
      </div>

      <div className="h-min w-full flex-grow lg:w-[calc(50%_-_10px)] animate-fadeUp delay-400">
        <Events />
      </div>

    
    </section>
  );
};

export default Layout;
