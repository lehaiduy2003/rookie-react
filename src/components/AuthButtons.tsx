import useAuthStore from "@/stores/authStore";
import { Button } from "./ui/button";
import { User } from "lucide-react";

const AuthButtons = () => {
  const isAuthenticated = useAuthStore.getState().isAuthenticated;
  return (
    <div className="flex items-center space-x-4">
      {isAuthenticated ? (
        <div>
          <Button variant="outline" className="w-32">
            <User className="mr-2" />
            Profile
          </Button>
          <Button
            variant="outline"
            className="w-32"
            onClick={() => {
              const authStore = useAuthStore.getState();
              authStore.logout();
              window.location.reload();
            }}
          >
            Logout
          </Button>
        </div>
      ) : (
        <>
          <Button
            variant="outline"
            className="w-32"
            onClick={() => (window.location.href = "/auth/login")}
          >
            Login
          </Button>
          <Button
            variant="outline"
            className="w-32"
            onClick={() => (window.location.href = "/auth/register")}
          >
            Register
          </Button>
        </>
      )}
    </div>
  );
};

export default AuthButtons;
