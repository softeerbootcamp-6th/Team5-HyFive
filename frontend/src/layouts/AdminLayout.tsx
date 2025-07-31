import AdminHeader from "@/components/layouts/AdminHeader";
import { Outlet } from "react-router";

const AdminLayout = () => {
  return (
    <div>
      <AdminHeader />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
