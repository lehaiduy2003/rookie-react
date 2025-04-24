import { Role } from "@/enums/Role";
import useAuthStore from "@/stores/authStore";
import { JSX } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
  userRole: Role;
}

const PrivateRoute = ({ children, userRole }: PrivateRouteProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const role = useAuthStore((state) => state.userDetail?.role);

  // If the user is not authenticated or not authorized, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }
  // If the user is authenticated but not authorized, redirect to home page
  if (role !== userRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
