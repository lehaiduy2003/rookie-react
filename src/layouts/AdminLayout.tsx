import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <div className="flex items-center justify-start h-16">
          {/* Logo or Header */}
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>
        <main className="flex-grow">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
