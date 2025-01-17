import useUser from "@/components/authentication/useUser";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const useAvatar = () => {
  const { user } = useUser();
  const { fullName = "", avatar } = user?.user_metadata || {};

  const initials = fullName
    .split(" ")
    .map((name: string) => name[0]?.toUpperCase())
    .join("")
    .slice(0, 2);

  return (
    <Avatar>
      <AvatarImage src={avatar || ""} alt={fullName || "Avatar"} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
};

export default useAvatar;
