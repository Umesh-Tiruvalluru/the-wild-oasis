import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import useUpdateUser from "./useUpdateUser";

interface PasswordFormData {
  password: string;
  passwordConfirm: string;
}

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } =
    useForm<PasswordFormData>();
  const { errors } = formState;

  const { mutate, isPending } = useUpdateUser();

  function onSubmit(data: PasswordFormData) {
    mutate(
      { password: data.password },
      {
        onSuccess: () => {
          reset();
        },
      },
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex items-center justify-between max-w-[510px] gap-28">
        <Label className="shrink-0 w-36" htmlFor="password">
          Password
        </Label>
        <div className="flex flex-col w-full">
          <Input
            id="password"
            type="password"
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
            {...register("passwordConfirm", {
              required: "Please confirm your password",
              validate: (value) =>
                value === getValues().password || "Passwords do not match",
            })}
          />
          {errors.passwordConfirm && (
            <span className="text-sm text-red-500 mt-1">
              {errors.passwordConfirm.message}
            </span>
          )}
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => reset()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Updating..." : "Update Password"}
        </Button>
      </div>
    </form>
  );
}

export default UpdatePasswordForm;
