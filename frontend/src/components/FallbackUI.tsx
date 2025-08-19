import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";
import Button from "@/components/Button";
import { NoRouteIcon } from "@/assets/icons";
const { color, typography } = theme;

const FallbackUI = ({
  error,
  handleRetry,
}: {
  error: Error;
  handleRetry: () => void;
}) => {
  return (
    <div css={FallbackUIContainer}>
      <NoRouteIcon />
      <div css={TextWrapper}>
        <p>문제가 발생했습니다. 다시 요청해주세요 :(</p>
        <p>{error.message}</p>
      </div>
      <div css={ButtonWrapper} onClick={handleRetry}>
        <Button label="재시도" />
      </div>
    </div>
  );
};

export default FallbackUI;

const FallbackUIContainer = css`
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

const ButtonWrapper = css`
  width: 20%;
`;
