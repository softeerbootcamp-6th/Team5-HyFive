import Sidebar from "@/components/layouts/Sidebar";
import { css } from "@emotion/react";
import { Outlet } from "react-router";

const BookLayout = () => {
  return (
    <div css={BookContainer}>
      <Sidebar />
      <div css={ContentContainer}>
        <Outlet />
      </div>
    </div>
  );
};

export default BookLayout;

const BookContainer = css`
  width: 100%;
  height: calc(100vh - 72px);
  display: flex;
  flex-direction: row;
`;

const ContentContainer = css`
  display: flex;
  flex: 1;
`;
