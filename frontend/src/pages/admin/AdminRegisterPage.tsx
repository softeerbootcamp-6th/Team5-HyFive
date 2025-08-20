import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";
import UserInputSection from "@/features/userRegister/UserInputSection";

const { typography } = theme;

const AdminRegisterPage = () => {
  return (
    <div css={AdminRegisterPageContainer}>
      <h3 css={HeaderText}>예약자 등록</h3>
      <UserInputSection />
    </div>
  );
};

export default AdminRegisterPage;

const AdminRegisterPageContainer = css`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 16px;
  display: flex;
  flex-direction: column;
  gap: 44px;
`;

const HeaderText = css`
  font: ${typography.Heading.h3_semi};
`;
