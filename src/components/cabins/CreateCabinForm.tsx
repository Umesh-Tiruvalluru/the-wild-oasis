import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormData } from "@/types";
import { createCabin } from "@/services/apiCabins";
import { useToast } from "@/hooks/use-toast";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

interface CreateCabinFormProps {
  handleClose: () => void;
}

const CreateCabinForm: React.FC<CreateCabinFormProps> = ({ handleClose }) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  function message() {
    toast.toast({ description: "Successfully Created Cabin" });
  }

  const { mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      handleClose();
      reset();
      message();
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    mutate(data);
  };

  const onError = (error: unknown) => {
    console.error(error);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          {...register("name", { required: "This field is required" })}
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
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
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
            min: {
              value: 1,
              message: "Regular Price should be at least 1",
            },
          })}
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
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              getValues().regularPrice >= value ||
              "Discount should be less than regular price",
          })}
        />
        {errors.discount && (
          <span className="text-sm text-red-600">
            {errors.discount.message}
          </span>
        )}
      </div>
      <div>
        <Label htmlFor="description">Decription</Label>
        <Textarea
          id="description"
          {...register("description", { required: "description is requried" })}
        />
        {errors.description && (
          <span className="text-red-600">{errors.description.message}</span>
        )}
      </div>

      <div>
        <Label htmlFor="image">Image</Label>
        <Input
          {...register("image", { required: "Image is required" })}
          type="file"
          accept="image/*"
          id="image"
        />
        {errors.image && (
          <span className="text-red-600">{errors.image.message}</span>
        )}
      </div>
      <div className="space-x-3">
        <Button variant="outline" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="submit">
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default CreateCabinForm;
