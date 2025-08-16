import HoverLottie from "@/components/HoverLottie";
import NavigationButton from "@/components/NavigationButton";
import { theme } from "@/styles/themes.style";
import { css } from "@emotion/react";
const { color } = theme;
import LandingAdminLottie from "@/assets/lottie/landing-admin.json";
import LandingCenterLottie from "@/assets/lottie/landing-center.json";

const LandingPage = () => {
  return (
    <div css={LandingPageContainer}>
      <div css={PartPageContainer}>
        <div css={PartPageWrapper}>
          <p css={PageTitleText}>관리자용 페이지</p>
          <NavigationButton navigate="admin" />
        </div>
        <div css={LottieWrapper}>
          <HoverLottie animationData={LandingAdminLottie} />
        </div>
      </div>
      <div css={PartPageContainer}>
        <div css={PartPageWrapper}>
          <p css={PageTitleText}>센터용 페이지</p>
          <NavigationButton navigate="center" />
        </div>
        <div css={LottieWrapper}>
          <HoverLottie animationData={LandingCenterLottie} />
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
  overflow: hidden;
  transition: flex 0.5s ease;

  &:hover {
    flex: 2;
  }
`;

const PartPageWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 258px 80px;
  z-index: 1;
`;

const LottieWrapper = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;

  & > svg {
    object-position: left;
  }
`;

const PageTitleText = css`
  font-size: 48px;
  font-weight: 700;
  letter-spacing: 1.92px;
  color: ${color.GrayScale.gray6};
`;
