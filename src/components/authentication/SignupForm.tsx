import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { signup } from "@/services/apiAuth";
import { SignUpFormInputs } from "@/types";
import { Label } from "../ui/label";

const SignupForm = () => {
  const form = useForm<SignUpFormInputs>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
    reset,
  } = form;

  const { mutate } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast({
        title: "Account created successfully!",
        description: "Welcome to our platform",
      });
      reset();
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An Error occured during signup",
      });
    },
  });

  const onSubmit = async (data: SignUpFormInputs) => {
    const { fullName, email, password } = data;

    mutate({ fullName, email, password });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 dark:bg-zinc-900 bg-white rounded-lg pt-10 pb-5 px-5 mt-6"
    >
      <div className="flex items-center justify-between max-w-[510px] gap-28">
        <Label className="shrink-0 w-36" htmlFor="fullName">
          Full Name
        </Label>
        <div className="flex flex-col w-full">
          <Input
            id="fullName"
            type="text"
            placeholder="Enter your full name"
            {...register("fullName", { required: "Full name is required" })}
          />
          {errors.fullName && (
            <span className="text-sm text-red-500 mt-1">
              {errors.fullName.message}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between max-w-[510px] gap-28">
        <Label className="shrink-0 w-36" htmlFor="email">
          Email
        </Label>
        <div className="flex flex-col w-full">
          <Input
            id="email"
            type="text"
            placeholder="Enter your email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <span className="text-sm text-red-500 mt-1">
              {errors.email.message}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between max-w-[510px] gap-28">
        <Label className="shrink-0 w-36" htmlFor="password">
          Password
        </Label>
        <div className="flex flex-col w-full">
          <Input
            id="password"
            type="password"
            placeholder="Enter new password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          {errors.password && (
            <span className="text-sm text-red-500 mt-1">
              {errors.password.message}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between max-w-[510px] gap-28">
        <Label className="shrink-0 w-36" htmlFor="passwordConfirm">
          Confirm Password
        </Label>
        <div className="flex flex-col w-full">
          <Input
            id="passwordConfirm"
            type="password"
            placeholder="Confirm password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === getValues().password || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <span className="text-sm text-red-500 mt-1">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => reset()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create New User"}
        </Button>
      </div>
    </form>
  );
};

export default SignupForm;
