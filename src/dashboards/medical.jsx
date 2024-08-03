/* eslint-disable no-unused-vars */

import HealthAndSafetyForm from "./health";


import MedicalAlertSystem from "./med";
import { IncidentReporting } from "./report";

export const Medical = () => {
       // eslint-disable-next-line no-undef
     
     
    return(
        <div>
            
          
           {/* <HealthAndSafetyForm /> */}
          
           <IncidentReporting />
           {/* <MedicalAlertSystem /> */}
        </div>
    )
}