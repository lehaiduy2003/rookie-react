import { Route, Routes } from "react-router-dom";
import Home from "@/pages/home/Home";
import Login from "@/pages/login/Login";
import Register from "@/pages/register/Register";
import Products from "@/pages/products/Products";
import ProductDetails from "@/pages/productDetail/ProductDetails";
import PrivateRoute from "@/components/PrivateRoute";
import AdminDashboard from "@/pages/adminDashboard/AdminDashboard";
import MainLayout from "@/layouts/MainLayout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* <PublicRoutes />
      <AdminRoutes /> */}
      <Route path="/" element={<MainLayout />}>
        {/* Public routes */}
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        {/* Add more public routes here */}
      </Route>
      {/* Admin routes */}
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
