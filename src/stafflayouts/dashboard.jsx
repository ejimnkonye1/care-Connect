
import Events from "../components/events";
import Childatt from "../staff/childatt";
import Childlist from "../staff/childlist";
import Childlschdule from "../staff/childschedule";
import Childlupdates from "../staff/childup";
import { WelcomeStaff } from "../staff/welcome";

// eslint-disable-next-line react/prop-types
const StaffLayout = () => {
  return (
    <section className="flex min-h-screen  flex-wrap content-start gap-3 bg-neutral-50 px-4 py-4 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="h-min w-full lg:w-[calc(35%_-_10px)] animate-fadeInLeft">
        <WelcomeStaff  />
      </div>

      <div className="h-min w-full flex-grow lg:w-[calc(30%_-_10px)] animate-fadeUp delay-100">
       <Childlschdule />
      </div>
      
      <div className="h-min w-full flex-grow lg:w-[calc(30%_-_10px)] animate-fadeDown delay-200">
       
        <Childlupdates />
      </div>

      <div
        className="h-min w-full lg:w-[calc(35%_-_10px)] animate-fadeUp delay-300"
        onClick={() => console.log("clicked")}
      >
        <Childlist />
      </div>

      <div className="h-min w-full flex-grow lg:w-[calc(30%_-_10px)] animate-fadeUp delay-400">
        <Events />
      </div>

      <div className="h-min w-full flex-grow lg:w-[calc(30%_-_10px)] animate-fadeLeft delay-500">
        {/* <Events /> */}
        <Childatt />
      </div>
    </section>
  );
};

export default StaffLayout;
