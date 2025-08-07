import CenterOverview from "@/features/CenterOverview/CenterOverview";
import type { CenterOverviewType } from "@/features/CenterOverview/CenterOverview.type";
import { css } from "@emotion/react";
const mockCenterData: CenterOverviewType = {
  centerName: "남동구 노인 이동 센터",
  centerTel: "032-742-9900",
  centerAddr: "인천시 남동구 구월1동",
  registeredCars: 4,
  estimatedRevenue: "₩ 182,000",
};

const CenterDetailPage = () => {
  return (
    <div css={PageContainer}>
      <CenterOverview {...mockCenterData} />
    </div>
  );
};

export default CenterDetailPage;

const PageContainer = css`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 60px;
  padding: 40px;
`;
