import { useState } from 'react';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // import default styles



const Calendars = () => {
  const [date, setDate] = useState(new Date());


  return (

    <div className="inline-flex w-full flex-col items-start justify-start rounded-[14px] border border-slate-100 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <div className=' h-[380px]'>
        <Calendar
          onChange={setDate}
          value={date}
          className="rounded-lg w-full h-[30px]  shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
        />
      </div>
    </div>
  );
};

export default Calendars;
