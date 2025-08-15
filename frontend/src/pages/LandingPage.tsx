import NavigationButton from "@/components/NavigationButton";
import { theme } from "@/styles/themes.style";
import { css } from "@emotion/react";
const { color } = theme;

const LandingPage = () => {
  return (
    <div css={LandingPageContainer}>
      <div css={PartPageContainer} className="admin">
        <div css={PartPageWrapper}>
          <p css={PageTitleText}>관리자용 페이지</p>
          <NavigationButton navigate="admin" />
        </div>
      </div>
      <div css={PartPageContainer} className="center">
        <div css={PartPageWrapper}>
          <p css={PageTitleText}>센터용 페이지</p>
          <NavigationButton navigate="center" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

const LandingPageContainer = css`
  display: flex;
  height: 100vh;
  width: 100%;
  overflow: hidden;
`;

const PartPageContainer = css`
  position: relative;
  display: flex;
  flex: 1;
  transition: flex 0.5s ease;

  &:hover {
    flex: 2;
  }
  &.admin {
    background-color: ${color.GrayScale.gray2};
  }
  &.center {
    background-color: ${color.GrayScale.gray4};
  }
`;

const PartPageWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 258px 100px;
`;

const PageTitleText = css`
  font-size: 48px;
  font-weight: 700;
  letter-spacing: 1.92px;
  color: ${color.GrayScale.gray6};
`;
