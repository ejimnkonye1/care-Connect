import Add from "./add";
import { Welcome } from "./welcome";


// eslint-disable-next-line react/prop-types
const Layout = ({ theme }) => {
  return (
    <section className="flex min-h-screen flex-wrap content-start gap-3  bg-neutral-50 px-4 py-4 dark:border-neutral-800 dark:bg-neutral-950">
      {/* SALES TREND */}
      <div className="h-min w-full xl:w-[calc(41%_-_10px)]">
        <Welcome theme={theme} />
      </div>
      {/* ANALYTICS */}
      <div className="h-min w-full flex-grow xl:w-[calc(45%_-_10px)]">
        {/* <Analytics /> */}
        <Add/>
      </div>
      {/* LAST ORDERS */}
      <div
        className="h-min w-full lg:w-[calc(55%_-_10px)]"
        onClick={() => console.log("clicked")}
      >
        {/* <Orders /> */}
      </div>
      {/* TOP PLATFORMS */}
      <div className="h-min w-full flex-grow lg:w-[calc(45%_-_10px)]">
        {/* <TopPlatforms /> */}
      </div>
    </section>
  );
};

export default Layout;