import { Role } from "@/enums/Role";
import useAuthStore from "@/stores/authStore";
import { JSX } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
  userRole: Role;
}

const PrivateRoute = ({ children, userRole }: PrivateRouteProps) => {
  const { isAuthenticated, role } = useAuthStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    role: state.userDetail?.role,
  }));

  // Check if the user is authenticated and has the required role
  const isAuthorized = isAuthenticated && role === userRole;
  // If the user is not authenticated or not authorized, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }
  // If the user is authenticated but not authorized, redirect to home page
  if (!isAuthorized) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
