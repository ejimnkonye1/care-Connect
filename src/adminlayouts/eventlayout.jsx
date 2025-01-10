
import { EventList } from "../admin/eventlist";
import Setevents from "../admin/setevent";

// eslint-disable-next-line react/prop-types
const AdminLayout = () => {
  return (
    <section className="flex min-h-screen  flex-wrap content-start gap-3 bg-neutral-50 px-4 py-4 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="h-min w-full lg:w-[calc(50%_-_10px)] animate-fadeInLeft">
        <Setevents  />
      </div>
      <div className="h-min w-full lg:w-[calc(50%_-_10px)] animate-fadeInLeft">
        <EventList  />
      </div>
  
    </section>
  );
};

export default AdminLayout;
