import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./sidebar";
import { Calendar, Home, School, Settings, User } from "lucide-react";
import Logo from "./Logo";
import { useLocation } from "react-router-dom";

const items = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "Booking", url: "/bookings", icon: Calendar },
  { title: "Cabins", url: "/cabins", icon: School },
  { title: "User", url: "/users", icon: User },
  { title: "Settings", url: "/settings", icon: Settings },
];

const AppSidebar = () => {
  const location = useLocation();
  return (
    <Sidebar>
      <SidebarHeader className="">
        <Logo />
      </SidebarHeader>
      <SidebarContent className="mt-4">
        <SidebarGroup>
          <SidebarContent>
            <SidebarMenu className="space-y-2 ">
              {items.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="text-lg py-5 pl-[24px]"
                    >
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
