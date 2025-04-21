import { Button } from "./ui/button";
import { User } from "lucide-react";

const AuthButtons = () => {
  return (
    <div className="flex items-center gap-2">
      <a href="/login">
        <Button variant="outline" size="sm" className="hidden sm:flex">
          Sign In
        </Button>
      </a>
      <a href="/register">
        <Button size="sm">Register</Button>
      </a>

      {/* Mobile user icon */}
      <a href="/login" className="sm:hidden">
        <Button variant="ghost" size="icon" className="rounded-full">
          <User className="h-5 w-5" />
        </Button>
      </a>
    </div>
  );
};

export default AuthButtons;
