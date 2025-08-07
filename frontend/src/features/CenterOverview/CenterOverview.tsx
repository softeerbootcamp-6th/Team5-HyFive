import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";
import type { CenterOverviewType } from "@/features/CenterOverview/CenterOverview.type";
import CenterInfoCard from "@/features/CenterOverview/CenterInfoCard";
import { CallIcon, CarIcon, LocationIcon, PayIcon } from "@/assets/icons";
import type { CenterInfoCardProps } from "@/features/CenterOverview/CenterInfoCard";
const { color, typography, borderRadius } = theme;

const CenterOverview = ({
  centerName,
  centerTel,
  centerAddr,
  registeredCars,
  estimatedRevenue,
}: CenterOverviewType) => {
  const infoCardData: CenterInfoCardProps[] = [
    {
      icon: <CallIcon fill={color.GrayScale.gray5} />,
      label: "전화번호",
      content: centerTel,
    },
    {
      icon: <LocationIcon fill={color.GrayScale.gray5} />,
      label: "센터 주소",
      content: centerAddr,
    },
    {
      icon: <CarIcon fill={color.GrayScale.gray5} />,
      label: "등록 차량",
      content: `${registeredCars} 대`,
    },
    {
      icon: <PayIcon fill={color.GrayScale.gray5} />,
      label: "예상 수익",
      content: estimatedRevenue,
    },
  ];
  return (
    <div css={OverviewContainer}>
      <header css={OverviewHeader}>{centerName}</header>
      <div css={OverviewBody}>
        {infoCardData.map((card) => (
          <CenterInfoCard
            key={`${card.label}-${card.content}`}
            icon={card.icon}
            label={card.label}
            content={card.content}
          />
        ))}
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
