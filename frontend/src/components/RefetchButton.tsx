import { RefreashIcon } from "@/assets/icons";
import { rotating, ROTATING_TIME } from "@/utils/RotateAnimation";
import { theme } from "@/styles/themes.style";
import DateFormatter from "@/utils/DateFormatter";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
const { color, typography } = theme;

interface RefetchButtonProps {
  isFetching?: boolean;
  handleClick: () => void;
}
const RefetchButton = ({
  isFetching = false,
  handleClick,
}: RefetchButtonProps) => {
  const [refetchTime, setRefetchTime] = useState(
    DateFormatter.formatDateToSplitTime(new Date()),
  );
  const [isRefetchActive, setIsRefetchActive] = useState(false);

  // 자동 업데이트: polling
  useEffect(() => {
    if (isFetching) {
      setIsRefetchActive(true);
      setRefetchTime(DateFormatter.formatDateToSplitTime(new Date()));
      setTimeout(() => setIsRefetchActive(false), ROTATING_TIME * 1000);
    }
  }, [isFetching]);

  // 수동 업데이트
  const handleRefetch = () => {
    setIsRefetchActive(true);
    handleClick();
    setRefetchTime(DateFormatter.formatDateToSplitTime(new Date()));
    setTimeout(() => setIsRefetchActive(false), ROTATING_TIME * 1000);
  };

  return (
    <div css={RefetchButtonContainer} onClick={handleRefetch}>
      <p css={DateText}>{refetchTime}</p>
      <RefreashIcon
        css={isRefetchActive ? rotating() : undefined}
        fill={color.GrayScale.gray4}
      />
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
