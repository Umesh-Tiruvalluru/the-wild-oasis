import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/toaster";

import ProtectedRoute from "./components/ui/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import NewUsers from "./pages/Users";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import PageNotFound from "./pages/PageNotFound";
import Layout from "./components/ui/Layout";

const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route element={<ProtectedRoute />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="bookings" element={<Bookings />} />
                <Route path="bookings/:bookingId" element={<Booking />} />
                <Route path="checkin/:bookingId" element={<Checkin />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="cabins" element={<Cabins />} />
                <Route path="users" element={<NewUsers />} />
                <Route path="settings" element={<Settings />} />
                <Route path="account" element={<Account />} />
              </Route>
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
