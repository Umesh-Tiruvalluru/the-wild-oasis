import React from "react";
import Loader from "../ui/Loader";
import Stats from "./Stats";
import useRecentBooking from "./useRecentBooking";
import useRecentStays from "./useRecentStays";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const DashboardLayout: React.FC = () => {
  const { bookings, isPending: isLoading1 } = useRecentBooking();
  const { confirmedStays, isPending: isLoading2, numDays } = useRecentStays();

  if (isLoading1 || isLoading2) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8">
      <div className="w-full">
        <Stats
          bookings={bookings || []}
          confirmedStays={confirmedStays || []}
          numDays={numDays}
          cabinCount={10}
        />
      </div>

      <div className="w-full">
        <SalesChart bookings={bookings || []} numDays={numDays} />
      </div>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        <TodayActivity />

        <div className="w-full lg:w-1/2">
          <DurationChart stays={confirmedStays || []} />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
