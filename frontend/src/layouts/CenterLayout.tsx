import Header from "@/components/layouts/Header";
import { css } from "@emotion/react";
import { Outlet } from "react-router";

const CenterLayout = () => {
  return (
    <>
      <div>
        <Header type="CENTER" hasTab={false} />
        <div css={ContentContainer}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default CenterLayout;

const ContentContainer = css`
  position: relative;
  height: 100%;
  top: 72px;
`;
