import { Navigate, Outlet } from "react-router-dom";
import useUser from "../authentication/useUser";
import Loader from "./Loader";

function ProtectedRoute() {
  const { isAuthenticated, isPending } = useUser();

  if (!isAuthenticated && !isPending) {
    return <Navigate to="/login" />;
  }

  if (isPending) {
    return <Loader />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
