
import HealthAndSafetyForm from "./health";

import IncidentReporting from "./report";
import MedicalAlertSystem from "./med";
import AttendanceTable from "./attendance";
import AttendanceChart from "./charts";
import { useEffect, useState } from "react";
export const Medical = () => {
       // eslint-disable-next-line no-undef
       const [attendanceRecords, setAttendanceRecords] = useState([]);

       useEffect(() => {
         // Call API to fetch attendance records
         const records = [
           { date: '2023-02-01', checkInTime: '08:00', checkOutTime: '17:00' },
           { date: '2023-02-02', checkInTime: '08:30', checkOutTime: '17:30' },
           { date: '2023-02-03', checkInTime: '09:00', checkOutTime: '18:00' },
         ];
         setAttendanceRecords(records);
       }, []);
    return(
        <div>
            <AttendanceTable attendanceRecords={attendanceRecords} />
            <AttendanceChart attendanceRecords={attendanceRecords} />
          
           <HealthAndSafetyForm />
          
           <IncidentReporting />
           <MedicalAlertSystem />
        </div>
    )
}