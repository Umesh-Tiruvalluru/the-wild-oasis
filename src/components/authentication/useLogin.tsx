import { useToast } from "@/hooks/use-toast";
import { login } from "@/services/apiAuth";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface LoginCredentials {
  email: string;
  password: string;
}

export default function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: ({ email, password }: LoginCredentials) =>
      login({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard", { replace: true });
    },
    onError: () => {
      toast.toast({
        description: "Provided email or password are incorrect",
        variant: "destructive",
      });
    },
  });
}
