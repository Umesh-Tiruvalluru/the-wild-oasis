import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout } from "@/services/apiAuth";

const Logout = () => {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: logout,
    mutationKey: ["user"],
    onSuccess: () => {
      navigate("/login", { replace: true });
    },
  });

  return (
    <Button onClick={() => mutate()}>
      <LogOut />
      Logout
    </Button>
  );
};

export default Logout;
