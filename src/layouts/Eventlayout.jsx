

import Calendars from "../components/calender";
import Events from "../components/events";




// eslint-disable-next-line react/prop-types
const Layout = () => {
  return (
    <section className="flex min-h-screen  flex-wrap content-start gap-3 bg-neutral-50 px-4 py-4 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="h-min w-full lg:w-[calc(50%_-_10px)] animate-fadeInLeft">
        <Calendars  />
      </div>

      <div className="h-min w-full lg:w-[calc(50%_-_10px)] animate-fadeInRight">
        <Events />
      </div>
      
    
    </section>
  );
};

export default Layout;
