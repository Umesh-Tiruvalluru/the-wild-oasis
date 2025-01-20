import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import { SidebarProvider } from "./sidebar";
import Header from "./Header";

function Layout() {
  return (
    <SidebarProvider className="font-figtree">
      <AppSidebar />
      <main className="w-full pb-10">
        <Header />
        <div className="px-8">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}

export default Layout;
