import { useState } from 'react';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // import default styles



const Calendars = () => {
  const [date, setDate] = useState(new Date());


  return (

     
      <div className=' h-[600px]'>
        <Calendar
          onChange={setDate}
          value={date}
          className="rounded-lg w-full h-[380px] border border-slate-100 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
        />
      </div>
    
  );
};

export default Calendars;
