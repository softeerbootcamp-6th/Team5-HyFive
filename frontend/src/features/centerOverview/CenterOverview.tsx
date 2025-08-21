import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";
import type { CenterOverviewProps } from "@/features/centerOverview/CenterOverview.type";
import CenterInfoCard from "@/features/centerOverview/CenterInfoCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  CallIcon,
  CarIcon,
  InfoIcon,
  LocationIcon,
  PayIcon,
} from "@/assets/icons";
import type { CenterInfoCardType } from "@/features/centerOverview/CenterOverview.type";
const { color, typography, borderRadius } = theme;

const CenterOverview = ({
  centerName = "",
  centerTel = "",
  centerAddr = "",
  registeredCars = 0,
  estimatedRevenue = 0,
  isLoading = false,
  error = null,
}: CenterOverviewProps) => {
  const infoCardData: CenterInfoCardType[] = [
    {
      icon: <CallIcon fill={color.GrayScale.gray5} />,
      label: "전화번호",
      content: centerTel || "-",
    },
    {
      icon: <LocationIcon fill={color.GrayScale.gray5} />,
      label: "센터 주소",
      content: centerAddr || "-",
    },
    {
      icon: <CarIcon fill={color.GrayScale.gray5} />,
      label: "등록 차량",
      content: `${registeredCars} 대`,
    },
    {
      icon: <PayIcon fill={color.GrayScale.gray5} />,
      label: "예상 수익",
      content: `₩ ${estimatedRevenue.toLocaleString()}`,
    },
  ];

  return (
    <div css={OverviewContainer}>
      <header css={OverviewHeader}>
        {isLoading ? "센터 정보 로딩 중..." : centerName || "센터 정보"}
      </header>
      <div css={OverviewBody}>
        {isLoading ? (
          <div css={LoadingContainer}>
            <LoadingSpinner size="large" />
            <span css={LoadingText}>센터 정보를 불러오는 중입니다...</span>
          </div>
        ) : error ? (
          <div css={ErrorContainer}>
            <InfoIcon />
            <div css={ErrorContent}>
              <span css={ErrorTitle}>센터 정보를 불러올 수 없습니다</span>
              <span css={ErrorMessage}>
                {typeof error === "string"
                  ? error
                  : error?.message || "알 수 없는 오류가 발생했습니다."}
              </span>
            </div>
          </div>
        ) : (
          infoCardData.map((card) => (
            <CenterInfoCard
              key={`${card.label}-${card.content}`}
              icon={card.icon}
              label={card.label}
              content={card.content}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CenterOverview;

const OverviewContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
`;

const OverviewHeader = css`
  font: ${typography.Heading.h3_semi};
  color: ${color.GrayScale.black};
`;

const OverviewBody = css`
  display: flex;
  width: 100%;
  justify-content: space-between;
  background-color: ${color.GrayScale.gray1};
  border-radius: ${borderRadius.Medium};
  border: 1px solid ${color.GrayScale.gray3};
`;

// 로딩 상태 스타일
const LoadingContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;
  padding: 20px;
`;

const LoadingText = css`
  font: ${typography.Body.b3_medi};
  color: ${color.GrayScale.gray5};
`;

// 에러 상태 스타일
const ErrorContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;
  padding: 20px;
`;

const ErrorIcon = css`
  font-size: 24px;
  flex-shrink: 0;
`;

const ErrorContent = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ErrorTitle = css`
  font: ${typography.Body.b2_semi};
  color: ${color.GrayScale.gray6};
`;

const ErrorMessage = css`
  font: ${typography.Body.b4_regu};
  color: ${color.GrayScale.gray5};
`;
