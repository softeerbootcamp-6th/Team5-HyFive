import { ChevronRightIcon } from "@/assets/icons";
import { theme } from "@/styles/themes.style";
import { css } from "@emotion/react";
import { Link } from "react-router";
const { color, typography } = theme;

interface NavigationButtonProps {
  navigate: string;
}
const NavigationButton = ({ navigate }: NavigationButtonProps) => {
  return (
    <Link to={navigate} css={ButtonContainer}>
      <p css={ButtonText}>바로가기</p>
      <ChevronRightIcon />
    </Link>
  );
};

export default NavigationButton;

const ButtonContainer = css`
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  border-radius: 12px;
  border: 1px solid ${color.GrayScale.gray5};
  cursor: pointer;
`;

const ButtonText = css`
  font: ${typography.Label.l1_semi};
  color: ${color.GrayScale.gray5};
`;
