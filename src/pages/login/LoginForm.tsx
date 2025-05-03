import AuthService from "@/apis/AuthService";
import Hdivider from "@/components/Hdivider";
import { MyForm } from "@/components/MyForm";
import useAuthStore from "@/stores/authStore";
import { Login, LoginSchema } from "@/types/Login";
import { warningToast } from "@/utils/toastLogic";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const form = useForm<Login>({
    resolver: zodResolver(LoginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const formFields = [
    { name: "email", label: "Email", type: "email", placeholder: "your.email@example.com" },
    { name: "password", label: "Password", type: "password", placeholder: "••••••••" },
  ];

  const onSubmit = (data: Login) => {
    setLoading(true);
    AuthService.login(data)
      .then((response) => {
        // console.log("Login successful:", response);
        const { accessToken, userDetails } = response;
        const id = userDetails.id.toString();
        const role = userDetails.role;
        const authStore = useAuthStore.getState();
        authStore.login(id, userDetails, accessToken);
        if (role === "ADMIN") {
          navigate("/admin/customers");
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Login failed:", error);
        const action = {
          label: "retry",
          onClick: () => {
            form.reset();
          },
        };
        if (error.response.status === 401) {
          warningToast("Invalid credentials", "Please check your email and password.", action);
        } else if (error.response.status === 403) {
          warningToast(
            "Account not verified",
            "Please verify your email before logging in.",
            action
          );
        } else {
          warningToast("Login failed", "An unexpected error occurred.", action);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <MyForm form={form} fields={formFields} onSubmit={onSubmit} loading={loading}>
        <Hdivider message="Or" />
        <div className="flex justify-center">
          <Link to="/auth/register" className="text-blue-500 text-center">
            Register
          </Link>
        </div>
        <div className="flex justify-center">
          <Link to="/auth/forgot-password" className="text-blue-500 text-center">
            Forgot Password?
          </Link>
        </div>
      </MyForm>
    </div>
  );
};

export default LoginForm;
