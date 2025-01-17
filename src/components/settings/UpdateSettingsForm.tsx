import React from "react";
import { Label } from "@radix-ui/react-label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "@/services/apiSettings";
import { Input } from "../ui/input";
import { useToast } from "@/hooks/use-toast";
import useSettings from "./useSettings";

function UpdateSettingsForm() {
  const {
    maxBookingLength,
    minBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = useSettings();

  const toast = useToast();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast.toast({ description: "Updated Successfully" });
    },
  });

  function handleUpdate(e: React.FocusEvent<HTMLInputElement>, field: string) {
    const target = e.target;
    if (!(target instanceof HTMLInputElement)) return;

    const { value } = target;
    mutate({ [field]: value });
  }

  return (
    <form className="p-8 rounded-lg space-y-4 dark:bg-zinc-900">
      <div className="flex items-center gap-10">
        <Label htmlFor="minimumNights" className="flex-shrink-0">
          Minimum Nights/Bookings
        </Label>
        <Input
          type="number"
          id="minimumNights"
          defaultValue={minBookingLength}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </div>
      <div className="flex items-center gap-10">
        <Label htmlFor="maximumNights" className="flex-shrink-0">
          Maximum Nights/Bookings
        </Label>
        <Input
          type="number"
          id="maximumNights"
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </div>
      <div className="flex items-center gap-10">
        <Label htmlFor="maximumGuests" className="flex-shrink-0">
          Maximum guests/booking
        </Label>
        <Input
          type="number"
          id="maximumGuests"
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
        />
      </div>
      <div className="flex items-center gap-20">
        <Label htmlFor="breakfastPrice" className="flex-shrink-0">
          Breakfast price
        </Label>
        <Input
          type="number"
          id="breakfastPrice"
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </div>
    </form>
  );
}

export default UpdateSettingsForm;
