import { ChevronDownIcon } from "@/assets/icons";
import { theme } from "@/styles/themes.style";
import { css } from "@emotion/react";
const { color, typography } = theme;

const PassengerDropDown = () => {
  return (
    <div css={DropDownContainer}>
      <p>탑승자 정보</p>
      <ChevronDownIcon />
    </div>
  );
};

export default PassengerDropDown;

const DropDownContainer = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 14px;
  border-radius: 20px;
  border: 1px solid ${color.GrayScale.gray3};
  font: ${typography.Body.b2_medi};
  cursor: pointer;
`;
