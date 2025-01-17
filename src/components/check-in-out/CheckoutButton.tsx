import { Button } from "../ui/button";
import { CheckoutButtonProps } from "@/types";
import useCheckout from "./useCheckout";

function CheckoutButton({ bookingId }: CheckoutButtonProps) {
  const { checkoutBooking, isPending } = useCheckout({ bookingId });

  return (
    <Button
      className="bg-blue-700 hover:bg-blue-800"
      onClick={() => checkoutBooking()}
      disabled={isPending}
    >
      Check Out
    </Button>
  );
}

export default CheckoutButton;
