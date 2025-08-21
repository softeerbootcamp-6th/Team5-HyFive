import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";
import {
  CardContainer,
  ImgSection,
  ContentSection,
  ContentHeader,
  TagSection,
} from "@/features/car/CarInfoCard.style";

const { color } = theme;

const CarInfoCardSkeleton = () => {
  return (
    <div css={[CardContainer(false, false), SkeletonCard]}>
      <div css={ImgSection}>
        <div css={SkeletonImage} />
      </div>
      <div css={ContentSection}>
        <header css={ContentHeader}>
          <div css={[SkeletonText, SkeletonCarNum]} />
          <div css={[SkeletonText, SkeletonCarName]} />
        </header>
        <div css={TagSection}>
          <div css={[SkeletonText, SkeletonTag]} />
          <div css={[SkeletonText, SkeletonTag]} />
        </div>
        <div css={[SkeletonText, SkeletonStatus]} />
      </div>
    </div>
  );
};

export default CarInfoCardSkeleton;

const skeletonAnimation = css`
  @keyframes shimmer {
    from {
      transform: translateX(-150%);
    }
    to {
      transform: translateX(150%);
    }
  }
`;

const SkeletonBase = css`
  background: linear-gradient(
    90deg,
    ${color.GrayScale.gray2} 25%,
    ${color.GrayScale.gray1} 50%,
    ${color.GrayScale.gray2} 75%
  );
  background-size: 200px 100%;
  animation: skeleton-loading 1.5s infinite;
  ${skeletonAnimation}
`;

const SkeletonCard = css`
  pointer-events: none;
  opacity: 0.7;
`;

const SkeletonImage = css`
  ${SkeletonBase}
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

const SkeletonText = css`
  ${SkeletonBase}
  border-radius: 4px;
`;

const SkeletonCarNum = css`
  height: 18px;
  width: 80px;
`;

const SkeletonCarName = css`
  height: 16px;
  width: 120px;
`;

const SkeletonTag = css`
  height: 24px;
  width: 60px;
  border-radius: 12px;
`;

const SkeletonStatus = css`
  height: 28px;
  width: 70px;
  border-radius: 14px;
`;
