import Header from "@/components/layouts/Header";
import { Outlet } from "react-router";

const AdminLayout = () => {
  return (
    <div>
      <Header type="ADMIN" hasTab={true} />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
