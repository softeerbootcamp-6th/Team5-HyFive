import { RefreashIcon } from "@/assets/icons";
import { theme } from "@/styles/themes.style";
import DateFormatter from "@/utils/DateFormatter";
import { css } from "@emotion/react";
import { useState } from "react";
const { color, typography } = theme;

interface RefetchButtonProps {
  handleClick: () => void;
}
const RefetchButton = ({ handleClick }: RefetchButtonProps) => {
  const [refetchTime, setRefetchTime] = useState(
    DateFormatter.formatDateToSplitTime(new Date()),
  );
  const handleRefetch = () => {
    handleClick();
    setRefetchTime(DateFormatter.formatDateToSplitTime(new Date()));
  };
  return (
    <div css={RefetchButtonContainer} onClick={handleRefetch}>
      <p css={DateText}>{refetchTime}</p>
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
