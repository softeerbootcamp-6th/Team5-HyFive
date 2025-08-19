import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";
const { color, typography } = theme;

const EmptyUI = () => {
  return (
    <div css={EmptyUIContainer}>
      <div css={TextWrapper}>
        <p>요청값이 없습니다 :-(</p>
      </div>
    </div>
  );
};

export default EmptyUI;

const EmptyUIContainer = css`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 28px;
  padding: 44px;
`;

const TextWrapper = css`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  color: ${color.GrayScale.gray4};
  font: ${typography.Heading.h5_semi};
`;
