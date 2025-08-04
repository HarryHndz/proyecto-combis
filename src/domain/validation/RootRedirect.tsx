import { Navigate } from "react-router";
import { useAuth } from "./AuthContext";

export const RootRedirect = () => {
  const { redirectBasedOnAuth } = useAuth();
  const redirectTo = redirectBasedOnAuth();

  if (redirectTo) {
    return <Navigate to="/admin/" replace />;
  }
  return <Navigate to="/auth/login" replace />;
};