import { BrowserRouter, Route, Routes } from "react-router";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin 영역 */}
        <Route path="/admin">
          <Route index element={<>admin</>} />
          <Route path="reservation">
            <Route index element={<>reservation</>} />
            <Route path="schedule" element={<>schedule</>} />
            <Route path="users" element={<>users</>} />
            <Route path="paths" element={<>paths</>} />
          </Route>
          <Route path="vehicles">
            <Route index element={<>vehicles</>} />
            <Route path=":id" element={<>id</>} />
          </Route>
          <Route path="drivers" element={<>drivers</>} />
          <Route path="register" element={<>register</>} />
        </Route>

        {/* Center 영역 */}
        <Route path="/center">
          <Route index element={<>center</>} />
          <Route path="register" element={<>register</>} />
        </Route>

        {/* 초기 진입 시 리디렉션 */}
        <Route path="/" element={<>first</>} />

        {/* Not found */}
        <Route path="/*" element={<>Not found</>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
