import { useToast } from "@/hooks/use-toast";
import { updateBooking } from "@/services/apiBookings";
import { CheckoutButtonProps } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCheckout = ({ bookingId }: CheckoutButtonProps) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutate: checkoutBooking, isPending } = useMutation({
    mutationFn: () =>
      updateBooking(Number(bookingId), { status: "checked-out" }),
    onSuccess: () => {
      toast.toast({
        description: `Booking #${bookingId} successfully checked out`,
      });
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: () => {
      toast.toast({
        description: `Error checking out booking #${bookingId}`,
        variant: "destructive",
      });
    },
  });

  return { checkoutBooking, isPending };
};

export default useCheckout;
