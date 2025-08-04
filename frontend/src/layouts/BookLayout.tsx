import Sidebar from "@/components/layouts/Sidebar";
import { css } from "@emotion/react";
import { Outlet } from "react-router";

const BookLayout = () => {
  return (
    <div css={BookContainer}>
      <div css={SidebarContainer}>
        <Sidebar />
      </div>
      <div css={ContentContainer}>
        <Outlet />
      </div>
    </div>
  );
};

export default BookLayout;

const BookContainer = css``;

const SidebarContainer = css`
  position: fixed;
  top: 72px;
  left: 0;
  height: calc(100vh - 72px);
`;

const ContentContainer = css`
  position: relative;
  width: calc(100vw - 330px);
  left: 330px;
  top: 72px;
`;
