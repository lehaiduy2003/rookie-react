import Home from "@/pages/home/Home";
import LoginForm from "@/pages/login/LoginForm";
import ProductDetails from "@/pages/productDetail/ProductDetails";
import Products from "@/pages/products/Products";
import RegisterForm from "@/pages/register/RegisterForm";
import { Route } from "react-router-dom";
import { Fragment } from "react";

const PublicRoutes = () => {
  return (
    <Fragment>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />
    </Fragment>
  );
};

export default PublicRoutes;
