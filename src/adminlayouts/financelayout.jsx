

import { FeeHistory } from "../admin/feehistory";
import { SetFees } from "../admin/setfee";

// eslint-disable-next-line react/prop-types
const AdminLayout = () => {
  return (
    <section className="flex min-h-screen  flex-wrap content-start gap-3 bg-neutral-50 px-4 py-4 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="h-min w-full lg:w-[calc(50%_-_10px)] animate-fadeInLeft">
        <SetFees  />
      </div>
      <div className="h-min w-full lg:w-[calc(50%_-_10px)] animate-fadeInLeft">
        <FeeHistory  />
      </div>
  
    </section>
  );
};

export default AdminLayout;