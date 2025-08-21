import Header from "@/components/layouts/Header";
import { Outlet } from "react-router";
import { css } from "@emotion/react";
const AdminLayout = () => {
  return (
    <div>
      <Header type="ADMIN" hasTab={true} />
      <div css={ContentContainer}>
        <Outlet />
      </div>
      <div id="admin-portal" />
    </div>
  );
};

export default AdminLayout;

const ContentContainer = css`
  position: relative;
  height: calc(100dvh - 72px);
  top: 72px;
`;
