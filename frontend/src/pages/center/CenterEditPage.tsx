import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";
import InputSection from "@/features/carUploader/InputSection";
import { useLocation } from "react-router";

const { typography } = theme;

const CenterEditPage = () => {
  const location = useLocation();
  const { carImage, carModel, carNumber, maxPassenger, isLowFloor } =
    location.state;
  return (
    <div css={CenterEditPageContainer}>
      <p css={HeaderText}>차량 수정하기</p>
      <InputSection
        type="edit"
        defaultValues={{
          carImage,
          carModel,
          carNumber,
          maxPassenger,
          isLowFloor,
        }}
      />
    </div>
  );
};

export default CenterEditPage;

const CenterEditPageContainer = css`
  display: flex;
  flex-direction: column;
  gap: 44px;
  max-width: 660px;
  margin: 0 auto;
  padding: 40px 0;
`;

const HeaderText = css`
  font: ${typography.Heading.h3_semi};
`;
