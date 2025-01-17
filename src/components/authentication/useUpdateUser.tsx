import { updateCurrentUser } from "@/services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["user"],
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return { mutate, isPending };
};

export default useUpdateUser;
