import Header from "@/components/layouts/Header";
import { Outlet } from "react-router";

const CenterLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default CenterLayout;
