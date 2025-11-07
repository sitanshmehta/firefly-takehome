import { Flame } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";

export type IIncidentCard = {
  title: string;
  details: string;
  location: string;
  time: string;
  severity: string;
  distance: string;
};

//different incidents might have their own incident cards - robberies, fires, car accidents etc need to display unique 
// and common info, and so a base incident card could be used by each specific incident
export const IncidentCard = ({
  title,
  details,
  location,
  time,
  severity,
  distance,
}: IIncidentCard) => (
  <Card className="border-l-1 shadow-xl bg-white/95 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
    <CardHeader className="p-5 pb-3">
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-2">
          <Flame className="text-red-600 h-6 w-6" />
          <CardTitle className="text-2xl font-bold text-red-700 tracking-tight">
            {title}
          </CardTitle>
        </div>

        <span
          className={`ml-4 py-1 px-3 rounded-md text-sm font-semibold uppercase tracking-wide ${
            severity === "High"
              ? "bg-red-100 text-red-700 border border-red-400"
              : "bg-yellow-100 text-yellow-700 border border-yellow-400"
          }`}
        >
          {severity}
        </span>
      </div>

      <CardDescription className="mt-2 text-base text-gray-700 leading-snug">
        {details}
      </CardDescription>
    </CardHeader>

    <CardContent className="p-5 pt-0 text-sm text-gray-600 space-y-2 border-t border-gray-100">
      <p>
        <strong className="text-gray-800">📍 Location:</strong> {location}
      </p>
      <p>
        <strong className="text-gray-800">⏱ Time:</strong> {time}
      </p>
      <p>
        <strong className="text-gray-800">📏 Distance from you:</strong>{" "}
        <span className="text-red-700 font-semibold">{distance}</span>
      </p>
    </CardContent>
  </Card>
);
