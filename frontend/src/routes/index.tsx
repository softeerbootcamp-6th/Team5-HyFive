import Landing from "@/pages";
import Admin from "@/pages/admin";
import Drivers from "@/pages/admin/drivers";
import AdminRegister from "@/pages/admin/register";
import Reservation from "@/pages/admin/reservation";
import Paths from "@/pages/admin/reservation/paths";
import Schedule from "@/pages/admin/reservation/schedule";
import Users from "@/pages/admin/reservation/users";
import Vehicles from "@/pages/admin/vehicles";
import CenterDetail from "@/pages/admin/vehicles/[centerId]";
import Center from "@/pages/center";
import VehicleRegister from "@/pages/center/register";
import NotFound from "@/pages/notFound";
import { BrowserRouter, Route, Routes } from "react-router";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin 영역 */}
        <Route path="/admin">
          <Route index element={<Admin />} />
          <Route path="reservation">
            <Route index element={<Reservation />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="users" element={<Users />} />
            <Route path="paths" element={<Paths />} />
          </Route>
          <Route path="vehicles">
            <Route index element={<Vehicles />} />
            <Route path=":id" element={<CenterDetail />} />
          </Route>
          <Route path="drivers" element={<Drivers />} />
          <Route path="register" element={<AdminRegister />} />
        </Route>

        {/* Center 영역 */}
        <Route path="/center">
          <Route index element={<Center />} />
          <Route path="register" element={<VehicleRegister />} />
        </Route>

        {/* 초기 진입 시 리디렉션 */}
        <Route path="/" element={<Landing />} />

        {/* Not found */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
