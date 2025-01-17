import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMoveBack } from "../../hooks/useMoveBack";
import BookingDataBox from "../bookings/BookingDataBox";
import { Button } from "../ui/button";
import { getBooking, updateBooking } from "@/services/apiBookings";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import CheckBox from "../ui/CheckBox";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/utils/helpers";
import { useToast } from "@/hooks/use-toast";
import useSettings from "../settings/useSettings";

function CheckinBooking() {
  const { bookingId } = useParams();
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const toast = useToast();
  const { breakfastPrice } = useSettings();

  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { data: booking, isPending } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    enabled: !!bookingId,
  });

  const { mutate: checkinBooking } = useMutation({
    mutationFn: ({
      bookingId,
      breakfast,
    }: {
      bookingId: string;
      breakfast?: {
        hasBreakfast?: boolean;
        extrasPrice?: number;
        totalPrice?: number;
      };
    }) =>
      updateBooking(Number(bookingId), {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: () => {
      toast.toast({
        description: `Booking #${bookingId} successfully checked in`,
      });
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      navigate("/");
    },
    onError: () =>
      toast.toast({
        description: `Error checking in booking #${bookingId}`,
        variant: "destructive",
      }),
  });

  useEffect(() => {
    if (booking?.isPaid) setConfirmPaid(true);
  }, [booking?.isPaid]);

  if (isPending || !booking) return <Loader />;

  const optionalBreakfastPrice =
    breakfastPrice * booking.numGuests * booking.numNights;

  function handleCheckin() {
    if (!confirmPaid || !bookingId) return;

    checkinBooking({
      bookingId,
      breakfast: addBreakfast
        ? {
            hasBreakfast: true,
            extrasPrice: optionalBreakfastPrice,
            totalPrice: booking.totalPrice + optionalBreakfastPrice,
          }
        : undefined,
    });
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Check-in Booking #{bookingId}
        </h1>
        <button
          onClick={moveBack}
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          &larr; Back
        </button>
      </div>

      <BookingDataBox booking={booking} />

      {!booking.hasBreakfast && (
        <CheckBox
          checked={addBreakfast}
          id="breakfast"
          onChange={() => {
            setAddBreakfast((prev) => !prev);
            setConfirmPaid(false);
          }}
        >
          Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
        </CheckBox>
      )}

      <CheckBox
        checked={confirmPaid}
        id={booking.id.toString()}
        disabled={confirmPaid}
        onChange={() => setConfirmPaid((prev) => !prev)}
      >
        I confirm that{" "}
        <span className="font-semibold">{booking.guests.fullName}</span> has
        paid{" "}
        {addBreakfast
          ? `${formatCurrency(booking.totalPrice + optionalBreakfastPrice)} (${formatCurrency(booking.totalPrice)} + ${formatCurrency(optionalBreakfastPrice)})`
          : formatCurrency(booking.totalPrice)}
      </CheckBox>

      <div className="flex items-center justify-end gap-2">
        {booking.status === "unconfirmed" && (
          <Button onClick={handleCheckin} disabled={!confirmPaid}>
            Check in booking #{booking.id}
          </Button>
        )}
        <Button variant="outline" onClick={moveBack}>
          Back
        </Button>
      </div>
    </div>
  );
}

export default CheckinBooking;
