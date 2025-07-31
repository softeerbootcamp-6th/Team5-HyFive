import Sidebar from "@/components/layouts/Sidebar";
import { Outlet } from "react-router";

const ReservationLayout = () => {
  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default ReservationLayout;
