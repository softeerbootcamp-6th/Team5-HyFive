import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";
import { NoRouteIcon } from "@/assets/icons";
const { color, typography } = theme;
import MovingCarGif from "@/assets/gif/moving_car.gif";

interface EmptyUIProps {
  type?: "static" | "dynamic";
  message?: string;
}
const EmptyUI = ({ type = "static", message }: EmptyUIProps) => {
  return (
    <div css={EmptyUIContainer}>
      <div css={ImageWrapper}>
        {type === "static" && <NoRouteIcon />}
        {type === "dynamic" && (
          <img
            src={MovingCarGif}
            css={css`
              width: 100%;
              height: 100%;
              object-fit: cover;
            `}
            alt="moving car gif"
          />
        )}
      </div>
      <p css={TextWrapper}>{message ?? "아직 등록된 정보가 없어요 :-("}</p>
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
  padding: 10px;
  color: ${color.GrayScale.gray4};
  font: ${typography.Heading.h5_semi};
  z-index: 1;
`;

const ImageWrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
