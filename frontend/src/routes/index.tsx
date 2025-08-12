import { AdminLayout, BookLayout, CenterLayout } from "@/layouts";
import {
  LandingPage,
  DriversPage,
  AdminRegisterPage,
  BookPage,
  PathsPage,
  SchedulePage,
  UsersPage,
  CentersPage,
  CenterDetailPage,
  CenterPage,
  CenterRegisterPage,
  NotFoundPage,
  TestPage,
} from "@/pages";
import { BrowserRouter, Route, Routes } from "react-router";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin 영역 */}
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="book" element={<BookLayout />}>
            <Route index element={<BookPage />} />
            <Route path="schedule" element={<SchedulePage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="paths" element={<PathsPage />} />
            <Route path="register" element={<AdminRegisterPage />} />
          </Route>
          <Route path="centers">
            <Route index element={<CentersPage />} />
            <Route path=":id" element={<CenterDetailPage />} />
          </Route>
          <Route path="drivers" element={<DriversPage />} />
        </Route>

        {/* Center 영역 */}
        <Route path="/center/*" element={<CenterLayout />}>
          <Route index element={<CenterPage />} />
          <Route path="register" element={<CenterRegisterPage />} />
        </Route>

        {/* 초기 진입 시 리디렉션 */}
        <Route path="/" element={<LandingPage />} />

        {/* Not found */}
        <Route path="/*" element={<NotFoundPage />} />

        {/* 컴포넌트 렌더링 확인용 페이지 */}
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
