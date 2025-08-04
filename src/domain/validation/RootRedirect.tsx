import { Navigate } from "react-router";
import { useAuth } from "./AuthContext";

export const RootRedirect = () => {
  const { redirectBasedOnAuth } = useAuth();
  const redirectTo = redirectBasedOnAuth();

  return <Navigate to={redirectTo} replace />;
};