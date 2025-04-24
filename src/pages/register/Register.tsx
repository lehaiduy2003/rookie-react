import AuthService from "@/apis/AuthService";
import Hdivider from "@/components/Hdivider";
import { MyForm } from "@/components/MyForm";
import useAuthStore from "@/stores/authStore";
import { RegisterForm, RegisterFormSchema } from "@/types/RegisterForm";
import { errorToast, warningToast } from "@/utils/toastLogic";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
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
  const form = useForm<RegisterForm>({
    resolver: zodResolver(RegisterFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
  });

  const formLabel = "Register";
  const submitLabel = "Register";

  const onSubmit = (data: RegisterForm) => {
    const { email, password, firstName, lastName, phoneNumber } = data;
    setLoading(true);
    AuthService.register(email, password, firstName, lastName, phoneNumber)
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
    <MyForm
      label={formLabel}
      form={form}
      fields={formFields}
      onSubmit={onSubmit}
      loading={loading}
      submitLabel={submitLabel}
    >
      <Hdivider message="Or" />
      <Link to="/auth/login" className="text-blue-500 text-center">
        Login
      </Link>
    </MyForm>
  );
};

export default Register;
