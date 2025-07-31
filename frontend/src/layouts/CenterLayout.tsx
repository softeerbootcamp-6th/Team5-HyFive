import CenterHeader from "@/components/layouts/CenterHeader";
import { Outlet } from "react-router";

const CenterLayout = () => {
  return (
    <div>
      <CenterHeader />
      <Outlet />
    </div>
  );
};

export default CenterLayout;
