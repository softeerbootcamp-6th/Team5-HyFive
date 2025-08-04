import { RefreashIcon } from "@/assets/icons";
import { theme } from "@/styles/themes.style";
import { css } from "@emotion/react";
const { color, typography } = theme;

interface RefetchButtonProps {
  date: string;
  handleClick: () => void;
}
const RefetchButton = ({ date, handleClick }: RefetchButtonProps) => {
  return (
    <div css={RefetchButtonContainer} onClick={handleClick}>
      <p css={DateText}>{date}</p>
      <RefreashIcon fill={color.GrayScale.gray4} />
    </div>
  );
};

export default RefetchButton;

const RefetchButtonContainer = css`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
  cursor: pointer;
`;

const DateText = css`
  font: ${typography.Body.b4_medi};
  color: ${color.GrayScale.gray4};
`;
