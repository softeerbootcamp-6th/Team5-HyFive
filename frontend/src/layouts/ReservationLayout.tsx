import Sidebar from "@/components/layouts/Sidebar";
import { css } from "@emotion/react";
import { Outlet } from "react-router";

const ReservationLayout = () => {
  return (
    <div css={ReservationContainer}>
      <Sidebar />
      <div css={ContentContainer}>
        <Outlet />
      </div>
    </div>
  );
};

export default ReservationLayout;

const ReservationContainer = css`
  width: 100%;
  height: calc(100vh - 72px);
  display: flex;
  flex-direction: row;
`;

const ContentContainer = css`
  display: flex;
  flex: 1;
`;
