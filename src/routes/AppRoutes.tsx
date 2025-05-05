import { Route, Routes } from "react-router-dom";
import Home from "@/pages/home/Home";
import LoginForm from "@/pages/login/LoginForm";
import RegisterForm from "@/pages/register/RegisterForm";
import Products from "@/pages/products/Products";
import ProductDetails from "@/pages/productDetail/ProductDetails";
import PrivateRoute from "@/components/PrivateRoute";
import MainLayout from "@/pages/layouts/MainLayout";
import AuthLayout from "@/pages/layouts/AuthLayout";
import { RoleEnumSchema } from "@/enums/Role";
import AdminLayout from "@/pages/layouts/AdminLayout";
import CustomerTable from "@/pages/adminDashboard/CustomerTable";
import ProductTable from "@/pages/adminDashboard/ProductTable";
import CategoryTable from "@/pages/adminDashboard/CategoryTable";
import ProductCreating from "@/pages/adminDashboard/ProductCreating";

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
        <Route path="customers" element={<CustomerTable />} />
        <Route path="products" element={<ProductTable />} />
        <Route path="products/creating" element={<ProductCreating />} />
        <Route path="categories" element={<CategoryTable />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
