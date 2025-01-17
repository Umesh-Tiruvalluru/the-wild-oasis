import { TagNameStyles } from "@/utils/constants";
import { Button } from "../ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteBooking, getBooking } from "@/services/apiBookings";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../ui/Loader";
import BookingDataBox from "./BookingDataBox";
import { useMoveBack } from "@/hooks/useMoveBack";
import CheckoutButton from "../check-in-out/CheckoutButton";
import { BookingDataProps } from "@/types";
import { Trash2 } from "lucide-react";
import ConfirmDelete from "../ui/ConfirmDelete";
import { useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { useToast } from "@/hooks/use-toast";

function BookingDetail() {
  const { bookingId } = useParams();
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const toast = useToast();

  const { data, isLoading } = useQuery<BookingDataProps>({
    queryKey: ["booking"],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });

  const { mutate } = useMutation({
    mutationFn: () => deleteBooking(Number(bookingId)),
    onSuccess: () => {
      toast.toast({
        description: `Booking #${bookingId} successfully deleted`,
      });
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (error) => {
      toast.toast({
        variant: "destructive",
        description:
          error instanceof Error ? error.message : "Failed to delete booking",
      });
    },
  });

  if (isLoading || !data) {
    return <Loader />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Booking #{data.id}
          </h1>
          <span
            className={`uppercase text-sm font-medium py-1 px-3 rounded-full ${TagNameStyles[data.status]}`}
          >
            {data.status.replace("-", " ")}
          </span>
        </div>
        <button
          className="text-sm font-medium text-blue-600 hover:underline"
          onClick={moveBack}
        >
          &larr; Back
        </button>
      </div>

      <BookingDataBox booking={data} />

      <div className="flex justify-end items-center gap-4 mt-6 ">
        {data.status === "checked-in" && (
          <CheckoutButton bookingId={Number(bookingId)} />
        )}
        {data.status === "unconfirmed" && (
          <Button
            className="bg-blue-700 hover:bg-blue-800"
            onClick={() => navigate(`/checkin/${data.id}`)}
          >
            Checkin
          </Button>
        )}
        <Button variant="destructive" onClick={() => setOpenModal(true)}>
          <Trash2 />
          Delete
        </Button>
      </div>
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent>
          <ConfirmDelete
            onClick={() => mutate()}
            handleCancel={() => setOpenModal(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default BookingDetail;
