import { Route, Routes } from "react-router-dom";
import Home from "@/pages/home/Home";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";
import Products from "@/pages/products/Products";
import ProductDetails from "@/pages/ProductDetail/ProductDetails";
import PrivateRoute from "@/components/PrivateRoute";
import AdminDashboard from "@/pages/adminDasboard/AdminDashboard";

const AppRoutes = () => {
  return (
    <Routes>
      {/* <PublicRoutes />
      <AdminRoutes /> */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />
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
