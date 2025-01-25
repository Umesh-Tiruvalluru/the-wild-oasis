import { useNavigate } from "react-router-dom";
import Logout from "../authentication/Logout";
import useUser from "../authentication/useUser";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { ModeToggle } from "../Toggler";
import { SidebarTrigger } from "./sidebar";

function Header() {
  const { user } = useUser();
  const { fullName, avatar } = user?.user_metadata || {};
  const navigate = useNavigate();
  return (
    <div className="border-b px-8 dark:border-zinc-800 border-gray-100 py-4 mb-5">
      <ul className="flex justify-end items-center gap-4">
        <li
          onClick={() => navigate("/account")}
          className="flex flex-row gap-2 items-center font-semibold cursor-pointer justify-between  "
        >
          <SidebarTrigger className="block lg:hidden" />
          <Avatar>
            <AvatarImage src={avatar} alt="@shadcn" />
            <AvatarFallback className="font-bold">CN</AvatarFallback>
          </Avatar>
          {fullName}
        </li>

        <div className="h-8 w-px bg-zinc-300 hidden sm:block" />
        <li>
          <ModeToggle />
        </li>
        <li>
          <Logout />
        </li>
      </ul>
      {/* <Logout /> */}
    </div>
  );
}

export default Header;
