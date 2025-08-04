import { Navigate, Outlet } from "react-router";
import { useAuth } from "./AuthContext";

interface ProtectedRouteProps {
  allowedRoles: number[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>; // o un spinner de carga
  }

  if (!user) {
    console.log('No hay usuario');
    return <Navigate to="/auth/login" replace />;
  }

  if (!allowedRoles.includes(user.idTypeUser)) {
    console.log('No tiene permisos');
    return <Navigate to="/auth/login" replace />;
  }
  return <Outlet />;
};