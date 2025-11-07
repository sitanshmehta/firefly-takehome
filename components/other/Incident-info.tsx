import { IncidentCard } from "./incident-card";
import { IncidentTimeLine } from "./timeline";

export function IncidentInfo(){
    return(
        <div>
            <IncidentCard
            title="Fire Reported"
            details="Emergency services are en route to the scene."
            location="Dundas St W & Bay St, Toronto"
            time="3:02 PM"
            severity="High"
            distance="200m" //assume this will be calculated by backend and return in appropriate units
            />            
      <div className="mt-6 w-full h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 rounded-lg p-2">
        <IncidentTimeLine />
      </div>
        </div>
    )
}