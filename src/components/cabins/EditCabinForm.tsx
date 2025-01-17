import { editCabin } from "@/services/apiCabins";
import { CabinProps } from "@/types";
import { Label } from "@radix-ui/react-label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { useToast } from "@/hooks/use-toast";

type FormData = {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  description: string;
  discount: number;
  image: FileList | string;
};

const EditCabinForm: React.FC<CabinProps> = ({
  id,
  name,
  maxCapacity,
  regularPrice,
  description,
  discount,
  image,
}) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      name,
      maxCapacity,
      regularPrice,
      description,
      discount,
    },
  });

  const toast = useToast();

  const { mutate } = useMutation({
    mutationFn: editCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
      toast.toast({ description: "Successfully Edited" });
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    mutate({ id, ...data, image: data?.image[0] ? data.image : image });
  };

  const onError = (errors: FieldErrors<FormData>) => {
    console.error("Form validation errors:", errors);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          {...register("name", { required: "This field is required" })}
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <span className="text-red-600">{errors.name.message}</span>
        )}
      </div>
      <div>
        <Label htmlFor="maxCapacity">Maximum Capacity</Label>
        <Input
          id="maxCapacity"
          type="number"
          {...register("maxCapacity", {
            required: "Maximum capacity is required",
            min: { value: 1, message: "Capacity should be at least 1" },
          })}
          aria-invalid={!!errors.maxCapacity}
        />
        {errors.maxCapacity && (
          <span className="text-red-600">{errors.maxCapacity.message}</span>
        )}
      </div>
      <div>
        <Label htmlFor="regularPrice">Price</Label>
        <Input
          id="regularPrice"
          type="number"
          {...register("regularPrice", {
            required: "Regular price is required",
            min: { value: 1, message: "Regular Price should be at least 1" },
          })}
          aria-invalid={!!errors.regularPrice}
        />
        {errors.regularPrice && (
          <span className="text-red-600">{errors.regularPrice.message}</span>
        )}
      </div>
      <div>
        <Label htmlFor="discount">Discount</Label>
        <Input
          id="discount"
          type="number"
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              getValues().regularPrice >= value ||
              "Discount should be less than regular price",
          })}
          aria-invalid={!!errors.discount}
        />
        {errors.discount && (
          <span className="text-sm text-red-600">
            {errors.discount.message}
          </span>
        )}
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register("description", {
            required: "Description is required",
          })}
          aria-invalid={!!errors.description}
        />
        {errors.description && (
          <span className="text-red-600">{errors.description.message}</span>
        )}
      </div>
      <div>
        <Label htmlFor="image">Image</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          {...register("image")}
          aria-invalid={!!errors.image}
        />
        {errors.image && (
          <span className="text-red-600">{errors.image.message}</span>
        )}
      </div>
      <div>
        <DialogClose asChild>
          <Button type="submit">
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </DialogClose>
      </div>
    </form>
  );
};

export default EditCabinForm;
