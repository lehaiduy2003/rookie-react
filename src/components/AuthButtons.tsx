import useAuthStore from "@/stores/authStore";
import { Button } from "./ui/button";
import { User } from "lucide-react";

const AuthButtons = () => {
  const isAuthenticated = useAuthStore.getState().isAuthenticated;
  return (
    <div className="flex items-center space-x-4">
      {isAuthenticated ? (
        <>
          <Button id="btn-profile" variant="outline" className="w-32">
            <User className="mr-2" />
            Profile
          </Button>
          <Button
            id="btn-logout"
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
        </>
      ) : (
        <>
          <Button
            id="btn-login"
            variant="outline"
            className="w-32"
            onClick={() => (window.location.href = "/auth/login")}
          >
            Login
          </Button>
          <Button
            id="btn-register"
            variant="outline"
            className="w-32 bg-primary text-white"
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
