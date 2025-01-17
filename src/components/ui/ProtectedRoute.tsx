import { useNavigate } from "react-router-dom";
import useUser from "../authentication/useUser";
import Loader from "./Loader";
import { useEffect } from "react";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isPending } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated && !isPending) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, isPending, navigate]);

  if (isPending) {
    return <Loader />;
  }

  console.log(isAuthenticated);

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
