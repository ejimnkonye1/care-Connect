/* eslint-disable no-unused-vars */

import { ParentActivityUpdates } from "./activitypar";

import { IncidentReporting } from "./report";

export const Medical = () => {
       // eslint-disable-next-line no-undef
     
     
    return(
        <div className="row">
            <div className="col-md-6">
            <ParentActivityUpdates />
            </div>
            
           <div className="col-md-6">
                   
         <IncidentReporting />
            </div>
          
        
        </div>
    )
}