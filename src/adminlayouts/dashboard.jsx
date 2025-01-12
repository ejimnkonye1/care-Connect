
import StaffList2 from "../admin/staff2";
import { WelcomeAdmin } from "../admin/welcome";
import Events from "../components/events";
import Childlist from "../staff/childlist";
import Childlschdule from "../staff/childschedule";

// eslint-disable-next-line react/prop-types
const AdminLayout = () => {
  return (
    <section className="flex min-h-screen  flex-wrap content-start gap-3 bg-neutral-50 px-4 py-4 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="h-min w-full lg:w-[calc(35%_-_10px)] animate-fadeInLeft">
        <WelcomeAdmin  />
      </div>

      <div className="h-min w-full flex-grow lg:w-[calc(30%_-_10px)] animate-fadeUp delay-100">
      <Childlschdule />
      </div>
      
      <div className="h-min w-full flex-grow lg:w-[calc(30%_-_10px)] animate-fadeDown delay-200">
       <StaffList2 />
      </div>

      <div
        className="h-min w-full lg:w-[calc(50%_-_10px)] animate-fadeUp delay-300"
        onClick={() => console.log("clicked")}
      >
        
        <Events />
      </div>

      <div className="h-min w-full flex-grow lg:w-[calc(50%_-_10px)] animate-fadeUp delay-400">
      <Childlist />
      </div>

      
    </section>
  );
};

export default AdminLayout;
