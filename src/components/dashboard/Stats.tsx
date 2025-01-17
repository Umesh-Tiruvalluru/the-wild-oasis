import {
  Briefcase,
  CircleDollarSign,
  CalendarDays,
  BarChart3,
} from "lucide-react";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

interface Booking {
  totalPrice: number;
  numNights?: number;
}

interface StatsProps {
  bookings: Booking[]; // Array of bookings
  confirmedStays: Booking[]; // Array of confirmed stays
  numDays: number; // Total number of days
  cabinCount: number; // Number of cabins available
}

function Stats({ bookings, confirmedStays, numDays, cabinCount }: StatsProps) {
  // 1. Total number of bookings
  const numBookings = bookings.length;

  // 2. Total sales
  const sales = bookings.reduce(
    (acc: number, cur: Booking) => acc + cur.totalPrice,
    0,
  );

  // 3. Total number of check-ins
  const checkins = confirmedStays.length;

  const occupation =
    confirmedStays
      .filter((cur: Booking) => cur.numNights !== undefined)
      .reduce(
        (acc: number, cur: Booking) => acc + (cur.numNights as number),
        0,
      ) /
    (numDays * cabinCount);

  return (
    <div className="flex justify-between items-center">
      <Stat
        title="Bookings"
        color="blue"
        icon={<Briefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<CircleDollarSign />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<CalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<BarChart3 />}
        value={Math.round(occupation * 100) + "%"}
      />
    </div>
  );
}

export default Stats;
