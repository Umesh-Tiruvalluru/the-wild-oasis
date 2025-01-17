import { Card } from "@/components/ui/card";
import { useTodayActivity } from "./useTodayActivity";

import { Loader2 } from "lucide-react";
import TodayItem from "./TodayItem";

export default function TodayActivity() {
  const { activities, isLoading } = useTodayActivity();

  return (
    <Card className="flex flex-col gap-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">Today</h2>
      </div>

      {!isLoading ? (
        activities.length > 0 ? ( // activities will always be an array due to the default value
          <ul className="overflow-y-auto overflow-x-hidden scrollbar-hide">
            {activities.map((activity) => (
              <TodayItem activity={activity} key={activity.id} />
            ))}
          </ul>
        ) : (
          <p className="text-center text-lg font-medium mt-2 text-gray-600 dark:text-gray-300">
            No activity today...
          </p>
        )
      ) : (
        <div className="flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      )}
    </Card>
  );
}
