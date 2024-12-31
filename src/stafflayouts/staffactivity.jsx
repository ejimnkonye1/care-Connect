
import Setactivity from "../staff/setactivity";



// eslint-disable-next-line react/prop-types
const StaffLayout = () => {
  return (
    <section className="flex min-h-screen  flex-wrap content-start gap-3 bg-neutral-50 px-4 py-4 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="h-min w-full lg:w-[calc(100%_-_10px)] animate-fadeDown">
        <Setactivity />
      </div>

   
      
    
    </section>
  );
};

export default StaffLayout;
