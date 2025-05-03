import Logo from "@/components/Logo";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex items-center justify-start h-16">
        <Logo />
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
