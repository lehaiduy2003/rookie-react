import useAuthStore from "@/stores/authStore";
import { JSX } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
