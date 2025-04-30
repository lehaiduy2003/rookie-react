import AuthService from "@/apis/AuthService";
import Hdivider from "@/components/Hdivider";
import { MyForm } from "@/components/MyForm";
import useAuthStore from "@/stores/authStore";
import { Register, RegisterSchema } from "@/types/Register";
import { errorToast, warningToast } from "@/utils/toastLogic";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  // hooks
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formFields = [
    { name: "email", label: "Email", type: "email", placeholder: "your.email@example.com" },
    { name: "password", label: "Password", type: "password", placeholder: "••••••••" },
    { name: "firstName", label: "First name", type: "text", placeholder: "your first name" },
    { name: "lastName", label: "Last name", type: "text", placeholder: "your last name" },
    { name: "phoneNumber", label: "Phone number", type: "tel", placeholder: "your phone number" },
  ];
  const form = useForm<Register>({
    resolver: zodResolver(RegisterSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
  });

  const onSubmit = (data: Register) => {
    setLoading(true);
    AuthService.register(data)
      .then((response) => {
        console.log("register successful:", response);
        const { accessToken, userDetails } = response;
        const id = userDetails.id.toString();
        const authStore = useAuthStore.getState();
        authStore.login(id, userDetails, accessToken);
        navigate("/");
      })
      .catch((error) => {
        console.error("registration failed:", error);
        const action = {
          label: "retry",
          onClick: () => {
            form.reset();
          },
        };
        if (error.response.status === 409) {
          warningToast("Email already exists", "Please use another email.", action);
        } else {
          errorToast("Registration failed", "Something has wrong, please try again", action);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      <MyForm form={form} fields={formFields} onSubmit={onSubmit} loading={loading}>
        <Hdivider message="Or" />
        <Link to="/auth/login" className="text-blue-500 text-center">
          Login
        </Link>
      </MyForm>
    </div>
  );
};

export default RegisterForm;
