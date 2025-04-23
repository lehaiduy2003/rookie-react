import AuthService from "@/apis/AuthService";
import Hdivider from "@/components/Hdivider";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAuthStore from "@/stores/authStore";
import { LoginForm, LoginFormSchema } from "@/types/LoginForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const form = useForm<LoginForm>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = (data: LoginForm) => {
    const { email, password } = data;
    AuthService.login(email, password)
      .then((response) => {
        console.log("Login successful:", response);
        const { accessToken, userDetails } = response;
        const id = userDetails.id.toString();
        const authStore = useAuthStore.getState();
        authStore.login(id, userDetails, accessToken);
        navigate("/");
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your.email@example.com" {...field} />
                </FormControl>
                <FormDescription>Enter your registered email address.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <div className="flex justify-between">
                  <FormDescription>Enter your password</FormDescription>
                  <a href="#" className="text-sm text-blue-500">
                    Forgot password?
                  </a>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-3">
            <Button type="submit" className="w-full bg-mainOrange hover:bg-mainOrange/90">
              Login
            </Button>
            <Hdivider message="Or" />
            <Link to="/auth/register" className="text-blue-500 text-center">
              register
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Login;
