import Add from "./add";
import DailyUpdates from "./daily";
import Events from "./events";
import Fees from "./fee";
import { Welcome } from "./welcome";


// eslint-disable-next-line react/prop-types
const Layout = ({ theme }) => {
  return (
    <section className="flex min-h-screen flex-wrap content-start gap-3  bg-neutral-50 px-4 py-4 dark:border-neutral-800 dark:bg-neutral-950">
     
      <div className="h-min w-full xl:w-[calc(41%_-_10px)]">
        <Welcome theme={theme} />
      </div>
     
      <div className="h-min w-full flex-grow xl:w-[calc(45%_-_10px)]">
      
        <Add/>
      </div>
   
      <div
        className="h-min w-full lg:w-[calc(35%_-_10px)]"
        onClick={() => console.log("clicked")}
      >
      
        <Fees />
      </div>
     
      <div className="h-min w-full flex-grow lg:w-[calc(30%_-_10px)]">
      
        <Events />
      </div>
      <div className="h-min w-full flex-grow lg:w-[calc(30%_-_10px)]">
      
      <DailyUpdates />
    </div>
    </section>
  );
};

export default Layout;