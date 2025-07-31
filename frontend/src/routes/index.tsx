import LandingPage from "@/pages/landingPage";
import AdminPage from "@/pages/admin/adminPage";
import DriversPage from "@/pages/admin/driversPage";
import AdminRegisterPage from "@/pages/admin/adminRegisterPage";
import ReservationPage from "@/pages/admin/reservation/reservationPage";
import PathsPage from "@/pages/admin/reservation/pathsPage";
import SchedulePage from "@/pages/admin/reservation/schedulePage";
import UsersPage from "@/pages/admin/reservation/usersPage";
import VehiclesPage from "@/pages/admin/vehicles/vehiclesPage";
import CenterDetailPage from "@/pages/admin/vehicles/centerDetailPage";
import CenterPage from "@/pages/center/centerPage";
import VehicleRegisterPage from "@/pages/center/centerRegisterPage";
import NotFoundPage from "@/pages/notFoundPage";
import { BrowserRouter, Route, Routes } from "react-router";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin 영역 */}
        <Route path="/admin">
          <Route index element={<AdminPage />} />
          <Route path="reservation">
            <Route index element={<ReservationPage />} />
            <Route path="schedule" element={<SchedulePage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="paths" element={<PathsPage />} />
            <Route path="register" element={<AdminRegisterPage />} />
          </Route>
          <Route path="vehicles">
            <Route index element={<VehiclesPage />} />
            <Route path=":id" element={<CenterDetailPage />} />
          </Route>
          <Route path="drivers" element={<DriversPage />} />
        </Route>

        {/* Center 영역 */}
        <Route path="/center">
          <Route index element={<CenterPage />} />
          <Route path="register" element={<VehicleRegisterPage />} />
        </Route>

        {/* 초기 진입 시 리디렉션 */}
        <Route path="/" element={<LandingPage />} />

        {/* Not found */}
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
