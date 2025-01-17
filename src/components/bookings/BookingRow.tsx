import React from "react";
import { TableCell, TableRow } from "../ui/table";
import { format, isToday } from "date-fns";
import { formatCurrency, formatDistanceFromNow } from "@/utils/helpers";
import { BookingsDataProps } from "@/types";
import Menus from "../ui/Menus";
import { Eye, TicketsPlane, Trash2 } from "lucide-react";
import { TagNameStyles } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import useCheckout from "../check-in-out/useCheckout";

const BookingRow: React.FC<BookingsDataProps> = ({
  id: bookingId,
  cabins,
  guests,
  startDate,
  endDate,
  numNights,
  status,
  totalPrice,
}) => {
  const { name } = cabins as unknown as { name: string };
  const { fullName, email } = guests as unknown as {
    fullName: string;
    email: string;
  };

  const { checkoutBooking } = useCheckout({ bookingId });

  const navigate = useNavigate();

  return (
    <>
      <TableRow>
        <TableCell className="py-8 pl-4 text-base text-gray-700 dark:text-gray-300 font-semibold">
          {name}
        </TableCell>
        <TableCell className="">
          <p className="font-medium text-gray-700 dark:text-gray-300 text-base">
            {fullName}
          </p>
          <p className="text-gray-500">{email}</p>
        </TableCell>
        <TableCell>
          <p className="text-gray-700 dark:text-gray-300 text-base font-semibold">
            {" "}
            {isToday(new Date(startDate))
              ? "Today"
              : formatDistanceFromNow(format(startDate, "MMM dd YYYY"))}{" "}
            &rarr; {numNights} night stay
          </p>
          <p className="text-gray-500">
            {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
            {format(new Date(endDate), "MMM dd yyyy")}
          </p>
        </TableCell>
        <TableCell>
          <span
            className={`uppercase text-xs font-semibold py-2 px-4 rounded-full w-fit ${TagNameStyles[status]}`}
          >
            {status.replace("-", " ")}
          </span>
        </TableCell>
        <TableCell className="font-semibold text-gray-700 dark:text-gray-300">
          {formatCurrency(totalPrice)}
        </TableCell>

        <TableCell className="text-right">
          <Menus>
            <Menus.Menu>
              <Menus.Toggle id={`booking-${bookingId}`} />
              <Menus.List id={`booking-${bookingId}`}>
                <Menus.Button
                  icon={<Eye size={20} />}
                  onClick={() => {
                    navigate(`/bookings/${bookingId}`);
                  }}
                >
                  See Deatils
                </Menus.Button>

                <Menus.Button icon={<Trash2 size={20} />} onClick={() => {}}>
                  Delete
                </Menus.Button>

                {status === "unconfirmed" && (
                  <Menus.Button
                    icon={<TicketsPlane size={20} />}
                    onClick={() => {
                      navigate(`/checkin/${bookingId}`);
                    }}
                  >
                    Check In
                  </Menus.Button>
                )}

                {status === "checked-in" && (
                  <Menus.Button
                    icon={<TicketsPlane size={20} />}
                    onClick={() => checkoutBooking()}
                  >
                    Checkout
                  </Menus.Button>
                )}
              </Menus.List>
            </Menus.Menu>
          </Menus>
        </TableCell>
      </TableRow>
    </>
  );
};

export default BookingRow;
