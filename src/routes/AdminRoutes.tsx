import PrivateRoute from "@/components/PrivateRoute";
import AdminDashboard from "@/components/DataTable";
import { Route } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

const AdminRoutes = () => {
  return (
    <Fragment>
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
    </Fragment>
  );
};

export default AdminRoutes;
