import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

interface Guest {
  fullName: string;
  country: string;
  countryFlag: string;
}

export interface Activity {
  id: string;
  status: "unconfirmed" | "checked-in";
  guests: Guest;
  numNights: number;
}

export function useTodayActivity() {
  const { isLoading, data: activities = [] } = useQuery<Activity[]>({
    queryFn: getStaysTodayActivity,
    queryKey: ["today-activity"],
  });

  return { activities, isLoading };
}
