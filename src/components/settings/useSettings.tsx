import { getSettings } from "@/services/apiSettings";
import { useQuery } from "@tanstack/react-query";

const useSettings = () => {
  const {
    data: {
      maxBookingLength,
      minBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return {
    maxBookingLength,
    minBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  };
};

export default useSettings;
