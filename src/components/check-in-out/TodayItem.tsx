import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Activity } from "./useTodayActivity";

interface TodayItemProps {
  activity: Activity;
}

export default function TodayItem({ activity }: TodayItemProps) {
  const { id, status, guests, numNights } = activity;

  return (
    <li className="grid grid-cols-[9rem_2rem_1fr_7rem_9rem] gap-5 items-center text-sm py-2 border-b border-gray-200 dark:border-gray-800 first:border-t">
      <div>
        {status === "unconfirmed" && (
          <span className="inline-flex items-center rounded-md bg-green-50 dark:bg-green-900/30 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-300 ring-1 ring-inset ring-green-600/20">
            Arriving
          </span>
        )}
        {status === "checked-in" && (
          <span className="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-900/30 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-300 ring-1 ring-inset ring-blue-600/20">
            Departing
          </span>
        )}
      </div>

      <img
        src={guests.countryFlag}
        alt={`Flag of ${guests.country}`}
        className="w-4 h-4 rounded-full object-cover"
      />

      <div className="font-medium">{guests.fullName}</div>

      <div>{numNights} nights</div>

      {status === "unconfirmed" && (
        <Button asChild size="sm" className="w-full">
          <Link to={`/checkin/${id}`}>Check in</Link>
        </Button>
      )}

      {status === "checked-in" && (
        <Button
          size="sm"
          variant="destructive"
          className="w-full"
          onClick={() => {
            /* Add checkout handling */
          }}
        >
          Check out
        </Button>
      )}
    </li>
  );
}

// Add custom scroll hiding styles
const styles = `
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`;

if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
