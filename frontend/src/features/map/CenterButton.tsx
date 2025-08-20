import { RefreashIcon } from "@/assets/icons";
import { theme } from "@/styles/themes.style";
import { css } from "@emotion/react";

const CenterButton = ({
  handleInitMidPoint,
}: {
  handleInitMidPoint: () => void;
}) => {
  return (
    <div css={CenterButtonContainer} onClick={handleInitMidPoint}>
      <RefreashIcon fill={theme.color.GrayScale.gray5} />
    </div>
  );
};

export default CenterButton;

const CenterButtonContainer = css`
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
