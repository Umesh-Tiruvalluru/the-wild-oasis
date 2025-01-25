import { format, isToday } from "date-fns";
import { MessageCircle, CheckCircle, DollarSign, School } from "lucide-react";
import { formatDistanceFromNow, formatCurrency } from "../../utils/helpers";
import { BookingDataProps } from "@/types";

type Booking = {
  booking: BookingDataProps;
};

function BookingDataBox({ booking }: Booking) {
  const {
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    cabins: { name: cabinName },
    guests: { fullName: guestName, email, country, countryFlag, nationalID },
  } = booking;

  return (
    <div className="border rounded-lg overflow-hidden shadow-md bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-blue-700 text-white">
        <div className="flex items-center gap-2">
          <School className="w-6 h-6" />
          <p className="text-[20px] font-semibold">
            {numNights} Nights in Cabin -{" "}
            <span className="font-bold">{cabinName}</span>
          </p>
        </div>
        <p className="text-sm">
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(format(startDate, "EEE, MMM dd yyyy"))}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>
      </header>

      {/* Guest Info */}
      <section className="p-6">
        <div className="flex items-center gap-4 mb-6 text-gray-600">
          {countryFlag && (
            <img
              src={countryFlag}
              alt={`Flag of ${country}`}
              className="w-10 h-6 rounded-sm border"
            />
          )}
          <p className="font-medium text-gray-800">
            {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""}
          </p>
          <span className="text-gray-400">&bull;</span>
          <p>{email}</p>
          <span className="text-gray-400">&bull;</span>
          <p>National ID {nationalID}</p>
        </div>

        {/* Observations */}
        {observations && (
          <div className="flex items-center gap-2 text-gray-700 mb-4">
            <MessageCircle className="w-5 h-5 text-blue-600" />
            <span className="text-sm">{observations}</span>
          </div>
        )}

        {/* Breakfast Info */}
        <div className="flex items-center gap-2 text-gray-700 mb-4">
          <CheckCircle
            className={`w-5 h-5 ${hasBreakfast ? "text-green-600" : "text-red-600"}`}
          />
          <span className="text-sm font-medium">
            Breakfast included? {hasBreakfast ? "Yes" : "No"}
          </span>
        </div>

        {/* Payment Info */}
        <div
          className={`flex items-center justify-between px-4 py-3 rounded-md text-sm font-medium mb-4 ${
            isPaid
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            <span>{formatCurrency(totalPrice)}</span>
            {hasBreakfast && (
              <span className="text-xs text-gray-500">
                ({formatCurrency(cabinPrice)} cabin +{" "}
                {formatCurrency(extrasPrice)} breakfast)
              </span>
            )}
          </div>
          <p>{isPaid ? "Paid" : "Will pay at property"}</p>
        </div>
      </section>

      {/* Booking Info */}
      <div className="px-6 py-4 text-right text-sm text-gray-500">
        <p>
          Booked{" "}
          {created_at && format(new Date(created_at), "EEE, MMM dd yyyy, p")}
        </p>
      </div>
    </div>
  );
}

export default BookingDataBox;
