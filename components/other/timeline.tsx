import { Flame, Bell, Truck, FireExtinguisher, ClipboardCheck } from "lucide-react";
import { TimelineLayout } from "../timeline/src/components/timeline";

export function IncidentTimeLine() {
  return (
    <TimelineLayout
      animate
      className="min-h-[600px] w-full max-w-2xl mx-auto p-8 flex items-center justify-center"
      connectorColor="primary"
      iconColor="primary"
      items={[
        {
          id: 1,
          title: "Alarm Triggered",
          date: "2025-03-14 08:32",
          description:
            "Smoke detected in Building A, fire alarm automatically activated and emergency services notified.",
          icon: <Bell />,
          status: "completed",
        },
        {
          id: 2,
          title: "Fire Crew Dispatched",
          date: "2025-03-14 08:35",
          description:
            "Fire response unit deployed from Station 7. First responders en route to the scene.",
          icon: <Truck />,
          status: "completed",
        },
        {
          id: 3,
          title: "Fire Containment in Progress",
          date: "2025-03-14 08:50",
          description:
            "Firefighters engaged on the east wing; suppression systems activated to control the blaze.",
          icon: <Flame />,
          status: "in-progress",
        },
        {
          id: 4,
          title: "Fire Extinguished",
          date: "2025-03-14 09:15",
          description:
            "Fire fully contained and extinguished. Overhaul operations underway to prevent re-ignition.",
          icon: <FireExtinguisher />,
          status: "pending",
        },
        {
          id: 5,
          title: "Post-Incident Inspection",
          date: "2025-03-14 10:00",
          description:
            "Damage assessment and safety inspection completed. Area cleared for investigation.",
          icon: <ClipboardCheck />,
          status: "pending",
        },
      ]}
      size="md"
    />
  );
}
