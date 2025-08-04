import Header from "@/components/layouts/Header";
import { Outlet } from "react-router";

const CenterLayout = () => {
  return (
    <div>
      <Header type="CENTER" hasTab={false} />
      <Outlet />
    </div>
  );
};

export default CenterLayout;
