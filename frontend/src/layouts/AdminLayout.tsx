import Header from "@/components/layouts/Header";
import { Outlet } from "react-router";

const AdminLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
