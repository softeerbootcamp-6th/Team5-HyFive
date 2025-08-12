import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";
import InputSection from "@/features/carUploader/InputSection";

const { typography } = theme;

const CenterRegisterPage = () => {
  return (
    <div css={CenterRegisterPageContainer}>
      <p css={HeaderText}>차량 등록하기</p>
      <InputSection />
    </div>
  );
};

export default CenterRegisterPage;

const CenterRegisterPageContainer = css`
  display: flex;
  flex-direction: column;
  gap: 44px;
  max-width: 660px;
  margin: 44px auto;
`;

const HeaderText = css`
  font: ${typography.Heading.h3_semi};
`;
