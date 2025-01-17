import { useToast } from "@/hooks/use-toast";
import { deleteBooking } from "@/services/apiBookings";
import { CheckoutButtonProps } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useBookingDelete = ({ bookingId }: CheckoutButtonProps) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate: delBooking, isPending: isDeleting } = useMutation({
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

  return { delBooking, isDeleting };
};

export default useBookingDelete;
