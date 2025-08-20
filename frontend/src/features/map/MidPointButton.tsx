import { RefreashIcon } from "@/assets/icons";
import { theme } from "@/styles/themes.style";
import { rotating } from "@/utils/RotateAnimation";
import { css } from "@emotion/react";
import { useState } from "react";

const MidPointButton = ({ onClick }: { onClick: () => void }) => {
  const [isClickActive, setIsClickActive] = useState(false);
  const handleMidPoint = () => {
    setIsClickActive(true);
    onClick();
    setTimeout(() => setIsClickActive(false), 1000);
  };

  return (
    <div css={MidPointButtonContainer} onClick={handleMidPoint}>
      <RefreashIcon
        css={isClickActive ? rotating : undefined}
        fill={theme.color.GrayScale.gray5}
      />
    </div>
  );
};

export default MidPointButton;

const MidPointButtonContainer = css`
  position: absolute;
  bottom: 40px;
  left: 48px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border-radius: 16px;
  background: ${theme.color.GrayScale.white};
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  z-index: 5;
  cursor: pointer;
`;
