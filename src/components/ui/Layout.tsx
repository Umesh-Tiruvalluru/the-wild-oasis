import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import { SidebarProvider, SidebarTrigger } from "./sidebar";
import Header from "./Header";

function Layout() {
  return (
    <SidebarProvider className="font-figtree">
      <AppSidebar />
      <main className="w-full pb-10">
        <SidebarTrigger className="block lg:hidden" />
        <Header />
        <div className="px-8">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}

export default Layout;
