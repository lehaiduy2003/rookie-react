import { Route, Routes } from "react-router-dom";
import Home from "@/pages/home/Home";
import LoginForm from "@/pages/login/LoginForm";
import RegisterForm from "@/pages/register/RegisterForm";
import Products from "@/pages/products/Products";
import ProductDetails from "@/pages/productDetail/ProductDetails";
import PrivateRoute from "@/components/PrivateRoute";
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import { RoleEnumSchema } from "@/enums/Role";
import AdminDashboard from "@/pages/adminDashboard/AdminDashBoard";
import AdminLayout from "@/layouts/AdminLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Public routes */}
        <Route index element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Route>
      {/* Authentication routes - no use the main layout */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginForm />} />
        <Route path="register" element={<RegisterForm />} />
      </Route>
      {/* Admin routes */}
      <Route
        path="/admin"
        element={
          <PrivateRoute userRole={RoleEnumSchema.Enum.ADMIN}>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
