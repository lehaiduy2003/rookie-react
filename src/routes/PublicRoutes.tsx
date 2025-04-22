import Home from "@/pages/home/Home";
import Login from "@/pages/login/Login";
import ProductDetails from "@/pages/productDetail/ProductDetails";
import Products from "@/pages/products/Products";
import Register from "@/pages/register/Register";
import { Route } from "react-router-dom";
import { Fragment } from "react";

const PublicRoutes = () => {
  return (
    <Fragment>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />
    </Fragment>
  );
};

export default PublicRoutes;
