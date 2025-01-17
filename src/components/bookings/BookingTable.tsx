import {
  Table,
  TableBody,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import BookingRow from "./BookingRow";
import { BookingsDataProps } from "@/types";
import Pagination from "../ui/Pagination";
import useBooking from "./useBooking";

function BookingTable() {
  const { bookings, count } = useBooking();

  return (
    <Table className="border border-spacing-2 mt-6">
      <TableHeader className="">
        <TableRow>
          <TableHead className="font-semibold p-4 text-black dark:text-white">
            Cabin
          </TableHead>
          <TableHead className="font-semibold text-black dark:text-white">
            Guests
          </TableHead>
          <TableHead className="font-semibold text-black dark:text-white">
            Dates
          </TableHead>
          <TableHead className="font-semibold text-black dark:text-white">
            Status
          </TableHead>
          <TableHead className="font-semibold text-black dark:text-white">
            Amount
          </TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings?.map(
          ({
            id,
            startDate,
            endDate,
            cabins,
            guests,
            status,
            totalPrice,
            numNights,
          }: BookingsDataProps) => (
            <BookingRow
              id={id}
              cabins={cabins}
              guests={guests}
              key={id}
              startDate={startDate}
              endDate={endDate}
              status={status}
              numNights={numNights}
              totalPrice={totalPrice}
              numGuests={0}
            />
          ),
        )}
      </TableBody>
      <TableFooter>
        <Pagination count={count} />
      </TableFooter>
    </Table>
  );
}

export default BookingTable;
